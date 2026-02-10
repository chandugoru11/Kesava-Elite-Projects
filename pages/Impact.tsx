
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, Landmark, GraduationCap, 
  ExternalLink, Globe, Star, CheckCircle, 
  Users, Building2, Trophy, ArrowRight
} from 'lucide-react';
import { ASSETS } from '../assets';

const Reveal: React.FC<{ children: React.ReactNode; className?: string; type?: 'up' | 'left' | 'right'; delay?: string }> = ({ children, className = '', type = 'up', delay = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsActive(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const revealClass = type === 'up' ? 'reveal-up' : type === 'left' ? 'reveal-left' : 'reveal-right';

  return (
    <div ref={ref} className={`reveal ${revealClass} ${isActive ? 'active' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
};

const Impact: React.FC = () => {
  const approvedBy = [
    { name: "APSSDC Skill AP", logo: "https://i.postimg.cc/vm0w2Ps7/APSSDC.jpg" },
    { name: "MSME India", logo: "https://i.postimg.cc/4y6KrKQP/Micro_Small_and_Medium.jpg" },
    { name: "DPIIT Startup India", logo: "https://i.postimg.cc/Hxtz9KDZ/DPIIT.jpg" },
    { name: "ISO 9001 Certified", logo: "https://i.postimg.cc/VNkjnFWC/ISO-9001.jpg" },
    { name: "AICTE India", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png" },
    { name: "MCA Govt of India", logo: "https://i.postimg.cc/J7ZP1P67/MCA-Govt-of-INDIA-jpg.jpg" }
  ];

  const trustedBy = ASSETS.CLIENTS;

  const LogoCard = ({ name, logo }: any) => (
    <div className="bg-white border border-gray-100 rounded-[3.5rem] p-16 min-w-[480px] h-72 shadow-sm flex items-center justify-center group hover:border-blue-700/20 transition-all duration-500">
      <img 
        src={logo} 
        alt={name} 
        className="max-h-40 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=eff6ff&color=1d4ed8&bold=true&length=4&size=256`; }}
      />
    </div>
  );

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative py-48 bg-blue-950 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-grid"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-4 bg-blue-600/10 border border-blue-600/20 px-10 py-4 rounded-full mb-12">
              <ShieldCheck size={20} className="text-blue-400" />
              <span className="text-blue-400 font-black tracking-[0.5em] uppercase text-[10px]">Verification Protocol Active</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black text-white mb-10 tracking-tighter leading-[0.85]">
              Verified <br/><span className="shimmer-text">Impact.</span>
            </h1>
            <p className="text-gray-400 text-2xl max-w-4xl mx-auto leading-relaxed font-medium italic">
              Empowering 15,000+ students through industry-certified technical education.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Synchronized Dual Marquee Section */}
      <section className="py-48 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 mb-24">
            <Reveal type="left">
               <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase flex items-center mb-4">
                  <Landmark className="mr-6 text-blue-700" size={40} /> Accreditation Matrix
               </h2>
               <div className="h-2 w-20 bg-blue-700 rounded-full"></div>
            </Reveal>
        </div>

        <div className="marquee-container space-y-16">
          {/* Row 1: Approved By (Moves Left) */}
          <div className="relative">
             <div className="absolute top-0 left-0 z-20 bg-white/10 px-6 py-2 rounded-br-2xl border-r border-b border-gray-100 font-black text-[10px] uppercase tracking-widest text-blue-700">Approved By Node</div>
             <div className="flex relative marquee-mask overflow-hidden">
               <div className="animate-marquee-l flex items-center gap-16 py-12 px-8">
                 {[...approvedBy, ...approvedBy, ...approvedBy].map((item, i) => <LogoCard key={i} {...item} />)}
               </div>
             </div>
          </div>

          {/* Row 2: Trusted By (Moves Right) */}
          <div className="relative">
             <div className="absolute top-0 right-0 z-20 bg-white/10 px-6 py-2 rounded-bl-2xl border-l border-b border-gray-100 font-black text-[10px] uppercase tracking-widest text-blue-700">Institutional Network Node</div>
             <div className="flex relative marquee-mask overflow-hidden">
               <div className="animate-marquee-r flex items-center gap-16 py-12 px-8">
                 {[...trustedBy, ...trustedBy, ...trustedBy].map((item, i) => <LogoCard key={i} {...item} />)}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Statistics Reveal */}
      <section className="py-32 bg-gray-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { label: 'Network Reach', value: '15,000+', icon: Users, desc: 'Student credentials synced with industrial portals.' },
              { label: 'Authorized Hubs', value: '50+', icon: Building2, desc: 'Operational centers of excellence nationwide.' },
              { label: 'Awarded Nodes', value: '200+', icon: Trophy, desc: 'Technical projects deployed for global industries.' }
            ].map((stat, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`} type="up">
                <div className="p-16 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-blue-700 transition-all group shadow-2xl">
                   <stat.icon size={48} className="text-blue-500 group-hover:text-white mb-10 transition-colors" />
                   <h4 className="text-7xl font-black mb-6 tracking-tighter">{stat.value}</h4>
                   <p className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6 group-hover:text-blue-200 transition-colors">{stat.label}</p>
                   <p className="text-gray-400 font-medium leading-relaxed group-hover:text-white/90 transition-colors">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-48 bg-white">
        <div className="container mx-auto px-6">
           <Reveal>
              <div className="bg-blue-700 rounded-[6rem] p-24 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(29,78,216,0.3)]">
                 <div className="absolute inset-0 bg-grid opacity-10"></div>
                 <div className="relative z-10">
                    <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter leading-none">Industrial <br/><span className="italic">Validation.</span></h2>
                    <p className="text-2xl text-blue-50 mb-20 max-w-3xl mx-auto font-medium leading-relaxed italic">Join the network of institutions redefining technical education standards across India.</p>
                    <Link to="/contact" className="bg-white text-blue-700 px-20 py-8 rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center w-fit mx-auto group">
                       Contact Protocol <ArrowRight size={32} className="ml-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Impact;
