
import React from 'react';
import { Map, Globe, Heart, ShieldCheck } from 'lucide-react';

const Impact: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-extrabold text-white mb-6">Our Reach & Impact</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Bridging the rural-urban digital divide through technology education.</p>
        </div>
      </div>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
            {[
              { label: 'Students Trained', value: '5,000+' },
              { label: 'Partner Schools', value: '25+' },
              { label: 'Govt. Schools Enabled', value: 'Multiple' },
              { label: 'State Operations', value: 'Multi-State' },
              { label: 'Curriculum Standard', value: 'NEP 2020' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-gray-50 rounded-2xl border-b-4 border-red-600">
                <p className="text-3xl font-black text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">Our Social Mission</h2>
              <div className="space-y-6">
                {[
                  { icon: <Map className="text-red-600" />, title: "Reducing Rural-Urban Digital Divide", text: "Bringing advanced technology to students who need it most." },
                  { icon: <Heart className="text-red-600" />, title: "Empowering Government Students", text: "Special programs designed specifically for public education sectors." },
                  { icon: <Globe className="text-red-600" />, title: "Building Innovation Culture Early", text: "Nurturing the creators of tomorrow's technology today." },
                  { icon: <ShieldCheck className="text-red-600" />, title: "Supporting Digital India Initiatives", text: "Aligned with national goals for technical self-reliance." }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 h-96 rounded-3xl overflow-hidden shadow-2xl relative">
               <img src="https://picsum.photos/id/442/1000/800" className="w-full h-full object-cover" alt="Impact" />
               <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                  <p className="text-white text-3xl font-bold px-12 text-center">"Let's build India's innovation future together."</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
