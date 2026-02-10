import React, { useEffect } from 'react';
import { HashRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import { AuthProvider } from './AuthContext.tsx';
import AppRoutes from './AppRoutes.tsx';

/**
 * Utility component to ensure page transitions start at the top.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/**
 * Handles the conditional rendering of institutional navigation elements.
 * Dashboards (LMS, HR, Admin, etc.) use their own internal navigation layouts.
 */
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/lms') || 
                      location.pathname.startsWith('/hr') || 
                      location.pathname.startsWith('/attendance') ||
                      location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {!isDashboard && <Navbar />}
      <main className={`flex-grow ${!isDashboard ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <LayoutWrapper>
          <AppRoutes />
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
};

export default App;