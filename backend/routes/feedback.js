import express from 'express';
import { getDatabase } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';
import { analyzeSentiment } from '../utils/sentiment.js';

const router = express.Router();

// Get feedback for a course (faculty only)
router.get('/course/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const db = await getDatabase();
    
    // Verify faculty owns this course
    const course = await db.get('SELECT faculty_id FROM courses WHERE id = ?', [courseId]);
    if (!course || course.faculty_id !== req.user.id) {
      await db.close();
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const feedback = await db.all(
      `SELECT f.id, f.rating, f.comment, f.sentiment, f.created_at,
              u.first_name, u.last_name, u.email
       FROM feedback f
       JOIN users u ON f.student_id = u.id
       WHERE f.course_id = ?
       ORDER BY f.created_at DESC`,
      [courseId]
    );

    res.json(feedback);
    await db.close();
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit feedback (students only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can submit feedback' });
    }

    const { course_id, faculty_id, rating, comment } = req.body;

    if (!course_id || !faculty_id || !rating) {
      return res.status(400).json({ error: 'Course ID, faculty ID, and rating required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const db = await getDatabase();

    // Analyze sentiment if comment provided
    let sentiment = 'neutral';
    if (comment) {
      sentiment = analyzeSentiment(comment);
    }

    const result = await db.run(
      `INSERT INTO feedback (student_id, course_id, faculty_id, rating, comment, sentiment)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, course_id, faculty_id, rating, comment || null, sentiment]
    );

    const newFeedback = await db.get('SELECT * FROM feedback WHERE id = ?', [result.lastID]);
    res.status(201).json(newFeedback);
    await db.close();
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get feedback statistics
router.get('/stats/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const db = await getDatabase();

    const stats = await db.get(
      `SELECT 
        COUNT(id) as total_feedback,
        AVG(rating) as avg_rating,
        MIN(rating) as min_rating,
        MAX(rating) as max_rating,
        SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
        SUM(CASE WHEN sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral_count,
        SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count
       FROM feedback
       WHERE course_id = ?`,
      [courseId]
    );

    // Calculate percentages
    if (stats.total_feedback > 0) {
      stats.positive_percent = Math.round((stats.positive_count / stats.total_feedback) * 100);
      stats.neutral_percent = Math.round((stats.neutral_count / stats.total_feedback) * 100);
      stats.negative_percent = Math.round((stats.negative_count / stats.total_feedback) * 100);
    }

    res.json(stats);
    await db.close();
  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all feedback submitted by student
router.get('/student/:studentId', authenticateToken, async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify user is accessing their own feedback
    if (parseInt(studentId) !== req.user.id && req.user.role !== 'faculty') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const db = await getDatabase();
    const feedback = await db.all(
      `SELECT f.id, f.rating, f.comment, f.sentiment, f.created_at,
              c.code, c.name, u.first_name, u.last_name
       FROM feedback f
       JOIN courses c ON f.course_id = c.id
       JOIN users u ON f.faculty_id = u.id
       WHERE f.student_id = ?
       ORDER BY f.created_at DESC`,
      [studentId]
    );

    res.json(feedback);
    await db.close();
  } catch (error) {
    console.error('Get student feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
