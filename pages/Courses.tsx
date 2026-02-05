
import React, { useState, useEffect, useMemo } from 'react';
import { Terminal, Briefcase, Rocket, Star, Info, X, Clock, CheckCircle, ArrowRight, CreditCard, ShieldCheck, Zap, Wallet, Smartphone, ChevronRight, Receipt, Loader2, AlertTriangle, FileText, Download, Target, ListChecks, Cpu, Settings, Search, Shield, Database, Globe } from 'lucide-react';
import { COURSE_DATA } from '../constants';
import { Course } from '../types';
import { useAuth } from '../App';

type PaymentMode = 'full' | 'token';
type PaymentMethod = 'upi' | 'card' | 'netbanking';
type ModalStep = 'details' | 'selection' | 'processing' | 'success' | 'error';

const CourseModal: React.FC<{ course: Course | null; onClose: () => void }> = ({ course, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<ModalStep>('details');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('full');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  if (!course) return null;

  const handleStartEnrollment = () => setStep('selection');
  
  const handlePayment = async () => {
    setStep('processing');
    setErrorMessage(null);

    const amount = paymentMode === 'full' ? course.fullPrice : course.registrationFee;
    const gst = Math.round(amount * 0.18);
    const total = amount + gst;

    try {
      const response = await fetch('http://localhost:9090/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: user?.name || 'Guest Student',
          studentEmail: user?.email || 'guest@elite.in',
          courseTitle: course.title,
          paymentMode: paymentMode,
          totalAmount: total,
          method: selectedMethod
        })
      });

      if (!response.ok) throw new Error("Backend offline.");

      const data = await response.json();
      setTransactionId(data.txId);
      setStep('success');
    } catch (err: any) {
      setErrorMessage("CONNECTION FAILED: Spring Boot hub at Port 9090 is unreachable.");
      setStep('error');
    }
  };

  const amount = paymentMode === 'full' ? course.fullPrice : course.registrationFee;
  const gst = Math.round(amount * 0.18);
  const total = amount + gst;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white rounded-[3rem] w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl relative animate-scale-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all z-20"
        >
          <X size={24} />
        </button>

        {/* DETAILS STEP */}
        {step === 'details' && (
          <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-3 mb-4">
                    <span className="text-blue-700 font-black text-[9px] uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">Industrial Training</span>
                    {course.duration && <span className="bg-gray-100 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500">{course.duration}</span>}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-none tracking-tighter">{course.title}</h2>
              </div>
              <button 
                onClick={() => window.alert('Elite Curriculum PDF is being generated for ' + course.title)}
                className="flex items-center space-x-3 bg-gray-950 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-gray-900/20 group h-fit"
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Download Syllabus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div className="bg-blue-50/50 p-10 rounded-[3rem] border border-blue-100">
                  <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest mb-6 flex items-center">
                    <Target size={16} className="mr-3" />
                    Strategic Overview
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    {course.description}
                  </p>
                </div>

                {/* Modules */}
                {course.modules && (
                  <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center">
                      <ListChecks size={16} className="mr-3 text-blue-700" />
                      Course Architecture
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.modules.map((module, i) => (
                        <div key={i} className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all">
                          <div className="w-8 h-8 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center font-black text-xs mr-4">0{i+1}</div>
                          <span className="text-gray-700 font-bold text-sm">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Career Outcomes */}
                {course.outcomes && (
                    <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center">
                            <Star size={16} className="mr-3 text-blue-700" />
                            Elite Career Roadmap
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {course.outcomes.map((outcome, i) => (
                                <span key={i} className="bg-white border border-gray-100 px-6 py-3 rounded-xl text-xs font-black text-blue-900 uppercase tracking-widest shadow-sm">
                                    {outcome}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
              </div>

              {/* Pricing Sidebar */}
              <div className="bg-gray-950 text-white p-12 rounded-[4rem] h-fit sticky top-0 shadow-2xl">
                 <h3 className="text-2xl font-black mb-10 tracking-tight">Institutional Enrollment</h3>
                 
                 <div className="space-y-8 mb-12">
                    <div className="pb-6 border-b border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Advance Tuition</p>
                        <p className="text-4xl font-black">₹{course.fullPrice.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Registration Deposit</p>
                        <p className="text-2xl font-black text-blue-500">₹{course.registrationFee.toLocaleString()}</p>
                    </div>
                 </div>

                 <button 
                  onClick={handleStartEnrollment}
                  className="w-full bg-blue-700 text-white py-6 rounded-3xl font-black text-lg hover:bg-blue-600 transition-all flex items-center justify-center group shadow-xl shadow-blue-700/20"
                 >
                    Initialize Access <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                 </button>
                 
                 <div className="mt-8 flex items-center space-x-3 text-gray-500">
                    <ShieldCheck size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Secure Keshava Port 9090 Hub</span>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* SELECTION STEP */}
        {step === 'selection' && (
          <div className="p-10 md:p-14 overflow-y-auto flex flex-col h-full animate-fade-in">
            <button onClick={() => setStep('details')} className="flex items-center text-blue-700 font-black text-xs uppercase tracking-widest mb-10 hover:underline">
              <ArrowRight size={14} className="rotate-180 mr-2" /> Back to Details
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-black mb-10">Enrollment Mode</h2>
                <div className="space-y-6">
                  <div 
                    onClick={() => setPaymentMode('full')}
                    className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${paymentMode === 'full' ? 'border-blue-700 bg-blue-50/50 shadow-xl' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-700 text-white rounded-2xl flex items-center justify-center"><Zap size={24} /></div>
                      <span className="text-2xl font-black">₹{course.fullPrice.toLocaleString()}</span>
                    </div>
                    <h4 className="text-xl font-black mb-2">Full Course Access</h4>
                    <p className="text-xs font-bold text-gray-400">Unlock entire curriculum immediately.</p>
                  </div>

                  <div 
                    onClick={() => setPaymentMode('token')}
                    className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${paymentMode === 'token' ? 'border-blue-700 bg-blue-50/50 shadow-xl' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center"><Wallet size={24} /></div>
                      <span className="text-2xl font-black text-blue-700">₹{course.registrationFee.toLocaleString()}</span>
                    </div>
                    <h4 className="text-xl font-black mb-2">Seat Registration</h4>
                    <p className="text-xs font-bold text-gray-400">Reserve your spot with a token deposit.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-3xl font-black mb-10">Industrial Checkout</h2>
                <div className="space-y-4 mb-10">
                  {[
                    { id: 'upi', label: 'UPI / QR Code', icon: <Smartphone size={18} /> },
                    { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
                    { id: 'netbanking', label: 'Net Banking', icon: <ShieldCheck size={18} /> }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === method.id ? 'border-blue-700 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${selectedMethod === method.id ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-400'}`}>{method.icon}</div>
                        <span className="font-bold text-gray-800">{method.label}</span>
                      </div>
                      {selectedMethod === method.id && <CheckCircle size={18} className="text-blue-700" />}
                    </div>
                  ))}
                </div>

                <div className="mt-auto bg-gray-950 text-white p-10 rounded-[3rem]">
                   <div className="flex justify-between items-center mb-10">
                     <span className="text-xl font-black uppercase text-gray-500 text-[10px] tracking-widest">Payable Hub</span>
                     <span className="text-3xl font-black text-blue-500">₹{total.toLocaleString()}</span>
                   </div>
                   <button 
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center group"
                   >
                     Complete Enrollment <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROCESSING, SUCCESS, ERROR STEPS */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-40 animate-fade-in text-center">
             <div className="relative w-48 h-48 mb-12">
               <div className="absolute inset-0 border-[8px] border-blue-50 rounded-full"></div>
               <div className="absolute inset-0 border-[8px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center"><ShieldCheck size={64} className="text-blue-700 animate-pulse" /></div>
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Synchronizing with Hub</h2>
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Processing via Port 9090</p>
          </div>
        )}

        {step === 'error' && (
          <div className="p-10 md:p-20 text-center animate-scale-up h-full flex flex-col items-center justify-center">
            <div className="w-28 h-28 bg-red-50 text-red-600 rounded-[3rem] flex items-center justify-center mb-12">
              <AlertTriangle size={56} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase leading-tight">{errorMessage || "Connection Error"}</h2>
            <button onClick={() => setStep('selection')} className="bg-gray-900 text-white px-16 py-6 rounded-[2.5rem] font-black text-xl hover:bg-black transition-all">Retry Handshake</button>
          </div>
        )}

        {step === 'success' && (
          <div className="p-10 md:p-20 text-center animate-scale-up h-full flex flex-col items-center justify-center">
            <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mb-12 shadow-sm">
              <CheckCircle size={56} strokeWidth={2.5} />
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Enrollment Activated</h2>
            <p className="text-gray-500 font-medium mb-12">Your industrial credentials have been synced with the Elite Portal.</p>
            <button onClick={onClose} className="bg-gray-900 text-white px-16 py-6 rounded-[2.5rem] font-black text-xl hover:bg-black transition-all">Access Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ category: string; courses: Course[]; icon: string; onSelectCourse: (course: Course) => void; }> = ({ category, courses, icon, onSelectCourse }) => {
  const getIcon = () => {
    switch(icon) {
      case 'terminal': return <Terminal size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'rocket': return <Rocket size={24} />;
      case 'cpu': return <Cpu size={24} />;
      case 'settings': return <Settings size={24} />;
      case 'shield': return <Shield size={24} />;
      case 'database': return <Database size={24} />;
      default: return <Star size={24} />;
    }
  };

  return (
    <div className="bg-white rounded-[3.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
      <div className="p-10 bg-gray-950 text-white flex items-center space-x-6">
        <div className="p-4 bg-blue-700 rounded-2xl group-hover:rotate-6 transition-transform">{getIcon()}</div>
        <h3 className="text-2xl font-black tracking-tighter">{category}</h3>
      </div>
      <div className="p-8 flex-grow">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Program Tracks</p>
        <div className="space-y-4">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-[2rem] transition-all group/item text-left"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm group-hover/item:text-blue-700">
                  <Star size={16} className="fill-current text-gray-200 group-hover/item:text-blue-500" />
                </div>
                <div>
                  <p className="font-black text-gray-900 group-hover/item:text-blue-900 leading-tight">{course.title}</p>
                </div>
              </div>
              <Info size={20} className="text-gray-300 group-hover/item:text-blue-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return COURSE_DATA.filter(category => {
      const matchesFilter = activeFilter === 'All' || category.title === activeFilter;
      const matchesSearch = category.courses.some(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (activeFilter !== 'All') return matchesFilter && matchesSearch;
      
      // If "All" is selected, only show categories that have at least one course matching the search
      return matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    if (selectedCourse) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedCourse]);

  return (
    <div className="bg-white pb-32 min-h-screen">
      <div className="bg-blue-950 py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/10 blur-[200px] rounded-full"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-6 py-2.5 rounded-full mb-10">
            <Globe size={18} className="text-blue-400 animate-spin-slow" />
            <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">Industrial Education Hub</span>
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black text-white mb-10 leading-[0.85] tracking-tighter">
            Acquire Elite <br/><span className="shimmer-text">Credentials.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
            Bridging the divide between academic potential and technical mastery through world-class, industry-aligned curriculums.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20">
        {/* Filter & Search Bar */}
        <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-gray-100 mb-20 flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="flex bg-gray-50 p-2.5 rounded-3xl overflow-x-auto max-w-full custom-scrollbar">
                {['All', ...COURSE_DATA.map(c => c.title)].map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-blue-700 text-white shadow-xl' : 'text-gray-400 hover:text-blue-700'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="relative w-full lg:w-[450px] group">
                <Search size={22} className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-700 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search industrial tracks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-[2.5rem] pl-20 pr-10 py-6 text-base focus:border-blue-700 focus:bg-white outline-none transition-all shadow-inner"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredCategories.map((category, idx) => (
            <CourseCard 
                key={idx} 
                category={category.title} 
                icon={category.icon} 
                courses={category.courses.filter(c => 
                  c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  c.description.toLowerCase().includes(searchQuery.toLowerCase())
                )} 
                onSelectCourse={setSelectedCourse} 
            />
          ))}
        </div>
        
        {filteredCategories.length === 0 && (
            <div className="py-60 text-center animate-fade-in">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100">
                    <Search size={48} className="text-gray-200" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Query Refined Out.</h3>
                <p className="text-gray-400 font-medium text-xl">Adjust your filters or keywords to reveal technical programs.</p>
                <button 
                    onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                    className="mt-10 text-blue-700 font-black text-xs uppercase tracking-widest hover:underline"
                >
                    Reset System Search
                </button>
            </div>
        )}
      </div>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};

export default Courses;
