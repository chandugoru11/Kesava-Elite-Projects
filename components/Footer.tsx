import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Linkedin, Instagram, Youtube, 
  Facebook, ArrowRight, ShieldCheck, Globe, Cpu, ExternalLink 
} from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_LINKS } from '../constants.tsx';
import Logo from './Logo.tsx';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-gray-400 pt-32 pb-16 relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          {/* Brand Identity Packet */}
          <div className="space-y-10">
            <div className="bg-white p-5 rounded-[2.5rem] w-fit shadow-2xl hover:scale-105 transition-transform duration-500">
               <Logo className="h-16 w-auto" />
            </div>
            <div className="space-y-4">
              <h3 className="text-white text-2xl font-black tracking-tight uppercase leading-none">
                {COMPANY_INFO.brandName}
              </h3>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] flex items-center">
                <ShieldCheck size={12} className="mr-2" /> Authorized Industrial Entity
              </p>
            </div>
            <p className="text-sm leading-relaxed font-medium opacity-80">
              Architecting the next generation of technical education through industry-led robotics ecosystems and advanced AI integration.
            </p>
            <div className="pt-8 border-t border-white/5">
              <p className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-3">Corporate Identification</p>
              <div className="inline-flex bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-blue-400 font-bold tracking-tight">{COMPANY_INFO.cin}</span>
              </div>
            </div>
          </div>

          {/* Institutional Navigation */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-12 flex items-center">
              <span className="w-10 h-px bg-blue-600 mr-4"></span> Navigation
            </h4>
            <ul className="grid grid-cols-1 gap-y-5">
              {NAVIGATION_LINKS.filter(l => !l.children).map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-sm font-bold hover:text-white hover:translate-x-2 transition-all flex items-center group"
                  >
                    <ChevronRight size={14} className="mr-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-sm font-bold hover:text-white transition-all flex items-center group">
                  <ChevronRight size={14} className="mr-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Technical Services
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm font-bold hover:text-white transition-all flex items-center group">
                  <ChevronRight size={14} className="mr-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Industrial Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Support Channels */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-12 flex items-center">
              <span className="w-10 h-px bg-blue-600 mr-4"></span> Support
            </h4>
            <ul className="space-y-8">
              <li className="group">
                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start space-x-5">
                  <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-blue-700 transition-all shadow-sm border border-white/5">
                    <Mail size={20} className="text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Administrative Hub</p>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{COMPANY_INFO.email}</span>
                  </div>
                </a>
              </li>
              <li className="group">
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} className="flex items-start space-x-5">
                  <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-blue-700 transition-all shadow-sm border border-white/5">
                    <Phone size={20} className="text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Operations Desk</p>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{COMPANY_INFO.phone}</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start space-x-5">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <MapPin size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Elite HQ</p>
                  <span className="text-sm font-bold text-gray-300 leading-relaxed">{COMPANY_INFO.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Ecosystem Portal */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-12 flex items-center">
              <span className="w-10 h-px bg-blue-600 mr-4"></span> Social Hub
            </h4>
            <div className="flex flex-wrap gap-4 mb-12">
              {[
                { icon: <Linkedin size={22} />, href: "#", label: 'LinkedIn' },
                { icon: <Instagram size={22} />, href: "#", label: 'Instagram' },
                { icon: <Youtube size={22} />, href: "#", label: 'YouTube' },
                { icon: <Facebook size={22} />, href: "#", label: 'Facebook' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  aria-label={social.label}
                  className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-700 hover:-translate-y-2 transition-all shadow-lg border border-white/5"
                >
                  <span className="text-gray-300 hover:text-white">{social.icon}</span>
                </a>
              ))}
            </div>
            <div className="bg-white/[0.03] p-10 rounded-[3rem] border border-white/5 shadow-3xl">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                 <p className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Institutional LMS Access</p>
               </div>
               <div className="flex gap-3">
                 <input 
                  type="text" 
                  placeholder="Portal ID" 
                  className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:outline-none focus:border-blue-500 flex-grow text-white placeholder:text-gray-700 font-bold" 
                 />
                 <button className="bg-blue-700 p-4 rounded-2xl text-white shadow-2xl shadow-blue-700/20 hover:bg-blue-600 transition-all flex items-center justify-center group">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Tier */}
        <div className="border-t border-white/5 pt-12 mt-20 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
             <div className="flex items-center space-x-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/5">
                <Globe size={12} className="text-blue-800" />
                <span className="text-gray-500">ISO 9001:2015 HUB</span>
             </div>
             <p className="opacity-60">© {new Date().getFullYear()} Keshava Elite Projects Pvt. Ltd.</p>
          </div>
          
          <div className="flex space-x-10">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors py-2">Privacy Protocol</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors py-2">Legal Terms</Link>
            <Link to="/ethics" className="hover:text-blue-400 transition-colors py-2">Corporate Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper for consistency in the list
const ChevronRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Footer;