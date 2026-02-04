
import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Cpu, BookOpen, Settings, Zap, Cloud } from 'lucide-react';

const ServiceSection: React.FC<{ id: string; title: string; subtitle: string; description: string; items: string[]; outcome?: string; icon: React.ReactNode }> = ({ id, title, subtitle, description, items, outcome, icon }) => (
  <section id={id} className="py-24 border-b border-gray-100 last:border-0 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-600">
            {icon}
          </div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <h3 className="text-xl text-red-600 font-semibold mb-6">{subtitle}</h3>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {description}
          </p>
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">What We Provide:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-gray-700">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full shrink-0"></div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {outcome && (
            <div className="mt-10 p-6 bg-gray-900 rounded-xl text-white">
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest block mb-2">Outcome</span>
              <p className="text-sm italic">{outcome}</p>
            </div>
          )}
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-red-600 rounded-3xl rotate-3 group-hover:rotate-1 transition-transform opacity-10"></div>
           <img src={`https://picsum.photos/seed/${title}/800/600`} alt={title} className="rounded-3xl shadow-2xl relative z-10 w-full" />
        </div>
      </div>
    </div>
  </section>
);

const Services: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-gray-900 py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-white mb-6">Our Services</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">Transforming education through state-of-the-art labs and industry-led programs.</p>
        </div>
      </div>

      <ServiceSection 
        id="stem-labs"
        icon={<Settings size={32} />}
        title="STEM Labs"
        subtitle="Transforming Classrooms into Innovation Labs"
        description="We design and establish STEM & Robotics Laboratories that enable hands-on, curiosity-driven learning for the next generation of problem solvers."
        items={[
          "Complete STEM & Robotics Lab Setup",
          "Age-wise Curriculum (K1–K12)",
          "Robotics Kits & AI Learning Tools",
          "Teacher Training & Lab Management",
          "Student Innovation Events",
          "Continuous Mentorship Support"
        ]}
        outcome="Students learn by building — developing problem-solving, creativity, and technical thinking early."
      />

      <ServiceSection 
        id="coe"
        icon={<Cpu size={32} />}
        title="Center of Excellence (CoE)"
        subtitle="Advanced Innovation Hubs for Colleges & Universities"
        description="We establish high-end technology labs where students work on industry projects, research, and product development, bridging the gap between academia and industry."
        items={[
          "Autonomous & Industrial Robotics",
          "SLAM & Navigation Systems",
          "Vision-Based Systems",
          "Drone Technologies",
          "AI & Machine Learning Hub",
          "IoT & IoRT Ecosystems",
          "Digital Twin & Edge Computing",
          "Industry 4.0 Solutions"
        ]}
        outcome="Graduates equipped with practical experience in cutting-edge industrial technologies."
      />

      <ServiceSection 
        id="k12"
        icon={<Monitor size={32} />}
        title="STEM & AI Robotics"
        subtitle="Structured Education for K1–K12"
        description="A comprehensive program designed for students from early-grade to higher secondary, focusing on the fundamentals of the future."
        items={[
          "Block Coding to Python Transition",
          "Advanced Robotics Construction",
          "AI & Computer Vision Basics",
          "IoT Mini Projects for Schools",
          "National-Level Competition Prep",
          "Logic & Algorithm Design"
        ]}
      />

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">SaaS Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <BookOpen className="mx-auto mb-4 text-red-600" />, title: 'Learning Management', desc: 'Personalized digital learning platforms.' },
                { icon: <Zap className="mx-auto mb-4 text-red-600" />, title: 'Smart Campus', desc: 'IoT-driven institutional management.' },
                { icon: <Cloud className="mx-auto mb-4 text-red-600" />, title: 'AI Analytics', desc: 'Data-driven performance dashboards.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  {item.icon}
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
