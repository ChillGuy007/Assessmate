import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './database.js';

// Import routes
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import coursesRoutes from './routes/courses.js';
import feedbackRoutes from './routes/feedback.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// CORS: allow specific origins in production, reflect origin in development
const corsOptions = process.env.NODE_ENV === 'production'
  ? { origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'], credentials: true }
  : { origin: true, credentials: true };

app.use(cors(corsOptions));

// Initialize database on startup
await initializeDatabase().catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║   Assessmate Backend Server        ║
║   Running on port ${PORT}            ║
║   http://localhost:${PORT}           ║
╚════════════════════════════════════╝
  `);
  console.log('Available endpoints:');
  console.log('  POST   /api/auth/login');
  console.log('  POST   /api/auth/signup');
  console.log('  GET    /api/auth/verify');
  console.log('  GET    /api/users/profile/:userId');
  console.log('  PUT    /api/users/profile/:userId');
  console.log('  GET    /api/courses');
  console.log('  POST   /api/courses');
  console.log('  GET    /api/courses/:courseId');
  console.log('  POST   /api/courses/:courseId/enroll');
  console.log('  POST   /api/feedback');
  console.log('  GET    /api/feedback/course/:courseId');
  console.log('  GET    /api/feedback/stats/:courseId');
  console.log('  GET    /api/analytics/dashboard');
  console.log('  GET    /api/analytics/faculty/:facultyId');
  console.log('  GET    /api/health');
});
