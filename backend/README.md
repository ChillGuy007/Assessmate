# Assessmate Backend

Backend server for the Assessmate institutional assessment platform built with Node.js and Express.

## Features

- **User Authentication**: JWT-based login and signup for students and faculty
- **User Profiles**: Student and faculty profile management
- **Course Management**: Create, update, and manage courses
- **Enrollment System**: Student enrollment in courses
- **Feedback System**: Submit and manage feedback with sentiment analysis
- **Analytics Dashboard**: AI-powered insights from feedback data
- **Postgres Database**: Hosted SQL database

## Prerequisites

- Node.js 16+ and npm
- npm packages (installed via `npm install`)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

# Create a `.env` file with your configuration:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
DATABASE_URL=your_postgres_connection_string
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Seeding Sample Data

To populate the database with sample data:
```bash
node seed.js
```

**Sample credentials:**
- Student: `alex.johnson@university.edu` / `student123`
- Faculty: `sarah.thompson@university.edu` / `faculty123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users` - Get all users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile/:userId` - Update user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get course details
- `POST /api/courses` - Create course (faculty only)
- `PUT /api/courses/:courseId` - Update course (faculty only)
- `POST /api/courses/:courseId/enroll` - Enroll in course (student only)

### Feedback
- `POST /api/feedback` - Submit feedback (student only)
- `GET /api/feedback/course/:courseId` - Get course feedback (faculty only)
- `GET /api/feedback/stats/:courseId` - Get feedback statistics
- `GET /api/feedback/student/:studentId` - Get student's feedback

### Analytics
- `GET /api/analytics/dashboard` - Global analytics dashboard
- `GET /api/analytics/faculty/:facultyId` - Faculty-specific analytics

### Health Check
- `GET /api/health` - Server status

## Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password
- `role`: 'student' or 'faculty'
- `first_name`, `last_name`: User name
- `institution`: Institution name
- `phone`: Contact number
- `avatar_url`: Profile picture URL
- `created_at`, `updated_at`: Timestamps

### Courses Table
- `id`: Primary key
- `code`: Unique course code
- `name`: Course name
- `description`: Course description
- `faculty_id`: Foreign key to users
- `semester`, `year`: Course schedule
- `max_students`: Maximum enrollment

### Enrollments Table
- `id`: Primary key
- `student_id`: Foreign key to users
- `course_id`: Foreign key to courses
- `grade`: Student grade

### Feedback Table
- `id`: Primary key
- `student_id`, `course_id`, `faculty_id`: Foreign keys
- `rating`: 1-5 star rating
- `comment`: Feedback text
- `sentiment`: 'positive', 'neutral', or 'negative'
- `created_at`, `updated_at`: Timestamps

### Analytics Table
- Caches analytics data for performance

## Architecture

```
backend/
├── index.js              # Main server file
├── database.js           # Database initialization and setup
├── seed.js               # Sample data seeding
├── package.json          # Dependencies
├── .env                  # Environment variables
├── .gitignore            # Git ignore patterns
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── users.js         # User profile endpoints
│   ├── courses.js       # Course management endpoints
│   ├── feedback.js      # Feedback endpoints
│   └── analytics.js     # Analytics endpoints
├── middleware/
│   └── auth.js          # JWT authentication middleware
└── utils/
    └── sentiment.js     # Sentiment analysis utility
```

## Frontend Integration

The backend is configured to accept requests from the frontend running on:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative port)

Update the CORS configuration in `index.js` if running on different ports.

## Security Notes

- Change `JWT_SECRET` in `.env` for production
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Add input validation on all endpoints
- Use parameterized queries to prevent SQL injection (already implemented)

## Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**Database errors:**
- Delete `assessmate.db` and restart the server to reinitialize
- Check file permissions in the backend directory

**CORS errors:**
- Verify the frontend is running on an allowed origin
- Check CORS configuration in `index.js`

## Development Tips

- Use `node seed.js` frequently to reset data during development
- Check console logs for detailed error messages
- Use API testing tools like Postman or Insomnia for endpoint testing
- Enable `NODE_ENV=development` for verbose logging

## License

MIT
