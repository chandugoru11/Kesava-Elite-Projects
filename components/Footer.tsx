
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold border-l-4 border-red-600 pl-3">
              KESHAVA ELITE PROJECTS
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {COMPANY_INFO.tagline}
            </p>
            <div className="pt-4">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">CIN</p>
              <p className="text-sm">{COMPANY_INFO.cin}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {NAVIGATION_LINKS.filter(l => !l.children).map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm hover:text-red-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/services" className="text-sm hover:text-red-500 transition-colors">Services</Link></li>
              <li><Link to="/courses" className="text-sm hover:text-red-500 transition-colors">Courses</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Reach Out</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-red-500 mt-1 shrink-0" />
                <span className="text-sm">{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-red-500 mt-1 shrink-0" />
                <span className="text-sm">{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-red-500 mt-1 shrink-0" />
                <span className="text-sm">{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h4 className="text-white font-semibold mb-6">Follow Us</h4>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Keshava Elite Projects Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
