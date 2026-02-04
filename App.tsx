
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
import Partners from './pages/Partners';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import LMS from './pages/LMS';
import AdminVerify from './pages/AdminVerify';
import { User } from './types';
import { decodeJWT } from './utils/jwtUtils';

// Mock Auth Context
interface AuthContextType {
  user: User | null;
  token: string | null;
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
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('keshava_auth_token'));

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        setUser({ 
          name: decoded.name || decoded.email.split('@')[0], 
          email: decoded.email, 
          isLoggedIn: true 
        });
      } else {
        logout();
      }
    }
  }, [token]);

  const login = (jwtToken: string) => {
    localStorage.setItem('keshava_auth_token', jwtToken);
    setToken(jwtToken);
    const decoded = decodeJWT(jwtToken);
    if (decoded) {
      setUser({ 
        name: decoded.name || decoded.email.split('@')[0], 
        email: decoded.email, 
        isLoggedIn: true 
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('keshava_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/for-schools" element={<ForSchools />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-verify" element={<AdminVerify />} />
              <Route path="/lms" element={user ? <LMS /> : <Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
