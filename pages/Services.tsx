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

const ServiceSection: React.FC<{ id: string; title: string; subtitle: string; description: string; items: string[]; icon: React.ReactNode; image: string; reverse?: boolean }> = ({ id, title, subtitle, description, items, icon, image, reverse }) => (
  <section id={id} className="py-32 border-b border-gray-50 last:border-0 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <Reveal className={reverse ? 'lg:order-2' : ''}>
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 text-blue-700 shadow-sm">{icon}</div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight uppercase">{title}</h2>
          <h3 className="text-xl text-blue-600 font-black mb-8 uppercase">{subtitle}</h3>
          <p className="text-gray-500 text-xl mb-10 leading-relaxed font-medium">{description}</p>
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
          </Reveal>
        </div>
      </div>
      <ServiceSection id="stem-labs" icon={<Settings size={36} />} title="STEM Labs" subtitle="Innovation for Schools" image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" description="We design and deploy high-performance STEM Laboratories." items={["Lab Architecture", "Curriculum Alignment", "Robotics Toolsets", "Faculty Training"]} />
      <ServiceSection id="coe" icon={<Cpu size={36} />} title="CoE Hubs" subtitle="University Centers" image="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200" reverse description="Establishing specialized research environments for higher education." items={["Autonomous Navigation", "AI Node Deployment", "Drone Technology", "Digital Twins"]} />
    </div>
  );
};

export default Services;