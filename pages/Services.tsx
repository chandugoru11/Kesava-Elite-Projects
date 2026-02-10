
import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Cpu, BookOpen, Settings, Zap, Cloud, ShieldCheck, Target, ArrowRight, Globe, Layers, BarChart, Layout } from 'lucide-react';

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

const ServiceSection: React.FC<{ id: string; title: string; subtitle: string; description: string; items: string[]; outcome?: string; icon: React.ReactNode; image: string; reverse?: boolean }> = ({ id, title, subtitle, description, items, outcome, icon, image, reverse }) => (
  <section id={id} className="py-32 border-b border-gray-50 last:border-0 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <Reveal className={reverse ? 'lg:order-2' : ''}>
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 text-blue-700 shadow-sm">
            {icon}
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">{title}</h2>
          <h3 className="text-xl text-blue-600 font-black mb-8 tracking-tighter uppercase">{subtitle}</h3>
          <p className="text-gray-500 text-xl mb-10 leading-relaxed font-medium">
            {description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{item}</span>
              </div>
            ))}
          </div>
          {outcome && (
            <div className="p-8 bg-blue-950 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
               <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] block mb-3">Strategic Outcome</span>
               <p className="text-lg font-medium leading-relaxed italic opacity-90">{outcome}</p>
            </div>
          )}
        </Reveal>
        <Reveal className={reverse ? 'lg:order-1' : ''}>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] rotate-2 group-hover:rotate-1 transition-transform"></div>
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-blue-50">
              <img src={image} alt={title} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent"></div>
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
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
              <Layers size={18} className="text-blue-400" />
              <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">Technical Service Catalog</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-black text-white mb-8 leading-none tracking-tighter">
              Industrial <br/><span className="shimmer-text">Solutions.</span>
            </h1>
          </Reveal>
        </div>
      </div>

      <ServiceSection 
        id="stem-labs"
        icon={<Settings size={36} />}
        title="STEM Labs"
        subtitle="Innovation Frameworks for Schools"
        image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
        description="We design and deploy high-performance STEM & Robotics Laboratories that turn theoretical concepts into tangible technical products."
        items={["End-to-End Lab Architecture", "K12 Aligned Curriculum", "Advanced Robotics Toolsets", "Faculty Technical Training"]}
        outcome="Students evolve from users to creators."
      />

      <ServiceSection 
        id="coe"
        icon={<Cpu size={36} />}
        title="CoE Hubs"
        subtitle="Advanced University Centers of Excellence"
        image="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200"
        reverse
        description="Establishing specialized research environments where higher education meets real-world industrial demand and innovation."
        items={["Autonomous Navigation Units", "AI & Computer Vision Nodes", "Drone Swarm Technology", "Digital Twin Workstations"]}
        outcome="Bridging the gap between engineering theory and industrial reality."
      />

      {/* SaaS Section */}
      <section id="saas" className="py-40 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <Reveal>
              <div className="w-16 h-16 bg-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                 <Layout size={32} />
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">SaaS Products</h2>
              <div className="w-20 h-2 bg-blue-700 mx-auto rounded-full mb-10"></div>
              <p className="text-gray-500 text-xl font-medium">Enterprise-grade digital ecosystems for modern institutional intelligence.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <BookOpen size={32} />, title: 'Elite LMS', desc: 'Secure Learning Management Platforms with AI tracking and integrated assessments.' },
              { icon: <Zap size={32} />, title: 'Smart Campus', desc: 'IoT solutions for automated attendance, energy monitoring, and campus resource sync.' },
              { icon: <BarChart size={32} />, title: 'Insight BI', desc: 'Advanced Analytics Dashboards providing real-time student performance and operations metrics.' }
            ].map((item, idx) => (
              <Reveal key={idx} delay={`delay-${idx * 100}`}>
                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 hover:border-blue-700/20 hover:-translate-y-2 transition-all group h-full">
                  <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-700 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{item.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
