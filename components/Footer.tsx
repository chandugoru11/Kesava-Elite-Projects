
import React from 'react';
import { Link } from 'react-router-dom';
// Fix: Added missing ArrowRight to the lucide-react imports
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_LINKS } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Company Brief */}
          <div className="space-y-8">
            <div className="bg-white p-4 rounded-[2rem] w-fit shadow-2xl">
               <Logo className="h-14 w-auto" />
            </div>
            <div>
              <h3 className="text-white text-xl font-black tracking-tight uppercase leading-none">
                {COMPANY_INFO.brandName}
              </h3>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-3">Elite Technology Hub</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              Transforming the future of technical education through industry-led excellence.
            </p>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider mb-2">CIN Identity</p>
              <p className="text-xs font-mono text-blue-300">{COMPANY_INFO.cin}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-10 border-l-4 border-blue-600 pl-4">Navigation</h4>
            <ul className="grid grid-cols-2 gap-y-5 gap-x-4">
              {NAVIGATION_LINKS.filter(l => !l.children).map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-bold hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/services" className="text-sm font-bold hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/courses" className="text-sm font-bold hover:text-blue-400 transition-colors">Courses</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-10 border-l-4 border-blue-600 pl-4">Direct Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <div className="bg-blue-900/50 p-3 rounded-xl group-hover:bg-blue-600 transition-colors"><Mail size={18} className="text-blue-400 group-hover:text-white" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email Us</p>
                  <span className="text-sm font-bold text-gray-300">{COMPANY_INFO.email}</span>
                </div>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="bg-blue-900/50 p-3 rounded-xl group-hover:bg-blue-600 transition-colors"><Phone size={18} className="text-blue-400 group-hover:text-white" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Call Support</p>
                  <span className="text-sm font-bold text-gray-300">{COMPANY_INFO.phone}</span>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-blue-900/50 p-3 rounded-xl"><MapPin size={18} className="text-blue-400" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Location</p>
                  <span className="text-sm font-bold text-gray-300 leading-relaxed">{COMPANY_INFO.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-10 border-l-4 border-blue-600 pl-4">Stay Connected</h4>
            <div className="flex space-x-4 mb-10">
              {[
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Youtube size={20} />, href: "#" },
                { icon: <Facebook size={20} />, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-14 h-14 bg-blue-900/30 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:-translate-y-2 transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
               <p className="text-xs font-black text-white mb-4 uppercase tracking-widest">LMS Student Access</p>
               <div className="flex gap-2">
                 <input type="email" placeholder="Student ID" className="bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500 flex-grow" />
                 <button className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-600/20"><ArrowRight size={20}/></button>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          <p>© {new Date().getFullYear()} Keshava Elite Projects Pvt. Ltd.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
