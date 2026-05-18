<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Assessmate - Institutional Assessment Platform

A modern, full-stack web application for managing institutional assessments, student feedback, course evaluations, and faculty analytics.

## 🎯 Overview

**Assessmate** is a comprehensive platform that enables institutions to:
- Collect and analyze student feedback systematically
- Enable faculty to improve teaching based on insights
- Manage courses and student enrollments
- Generate real-time analytics dashboards
- Perform sentiment analysis on feedback

## 📦 Repo Layout

| Path | Purpose |
|---|---|
| `Assessmate/` | Frontend app (React + Vite) |
| `Assessmate/src/components/` | Reusable UI pieces |
| `Assessmate/src/contexts/` | Global state (auth) |
| `Assessmate/src/pages/` | Route-level screens |
| `Assessmate/src/services/` | API client layer |
| `backend/` | Express API server |
| `backend/routes/` | API endpoints |
| `backend/middleware/` | Auth middleware |
| `backend/utils/` | Shared helpers |
| `backend/database.js` | Database adapter/setup |
| `backend/seed.js` | Sample data seeding |
| `docker-compose.yml` | Local container setup |
| `README.md` | Main project guide |

### Where to put new files

- **Frontend UI:** add components to `Assessmate/src/components/`, screens to `Assessmate/src/pages/`.
- **Frontend logic:** keep shared state in `Assessmate/src/contexts/` and API calls in `Assessmate/src/services/`.
- **Backend API:** add endpoints in `backend/routes/`, middleware in `backend/middleware/`, helpers in `backend/utils/`.
- **Config/docs:** keep repo-wide docs and deployment config at the root.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git (for cloning)

### Installation (2 minutes)

1. **Setup Backend** (Terminal 1)
```bash
cd backend
npm install
node seed.js
npm run dev
```

2. **Setup Frontend** (Terminal 2)
```bash
cd Assessmate
npm install
npm run dev
```

3. **Open Browser**
```
http://localhost:5173
```

4. **Login with**
   - Email: `alex.johnson@university.edu`
   - Password: `student123`

## 🔑 Key Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Role-based access control (Student/Faculty)
- ✅ Secure token verification

### Student Features
- 📚 Browse and enroll in courses
- 🎯 Submit course feedback with ratings
- 💬 View personal feedback history
- 📊 See course analytics

### Faculty Features
- 📝 Create and manage courses
- 📩 View all student feedback
- 📈 Analytics dashboard
- 🔍 Sentiment analysis insights

### Platform Features
- 🌍 Real-time analytics dashboard
- 🤖 AI-powered sentiment analysis
- 📊 Course performance metrics
- 🚨 Anomaly detection
- 🔐 Secure API with validation

## 📱 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Routing
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Postgres** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

## 🗄️ Database Schema

### Users Table
```
id, email, password, role, first_name, last_name, 
institution, phone, avatar_url, created_at, updated_at
```

### Courses Table
```
id, code, name, description, faculty_id, 
semester, year, max_students, created_at, updated_at
```

### Enrollments Table
```
id, student_id, course_id, grade, enrolled_at
```

### Feedback Table
```
id, student_id, course_id, faculty_id, rating, 
comment, sentiment, created_at, updated_at
```

### Analytics Table
```
id, type, faculty_id, course_id, total_feedback, 
avg_rating, sentiment_counts, updated_at
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login       - User login
POST   /api/auth/signup      - User registration
GET    /api/auth/verify      - Token verification
```

### Users
```
GET    /api/users            - Get all users
GET    /api/users/profile/:userId    - Get profile
PUT    /api/users/profile/:userId    - Update profile
```

### Courses
```
GET    /api/courses          - Get all courses
POST   /api/courses          - Create course (Faculty)
GET    /api/courses/:courseId    - Get course details
PUT    /api/courses/:courseId    - Update course
POST   /api/courses/:courseId/enroll - Enroll student
```

### Feedback
```
POST   /api/feedback         - Submit feedback (Student)
GET    /api/feedback/course/:courseId - Get feedback
GET    /api/feedback/stats/:courseId  - Statistics
GET    /api/feedback/student/:studentId - Student feedback
```

### Analytics
```
GET    /api/analytics/dashboard      - Global analytics
GET    /api/analytics/faculty/:facultyId - Faculty analytics
```

## 📖 Documentation

- **[backend/README.md](./backend/README.md)** - Backend API documentation
- **[Assessmate/README.md](./Assessmate/README.md)** - Frontend project notes

## 🐳 Docker Setup (Optional)

Run both services with Docker Compose:

```bash
docker-compose up
```

This starts:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:5173`

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Input validation on all endpoints
- SQL injection prevention (parameterized queries)
- CORS configuration for frontend
- Role-based access control
- Secure password reset flow ready

## 📊 Analytics Engine

- Real-time feedback aggregation
- Sentiment analysis (positive/neutral/negative)
- Course performance metrics
- Student engagement tracking
- Anomaly detection
- Faculty-specific dashboards

## 🛠️ Development

### Frontend Development
```bash
cd Assessmate
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
```

### Backend Development
```bash
cd backend
npm run dev      # Start with auto-reload
npm start        # Production start
node seed.js     # Reseed data
```

## 📋 Sample Data

After running `node seed.js`:

| Role | Email | Password |
|------|-------|----------|
| Student | alex.johnson@university.edu | student123 |
| Student | maria.garcia@university.edu | student123 |
| Faculty | sarah.thompson@university.edu | faculty123 |
| Faculty | james.wilson@university.edu | faculty123 |

Sample courses and feedback are also created.

## 🐛 Troubleshooting

### Backend Issues
```bash
# Port 5000 already in use?
netstat -ano | findstr :5000        # Windows
lsof -i :5000                       # Mac/Linux

# Database errors?
rm assessmate.db                    # Delete DB
npm run dev                         # Reinitialize
node seed.js                        # Reseed
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Login Issues
- Verify backend is running on port 5000
- Check credentials in seed output
- Reseed data with `node seed.js`

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Use a hosted Postgres database
4. Deploy the backend to Render, Railway, or Fly.io
5. Set environment variables on platform

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder to Vercel, Netlify, or GitHub Pages
3. Update `VITE_API_URL` to production backend

## 🔮 Future Enhancements

- [ ] Email notifications for feedback
- [ ] Password reset functionality
- [ ] Profile picture uploads
- [ ] Advanced ML sentiment analysis
- [ ] Real-time notifications (WebSockets)
- [ ] Mobile app (React Native)
- [ ] Batch CSV import/export
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Advanced filtering and search

## 📝 License

MIT License - Feel free to use and modify

## 👨‍💼 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section in this README
2. Review error logs in terminal
3. Verify environment variables are set
4. Ensure both servers are running

---

**Built with ❤️ for educational institutions**

**Getting Started**: Read this README for setup and [backend/README.md](./backend/README.md) for backend details

**Current Status**: ✅ Fully functional - Ready to use!
>>>>>>> 70e4820 (Added backend and database services)
