
import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Cpu, BookOpen, Settings, Zap, Cloud, ShieldCheck, Target, ArrowRight, Globe, Layers, BarChart, Layout, Binary, Rocket, Smartphone, Bot, Award } from 'lucide-react';

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className = '', delay = '' }) => {
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

  return (
    <div ref={ref} className={`reveal reveal-up ${isActive ? 'active' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
};

const ServiceSection: React.FC<{ id: string; title: string; subtitle: string; description: string; items: string[]; icon: React.ReactNode; image: string; outcome?: string; reverse?: boolean }> = ({ id, title, subtitle, description, items, icon, image, outcome, reverse }) => (
  <section id={id} className="py-32 border-b border-gray-50 last:border-0 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <Reveal className={reverse ? 'lg:order-2' : ''}>
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 text-blue-700 shadow-sm">{icon}</div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">{title}</h2>
          <h3 className="text-xl text-blue-600 font-black mb-8 uppercase">{subtitle}</h3>
          <p className="text-gray-500 text-xl mb-6 leading-relaxed font-medium">{description}</p>
          {outcome && (
            <div className="mb-10 p-6 bg-blue-50 rounded-3xl border-l-4 border-blue-700">
               <p className="text-sm font-black text-blue-900 uppercase tracking-widest mb-2">Primary Outcome</p>
               <p className="text-blue-800 font-bold italic">{outcome}</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-sm font-black text-gray-700 uppercase">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className={reverse ? 'lg:order-1' : ''}>
          <div className="relative group">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-blue-50">
              <img src={image} alt={title} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Services: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-blue-950 py-48 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
              <Layers size={18} className="text-blue-400" />
              <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">Technical Service Catalog</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black text-white mb-8 leading-none tracking-tighter">
              Industrial <br/><span className="shimmer-text">Solutions.</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              From rural government schools to advanced engineering institutions, we deliver scalable, affordable, and impactful technology education solutions.
            </p>
          </Reveal>
        </div>
      </div>

      <ServiceSection 
        id="stem-labs" 
        icon={<Settings size={36} />} 
        title="STEM Labs" 
        subtitle="Innovation for Schools" 
        image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
        description="We design and establish STEM & Robotics Laboratories that enable hands-on, curiosity-driven learning. Turnkey lab setup with state-of-the-art processors and kits designed to nurture creativity from an early age." 
        outcome="Students learn by building — developing problem-solving, creativity, and technical thinking early."
        items={["Complete Lab Setup", "Age-wise Curriculum (K1–K12)", "Robotics & AI Tools", "Teacher Training", "Student Events", "Mentorship Support"]} 
      />

      <ServiceSection 
        id="coe" 
        icon={<Cpu size={36} />} 
        title="CoE Hubs" 
        subtitle="University Centers" 
        image="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200" 
        reverse 
        description="Advanced Innovation Hubs for Colleges & Universities where students work on real-world industry and research projects. These centers act as advanced technical divisions for robotics and emerging tech." 
        outcome="Bridges the gap between classroom education and industry expectations through project-based learning."
        items={["Autonomous Robotics", "SLAM & Navigation", "Vision-Based Systems", "Drone Technologies", "AI & ML", "IoT & IoRT Systems", "Digital Twin", "Industry 4.0"]} 
      />

      <ServiceSection 
        id="saas" 
        icon={<Cloud size={36} />} 
        title="SaaS Products" 
        subtitle="Digital Ecosystems" 
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
        description="Next-generation software solutions designed to manage and scale educational excellence across institutions. Our platforms provide data-driven insights into student performance and lab utilization." 
        outcome="Enables smart campus management and real-time technical progress tracking for entire institutions."
        items={["Learning Management Platforms", "Smart Campus Solutions", "AI-Based Analytics", "Admin Dashboards"]} 
      />

      <section id="k12" className="py-32 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <Reveal className="text-center max-w-4xl mx-auto mb-24">
             <div className="w-20 h-20 bg-blue-700 text-white rounded-3xl flex items-center justify-center mb-10 mx-auto shadow-xl">
               <Bot size={36} />
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter uppercase">STEM & AI Robotics <br/><span className="text-blue-700">for K1 – K12</span></h2>
             <p className="text-xl text-gray-500 font-medium leading-relaxed">Structured STEM, AI, and Robotics education designed for early-grade to higher secondary students. Our K12 roadmap transforms passive consumers of technology into active creators.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Block Coding to Python", desc: "Progression from visual coding to professional-grade Python syntax.", icon: <Binary /> },
              { title: "Robotics Construction", desc: "Mechanical assembly and structural engineering of active robot nodes.", icon: <Settings /> },
              { title: "AI & Computer Vision", desc: "Fundamentals of how machines see and interpret industrial environments.", icon: <Target /> },
              { title: "IoT Mini Projects", desc: "Practical experience connecting everyday hardware to the global network.", icon: <Smartphone /> },
              { title: "National Competitions", desc: "Pathway to national and international robotics olympiads and expos.", icon: <Award /> },
              { title: "Project Portfolios", desc: "Building a verified record of technical achievements for future credentials.", icon: <Rocket /> }
            ].map((f, i) => (
              <Reveal key={i} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 hover:shadow-2xl transition-all h-full group">
                <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-700 group-hover:text-white transition-colors">{f.icon}</div>
                <h4 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{f.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
