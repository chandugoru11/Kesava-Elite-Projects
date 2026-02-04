
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, Globe, Rocket, ShieldCheck, Users, Zap, CheckCircle, Smartphone, Award, Lightbulb, Play, Box, Layers, Monitor, Building2 } from 'lucide-react';

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
  const clients = [
    { name: "IDPS Narsaraopet", logo: "https://idpsnarasaraopet.com/wp-content/uploads/2021/04/cropped-IDPS-Logo-1.png" },
    { name: "MAM Group", logo: "https://mamgroup.edu.in/images/logo.png" },
    { name: "Ugyan Edu", logo: "https://www.ugyan.in/assets/img/logo.png" },
    { name: "IDPS", logo: "https://idpsnarasaraopet.com/wp-content/uploads/2021/04/cropped-IDPS-Logo-1.png" },
    { name: "MAM", logo: "https://mamgroup.edu.in/images/logo.png" }
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. HERO SECTION WITH FLOATING ICONS */}
      <section className="relative min-h-screen flex items-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          {/* Drifting Background Elements */}
          <div className="absolute top-[15%] right-[10%] animate-float-y opacity-10">
            <Cpu size={240} className="text-red-600" />
          </div>
          <div className="absolute bottom-[10%] left-[5%] animate-float-x opacity-10">
            <Rocket size={180} className="text-red-600" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] hero-glow"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-5xl">
            <Reveal type="right">
              <div className="inline-flex items-center space-x-3 bg-red-600/10 border border-red-600/20 px-6 py-2.5 rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
                <span className="text-red-500 font-black tracking-widest uppercase text-xs">Innovation Partner for K-12</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.02] tracking-tight">
                Empower <span className="shimmer-text italic">Young Minds</span> <br/> To Build The Future.
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl font-medium">
                We bring world-class STEM Robotics and AI labs directly to your school, turning learners into tomorrow's engineers.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/contact" className="bg-red-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-2xl shadow-red-600/30 flex items-center group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Book a Lab Demo <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
                <a href="#video-showcase" className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all flex items-center">
                   <Play size={20} className="mr-3 fill-current" /> Watch Impact
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. SCHOOL PARTNERS MARQUEE */}
      <section className="py-20 bg-white overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-6 text-center mb-12">
           <p className="text-xs font-black text-gray-400 uppercase tracking-[0.4em]">Schools We've Transformed</p>
        </div>
        <div className="marquee-mask relative">
          <div className="animate-marquee flex items-center gap-16 py-6">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} className="flex items-center space-x-4 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 min-w-[200px] justify-center">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-14 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${client.name}&background=fef2f2&color=ef4444&bold=true`; }}
                />
                <span className="font-black text-gray-900 text-sm whitespace-nowrap">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RANCHO STYLE GLOW BOXES (THE "ECOSYSTEM") */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <Reveal>
              <span className="text-red-600 font-black tracking-[0.4em] uppercase text-xs mb-4 block">Our Full-Stack Ecosystem</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">Everything Your School Needs</h2>
              <div className="w-24 h-2 bg-red-600 rounded-full mx-auto"></div>
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
                <div className="rancho-card group bg-white p-12 rounded-[3.5rem] border border-gray-100 h-full relative overflow-hidden flex flex-col">
                  <div className="bg-red-50 text-red-600 w-20 h-20 flex items-center justify-center rounded-[2rem] mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{feature.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-lg flex-grow">{feature.desc}</p>
                  <div className="absolute -bottom-6 -right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Box size={140} className="text-red-600" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VIDEO SHOWCASE (LAPTOP MOCKUP ANIMATION) */}
      <section id="video-showcase" className="py-32 bg-gray-50 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal type="right">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
                Transforming Education, <br/> <span className="text-red-600 italic">One Lab at a Time.</span>
              </h2>
              <p className="text-gray-600 text-xl mb-12 leading-relaxed max-w-lg">
                Watch how we take students from passive screen consumers to active technology creators through immersive lab experiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { val: "25+", label: "Elite School Labs" },
                  { val: "5000+", label: "Students Empowered" },
                  { val: "200+", label: "Certified Teachers" },
                  { val: "1500+", label: "Projects Built" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-red-600 transition-colors">
                    <p className="text-3xl font-black text-gray-900 mb-1">{stat.val}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal type="left">
              <div className="relative group cursor-pointer">
                {/* Floating Stats Around Video */}
                <div className="absolute -top-12 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 animate-float-y border border-gray-100 hidden md:block">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="font-black text-xs text-gray-900">LAB IN SESSION</span>
                  </div>
                </div>
                
                {/* Laptop Mockup Wrapper */}
                <div className="relative z-10 rounded-[2.5rem] border-[10px] border-gray-900 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]">
                  <img 
                    src="https://picsum.photos/id/1073/1200/800" 
                    className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105" 
                    alt="Video Background" 
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center animate-pulse-red shadow-2xl group-hover:scale-110 transition-transform">
                      <Play fill="white" size={32} />
                    </div>
                  </div>
                </div>

                {/* Base Plate of Laptop */}
                <div className="absolute -bottom-2 inset-x-8 h-2 bg-gray-800 rounded-b-full"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. THE ROADMAP STEPS (WITH CONNECTING LINE) */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6 text-center mb-24">
          <Reveal>
             <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Simple 4-Step Launch</h2>
          </Reveal>
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -translate-y-1/2 z-0 overflow-hidden">
             <div className="w-full h-full bg-red-600 origin-left animate-marquee" style={{ animationDuration: '3s' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { step: "01", title: "Consultation", desc: "Expert audit of your current space and student demographics." },
              { step: "02", title: "Lab Setup", desc: "Fast-track installation of kits, workstations, and branding." },
              { step: "03", title: "Faculty Training", desc: "Dedicated workshop to sync teachers with our curriculum." },
              { step: "04", title: "Kickoff", desc: "The first batch of future innovators starts their journey." }
            ].map((item, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 rancho-card flex flex-col items-center text-center">
                  <span className="text-6xl font-black text-gray-100 mb-8 block group-hover:text-red-50 transition-colors">{item.step}</span>
                  <h4 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-base">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROGRESSIVE CURRICULUM (DARK SECTION) */}
      <section className="py-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal type="right">
                <span className="text-red-500 font-black tracking-widest uppercase text-xs mb-6 block">Future-Ready Curriculum</span>
                <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tight">Structured <span className="text-red-600">Progression</span></h2>
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
                        <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em]">{level.grade}</span>
                        <Zap size={20} className="text-red-500 group-hover:rotate-12 transition-transform" />
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
                  <div className="absolute -inset-10 bg-red-600/10 blur-[150px] rounded-full"></div>
                  <img 
                    src="https://picsum.photos/id/102/1000/1200" 
                    className="rounded-[4rem] border border-white/5 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    alt="Innovation in Action" 
                  />
                  
                  <div className="absolute -bottom-12 -left-12 bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100">
                    <div className="flex items-center space-x-6">
                      <div className="bg-red-600 p-6 rounded-3xl text-white shadow-xl shadow-red-600/30"><Lightbulb size={40} /></div>
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

      {/* 7. FINAL HIGH-IMPACT CTA */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="bg-red-600 rounded-[5rem] p-20 md:p-32 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(239,68,68,0.4)]">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
              
              <h2 className="text-5xl md:text-8xl font-black mb-10 relative z-10 leading-tight tracking-tighter">Become a <br/> Pioneer School.</h2>
              <p className="text-xl md:text-2xl text-red-50 mb-16 max-w-2xl mx-auto opacity-90 relative z-10 font-medium">
                Make your institution a benchmark of technical excellence. Let's start building your STEM lab today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-10 relative z-10">
                <Link to="/contact" className="bg-white text-red-600 px-16 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
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
