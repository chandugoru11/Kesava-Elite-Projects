
import React, { useState, useEffect } from 'react';
import { 
  Terminal, Briefcase, Info, X, Clock, CheckCircle, 
  ArrowLeft, ArrowRight, ShieldCheck, Zap, 
  ChevronRight, Receipt, HandCoins, Cpu, LayoutGrid, BookOpen 
} from 'lucide-react';
import { COURSE_DATA } from '../constants.tsx';
import { Course } from '../types.ts';
import { useAuth } from '../AuthContext.tsx';

type ModalStep = 'details' | 'selection' | 'payment' | 'processing' | 'success';
type PaymentOption = 'pre' | 'post';

const CourseModal: React.FC<{ course: Course | null; onClose: () => void }> = ({ course, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<ModalStep>('details');
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('pre');

  if (!course) return null;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2000);
  };

  const handleBack = () => {
    if (step === 'details') onClose();
    else if (step === 'selection') setStep('details');
    else if (step === 'payment') setStep('selection');
    else setStep('details');
  };

  const getStepNumber = () => {
    switch(step) {
      case 'details': return 1;
      case 'selection': return 2;
      case 'payment': return 3;
      default: return 4;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-xl animate-fade-in">
      <div className="bg-white rounded-[4rem] w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-2xl relative animate-scale-up flex flex-col">
        {/* Modal Header */}
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-30">
          <div className="flex items-center space-x-6">
             <button 
               onClick={handleBack} 
               className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-700 transition-all group flex items-center justify-center"
               title="One Step Backward"
             >
               <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
             </button>
             <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Step {getStepNumber()} of 4</span>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">{course.title}</h3>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Industrial Protocol Access</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto custom-scrollbar flex-grow">
           {step === 'details' && (
             <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-12">
               <div className="lg:col-span-2 space-y-12">
                 <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">Course Description</h4>
                   <p className="text-2xl text-gray-600 font-medium leading-relaxed">{course.description}</p>
                 </section>

                 <section>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Engineering Syllabus</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {course.modules?.map((module, i) => (
                       <div key={i} className="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                         <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xs font-black">{i + 1}</div>
                         <span className="font-bold text-gray-700">{module}</span>
                       </div>
                     ))}
                   </div>
                 </section>
               </div>

               <div className="space-y-8">
                 <div className="bg-blue-950 p-10 rounded-[3rem] text-white">
                    <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-blue-400">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-3 mb-12">
                      {course.features?.map((f, i) => <span key={i} className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/5">{f}</span>)}
                    </div>
                    <div className="pt-8 border-t border-white/10 flex items-center space-x-3">
                       <Clock size={18} className="text-blue-400" />
                       <span className="text-sm font-black uppercase tracking-widest">{course.duration}</span>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                    <h4 className="font-black uppercase tracking-widest text-[10px] mb-6 text-gray-400">Standard Access Fee</h4>
                    <div className="mb-10">
                       <p className="text-5xl font-black text-gray-900 tracking-tighter">₹{course.fullPrice.toLocaleString()}</p>
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
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Identity Verification</h3>
                <p className="text-xl text-gray-500 mb-12 font-medium">Verify your profile credentials before payment.</p>
                <div className="p-10 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex items-center justify-between text-left mb-16">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Authenticated Node</p>
                    <p className="text-2xl font-black text-blue-900">{user?.name || 'Guest Student'}</p>
                    <p className="text-sm text-blue-600/70 font-bold">{user?.email || 'unauthorized@keshava.in'}</p>
                  </div>
                  <Receipt className="text-blue-300" size={32} />
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button onClick={handleBack} className="flex-1 bg-gray-50 border border-gray-100 py-6 rounded-3xl font-black uppercase text-xs tracking-widest text-gray-400 hover:bg-gray-100 transition-all">One Step Back</button>
                  <button onClick={() => setStep('payment')} className="flex-1 bg-blue-700 text-white py-6 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center group">
                    Next Protocol <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
             </div>
           )}

           {step === 'payment' && (
             <div className="animate-fade-in py-16 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                   <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">Payment Settlement</h3>
                   <p className="text-gray-500 font-medium">Select your preferred funding model.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                   <button 
                     onClick={() => setPaymentOption('pre')}
                     className={`p-10 rounded-[3.5rem] border-4 text-left transition-all ${paymentOption === 'pre' ? 'border-blue-700 bg-blue-50/50' : 'border-gray-50 bg-white hover:border-blue-100'}`}
                   >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${paymentOption === 'pre' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-400'}`}>
                         <Zap size={28} />
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 mb-2">Pre-payment</h4>
                      <p className="text-sm text-gray-500 font-bold mb-8 italic">Full course settlement upfront.</p>
                      <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-gray-400">Due Now</span>
                         <span className="text-3xl font-black text-blue-700">₹{course.fullPrice.toLocaleString()}</span>
                      </div>
                   </button>

                   <button 
                     onClick={() => setPaymentOption('post')}
                     className={`p-10 rounded-[3.5rem] border-4 text-left transition-all ${paymentOption === 'post' ? 'border-blue-700 bg-blue-50/50' : 'border-gray-50 bg-white hover:border-blue-100'}`}
                   >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${paymentOption === 'post' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-400'}`}>
                         <HandCoins size={28} />
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 mb-2">Post-payment</h4>
                      <p className="text-sm text-gray-500 font-bold mb-8 italic">Secure seat with token fee.</p>
                      <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-gray-400">Token Fee</span>
                         <span className="text-3xl font-black text-blue-700">₹{course.registrationFee.toLocaleString()}</span>
                      </div>
                   </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button onClick={handleBack} className="flex-1 bg-gray-50 border border-gray-100 py-6 rounded-3xl font-black uppercase text-xs tracking-widest text-gray-400 hover:bg-gray-100 transition-all">One Step Back</button>
                  <button onClick={handlePayment} className="flex-1 bg-blue-700 text-white py-6 rounded-3xl font-black text-xl shadow-xl">Complete Handshake</button>
                </div>
             </div>
           )}

           {step === 'processing' && (
             <div className="py-40 text-center flex flex-col items-center">
                <div className="w-24 h-24 relative mb-12">
                   <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Authorizing...</h3>
                <p className="text-gray-400 font-medium">Connecting to financial gateway nodes.</p>
             </div>
           )}

           {step === 'success' && (
             <div className="py-20 text-center max-w-xl mx-auto">
                <div className="w-28 h-28 bg-green-50 text-green-500 mx-auto mb-10 rounded-[3rem] flex items-center justify-center border border-green-100 shadow-xl">
                   <CheckCircle size={64} />
                </div>
                <h3 className="text-5xl font-black mb-6 uppercase tracking-tighter text-gray-900">Access Granted</h3>
                <p className="text-xl text-gray-500 mb-16 font-medium leading-relaxed">Enrollment complete. Your signature is now active in our industrial registry.</p>
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

  const filteredCategories = COURSE_DATA.filter(c => activeFilter === 'All' || c.title === activeFilter);

  return (
    <div className="bg-white pb-48">
      <div className="bg-blue-950 py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-animated-grid opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-6xl md:text-[10rem] font-black text-white mb-12 tracking-tighter leading-none">
            Elite <br/><span className="shimmer-text">Credentials.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Industry-Aligned Professional Certification Programs. Master high-demand technologies with our hands-on curriculum, expert mentorship, and startup-ready training features.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20">
        {/* Navigation / Filter Control */}
        <div className="flex items-center space-x-6 mb-16 overflow-x-auto pb-4 custom-scrollbar">
           {activeFilter !== 'All' && (
             <button 
               onClick={() => setActiveFilter('All')} 
               className="bg-gray-950 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-xl hover:bg-blue-700 transition-all flex-shrink-0"
             >
               <ArrowLeft size={14} className="mr-3" /> All Categories
             </button>
           )}
           <div className="flex bg-white p-3 rounded-full shadow-2xl border border-gray-100 flex-shrink-0">
             {['All', ...COURSE_DATA.map(c => c.title)].map(f => (
               <button 
                 key={f} 
                 onClick={() => setActiveFilter(f)} 
                 className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === f ? 'bg-blue-700 text-white shadow-lg' : 'text-gray-400 hover:text-blue-700'}`}
               >
                 {f}
               </button>
             ))}
           </div>
        </div>

        {/* Categories / Courses View */}
        <div className={`grid grid-cols-1 ${activeFilter === 'All' ? 'md:grid-cols-2 lg:grid-cols-3' : 'lg:grid-cols-2'} gap-12`}>
          {filteredCategories.map((cat, i) => (
            <div key={i} className={`bg-white rounded-[4rem] border border-gray-100 shadow-xl overflow-hidden transition-all h-fit ${activeFilter !== 'All' ? 'lg:col-span-2' : ''}`}>
               {/* Header */}
               <div className="p-10 bg-gray-950 text-white flex items-center justify-between">
                 <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-700/20">
                       {cat.title.includes('IT') ? <Terminal size={28}/> : cat.title.includes('Core') ? <Cpu size={28}/> : <Briefcase size={28}/>}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-2">{cat.title}</h3>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{cat.courses.length} Certified Tracks</p>
                    </div>
                 </div>
                 {activeFilter === 'All' && (
                   <button onClick={() => setActiveFilter(cat.title)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-white/10 transition-all">
                     <ChevronRight size={20} />
                   </button>
                 )}
               </div>

               {/* Course List Grid */}
               <div className={`p-10 ${activeFilter === 'All' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
                 {cat.courses.map(course => (
                   <button 
                     key={course.id} 
                     onClick={() => setSelectedCourse(course)} 
                     className="w-full text-left p-8 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-[2.5rem] transition-all flex flex-col justify-between group h-full"
                   >
                     <div className="flex justify-between items-start mb-6 w-full">
                       <h4 className="font-black text-lg text-gray-900 group-hover:text-blue-700 leading-tight pr-4">{course.title}</h4>
                       <div className="bg-white p-2.5 rounded-xl border border-gray-200 group-hover:border-blue-300 shadow-sm flex-shrink-0 transition-all">
                          <Info size={16} className="text-gray-300 group-hover:text-blue-500" />
                       </div>
                     </div>
                     <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                           <Clock size={12} />
                           <span>{course.duration}</span>
                        </div>
                        <span className="text-sm font-black text-gray-900">₹{course.fullPrice.toLocaleString()}</span>
                     </div>
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
