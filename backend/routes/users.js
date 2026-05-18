import express from 'express';
import { getDatabase } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const db = await getDatabase();
    const user = await db.get(
      `SELECT id, email, role, first_name, last_name, institution, phone, avatar_url, created_at 
       FROM users WHERE id = ?`,
      [userId]
    );

    if (!user) {
      await db.close();
      return res.status(404).json({ error: 'User not found' });
    }

    // Get additional data based on role
    if (user.role === 'student') {
      const enrollments = await db.all(
        `SELECT c.id, c.code, c.name, c.description, u.first_name as faculty_name, u.last_name as faculty_last_name
         FROM enrollments e
         JOIN courses c ON e.course_id = c.id
         JOIN users u ON c.faculty_id = u.id
         WHERE e.student_id = ?`,
        [userId]
      );
      user.courses = enrollments;

      // Get student ratings for courses
      const ratings = await db.all(
        `SELECT c.id, AVG(f.rating) as avg_rating, COUNT(f.id) as total_ratings
         FROM courses c
         LEFT JOIN feedback f ON f.course_id = c.id
         WHERE c.id IN (SELECT course_id FROM enrollments WHERE student_id = ?)
         GROUP BY c.id`,
        [userId]
      );
      user.ratings = ratings;
    } else if (user.role === 'faculty') {
      const courses = await db.all(
        `SELECT id, code, name, description, semester, year FROM courses WHERE faculty_id = ?`,
        [userId]
      );
      user.courses = courses;
    }

    res.json(user);
    await db.close();
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { first_name, last_name, phone, institution, avatar_url } = req.body;

    // Verify user is updating their own profile
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const db = await getDatabase();
    
    await db.run(
      `UPDATE users SET first_name = ?, last_name = ?, phone = ?, institution = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [first_name, last_name, phone, institution, avatar_url, userId]
    );

    const updatedUser = await db.get(
      `SELECT id, email, role, first_name, last_name, institution, phone, avatar_url FROM users WHERE id = ?`,
      [userId]
    );

    res.json(updatedUser);
    await db.close();
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (admin only - optional)
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const users = await db.all(
      `SELECT id, email, role, first_name, last_name, institution FROM users`
    );
    res.json(users);
    await db.close();
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
