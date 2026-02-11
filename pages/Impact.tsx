
import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, Award, Landmark, GraduationCap, 
  ExternalLink, Globe, Star, CheckCircle, 
  Users, Building2, Trophy, ArrowRight, CheckCircle2,
  Cpu, Zap, Shield, Heart, Flag, Smartphone
} from 'lucide-react';
import { ASSETS } from '../assets.ts';
import { COMPANY_INFO } from '../constants.tsx';

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

const Counter: React.FC<{ target: string; duration?: number }> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  const numericPart = parseInt(target.replace(/[^0-9]/g, ''), 10);
  const suffix = target.replace(/[0-9,]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * numericPart));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, numericPart, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
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

  const trustedBy = [
    { name: "IIT Madras", logo: ASSETS.LOGOS.IIT_MADRAS },
    { name: "Infosys Springboard", logo: ASSETS.LOGOS.INFOSYS },
    { name: "Great Learning", logo: ASSETS.LOGOS.GREAT_LEARNING },
    { name: "IDPS Narasaraopet", logo: ASSETS.LOGOS.IDPS_NARA },
    { name: "Ugyan Edu tech", logo: ASSETS.LOGOS.UGYAN },
    { name: "Code tree Solutions", logo: ASSETS.LOGOS.CODE_TREE },
    { name: "Flyhii private limited", logo: ASSETS.LOGOS.FLYHII }
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Tier */}
      <div className="relative py-48 bg-tech-dark text-center overflow-hidden">
        <div className="absolute inset-0 bg-animated-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-dark/50 to-tech-dark"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-8 py-3 rounded-full mb-10 backdrop-blur-md">
              <ShieldCheck size={18} className="text-innovation-orange" />
              <span className="text-white font-black tracking-[0.4em] uppercase text-[10px]">Institutional Track Record</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
              Verified <br/><span className="text-innovation-orange italic">Impact.</span>
            </h1>
            <p className="text-gray-400 text-2xl font-medium max-w-4xl mx-auto italic leading-relaxed">
              Standardizing technical excellence across India's premier educational landscape. 
              Over <span className="text-white"><Counter target="5,000+" /></span> Students Trained.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Numerical Impact Matrix */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Students Trained', value: '5,000+', icon: Users, desc: 'Verified technical skillsets deployed into the global workforce.' },
              { label: 'Institutional Partners', value: '25+', icon: Building2, desc: 'Schools and Colleges enabled with high-end technology labs.' },
              { label: 'NEP 2020 Aligned', value: '100%', icon: ShieldCheck, desc: 'All programs following the latest national education protocols.' }
            ].map((stat, i) => (
              <Reveal key={i} type="up" delay={`delay-${i * 100}`}>
                <div className="p-16 rounded-[3rem] bg-tech-light border-l-[10px] border-elite-blue hover:-translate-y-4 transition-all group h-full shadow-sm hover:shadow-2xl">
                   <div className="bg-elite-blue w-20 h-20 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-elite-blue/20">
                      <stat.icon size={24} className="text-white" />
                   </div>
                   <h4 className="text-6xl font-black mb-6 tracking-tighter text-tech-dark">
                     <Counter target={stat.value} />
                   </h4>
                   <p className="text-innovation-orange font-black uppercase text-xs tracking-widest mb-6">{stat.label}</p>
                   <p className="text-gray-500 font-medium leading-relaxed">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Parallel Marquees Section */}
      <section className="py-32 bg-tech-light border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <Reveal>
            <h2 className="text-xs font-black text-elite-blue uppercase tracking-[0.5em] mb-4">Elite Institutional Network</h2>
            <h3 className="text-4xl md:text-6xl font-black text-tech-dark tracking-tighter uppercase mb-4">Global Recognition.</h3>
          </Reveal>
        </div>

        {/* Row 1: Trusted By (Scrolling Left) */}
        <div className="relative marquee-mask overflow-hidden mb-12">
          <div className="flex items-center space-x-4 px-6 mb-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-elite-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Trusted By</span>
          </div>
          <div className="animate-marquee-l flex items-center gap-8 py-4 px-6 w-max">
            {[...trustedBy, ...trustedBy, ...trustedBy].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 w-[280px] h-40 shadow-sm flex flex-col items-center justify-center group hover:border-innovation-orange transition-all duration-500 flex-shrink-0">
                <img src={item.logo} alt={item.name} className="max-h-16 max-w-[200px] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 mb-4" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-elite-blue transition-colors text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Approved By (Scrolling Right) */}
        <div className="relative marquee-mask overflow-hidden">
          <div className="flex items-center space-x-4 px-6 mb-4 justify-end">
             <span className="text-[10px] font-black uppercase tracking-widest text-innovation-orange bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">Approved By</span>
          </div>
          <div className="animate-marquee-r flex items-center gap-8 py-4 px-6 w-max">
            {[...accreditations, ...accreditations, ...accreditations].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 w-[280px] h-40 shadow-sm flex flex-col items-center justify-center group hover:border-innovation-orange transition-all duration-500 flex-shrink-0">
                <img src={item.logo} alt={item.name} className="max-h-16 max-w-[200px] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 mb-4" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-elite-blue transition-colors text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Mission Section */}
      <section className="py-48 bg-tech-dark text-white text-center">
        <div className="container mx-auto px-6">
          <Reveal>
             <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-12">Social <span className="text-innovation-orange">Mission.</span></h2>
             <div className="max-w-3xl mx-auto bg-white/5 p-16 rounded-[4rem] border border-white/10 backdrop-blur-md">
                <p className="text-2xl font-medium leading-relaxed italic text-gray-300">
                  "We are dedicated to reducing the rural–urban digital divide and empowering government school students with the same tech stack used in top-tier institutions."
                </p>
             </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Impact;
