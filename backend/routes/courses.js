import express from 'express';
import { getDatabase } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const courses = await db.all(
      `SELECT c.id, c.code, c.name, c.description, c.semester, c.year, 
              u.first_name as faculty_first_name, u.last_name as faculty_last_name,
              COUNT(e.id) as enrolled_students
       FROM courses c
       JOIN users u ON c.faculty_id = u.id
       LEFT JOIN enrollments e ON e.course_id = c.id
       GROUP BY c.id
       ORDER BY c.code`
    );
    res.json(courses);
    await db.close();
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get course by ID
router.get('/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const db = await getDatabase();
    
    const course = await db.get(
      `SELECT c.id, c.code, c.name, c.description, c.semester, c.year, 
              u.id as faculty_id, u.first_name as faculty_first_name, u.last_name as faculty_last_name
       FROM courses c
       JOIN users u ON c.faculty_id = u.id
       WHERE c.id = ?`,
      [courseId]
    );

    if (!course) {
      await db.close();
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get enrolled students
    const students = await db.all(
      `SELECT u.id, u.email, u.first_name, u.last_name, e.grade
       FROM enrollments e
       JOIN users u ON e.student_id = u.id
       WHERE e.course_id = ?
       ORDER BY u.first_name`,
      [courseId]
    );

    course.students = students;
    res.json(course);
    await db.close();
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create course (faculty only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ error: 'Only faculty can create courses' });
    }

    const { code, name, description, semester, year, max_students } = req.body;

    if (!code || !name) {
      return res.status(400).json({ error: 'Code and name required' });
    }

    const db = await getDatabase();
    const result = await db.run(
      `INSERT INTO courses (code, name, description, faculty_id, semester, year, max_students)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [code, name, description || null, req.user.id, semester || null, year || null, max_students || null]
    );

    const newCourse = await db.get('SELECT * FROM courses WHERE id = ?', [result.lastID]);
    res.status(201).json(newCourse);
    await db.close();
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Course code already exists' });
    }
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update course (faculty only)
router.put('/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description, semester, year } = req.body;

    const db = await getDatabase();
    
    // Verify ownership
    const course = await db.get('SELECT faculty_id FROM courses WHERE id = ?', [courseId]);
    if (!course || course.faculty_id !== req.user.id) {
      await db.close();
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await db.run(
      `UPDATE courses SET name = ?, description = ?, semester = ?, year = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, description, semester, year, courseId]
    );

    const updatedCourse = await db.get('SELECT * FROM courses WHERE id = ?', [courseId]);
    res.json(updatedCourse);
    await db.close();
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Enroll student in course
router.post('/:courseId/enroll', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can enroll' });
    }

    const { courseId } = req.params;
    const db = await getDatabase();

    const result = await db.run(
      `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`,
      [req.user.id, courseId]
    );

    const enrollment = await db.get(
      `SELECT c.id, c.code, c.name, u.first_name as faculty_name, u.last_name as faculty_last_name
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       JOIN users u ON c.faculty_id = u.id
       WHERE e.id = ?`,
      [result.lastID]
    );

    res.status(201).json(enrollment);
    await db.close();
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Already enrolled in this course' });
    }
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
