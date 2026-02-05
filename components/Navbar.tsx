
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Layout, ShieldCheck, Wifi, WifiOff, Activity } from 'lucide-react';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../constants';
import { useAuth } from '../App';
import AuthModal from './AuthModal';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  const navigate = useNavigate();
  // Fix: Removed 'token' as it's not part of AuthContextType definition in App.tsx
  const { user, logout } = useAuth();

  // API Heartbeat Monitor - Port 9090
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

  const toggleMenu = () => setIsOpen(!isOpen);
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
              <div className={`mr-4 flex items-center space-x-2 px-3 py-1.5 rounded-full border ${apiStatus === 'online' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'} transition-all duration-500`}>
                <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  API {apiStatus.toUpperCase()}
                </span>
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
                    <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-2 animate-scale-up">
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
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-all group"
                  >
                    <User size={18} className="text-blue-700" />
                    <span className="text-sm font-black text-gray-800 tracking-tight">{user.name}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 shadow-2xl rounded-[2rem] overflow-hidden py-3 animate-scale-up">
                      <Link to="/lms" onClick={() => setShowUserMenu(false)} className="flex items-center px-5 py-3.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors font-bold">
                        <Layout size={16} className="mr-3 text-blue-700" />
                        LMS Dashboard
                      </Link>
                      <button onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }} className="w-full flex items-center px-5 py-3.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold">
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/20 active:scale-95"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="lg:hidden flex items-center">
              <button onClick={toggleMenu} className="text-gray-700 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute top-20 w-full shadow-2xl animate-fade-in h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-4 pt-4 pb-12 space-y-2">
              <div className="flex items-center space-x-3 px-3 py-4 mb-2 border-b border-gray-50">
                 <Activity size={18} className={apiStatus === 'online' ? 'text-green-500' : 'text-red-500'} />
                 <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                   System {apiStatus.toUpperCase()}
                 </span>
              </div>
              
              {NAVIGATION_LINKS.map((link) => (
                <div key={link.label}>
                  <div 
                    className="flex justify-between items-center px-3 py-3 text-base font-bold text-gray-800 border-b border-gray-50"
                    onClick={() => link.children ? setActiveDropdown(activeDropdown === link.label ? null : link.label) : (navigate(link.path), closeMenu())}
                  >
                    <Link to={link.path} onClick={(e) => link.children && e.preventDefault()}>{link.label}</Link>
                    {link.children && <ChevronDown size={18} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                  </div>
                  {link.children && activeDropdown === link.label && (
                    <div className="bg-gray-50 pl-6 py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          onClick={closeMenu}
                          className="block py-3 text-sm text-gray-600 hover:text-blue-700 font-bold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 px-3">
                 {user ? (
                   <>
                    <Link to="/lms" onClick={closeMenu} className="block text-center bg-blue-700 text-white px-5 py-4 rounded-xl font-black mb-3">
                      LMS Dashboard
                    </Link>
                    <button onClick={() => { logout(); closeMenu(); navigate('/'); }} className="w-full text-center bg-gray-100 text-red-600 px-5 py-4 rounded-xl font-black">
                      Sign Out
                    </button>
                   </>
                 ) : (
                   <button onClick={() => { setIsAuthModalOpen(true); closeMenu(); }} className="w-full text-center bg-blue-700 text-white px-5 py-4 rounded-xl font-black mb-3">
                     Sign In to Portal
                   </button>
                 )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
