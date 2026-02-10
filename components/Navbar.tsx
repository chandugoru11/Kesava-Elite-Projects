import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Layout, ShieldAlert, Activity } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants.tsx';
import { useAuth } from '../AuthContext.tsx';
import AuthModal from './AuthModal.tsx';
import Logo from './Logo.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user?.email === 'chandugoru927@gmail.com';

  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch('http://localhost:9090/api/health');
        setApiStatus(res.ok ? 'online' : 'offline');
      } catch (e) {
        setApiStatus('offline');
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 5000);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 group">
              <Logo className="h-14 w-auto transition-transform group-hover:scale-105" />
              <div className="hidden sm:flex flex-col border-l border-gray-100 pl-3">
                <span className="text-gray-900 font-black text-[9px] tracking-widest leading-none uppercase">Keshava Elite</span>
                <span className="text-blue-600 text-[7px] font-black uppercase tracking-[0.4em] mt-1">Robotics & Tech</span>
              </div>
            </Link>

            <div className="hidden lg:flex space-x-4 items-center">
              <div className={`mr-4 flex items-center space-x-2 px-3 py-1.5 rounded-full border ${apiStatus === 'online' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest">API {apiStatus.toUpperCase()}</span>
              </div>

              {NAVIGATION_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className="px-3 py-2 text-sm font-black text-gray-700 hover:text-blue-700 transition-colors flex items-center"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                  </Link>
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 font-bold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="h-6 w-px bg-gray-100 mx-2"></div>

              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-3 bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-all">
                    <User size={18} className="text-blue-700" />
                    <span className="text-sm font-black text-gray-800 tracking-tight">{user.name}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 shadow-2xl rounded-[2rem] overflow-hidden py-3">
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setShowUserMenu(false)} className="flex items-center px-5 py-3.5 text-sm text-blue-700 bg-blue-50/30 hover:bg-blue-50 transition-colors font-black uppercase tracking-widest">
                          <ShieldAlert size={16} className="mr-3 text-blue-700" /> Admin Command
                        </Link>
                      )}
                      <Link to="/lms/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center px-5 py-3.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors font-bold">
                        <Layout size={16} className="mr-3 text-blue-700" /> LMS Dashboard
                      </Link>
                      <button onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }} className="w-full flex items-center px-5 py-3.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold border-t border-gray-50 mt-2">
                        <LogOut size={16} className="mr-3" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/20 active:scale-95">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;