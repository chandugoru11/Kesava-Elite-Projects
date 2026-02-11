
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Quote, Globe, Target, Rocket, 
  ShieldCheck, Cpu, Users, Award, ExternalLink 
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
      <div className="bg-blue-950 py-48 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
              <Globe size={18} className="text-blue-400" />
              <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">The Elite Narrative</span>
            </div>
            <h1 className="text-7xl md:text-[9rem] font-black text-white mb-10 leading-[0.85] tracking-tighter">
              Legacy of <br/><span className="shimmer-text">Innovation.</span>
            </h1>
          </Reveal>
        </div>
      </div>

      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal type="up">
              <div className="flex items-center space-x-6 mb-12">
                <div className="w-16 h-1 px-0 bg-blue-700 rounded-full"></div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Who We Are</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-600 leading-relaxed text-xl font-medium">
                <p>Keshava Elite Projects is an educational technology and innovation organization specializing in STEM Robotics Labs for Schools and Center of Excellence (CoE) Programs for Colleges. We design future-ready learning ecosystems where students gain hands-on experience in Robotics, Artificial Intelligence, IoT, and Emerging Technologies — bridging the gap between classroom education and industry expectations.</p>
                <p>Started by young innovators from Andhra Pradesh, our team consists of engineers, researchers, and educators passionate about transforming education through experiential and project-based learning. We believe talent exists everywhere — opportunity should too.</p>
              </div>
            </Reveal>

            {/* Philosophy Section */}
            <Reveal type="up" className="mt-32">
               <h3 className="text-2xl font-black text-gray-900 mb-12 uppercase tracking-widest text-center">Our Philosophy</h3>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                 {COMPANY_INFO.philosophy.map((p, i) => (
                   <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-blue-700 transition-all">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={20} className="text-blue-700" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-white">{p}</span>
                   </div>
                 ))}
               </div>
            </Reveal>

            {/* Founder's Message */}
            <Reveal type="up" className="mt-40">
              <div className="bg-gray-50 rounded-[4rem] p-16 border border-gray-100 relative overflow-hidden">
                <Quote size={80} className="absolute -top-4 -left-4 text-blue-100 opacity-50" />
                <div className="relative z-10">
                   <h3 className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em] mb-8">Founder’s Message</h3>
                   <p className="text-3xl font-black text-gray-900 leading-tight mb-12 italic tracking-tighter">
                     "Technology is shaping the future faster than ever. At Keshava Elite Projects, our mission is to ensure every student — regardless of background — gets the opportunity to learn, build, and innovate with Robotics and AI."
                   </p>
                   <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-xl">RV</div>
                      <div>
                        <p className="text-xl font-black text-gray-900 tracking-tight">Rakesh Veerapaneni</p>
                        <p className="text-xs font-black text-blue-700 uppercase tracking-widest">Founder, Keshava Elite Projects</p>
                      </div>
                   </div>
                </div>
              </div>
            </Reveal>

            {/* Vision/Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-32">
              <Reveal type="right" delay="delay-100">
                <div className="bg-blue-700 p-16 rounded-[4rem] text-white shadow-2xl shadow-blue-700/20 relative overflow-hidden group h-full">
                  <h3 className="text-xs font-black mb-10 uppercase tracking-[0.5em] text-blue-200">The Vision</h3>
                  <p className="text-2xl font-black leading-tight tracking-tighter">{COMPANY_INFO.vision}</p>
                </div>
              </Reveal>
              <Reveal type="left" delay="delay-200">
                <div className="bg-gray-950 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group h-full">
                  <h3 className="text-xs font-black mb-10 uppercase tracking-[0.5em] text-gray-500">The Mission</h3>
                  <p className="text-2xl font-black leading-tight tracking-tighter">{COMPANY_INFO.mission}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
           <Reveal>
              <div className="bg-blue-700 rounded-[5rem] p-24 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(29,78,216,0.3)]">
                 <div className="absolute inset-0 bg-grid opacity-10"></div>
                 <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">Standardizing <span className="italic">Excellence.</span></h2>
                    <p className="text-2xl text-blue-50 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">Join the elite network of institutions redefining technical education.</p>
                    <Link to="/impact" className="bg-white text-blue-700 px-16 py-7 rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl inline-block">
                       Explore Impact
                    </Link>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
