
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, Globe, Rocket, ShieldCheck, Users, Zap, CheckCircle, Smartphone, Award, Lightbulb, Play, Box, Layers, Monitor, Building2, ExternalLink, GraduationCap, Star } from 'lucide-react';
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

const ForSchools: React.FC = () => {
  const schoolPartners = ASSETS.CLIENTS;

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] hero-glow opacity-30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-5xl">
            <Reveal type="right">
              <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-6 py-2.5 rounded-full mb-8">
                <Star size={14} className="text-blue-500 fill-current animate-pulse" />
                <span className="text-blue-500 font-black tracking-widest uppercase text-xs">Premium Innovation Partner</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.02] tracking-tight">
                Empower <span className="shimmer-text italic">Young Minds</span> <br/> To Build The Future.
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl font-medium">
                We bring world-class STEM Robotics and AI labs directly to your school, turning learners into tomorrow's engineers.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/contact" className="bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all shadow-2xl shadow-blue-700/30 flex items-center group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Book a Lab Demo <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
                <a href="#network" className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all flex items-center">
                   Explore Network
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REFINED SCHOOL PARTNERS SECTION */}
      <section id="network" className="py-40 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10 text-center mb-24">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-full mb-8 border border-blue-100">
               <GraduationCap size={20} className="animate-bounce" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Integrated Network</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter">Trusted by Leading <br/><span className="text-blue-700">Educational Institutions.</span></h2>
            <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              Join the elite ecosystem of schools and edutech partners delivering Industry 4.0 technical skills.
            </p>
          </Reveal>
        </div>

        {/* LOGO GRID WITH DIRECT URL LINKS */}
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {schoolPartners.map((client, i) => (
                <Reveal key={i} delay={`delay-${i * 100}`}>
                  <a 
                    href={client.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[3rem] p-10 h-64 shadow-sm hover:shadow-2xl hover:border-blue-700/30 transition-all duration-500 overflow-hidden"
                  >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Logo Image */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center mb-4">
                       <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-w-full max-h-[110px] object-contain transition-all duration-700 transform group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          const initials = client.name.split(' ').map(n => n[0]).join('').slice(0, 3);
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=eff6ff&color=1d4ed8&bold=true&length=4&size=256`;
                        }}
                      />
                    </div>
                    
                    {/* Label Overlay */}
                    <div className="absolute inset-x-0 bottom-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                       <span className="inline-flex items-center text-[9px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                          {client.name} <ExternalLink size={10} className="ml-2" />
                       </span>
                    </div>
                  </a>
                </Reveal>
              ))}
           </div>
        </div>

        {/* Floating Marquee for Motion - Keeps the visual energy high */}
        <div className="mt-32 opacity-20 pointer-events-none">
           <div className="animate-marquee flex items-center gap-24 py-10">
             {[...schoolPartners, ...schoolPartners].map((client, i) => (
                <span key={i} className="text-6xl md:text-8xl font-black text-gray-200 uppercase tracking-tighter whitespace-nowrap">
                   {client.name} •
                </span>
             ))}
           </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <Reveal>
              <span className="text-blue-700 font-black tracking-[0.4em] uppercase text-xs mb-4 block">Our Full-Stack Ecosystem</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">Everything Your School Needs</h2>
              <div className="w-24 h-2 bg-blue-700 rounded-full mx-auto shadow-lg shadow-blue-700/20"></div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Cpu className="w-10 h-10" />, title: "In-Campus Robotics Lab", desc: "Turnkey lab setup with state-of-the-art processors, robotic kits, and 3D printers." },
              { icon: <Users className="w-10 h-10" />, title: "Teacher Training Program", desc: "We empower your existing staff with the skills to lead high-tech innovation classes." },
              { icon: <Rocket className="w-10 h-10" />, title: "Olympiad Prep Center", desc: "Dedicated mentoring for World Robotics Olympiad and regional tech competitions." },
              { icon: <Award className="w-10 h-10" />, title: "Industry Accredited Certs", desc: "Certification recognized by global universities and top tech employers." },
              { icon: <ShieldCheck className="w-10 h-10" />, title: "NEP 2020 Integration", desc: "Curriculum designed to align perfectly with the latest national education standards." },
              { icon: <Smartphone className="w-10 h-10" />, title: "Integrated LMS Dashboard", desc: "Students can access recordings and resources via our dedicated learning portal." }
            ].map((feature, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="group bg-white p-12 rounded-[3.5rem] border border-gray-100 h-full relative overflow-hidden flex flex-col hover:border-blue-700/20 hover:shadow-2xl transition-all duration-500">
                  <div className="bg-blue-50 text-blue-700 w-20 h-20 flex items-center justify-center rounded-[2rem] mb-8 group-hover:bg-blue-700 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{feature.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-lg flex-grow">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal type="right">
                <span className="text-blue-500 font-black tracking-widest uppercase text-xs mb-6 block">Future-Ready Curriculum</span>
                <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tight">Structured <span className="text-blue-700">Progression</span></h2>
                <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-lg font-medium">
                  We take students from logic-based gaming blocks to designing autonomous drone and industrial systems.
                </p>

                <div className="space-y-6">
                  {[
                    { grade: "Grades 1-5", title: "Discovery", features: ["Block Coding", "Basic Electronics", "LEGO Robotics"] },
                    { grade: "Grades 6-8", title: "Explorer", features: ["Python Basics", "Arduino Automation", "3D Modeling"] },
                    { grade: "Grades 9-12", title: "Innovator", features: ["Machine Learning", "IoT Ecosystems", "PCB Design"] }
                  ].map((level, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em]">{level.grade}</span>
                        <Zap size={20} className="text-blue-500 group-hover:rotate-12 transition-transform" />
                      </div>
                      <h4 className="text-3xl font-black mb-6">{level.title}</h4>
                      <div className="flex flex-wrap gap-3">
                        {level.features.map((f, idx) => (
                          <span key={idx} className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 border border-white/5">{f}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <Reveal type="left">
                <div className="relative z-10">
                  <div className="absolute -inset-10 bg-blue-600/10 blur-[150px] rounded-full"></div>
                  <img 
                    src="https://picsum.photos/id/102/1000/1200" 
                    className="rounded-[4rem] border border-white/5 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    alt="Innovation in Action" 
                  />
                  
                  <div className="absolute -bottom-12 -left-12 bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100">
                    <div className="flex items-center space-x-6">
                      <div className="bg-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-700/30"><Lightbulb size={40} /></div>
                      <div>
                        <p className="text-gray-950 font-black text-6xl leading-none">100%</p>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Hands-on Lab Practice</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="bg-blue-700 rounded-[5rem] p-20 md:p-32 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(29,78,216,0.4)]">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
              
              <h2 className="text-5xl md:text-8xl font-black mb-10 relative z-10 leading-tight tracking-tighter">Become a <br/> Pioneer School.</h2>
              <p className="text-xl md:text-2xl text-blue-50 mb-16 max-w-2xl mx-auto opacity-90 relative z-10 font-medium">
                Make your institution a benchmark of technical excellence. Let's start building your STEM lab today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-10 relative z-10">
                <Link to="/contact" className="bg-white text-blue-700 px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
                  Book Free Assessment
                </Link>
                <div className="flex flex-col items-center sm:items-start">
                   <p className="text-sm font-black uppercase tracking-widest opacity-60 mb-2">Speak to our Lead Consultant</p>
                   <a href="tel:+917659867411" className="text-white font-black text-3xl hover:underline underline-offset-8">
                    +91 76598 67411
                   </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ForSchools;
