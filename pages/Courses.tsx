import React, { useState, useEffect, useMemo } from 'react';
import { Terminal, Briefcase, Rocket, Star, Info, X, Clock, CheckCircle, ArrowLeft, ArrowRight, CreditCard, ShieldCheck, Zap, Wallet, Smartphone, ChevronRight, Receipt, Loader2, AlertTriangle, FileText, Download, Target, ListChecks, Cpu, Settings, Search, Shield, Database, Globe, Layers } from 'lucide-react';
import { COURSE_DATA } from '../constants.tsx';
import { Course } from '../types.ts';
import { useAuth } from '../AuthContext.tsx';

type ModalStep = 'details' | 'selection' | 'processing' | 'success' | 'error';

const CourseModal: React.FC<{ course: Course | null; onClose: () => void }> = ({ course, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<ModalStep>('details');

  if (!course) return null;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-xl animate-fade-in">
      <div className="bg-white rounded-[4rem] w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-2xl relative animate-scale-up flex flex-col">
        {/* Modal Header */}
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-30">
          <div className="flex items-center space-x-4">
             {step !== 'details' && (
               <button onClick={() => setStep('details')} className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-700 transition-all">
                 <ArrowLeft size={24} />
               </button>
             )}
             <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{course.title}</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Industrial Protocol Access</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto custom-scrollbar flex-grow">
           {step === 'details' && (
             <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Main Overview */}
               <div className="lg:col-span-2 space-y-12">
                 <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">Course Description</h4>
                   <p className="text-2xl text-gray-600 font-medium leading-relaxed">{course.description}</p>
                 </section>

                 <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Engineering Syllabus (Modules)</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {course.modules?.map((module, i) => (
                       <div key={i} className="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                         <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xs font-black">{i + 1}</div>
                         <span className="font-bold text-gray-700">{module}</span>
                       </div>
                     ))}
                   </div>
                 </section>

                 <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Expected Outcomes</h4>
                   <div className="space-y-4">
                     {["Professional Certification", "Industrial Internship Opportunity", "Real-world Project Deployment"].map((outcome, i) => (
                       <div key={i} className="flex items-center space-x-4">
                         <CheckCircle className="text-green-500" size={20} />
                         <span className="text-gray-600 font-medium">{outcome}</span>
                       </div>
                     ))}
                   </div>
                 </section>
               </div>

               {/* Sidebar Actions */}
               <div className="space-y-8">
                 <div className="bg-blue-950 p-10 rounded-[3rem] text-white">
                    <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-blue-400">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-3 mb-12">
                      {course.features?.map((f, i) => <span key={i} className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/5">{f}</span>)}
                    </div>
                    <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          <Clock size={18} className="text-blue-400" />
                          <span className="text-sm font-black uppercase tracking-widest">{course.duration}</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                    <h4 className="font-black uppercase tracking-widest text-[10px] mb-6 text-gray-400">Enrollment Node</h4>
                    <div className="mb-10">
                       <p className="text-5xl font-black text-gray-900 tracking-tighter">₹{course.fullPrice.toLocaleString()}</p>
                       <p className="text-xs font-bold text-gray-400 mt-2 italic">Excluding GST as applicable</p>
                    </div>
                    <button onClick={() => setStep('selection')} className="w-full bg-blue-700 text-white py-6 rounded-3xl font-black shadow-2xl shadow-blue-700/20 hover:bg-blue-800 transition-all flex items-center justify-center group">
                      Initialize Access <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
               </div>
             </div>
           )}

           {step === 'selection' && (
             <div className="animate-fade-in py-20 text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-10">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Checkout Protocol</h3>
                <p className="text-xl text-gray-500 mb-12 font-medium">Verify your student identity before initializing the secure payment gateway.</p>
                <div className="grid grid-cols-1 gap-4 mb-16 text-left">
                  <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Authenticated Node</p>
                      <p className="font-black text-blue-900">{user?.name || 'Guest Student'}</p>
                    </div>
                    <Receipt className="text-blue-300" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setStep('details')} className="flex-1 border-2 border-gray-100 py-6 rounded-3xl font-black uppercase text-xs tracking-widest text-gray-400 hover:bg-gray-50 transition-all">Back to Overview</button>
                  <button onClick={handlePayment} className="flex-1 bg-blue-700 text-white py-6 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center group">
                    Complete Handshake <Zap size={20} className="ml-3 fill-current" />
                  </button>
                </div>
             </div>
           )}

           {step === 'processing' && (
             <div className="py-40 text-center flex flex-col items-center">
                <div className="w-24 h-24 relative mb-12">
                   <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Synchronizing...</h3>
                <p className="text-gray-400 font-medium">Authorizing credentials with central Hub node.</p>
             </div>
           )}

           {step === 'success' && (
             <div className="py-20 text-center max-w-xl mx-auto">
                <div className="w-28 h-28 bg-green-50 text-green-500 mx-auto mb-10 rounded-[3rem] flex items-center justify-center shadow-xl border border-green-100">
                   <CheckCircle size={64} />
                </div>
                <h3 className="text-5xl font-black mb-6 uppercase tracking-tighter">Access Granted</h3>
                <p className="text-xl text-gray-500 mb-16 font-medium leading-relaxed">Your industrial track is now active. Log in to the Elite LMS to begin your engineering journey.</p>
                <button onClick={onClose} className="w-full bg-blue-700 text-white px-12 py-7 rounded-[2.5rem] font-black text-xl shadow-2xl">Enter Learning Hub</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="bg-white pb-48">
      <div className="bg-blue-950 py-48 text-center relative">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl md:text-[10rem] font-black text-white mb-12 tracking-tighter leading-none">
            Acquire Elite <br/><span className="shimmer-text">Credentials.</span>
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="flex bg-white p-4 rounded-full shadow-2xl mb-24 overflow-x-auto border border-gray-100 custom-scrollbar">
           {['All', ...COURSE_DATA.map(c => c.title)].map(f => (
             <button key={f} onClick={() => setActiveFilter(f)} className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === f ? 'bg-blue-700 text-white shadow-xl' : 'text-gray-400 hover:text-blue-700'}`}>{f}</button>
           ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {COURSE_DATA.filter(c => activeFilter === 'All' || c.title === activeFilter).map((cat, i) => (
            <div key={i} className="bg-white rounded-[4rem] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all">
               <div className="p-10 bg-gray-950 text-white flex items-center space-x-6">
                 <Terminal size={32} className="text-blue-500" />
                 <h3 className="text-2xl font-black uppercase tracking-tight">{cat.title}</h3>
               </div>
               <div className="p-10 space-y-4">
                 {cat.courses.map(course => (
                   <button key={course.id} onClick={() => setSelectedCourse(course)} className="w-full text-left p-6 bg-gray-50 hover:bg-blue-50 rounded-3xl transition-all flex justify-between items-center group">
                     <span className="font-black text-gray-900 group-hover:text-blue-700">{course.title}</span>
                     <Info size={18} className="text-gray-300 group-hover:text-blue-400" />
                   </button>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};

export default Courses;