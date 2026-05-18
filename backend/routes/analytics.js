import express from 'express';
import { getDatabase } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get overall analytics dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const db = await getDatabase();

    const analytics = await db.get(`
      SELECT 
        COUNT(DISTINCT f.id) as total_feedback,
        COUNT(DISTINCT f.student_id) as total_students,
        AVG(f.rating) as avg_rating,
        SUM(CASE WHEN f.sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
        SUM(CASE WHEN f.sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral_count,
        SUM(CASE WHEN f.sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count
      FROM feedback f
    `);

    // Calculate percentages
    if (analytics.total_feedback > 0) {
      analytics.positive_percent = Math.round((analytics.positive_count / analytics.total_feedback) * 100);
      analytics.neutral_percent = Math.round((analytics.neutral_count / analytics.total_feedback) * 100);
      analytics.negative_percent = Math.round((analytics.negative_count / analytics.total_feedback) * 100);
    }

    // Detect anomalies (courses with very low ratings)
    const anomalies = await db.all(`
      SELECT 
        c.id, c.code, c.name,
        COUNT(f.id) as feedback_count,
        AVG(f.rating) as avg_rating
      FROM courses c
      LEFT JOIN feedback f ON c.id = f.course_id
      GROUP BY c.id
      HAVING AVG(f.rating) < 2.5 AND COUNT(f.id) > 0
      ORDER BY avg_rating ASC
      LIMIT 10
    `);

    analytics.anomalies = anomalies;

    res.json(analytics);
    await db.close();
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get faculty-specific analytics
router.get('/faculty/:facultyId', authenticateToken, async (req, res) => {
  try {
    const { facultyId } = req.params;

    // Verify user is accessing their own analytics
    if (parseInt(facultyId) !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const db = await getDatabase();

    const facultyAnalytics = await db.get(`
      SELECT 
        COUNT(DISTINCT c.id) as total_courses,
        COUNT(DISTINCT e.student_id) as total_students,
        COUNT(DISTINCT f.id) as total_feedback,
        AVG(f.rating) as avg_rating,
        SUM(CASE WHEN f.sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
        SUM(CASE WHEN f.sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral_count,
        SUM(CASE WHEN f.sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN feedback f ON c.id = f.course_id
      WHERE c.faculty_id = ?
    `, [facultyId]);

    if (facultyAnalytics.total_feedback > 0) {
      facultyAnalytics.positive_percent = Math.round((facultyAnalytics.positive_count / facultyAnalytics.total_feedback) * 100);
      facultyAnalytics.neutral_percent = Math.round((facultyAnalytics.neutral_count / facultyAnalytics.total_feedback) * 100);
      facultyAnalytics.negative_percent = Math.round((facultyAnalytics.negative_count / facultyAnalytics.total_feedback) * 100);
    }

    // Course-wise breakdown
    const courseBreakdown = await db.all(`
      SELECT 
        c.id, c.code, c.name,
        COUNT(DISTINCT e.student_id) as enrolled_students,
        COUNT(DISTINCT f.id) as feedback_count,
        AVG(f.rating) as avg_rating,
        SUM(CASE WHEN f.sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
        SUM(CASE WHEN f.sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN feedback f ON c.id = f.course_id
      WHERE c.faculty_id = ?
      GROUP BY c.id
      ORDER BY c.code
    `, [facultyId]);

    facultyAnalytics.courses = courseBreakdown;

    res.json(facultyAnalytics);
    await db.close();
  } catch (error) {
    console.error('Get faculty analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
