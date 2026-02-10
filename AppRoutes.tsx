
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Services from './pages/Services.tsx';
import Courses from './pages/Courses.tsx';
import ForSchools from './pages/ForSchools.tsx';
import Impact from './pages/Impact.tsx';
import Contact from './pages/Contact.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import LMSDashboard from './pages/LMSDashboard.tsx';
import HRDashboard from './pages/HRDashboard.tsx';
import AttendanceSystem from './pages/AttendanceSystem.tsx';
import { useAuth } from './AuthContext.tsx';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'chandugoru927@gmail.com';

  return (
    <Routes>
      {/* Public Elite Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/for-schools" element={<ForSchools />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Admin Command Port */}
      <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
      
      {/* Protected LMS Hub */}
      <Route path="/lms/*" element={user ? <LMSDashboard /> : <Navigate to="/" />} />
      
      {/* Protected HR Administration */}
      <Route path="/hr/*" element={user ? <HRDashboard /> : <Navigate to="/" />} />
      
      {/* Protected Attendance Tracking */}
      <Route path="/attendance/*" element={user ? <AttendanceSystem /> : <Navigate to="/" />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
