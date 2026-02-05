
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cpu, GraduationCap, Users, ShieldCheck, Zap, Play, Layout, Building2, Globe, Star } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

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

const Home: React.FC = () => {
  const clients = [
    { name: "APSSDC Skill AP", logo: "https://i.postimg.cc/vm0w2Ps7/APSSDC.jpg" },
    { name: "NSDC India", logo: "https://i.postimg.cc/sxqn0NwF/NSDC.jpg" },
    { name: "MSME India", logo: "https://i.postimg.cc/4y6KrKQP/Micro_Small_and_Medium.jpg" },
    { name: "Startup India", logo: "https://i.postimg.cc/Hxtz9KDZ/DPIIT.jpg" },
    { name: "ISO 9001 Certified", logo: "https://i.postimg.cc/VNkjnFWC/ISO_9001.jpg" },
    { name: "Great Learning", logo: "https://i.postimg.cc/QdL7VbvJ/Great_Learning.jpg" },
    { name: "IIT Madras", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" },
    { name: "Infosys", logo: "https://i.postimg.cc/HWVBfT5T/Infosys-Springboard.jpg" },
    { name: "Cisco Networking", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" },
    { name: "MAM Colleges", logo: "https://i.postimg.cc/gkyR77Mc/MAM-Colleges.jpg" },
    { name: "IDPS Narsaraopet", logo: "https://i.postimg.cc/zB3FZkLG/International-Delhi-Public-School.jpg" },
    { name: "Ugyan Edutech", logo: "https://www.ugyan.in/assets/img/logo.png" },
    { name: "Code Tree", logo: "https://i.postimg.cc/mgXG8XRD/Code-Tree.jpg" },
    { name: "Flyhii", logo: "https://i.postimg.cc/vHCrfMxW/Flhi.jpg" }
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-100/50 blur-[150px] rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-[0.03] grayscale" 
            alt="Robotics Engineering" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Reveal type="right">
                <div className="inline-flex items-center space-x-3 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  <span className="text-blue-700 font-black tracking-[0.2em] uppercase text-[10px]">India's Elite STEM Innovator</span>
                </div>
              </Reveal>
              
              <Reveal type="right" delay="delay-100">
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-gray-900 mb-8 leading-[0.85] tracking-tighter">
                  Architecting <br/>
                  <span className="shimmer-text">Elite</span> <br/>
                  Innovation.
                </h1>
              </Reveal>

              <Reveal type="right" delay="delay-200">
                <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-medium">
                  Designing the blueprint for tomorrow's technology. Premium STEM labs and industrial robotics ecosystems for elite institutions.
                </p>
              </Reveal>

              <Reveal type="right" delay="delay-300">
                <div className="flex flex-wrap gap-6">
                  <Link to="/courses" className="bg-blue-700 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-800 transition-all flex items-center shadow-2xl shadow-blue-700/20 hover:-translate-y-1">
                    Start Learning <ArrowRight size={24} className="ml-3" />
                  </Link>
                  <Link to="/contact" className="bg-white border-2 border-blue-700 text-blue-700 px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-50 transition-all">
                    Partner Program
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="hidden lg:block relative">
              <Reveal type="left" delay="delay-400">
                <div className="relative z-10 animate-float-y">
                  <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                    alt="Elite Innovation Lab" 
                    className="relative z-10 rounded-[5rem] border border-blue-50 shadow-2xl shadow-blue-900/10"
                  />
                  <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[3rem] shadow-2xl border border-blue-50 flex items-center space-x-6 animate-float-x">
                    <div className="bg-blue-700 p-5 rounded-2xl text-white shadow-xl shadow-blue-700/30">
                      <Cpu size={32} />
                    </div>
                    <div>
                      <p className="text-gray-900 font-black text-xl">Elite Labs</p>
                      <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Ind. 4.0 Standard</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Box className="text-blue-700" size={32} />, title: 'STEM Labs', desc: 'Transforming institutional spaces into vibrant innovation hubs.' },
              { icon: <Cpu className="text-blue-700" size={32} />, title: 'CoE Programs', desc: 'Industrial Centers of Excellence for research and deep-tech.' },
              { icon: <Zap className="text-blue-700" size={32} />, title: 'AI Robotics', desc: 'Advanced AI and Robotics curriculum from K1 to K12.' },
              { icon: <GraduationCap className="text-blue-700" size={32} />, title: 'Certifications', desc: 'Industry-recognized credentials for the tech workforce.' }
            ].map((feature, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="group bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 hover:border-blue-600/30 hover:bg-white hover:shadow-2xl transition-all h-full">
                  <div className="bg-white w-20 h-20 flex items-center justify-center rounded-3xl mb-8 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-all group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-base">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'INSTITUTIONS TRANSFORMED', value: '150+', icon: <Building2 className="text-blue-600" /> },
              { label: 'STUDENTS CERTIFIED', value: '25,000+', icon: <Users className="text-blue-600" /> },
              { label: 'GLOBAL ACCREDITATIONS', value: '12+', icon: <Star className="text-blue-600" /> }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-[3rem] shadow-sm border border-blue-100/50">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">{stat.icon}</div>
                <h4 className="text-5xl font-black text-gray-900 mb-2">{stat.value}</h4>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Clients Marquee Section - REFINED BOTTOM LOGO SCROLL */}
      <section className="py-40 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 mb-24 relative z-10">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-6 py-2.5 rounded-full mb-8 border border-blue-100">
                <Globe size={18} className="animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Strategic Ecosystem</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-gray-900 mb-10 leading-none tracking-tighter">Powered by the <span className="text-blue-700">Best.</span></h2>
              <div className="w-40 h-2 bg-blue-700 rounded-full mb-12 shadow-xl shadow-blue-700/20"></div>
              <p className="text-gray-500 text-xl md:text-2xl max-w-4xl leading-relaxed font-medium">
                We are integrated with the world's leading technology and educational entities to deliver industrial-grade excellence.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The Marquee Wrapper with Masking */}
        <div className="relative flex marquee-mask overflow-hidden group">
          {/* Edge Fading Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          
          <div className="animate-marquee flex items-center gap-12 md:gap-20 py-16 px-6 group-hover:[animation-play-state:paused] transition-all duration-1000">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div 
                key={i} 
                className="group/card relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[3.5rem] p-12 min-w-[320px] md:min-w-[400px] h-64 shadow-sm hover:shadow-2xl hover:shadow-blue-600/15 hover:border-blue-600/40 transition-all duration-700 cursor-pointer overflow-hidden transform hover:-translate-y-4"
              >
                {/* Background Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-[140px] object-contain transition-all duration-1000 transform group-hover/card:scale-110 filter grayscale group-hover/card:grayscale-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=eff6ff&color=1d4ed8&bold=true&length=4&size=256`;
                    }}
                  />
                </div>
                
                {/* Identity Overlay */}
                <div className="absolute inset-x-0 bottom-8 text-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.5em] bg-blue-50 px-5 py-2 rounded-full border border-blue-100">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Anchor */}
        <div className="container mx-auto px-6 mt-32 text-center">
            <Reveal type="up">
                <Link to="/impact" className="inline-flex items-center space-x-3 text-blue-700 font-black text-xs uppercase tracking-[0.4em] hover:opacity-70 transition-all group">
                    <span>Explore Our Impact Roadmap</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
