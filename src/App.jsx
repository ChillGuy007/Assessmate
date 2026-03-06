import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Analytics from './pages/Analytics';
import Feedback from './pages/Feedback';
import GlobalNavbar from './components/GlobalNavbar';

function App() {
  return (
    <>
      <GlobalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </>
  );
}

export default App;
