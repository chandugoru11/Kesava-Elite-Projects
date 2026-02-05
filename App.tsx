
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Courses from './pages/Courses';
import ForSchools from './pages/ForSchools';
import Impact from './pages/Impact';
import Contact from './pages/Contact';
import LMSDashboard from './pages/LMSDashboard';
import HRDashboard from './pages/HRDashboard';
import AttendanceSystem from './pages/AttendanceSystem';
import { User } from './types';
import { decodeJWT } from './utils/jwtUtils';

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/lms') || 
                      location.pathname.startsWith('/hr') || 
                      location.pathname.startsWith('/attendance');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className={`flex-grow ${!isDashboard ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('keshava_auth_token'));

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) setUser({ name: decoded.name, email: decoded.email, isLoggedIn: true });
      else logout();
    }
  }, [token]);

  const login = (jwtToken: string) => {
    localStorage.setItem('keshava_auth_token', jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('keshava_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <ScrollToTop />
        <LayoutWrapper>
          <Routes>
            {/* Public Site */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<Contact />} />

            {/* System 1: LMS Portal */}
            <Route path="/lms/dashboard" element={user ? <LMSDashboard /> : <Navigate to="/" />} />
            <Route path="/lms/courses" element={user ? <LMSDashboard /> : <Navigate to="/" />} />
            <Route path="/lms/assignments" element={user ? <LMSDashboard /> : <Navigate to="/" />} />
            <Route path="/lms/projects" element={user ? <LMSDashboard /> : <Navigate to="/" />} />
            <Route path="/lms/certificates" element={user ? <LMSDashboard /> : <Navigate to="/" />} />

            {/* System 2: HR Portal */}
            <Route path="/hr/dashboard" element={user ? <HRDashboard /> : <Navigate to="/" />} />
            <Route path="/hr/employees" element={user ? <HRDashboard /> : <Navigate to="/" />} />
            <Route path="/hr/attendance" element={user ? <HRDashboard /> : <Navigate to="/" />} />
            <Route path="/hr/leaves" element={user ? <HRDashboard /> : <Navigate to="/" />} />
            <Route path="/hr/payroll" element={user ? <HRDashboard /> : <Navigate to="/" />} />

            {/* System 3: Attendance Portal */}
            <Route path="/attendance/dashboard" element={user ? <AttendanceSystem /> : <Navigate to="/" />} />
            <Route path="/attendance/mark" element={user ? <AttendanceSystem /> : <Navigate to="/" />} />
            <Route path="/attendance/qr" element={user ? <AttendanceSystem /> : <Navigate to="/" />} />
            <Route path="/attendance/reports" element={user ? <AttendanceSystem /> : <Navigate to="/" />} />
            
            {/* Default Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
