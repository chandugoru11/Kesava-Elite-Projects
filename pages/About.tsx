
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Quote, Globe, Target, Rocket, 
  ShieldCheck, Cpu, Users, Award, ExternalLink 
} from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { ASSETS } from '../assets';

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
  const philosophies = [
    { title: "Learning by Building", icon: <Cpu size={20} /> },
    { title: "Innovation over Memorization", icon: <Rocket size={20} /> },
    { title: "Project-First Pedagogy", icon: <Target size={20} /> },
    { title: "Industrial Standard Access", icon: <ShieldCheck size={20} /> },
    { title: "Scale with Quality", icon: <Award size={20} /> }
  ];

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
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Our Genesis</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-600 leading-relaxed text-xl font-medium">
                <p>Keshava Elite Projects was founded to democratize world-class robotics and AI education. We bridge the gap between academic theory and the practical requirements of the modern industry.</p>
                <p>Our foundation is built on the expertise of researchers and engineers who believe true mastery comes from building.</p>
              </div>
            </Reveal>

            {/* Vision/Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-32">
              <Reveal type="right" delay="delay-100">
                <div className="bg-blue-700 p-16 rounded-[4rem] text-white shadow-2xl shadow-blue-700/20 relative overflow-hidden group h-full">
                  <h3 className="text-xs font-black mb-10 uppercase tracking-[0.5em] text-blue-200">The Vision</h3>
                  <p className="text-3xl font-black leading-tight tracking-tighter">To empower every student to become a creator of technology.</p>
                </div>
              </Reveal>
              <Reveal type="left" delay="delay-200">
                <div className="bg-gray-950 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group h-full">
                  <h3 className="text-xs font-black mb-10 uppercase tracking-[0.5em] text-gray-500">The Mission</h3>
                  <p className="text-3xl font-black leading-tight tracking-tighter">Delivering industry-led technical education through elite labs and expert mentorship.</p>
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
