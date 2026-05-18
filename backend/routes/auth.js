import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../database.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const TOKEN_EXPIRY = '7d';

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const db = await getDatabase();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword
    });
    
    await db.close();
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role, first_name, last_name, institution } = req.body;

    if (!email || !password || !role || !first_name || !last_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['student', 'faculty'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const db = await getDatabase();
    
    // Check if user exists
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      await db.close();
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.run(
      `INSERT INTO users (email, password, role, first_name, last_name, institution)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, role, first_name, last_name, institution || null]
    );

    const newUser = await db.get('SELECT id, email, role, first_name, last_name, institution FROM users WHERE id = ?', [result.lastID]);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.status(201).json({
      token,
      user: newUser
    });

    await db.close();
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const db = await getDatabase();
    const user = await db.get('SELECT id, email, role, first_name, last_name, institution FROM users WHERE id = ?', [decoded.id]);

    if (!user) {
      await db.close();
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ valid: true, user });
    await db.close();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
