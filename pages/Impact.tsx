
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
              Over <span className="text-white"><Counter target="5,000+" /></span> Students Trained.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Dual Parallel Marquees Section */}
      <section className="py-32 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <Reveal>
            <h2 className="text-xs font-black text-blue-700 uppercase tracking-[0.5em] mb-4">Elite Institutional Network</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-4">Global Recognition.</h3>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto mb-12">Collaborating with world-class partners and authorized by national governing bodies.</p>
          </Reveal>
        </div>

        {/* Row 1: Trusted By (Moving Left) */}
        <div className="relative marquee-mask overflow-hidden mb-8">
          <div className="flex items-center space-x-8 px-6 mb-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1 rounded-full">Trusted By</span>
          </div>
          <div className="animate-marquee-l flex items-center gap-8 py-4 px-6 w-max">
            {[...trustedBy, ...trustedBy, ...trustedBy].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 w-[280px] h-40 shadow-sm flex flex-col items-center justify-center group hover:border-blue-700 hover:bg-white transition-all duration-500 flex-shrink-0">
                <img src={item.logo} alt={item.name} className="max-h-16 max-w-[200px] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 mb-4" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-700 transition-colors text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Approved By (Moving Right) */}
        <div className="relative marquee-mask overflow-hidden">
          <div className="flex items-center space-x-8 px-6 mb-4 justify-end">
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1 rounded-full">Approved By</span>
          </div>
          <div className="animate-marquee-r flex items-center gap-8 py-4 px-6 w-max">
            {[...accreditations, ...accreditations, ...accreditations].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 w-[280px] h-40 shadow-sm flex flex-col items-center justify-center group hover:border-blue-700 hover:bg-white transition-all duration-500 flex-shrink-0">
                <img src={item.logo} alt={item.name} className="max-h-16 max-w-[200px] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 mb-4" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-700 transition-colors text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-xs font-black text-blue-700 uppercase tracking-[0.5em] mb-4">Elite Training Ecosystem</h2>
            <div className="w-16 h-1.5 bg-blue-700 mx-auto rounded-full mb-12"></div>
            <div className="flex flex-wrap justify-center gap-10">
              {COMPANY_INFO.trainingFeatures.map((f, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                   <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                     <CheckCircle2 size={16} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-700">{f}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Mission Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-6">Our Social <span className="text-blue-700">Mission</span></h2>
             <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">Transforming communities by democratizing access to high-tier technology education.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Globe />, title: "Bridging Divide", desc: "Reducing Rural–Urban Digital Divide through targeted lab deployments." },
              { icon: <Heart />, title: "Empowering Rural", desc: "Dedicated programs for empowering Government School students." },
              { icon: <Zap />, title: "Early Innovation", desc: "Building Innovation Culture early in the K12 lifecycle." },
              { icon: <Flag />, title: "Digital India", desc: "Directly supporting and accelerating Digital India Initiatives." }
            ].map((m, i) => (
              <Reveal key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{m.icon}</div>
                <h4 className="text-xl font-black mb-4 tracking-tight">{m.title}</h4>
                <p className="text-sm text-gray-500 font-medium">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numerical Impact Matrix */}
      <section className="py-48 bg-gray-950 text-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { label: 'Students Trained', value: '5,000+', icon: Users, desc: 'Verified technical skillsets deployed into the global workforce.' },
              { label: 'Institutional Partners', value: '25+', icon: Building2, desc: 'Schools and Colleges enabled with high-end technology labs.' },
              { label: 'Industrial Projects', value: '200+', icon: Zap, desc: 'Advanced technical solutions deployed for industrial partners.' }
            ].map((stat, i) => (
              <Reveal key={i} type="up" delay={`delay-${i * 100}`}>
                <div className="p-16 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-blue-700 hover:-translate-y-4 transition-all group h-full">
                   <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-white/20 transition-colors">
                      <stat.icon size={24} className="text-blue-500 group-hover:text-white" />
                   </div>
                   <h4 className="text-7xl font-black mb-6 tracking-tighter">
                     <Counter target={stat.value} />
                   </h4>
                   <p className="text-blue-500 font-black uppercase text-xs tracking-widest mb-6 group-hover:text-blue-200">{stat.label}</p>
                   <p className="text-gray-400 font-medium group-hover:text-white/90 leading-relaxed">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Standard Banner */}
      <section className="py-48 bg-white">
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
                  Our curriculum is aligned with NEP 2020 standards and recognized by major technical governing bodies across India.
                </p>
                <div className="flex flex-wrap justify-center gap-12">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-300" />
                    <span className="font-black uppercase tracking-widest text-sm">Industrial Grade</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-300" />
                    <span className="font-black uppercase tracking-widest text-sm">NEP 2020 Aligned</span>
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
