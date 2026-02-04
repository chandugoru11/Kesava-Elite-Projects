
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cpu, GraduationCap, Users, ShieldCheck, Zap, Play, Layout, Building2 } from 'lucide-react';
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

const StatItem: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = Math.ceil(end / (duration / 16));
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-black text-blue-700 mb-1">{count.toLocaleString()}{suffix}</p>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const clients = [
    { name: "IDPS Narsaraopet", logo: "https://idpsnarasaraopet.com/wp-content/uploads/2021/04/cropped-IDPS-Logo-1.png" },
    { name: "Ugyan Edu Tech", logo: "https://www.ugyan.in/assets/img/logo.png" },
    { name: "Code Tree Solutions", logo: "https://codetree.in/assets/img/logo.png" },
    { name: "Flyhii Private Limited", logo: "https://flyhii.in/assets/img/logo.png" },
    { name: "MAM Group of Colleges", logo: "https://mamgroup.edu.in/images/logo.png" }
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section - Shifted to Blue/White Interface */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-100/50 blur-[150px] rounded-full"></div>
          {/* Professional STEM Background Image */}
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
                  {/* High Quality Student Image */}
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

      {/* Feature Section - Clean White Interface */}
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

          <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal type="right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] -rotate-3 group-hover:rotate-0 transition-all duration-500"></div>
                {/* Specific Lab Interaction Image */}
                <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1000" alt="Robotics Training" className="relative rounded-[3.5rem] shadow-2xl transition-all duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-blue-700/50">
                  <Play fill="white" size={32} />
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal type="left">
                <h2 className="text-5xl md:text-7xl font-black mb-10 text-gray-900 leading-[0.95] tracking-tight">
                  Driving Elite <br/><span className="text-blue-700 underline decoration-blue-700/20 underline-offset-8 italic">Progress.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
                  Keshava Elite Projects stands at the intersection of industry and education, providing the infrastructure for a smarter tomorrow.
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: <ShieldCheck size={24} />, text: "Quality Benchmarked to Global Standards" },
                    { icon: <Users size={24} />, text: "Mentorship by Industrial Experts" },
                    { icon: <Box size={24} />, text: "Scalable Lab Architectures" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-600/20 transition-all">
                      <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">{item.icon}</div>
                      <span className="font-black text-gray-800 text-lg">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link to="/impact" className="inline-flex items-center text-blue-700 font-black mt-16 group text-2xl hover:translate-x-2 transition-transform">
                  Explore Elite Impact <ArrowRight size={28} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* LMS Teaser Section - Maintain Premium Blue Dark Background */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-blue-950 rounded-[5rem] p-16 md:p-32 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
              <div>
                <Reveal type="right">
                  <div className="inline-flex items-center space-x-3 bg-blue-600/20 px-5 py-2 rounded-full mb-8">
                    <Layout size={16} className="text-blue-400" />
                    <span className="text-blue-400 font-black tracking-widest uppercase text-[10px]">Student Performance Portal</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
                    Elite Learning <br/><span className="text-blue-500 italic">Ecosystem.</span>
                  </h2>
                  <p className="text-gray-400 text-xl mb-12 leading-relaxed font-medium">
                    A digital-first environment ensuring seamless knowledge transfer from lab to career.
                  </p>
                  <ul className="space-y-6 mb-12">
                    {[
                      { icon: <Play size={20} className="text-blue-500" />, text: "HD Workshop Archives" },
                      { icon: <Layout size={20} className="text-blue-500" />, text: "Skill Progress Mapping" },
                      { icon: <Box size={20} className="text-blue-500" />, text: "Collaborative Project Space" }
                    ].map((li, i) => (
                      <li key={i} className="flex items-center space-x-4 text-white text-lg font-bold">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-500 border border-white/5">{li.icon}</div>
                        <span>{li.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/lms" className="bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-xl inline-flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 group">
                    Enter Portal <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Reveal>
              </div>

              <Reveal type="left">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="bg-black/60 border border-white/10 rounded-[3rem] p-6 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                    </div>
                    {/* LMS Interface Placeholder */}
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" 
                      alt="LMS Interface" 
                      className="rounded-2xl w-full h-auto border border-white/5 opacity-80"
                    />
                    <div className="absolute bottom-12 right-12 bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm animate-pulse flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3 animate-ping"></span>
                      ELITE LIVE
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Blue Accents */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem value={5000} label="Elite Graduates" suffix="+" />
            <StatItem value={25} label="Partner Institutions" suffix="+" />
            <StatItem value={150} label="Live Lab Projects" suffix="+" />
            <StatItem value={12} label="Region Reach" suffix="" />
          </div>
        </div>
      </section>

      {/* Trusted Clients Marquee Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-5 py-2 rounded-full mb-8">
                <Building2 size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Our Elite Network</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-none tracking-tight">Choice of the Elite.</h2>
              <div className="w-32 h-2 bg-blue-700 rounded-full mb-10"></div>
              <p className="text-gray-500 text-xl max-w-3xl leading-relaxed font-medium">
                We partner with institutions that value premium quality and future-proof technical standards.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex relative">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="animate-marquee flex items-center gap-12 py-12 px-6">
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="group relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[3rem] p-10 min-w-[320px] h-56 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-600/30 transition-all duration-500 cursor-default overflow-hidden">
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-[130px] object-contain transition-all duration-700 transform group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=eff6ff&color=1d4ed8&bold=true&length=4`;
                    }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em]">{client.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Blue/White Gradient */}
      <section className="py-32 bg-white pt-0">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="bg-blue-700 rounded-[5rem] p-20 md:p-32 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(29,78,216,0.3)]">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
              <h2 className="text-5xl md:text-8xl font-black mb-12 relative z-10 leading-none tracking-tighter">Empower the Future.</h2>
              <p className="text-2xl text-blue-50 mb-16 max-w-3xl mx-auto opacity-90 relative z-10 font-medium">
                Collaborate with Keshava Elite Projects and lead the next wave of technical education.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-10 relative z-10">
                <Link to="/contact" className="bg-white text-blue-700 px-16 py-8 rounded-3xl font-black text-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl">
                  Connect Today
                </Link>
                <Link to="/careers" className="text-white font-black text-xl underline decoration-white/30 underline-offset-[16px] hover:decoration-white transition-all">
                  Elite Careers
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
