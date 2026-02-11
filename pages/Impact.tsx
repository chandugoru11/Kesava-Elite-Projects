import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, Award, Landmark, GraduationCap, 
  ExternalLink, Globe, Star, CheckCircle, 
  Users, Building2, Trophy, ArrowRight, CheckCircle2,
  Cpu, Zap, Shield
} from 'lucide-react';
import { ASSETS } from '../assets.ts';

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
  const accreditations = [
    { name: "APSSDC Skill AP", logo: ASSETS.LOGOS.APSSDC },
    { name: "MSME India", logo: ASSETS.LOGOS.MSME },
    { name: "Startup India", logo: ASSETS.LOGOS.STARTUP_INDIA },
    { name: "ISO 9001", logo: ASSETS.LOGOS.ISO },
    { name: "AICTE India", logo: ASSETS.LOGOS.AICTE },
    { name: "MCA", logo: ASSETS.LOGOS.MCA },
    { name: "NSDC India", logo: ASSETS.LOGOS.NSDC }
  ];

  const partners = ASSETS.CLIENTS;

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Tier */}
      <div className="relative py-48 bg-blue-950 text-center overflow-hidden">
        <div className="absolute inset-0 bg-animated-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/50 to-blue-950"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-blue-600/20 border border-blue-500/30 px-8 py-3 rounded-full mb-10 backdrop-blur-md">
              <ShieldCheck size={18} className="text-blue-400" />
              <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">Institutional Track Record</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black text-white mb-10 tracking-tighter leading-[0.85]">
              Verified <br/><span className="shimmer-text">Impact.</span>
            </h1>
            <p className="text-gray-400 text-2xl font-medium max-w-4xl mx-auto italic leading-relaxed">
              Standardizing technical excellence across India's premier educational landscape. 
              Over <span className="text-white">15,000+</span> credentials issued.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Approved By - FAST Marquee scrolling Left to Right */}
      <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <Reveal>
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-[0.5em] mb-4">Approved & Accredited By</h2>
            <div className="w-16 h-1.5 bg-blue-700 mx-auto rounded-full"></div>
          </Reveal>
        </div>
        
        <div className="relative marquee-mask overflow-hidden">
          <div className="animate-marquee-r flex items-center gap-12 py-8 px-6 w-max">
            {[...accreditations, ...accreditations, ...accreditations].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 w-[300px] h-44 shadow-sm flex items-center justify-center group hover:border-blue-700 transition-all duration-500 flex-shrink-0">
                <img src={item.logo} alt={item.name} className="max-h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numerical Impact Matrix */}
      <section className="py-48 bg-gray-950 text-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { label: 'Network Reach', value: '15,000+', icon: Users, desc: 'Student credentials synced with industrial portals globally.' },
              { label: 'Authorized Hubs', value: '50+', icon: Building2, desc: 'Fully operational centers of excellence in Tier 1 institutions.' },
              { label: 'Industrial Projects', value: '200+', icon: Zap, desc: 'Technical solutions deployed for global industrial partners.' }
            ].map((stat, i) => (
              <Reveal key={i} type="up" delay={`delay-${i * 100}`}>
                <div className="p-16 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-blue-700 hover:-translate-y-4 transition-all group h-full">
                   <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-white/20 transition-colors">
                      <stat.icon size={36} className="text-blue-500 group-hover:text-white" />
                   </div>
                   <h4 className="text-7xl font-black mb-6 tracking-tighter">{stat.value}</h4>
                   <p className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6 group-hover:text-blue-200">{stat.label}</p>
                   <p className="text-gray-400 font-medium group-hover:text-white/90 leading-relaxed">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By - FAST Marquee scrolling Right to Left */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <Reveal>
            <h2 className="text-[12px] font-black text-blue-700 uppercase tracking-[0.5em] mb-4">Trusted By Institutional Partners</h2>
            <div className="w-16 h-1.5 bg-blue-700 mx-auto rounded-full"></div>
          </Reveal>
        </div>
        
        <div className="relative marquee-mask overflow-hidden">
          <div className="animate-marquee-l flex items-center gap-12 py-8 px-6 w-max">
            {[...partners, ...partners, ...partners].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 w-[300px] h-44 shadow-sm flex items-center justify-center group hover:border-blue-700 transition-all duration-500 flex-shrink-0">
                <img src={item.logo} alt={item.name} className="max-h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Standard Banner */}
      <section className="pb-48 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="bg-blue-700 rounded-[5rem] p-24 text-center text-white relative overflow-hidden group shadow-3xl">
              <div className="absolute inset-0 bg-animated-grid opacity-10"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-10">
                  <div className="bg-white/20 p-6 rounded-[2.5rem] backdrop-blur-md">
                    <Award size={64} className="text-white" />
                  </div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">Global Certification <br/><span className="italic">Ready.</span></h2>
                <p className="text-2xl text-blue-50 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                  Our curriculum is aligned with ISO 9001:2015 standards and recognized by major technical governing bodies across India.
                </p>
                <div className="flex flex-wrap justify-center gap-12">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-300" />
                    <span className="font-black uppercase tracking-widest text-sm">Industrial Grade</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-300" />
                    <span className="font-black uppercase tracking-widest text-sm">Skill AP Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-300" />
                    <span className="font-black uppercase tracking-widest text-sm">MSME Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Impact;