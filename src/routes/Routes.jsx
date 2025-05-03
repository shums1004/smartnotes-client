import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../store/useAuth';

// Pages
import LandingPage from '../pages/Landing.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import CreateNote from '../pages/CreateNote.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import NoteDetail from '../pages/NoteDetail.jsx';

export default function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (

    <Routes>
      {/* Public Route */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/create" element={isLoggedIn ? <CreateNote /> : <Navigate to="/login" />} />
      <Route path="/notes/:id" element={<NoteDetail />} />

      {/* 404 Fallback */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
