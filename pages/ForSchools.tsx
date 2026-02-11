import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Rocket, ShieldCheck, Users, Zap, CheckCircle, Smartphone, Award, GraduationCap, Star, ExternalLink } from 'lucide-react';
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

const ForSchools: React.FC = () => {
  const schoolPartners = ASSETS.CLIENTS;

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-animated-grid overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="grid-line-h" style={{ animationDelay: '0s' }}></div>
          <div className="grid-line-h" style={{ animationDelay: '4s' }}></div>
          <div className="grid-line-v" style={{ animationDelay: '0s' }}></div>
          <div className="grid-line-v" style={{ animationDelay: '6s' }}></div>
        </div>

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
                We bring world-class STEM Robotics and AI labs directly to your school.
              </p>
              <Link to="/contact" className="bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all shadow-2xl flex items-center w-fit">
                Book a Lab Demo <ArrowRight className="ml-3" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Institutional Network */}
      <section className="py-40 bg-white overflow-hidden text-center">
        <div className="container mx-auto px-6 mb-24">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter">Trusted by Leading <br/><span className="text-blue-700">Educational Institutions.</span></h2>
          </Reveal>
        </div>
        <div className="relative marquee-mask overflow-hidden">
          <div className="animate-marquee-l flex items-center gap-12 py-12 px-6 w-max">
            {[...schoolPartners, ...schoolPartners, ...schoolPartners].map((client, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[4rem] p-14 w-[450px] h-72 shadow-sm flex items-center justify-center group flex-shrink-0">
                 <img src={client.logo} alt={client.name} className="max-h-36 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Cards */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Cpu />, title: "In-Campus Robotics Lab", desc: "Turnkey lab setup with state-of-the-art processors and kits." },
              { icon: <Users />, title: "Teacher Training Program", desc: "Empowering existing staff with skills to lead innovation." },
              { icon: <Rocket />, title: "Olympiad Prep Center", desc: "Dedicated mentoring for World Robotics Olympiad." }
            ].map((f, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 hover:shadow-2xl transition-all h-full">
                  <div className="bg-blue-50 text-blue-700 w-16 h-16 flex items-center justify-center rounded-2xl mb-8">{f.icon}</div>
                  <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{f.title}</h4>
                  <p className="text-gray-500 text-lg font-medium">{f.desc}</p>
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