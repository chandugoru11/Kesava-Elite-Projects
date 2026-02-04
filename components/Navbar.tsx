
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg overflow-hidden border border-gray-100">
               <img src="https://picsum.photos/id/1/200/200" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-red-600 font-bold text-lg leading-none">KESHAVA ELITE</span>
              <span className="text-gray-500 text-xs font-semibold">PROJECTS PVT.LTD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4 items-center">
            {NAVIGATION_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="ml-1" />}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="ml-4 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Partner With Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 p-2 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-20 w-full shadow-2xl animate-fade-in h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 pt-4 pb-12 space-y-2">
            {NAVIGATION_LINKS.map((link) => (
              <div key={link.label}>
                <div 
                  className="flex justify-between items-center px-3 py-3 text-base font-semibold text-gray-800 border-b border-gray-50"
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
                        className="block py-2 text-sm text-gray-600 hover:text-red-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 px-3">
               <Link
                to="/contact"
                onClick={closeMenu}
                className="block text-center bg-red-600 text-white px-5 py-3 rounded-md text-base font-bold hover:bg-red-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
