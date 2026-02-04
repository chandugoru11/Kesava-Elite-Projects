
import React from 'react';
import { CheckCircle2, Quote } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const About: React.FC = () => {
  const philosophies = [
    "Learning by Building",
    "Innovation over Memorization",
    "Projects over Theory",
    "Industry over Outdated Curriculum",
    "Access for Every Student"
  ];

  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-red-500 font-medium max-w-2xl mx-auto">Building the foundation of technology education in India</p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 border-b-2 border-red-600 pb-2 inline-block">Who We Are</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                Keshava Elite Projects is a next-generation technology education company founded with a vision to bring world-class robotics and AI education to every student — from rural government schools to top-tier engineering colleges.
              </p>
              <p>
                Started by young innovators from Andhra Pradesh, we believe talent exists everywhere — opportunity should too. Our team consists of engineers, researchers, and educators passionate about transforming education through experiential and project-based learning.
              </p>
            </div>

            {/* Philosophy */}
            <div className="mt-16 bg-white p-10 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Philosophy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {philosophies.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-red-600 shrink-0" size={24} />
                    <span className="font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-red-600 p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Vision</h3>
                <p className="leading-relaxed opacity-90">
                  To create India’s most impactful Robotics & STEM innovation ecosystem — empowering every student to become a creator of technology, not just a consumer.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-red-500">Mission</h3>
                <p className="leading-relaxed opacity-90">
                  To deliver accessible, industry-aligned, and project-based technology education through modern labs, expert mentorship, and innovation-driven learning.
                </p>
              </div>
            </div>

            {/* Founder's Message */}
            <div className="mt-20 bg-white border-2 border-red-50 p-12 rounded-3xl relative">
              <Quote className="absolute top-8 left-8 text-red-100" size={80} />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">Founder's Message</h3>
                <blockquote className="text-xl italic text-gray-700 mb-8 leading-relaxed">
                  "Technology is shaping the future faster than ever. At Keshava Elite Projects, our mission is to ensure every student — regardless of background — gets the opportunity to learn, build, and innovate with Robotics and AI."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://picsum.photos/id/64/200/200" alt="Founder" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Rakesh Veerapaneni</p>
                    <p className="text-sm text-red-600">Founder, Keshava Elite Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
