
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Quote, Globe, Target, Rocket, 
  ShieldCheck, Cpu, Users, Award, ExternalLink, ArrowRight 
} from 'lucide-react';
import { COMPANY_INFO } from '../constants.tsx';
import { ASSETS } from '../assets.ts';

const Reveal: React.FC<{ children: React.ReactNode; className?: string; type?: 'up' | 'left' | 'right'; delay?: string }> = ({ children, className = '', type = 'up', delay = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

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

const About: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Page Header */}
      <div className="bg-elite-blue py-48 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-animated-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-8 py-3 rounded-full mb-10">
              <Globe size={18} className="text-white" />
              <span className="text-white font-black tracking-[0.4em] uppercase text-[10px]">The Elite Narrative</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
              Who <br/><span className="text-innovation-orange italic">We Are.</span>
            </h1>
          </Reveal>
        </div>
      </div>

      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal type="up">
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-1.5 bg-innovation-orange rounded-full"></div>
                <h2 className="text-4xl font-black text-tech-dark tracking-tight uppercase">About Snapshot</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-600 leading-relaxed text-xl font-medium">
                <p>{COMPANY_INFO.aboutSnapshot}</p>
                <div className="bg-tech-light p-10 rounded-[2rem] border-l-[8px] border-innovation-orange">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-elite-blue mb-4">Core Vision</h4>
                   <p className="text-tech-dark font-black tracking-tight">{COMPANY_INFO.vision}</p>
                </div>
              </div>
            </Reveal>

            {/* Philosophy Section */}
            <Reveal type="up" className="mt-32">
               <h3 className="text-2xl font-black text-tech-dark mb-12 uppercase tracking-[0.4em] text-center">Our Philosophy</h3>
               <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                 {COMPANY_INFO.philosophy.map((p, i) => (
                   <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:border-innovation-orange transition-all shadow-sm">
                      <div className="w-10 h-10 bg-elite-blue/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-innovation-orange group-hover:text-white transition-all">
                        <CheckCircle2 size={20} className="text-elite-blue group-hover:text-white" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-tech-dark group-hover:text-innovation-orange">{p}</span>
                   </div>
                 ))}
               </div>
            </Reveal>

            {/* Founder's Message */}
            <Reveal type="up" className="mt-40">
              <div className="bg-tech-light rounded-[4rem] p-16 border border-gray-100 relative overflow-hidden">
                <Quote size={80} className="absolute -top-4 -left-4 text-elite-blue opacity-5" />
                <div className="relative z-10">
                   <h3 className="text-[10px] font-black text-elite-blue uppercase tracking-[0.4em] mb-8">Founder’s Message</h3>
                   <p className="text-3xl font-black text-tech-dark leading-tight mb-12 italic tracking-tighter">
                     "Technology is shaping the future faster than ever. At Keshava Elite Projects, our mission is to ensure every student — regardless of background — gets the opportunity to learn, build, and innovate with Robotics and AI."
                   </p>
                   <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-elite-blue rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-elite-blue/20">RV</div>
                      <div>
                        <p className="text-2xl font-black text-tech-dark tracking-tight">Rakesh Veerapaneni</p>
                        <p className="text-xs font-black text-innovation-orange uppercase tracking-[0.3em]">Founder, Keshava Elite Projects</p>
                      </div>
                   </div>
                </div>
              </div>
            </Reveal>

            {/* Mission Card */}
            <Reveal type="up" className="mt-32">
                <div className="bg-tech-dark p-20 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-innovation-orange/10 blur-[100px] rounded-full"></div>
                  <h3 className="text-[10px] font-black mb-10 uppercase tracking-[0.5em] text-gray-500">The Social Mission</h3>
                  <p className="text-3xl md:text-5xl font-black leading-none tracking-tighter mb-12">{COMPANY_INFO.mission}</p>
                  <Link to="/contact" className="inline-flex items-center space-x-4 bg-innovation-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-innovation-orange-hover transition-all">
                    <span>Collaborate Now</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
