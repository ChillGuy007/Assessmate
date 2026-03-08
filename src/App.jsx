import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Analytics from './pages/Analytics';
import Feedback from './pages/Feedback';
import FacultyProfile from './pages/FacultyProfile';
import StudentProfile from './pages/StudentProfile';
import GlobalNavbar from './components/GlobalNavbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProfileRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === 'student' ? <Navigate to="/student-profile" replace /> : <Navigate to="/faculty-profile" replace />;
};

function App() {
  return (
    <AuthProvider>
      <GlobalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faculty-profile" element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyProfile />
          </ProtectedRoute>
        } />
        <Route path="/student-profile" element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={<ProfileRedirect />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
