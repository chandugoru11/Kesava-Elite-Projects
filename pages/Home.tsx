
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cpu, GraduationCap, Users } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/180/1920/1080" 
            className="w-full h-full object-cover opacity-40" 
            alt="Robotics Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-red-500 font-bold tracking-widest uppercase mb-4 text-sm">Building India's Next Generation</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Empowering Engineers & <span className="text-red-600">Innovators</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Keshava Elite Projects transforms schools and colleges into technology-driven innovation hubs through STEM Robotics Labs and Center of Excellence (CoE) Programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center">
                Explore Programs <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Snapshot Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-20 relative z-20">
            {[
              { icon: <Box className="text-red-600" size={32} />, title: 'STEM Labs', desc: 'Transforming classrooms for K1-K12 students.' },
              { icon: <Cpu className="text-red-600" size={32} />, title: 'CoE Programs', desc: 'Advanced tech hubs for colleges & universities.' },
              { icon: <Users className="text-red-600" size={32} />, title: 'Empowerment', desc: 'Specialized training for educators and teachers.' },
              { icon: <GraduationCap className="text-red-600" size={32} />, title: 'Certifications', desc: 'Industry-aligned professional programs.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-xl hover:-translate-y-2 transition-transform border-t-4 border-red-600">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Reach & Impact</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From rural government schools to advanced engineering institutions, we deliver scalable, affordable, and impactful technology education solutions across multiple states.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-extrabold text-red-600 mb-1">5,000+</p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Students Trained</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-red-600 mb-1">25+</p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Partner Schools</p>
                </div>
              </div>
              <Link to="/impact" className="inline-flex items-center text-red-600 font-bold mt-10 group">
                View Detailed Impact <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/id/1073/800/600" alt="Innovation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
