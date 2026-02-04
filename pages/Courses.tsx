
import React, { useState, useEffect } from 'react';
import { Terminal, Briefcase, Rocket, Star, Info, X, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { COURSE_DATA } from '../constants';
import { Course } from '../types';

const CourseModal: React.FC<{ course: Course | null; onClose: () => void }> = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <span className="text-red-600 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full mb-3 inline-block">Professional Program</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{course.title}</h2>
            </div>
            {course.duration && (
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-xl text-gray-600 font-semibold text-sm w-fit">
                <Clock size={18} className="text-red-600" />
                <span>{course.duration}</span>
              </div>
            )}
          </div>

          <div className="prose prose-red max-w-none mb-10">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Info size={20} className="mr-2 text-red-600" />
              Course Overview
            </h4>
            <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border-l-4 border-red-600">
              {course.description}
            </p>
          </div>

          {course.features && (
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-6">Key Modules & Skills</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle size={20} className="text-green-500 mr-3 shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); onClose(); window.location.hash = 'contact'; }}
              className="flex-1 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-red-700 transition-all flex items-center justify-center group"
            >
              Enroll Now <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={onClose}
              className="flex-1 border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-bold text-center hover:bg-gray-50 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ 
  title: string; 
  courses: Course[]; 
  icon: string;
  onSelectCourse: (course: Course) => void;
}> = ({ title, courses, icon, onSelectCourse }) => {
  const getIcon = () => {
    switch(icon) {
      case 'terminal': return <Terminal size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'rocket': return <Rocket size={24} />;
      default: return <Star size={24} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
      <div className="p-8 bg-gray-900 text-white flex items-center space-x-4">
        <div className="p-3 bg-red-600 rounded-xl">
          {getIcon()}
        </div>
        <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
      </div>
      
      <div className="p-6 flex-grow">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Available Specializations</p>
        <div className="space-y-3">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-2xl transition-all group/item text-left"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm group-hover/item:text-red-600">
                  <Star size={14} className="fill-current text-gray-300 group-hover/item:text-red-500" />
                </div>
                <span className="font-bold text-gray-800 group-hover/item:text-red-700">{course.title}</span>
              </div>
              <Info size={18} className="text-gray-300 group-hover/item:text-red-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-tighter">
          <span>Project Based</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Placement Support</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Certified</span>
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCourse]);

  return (
    <div className="bg-gray-50 pb-24 min-h-screen">
      <div className="bg-red-600 py-32 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            Professional <span className="text-gray-900">Programs</span>
          </h1>
          <p className="text-red-50 text-xl md:text-2xl max-w-3xl mx-auto font-medium opacity-90">
            Upskill yourself with industry-led certification programs designed for the future workforce.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {COURSE_DATA.map((category, idx) => (
            <CourseCard 
              key={idx}
              title={category.title}
              icon={category.icon}
              courses={category.courses}
              onSelectCourse={setSelectedCourse}
            />
          ))}
        </div>
      </div>

      <section className="mt-24 container mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px]"></div>
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Train With Us?</h2>
            <div className="w-24 h-2 bg-red-600 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 text-lg">We provide more than just certificates; we provide career-defining skills.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
            {[
              { label: 'Hands-on Projects', icon: '🛠️' },
              { label: 'Industry Cases', icon: '📊' },
              { label: 'Global Certification', icon: '📜' },
              { label: 'Internship Support', icon: '🏢' },
              { label: 'Placement Assistance', icon: '🚀' },
              { label: 'Startup Mentorship', icon: '💡' }
            ].map((feature, i) => (
              <div key={i} className="text-center group flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl mb-4 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-6 transition-all shadow-sm border border-gray-100">
                  {feature.icon}
                </div>
                <p className="text-sm font-extrabold text-gray-800 leading-tight max-w-[120px]">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Modal for Details */}
      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />

      <style>{`
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Courses;
