
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Rocket, ShieldCheck, Users, Zap, CheckCircle, Smartphone, Award, GraduationCap, Star, ExternalLink } from 'lucide-react';
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

const ForSchools: React.FC = () => {
  const schoolPartners = ASSETS.CLIENTS;

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. HERO SECTION WITH MOVING LINES */}
      <section className="relative min-h-screen flex items-center bg-animated-grid overflow-hidden">
        {/* Animated Grid Lines */}
        <div className="grid-line-h" style={{ top: '20%' }}></div>
        <div className="grid-line-h" style={{ top: '60%', animationDelay: '-4s' }}></div>
        <div className="grid-line-v" style={{ left: '30%' }}></div>
        <div className="grid-line-v" style={{ left: '80%', animationDelay: '-6s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-5xl">
            <Reveal type="right">
              <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-6 py-2.5 rounded-full mb-8">
                <Star size={14} className="text-blue-500 fill-current" />
                <span className="text-blue-500 font-black tracking-widest uppercase text-xs">Premium Innovation Partner</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-[1.02] tracking-tight">
                Empower <span className="shimmer-text italic">Young Minds</span> <br/> To Build The Future.
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl font-medium">
                We bring world-class STEM Robotics and AI labs directly to your school, turning learners into tomorrow's engineers.
              </p>
              <Link to="/contact" className="bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all shadow-2xl flex items-center w-fit">
                Book a Lab Demo <ArrowRight className="ml-3" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. BI-DIRECTIONAL CLIENT MARQUEE */}
      <section id="network" className="py-40 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10 text-center mb-24">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-full mb-8 border border-blue-100">
               <GraduationCap size={20} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Institutional Network</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                Trusted by Leading <br/><span className="text-blue-700">Educational Institutions.</span>
            </h2>
          </Reveal>
        </div>

        <div className="marquee-container space-y-12">
          {/* Row 1: Left */}
          <div className="flex relative marquee-mask overflow-hidden">
            <div className="animate-marquee-l flex items-center gap-12 py-12 px-6">
              {[...schoolPartners, ...schoolPartners].map((client, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[3.5rem] p-12 min-w-[400px] h-64 shadow-sm flex items-center justify-center group">
                   <img src={client.logo} alt={client.name} className="max-h-32 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=eff6ff&color=1d4ed8&bold=true&length=4&size=256`; }}
                   />
                </div>
              ))}
            </div>
          </div>
          {/* Row 2: Right */}
          <div className="flex relative marquee-mask overflow-hidden">
            <div className="animate-marquee-r flex items-center gap-12 py-12 px-6">
              {[...schoolPartners, ...schoolPartners].reverse().map((client, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[3.5rem] p-12 min-w-[400px] h-64 shadow-sm flex items-center justify-center group">
                   <img src={client.logo} alt={client.name} className="max-h-32 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=eff6ff&color=1d4ed8&bold=true&length=4&size=256`; }}
                   />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ECOSYSTEM GRID */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Cpu />, title: "In-Campus Robotics Lab", desc: "Turnkey lab setup with state-of-the-art processors, kits, and 3D printers." },
              { icon: <Users />, title: "Teacher Training Program", desc: "Empowering existing staff with the skills to lead innovation classes." },
              { icon: <Rocket />, title: "Olympiad Prep Center", desc: "Dedicated mentoring for World Robotics Olympiad and regional events." }
            ].map((feature, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 hover:border-blue-700/20 hover:shadow-2xl transition-all h-full">
                  <div className="bg-blue-50 text-blue-700 w-20 h-20 flex items-center justify-center rounded-[2rem] mb-8">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{feature.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForSchools;
