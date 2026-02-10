
import React, { useState, useEffect, useMemo } from 'react';
import { Terminal, Briefcase, Rocket, Star, Info, X, Clock, CheckCircle, ArrowLeft, ArrowRight, CreditCard, ShieldCheck, Zap, Wallet, Smartphone, ChevronRight, Receipt, Loader2, AlertTriangle, FileText, Download, Target, ListChecks, Cpu, Settings, Search, Shield, Database, Globe, Layers } from 'lucide-react';
import { COURSE_DATA } from '../constants';
import { Course } from '../types';
import { useAuth } from '../AuthContext.tsx';

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-xl animate-fade-in">
      <div 
        className="bg-white rounded-[4rem] w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative animate-scale-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Header */}
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={onClose}
            className="group flex items-center space-x-3 bg-gray-50 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-gray-500 shadow-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Menu</span>
          </button>
          
          <button 
            onClick={onClose}
            className="p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* DETAILS STEP */}
        {step === 'details' && (
          <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-10">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-4 mb-6">
                    <span className="text-blue-700 font-black text-[9px] uppercase tracking-[0.4em] bg-blue-50 px-5 py-2 rounded-full border border-blue-100">Industrial Program Track</span>
                    {course.duration && <span className="bg-gray-100 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500">{course.duration}</span>}
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tighter mb-8">{course.title}</h2>
                <p className="text-gray-500 text-2xl font-medium leading-relaxed">
                   Master the industrial standard of {course.title} with our elite curriculum.
                </p>
              </div>
              <button 
                onClick={() => window.alert('Curriculum Packet Synced: ' + course.title)}
                className="flex items-center space-x-4 bg-gray-950 text-white px-10 py-6 rounded-3xl hover:bg-blue-700 transition-all shadow-2xl shadow-gray-900/20 group h-fit mt-4"
              >
                <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curriculum Sync</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-16">
                {/* Tech Stack Covered */}
                <div className="bg-blue-950 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
                   <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-10 flex items-center">
                      <Layers size={18} className="mr-4" /> Technologies Covered
                   </h4>
                   <div className="flex flex-wrap gap-4">
                      {course.features?.map((tech, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center space-x-3 group hover:bg-white/10 transition-colors">
                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                           <span className="text-sm font-black tracking-tight">{tech}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Modules */}
                {course.modules && (
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10 flex items-center px-4">
                      <ListChecks size={18} className="mr-4 text-blue-700" />
                      Program Architecture
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {course.modules.map((module, i) => (
                        <div key={i} className="flex items-center p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:border-blue-700/20 transition-all group">
                          <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:bg-blue-700 group-hover:text-white rounded-2xl flex items-center justify-center font-black text-xs mr-6 transition-all">0{i+1}</div>
                          <span className="text-gray-800 font-bold text-lg">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Sidebar */}
              <div className="bg-gray-50 p-12 rounded-[4.5rem] h-fit sticky top-32 border border-gray-100 shadow-sm">
                 <h3 className="text-3xl font-black mb-12 tracking-tighter uppercase text-gray-900 leading-none">Enrollment <br/>Protocol.</h3>
                 
                 <div className="space-y-10 mb-14">
                    <div className="pb-8 border-b border-gray-200">
                        <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-3">Advance Tuition</p>
                        <p className="text-5xl font-black text-gray-900 tracking-tighter">₹{course.fullPrice.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Registration Node</p>
                        <p className="text-3xl font-black text-blue-600">₹{course.registrationFee.toLocaleString()}</p>
                    </div>
                 </div>

                 <button 
                  onClick={handleStartEnrollment}
                  className="w-full bg-blue-700 text-white py-8 rounded-[2.5rem] font-black text-xl hover:bg-blue-800 transition-all flex items-center justify-center group shadow-2xl shadow-blue-700/30"
                 >
                    Initialize Access <ArrowRight size={22} className="ml-4 group-hover:translate-x-2 transition-transform" />
                 </button>
                 
                 <div className="mt-10 flex items-center space-x-4 text-gray-400 justify-center">
                    <ShieldCheck size={18} className="text-blue-700" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Secure Elite Port 9090</span>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Steps (Selection, Processing, Success) */}
        {step === 'selection' && (
          <div className="p-10 md:p-14 overflow-y-auto flex flex-col h-full animate-fade-in">
            <button onClick={() => setStep('details')} className="flex items-center text-blue-700 font-black text-xs uppercase tracking-widest mb-10 hover:underline">
              <ArrowLeft size={16} className="mr-3" /> Back to Overview
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-4xl font-black mb-12 tracking-tight uppercase">Tuition Node</h2>
                <div className="space-y-8">
                  <div 
                    onClick={() => setPaymentMode('full')}
                    className={`p-10 rounded-[3.5rem] border-4 cursor-pointer transition-all ${paymentMode === 'full' ? 'border-blue-700 bg-blue-50/50 shadow-2xl' : 'border-gray-50 bg-white hover:border-blue-100'}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-blue-700 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl"><Zap size={28} /></div>
                      <span className="text-4xl font-black text-gray-900">₹{course.fullPrice.toLocaleString()}</span>
                    </div>
                    <h4 className="text-2xl font-black mb-3">Elite Package</h4>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Immediate Full Access Synchronized</p>
                  </div>

                  <div 
                    onClick={() => setPaymentMode('token')}
                    className={`p-10 rounded-[3.5rem] border-4 cursor-pointer transition-all ${paymentMode === 'token' ? 'border-blue-700 bg-blue-50/50 shadow-2xl' : 'border-gray-50 bg-white hover:border-blue-100'}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-gray-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl"><Wallet size={28} /></div>
                      <span className="text-3xl font-black text-blue-700">₹{course.registrationFee.toLocaleString()}</span>
                    </div>
                    <h4 className="text-2xl font-black mb-3">Seat Protocol</h4>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Reserve Node with Deposit</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-4xl font-black mb-12 tracking-tight uppercase">Checkout Protocol</h2>
                <div className="space-y-6 mb-12">
                  {[
                    { id: 'upi', label: 'UPI / Unified QR', icon: <Smartphone size={20} /> },
                    { id: 'card', label: 'Corporate Card', icon: <CreditCard size={20} /> },
                    { id: 'netbanking', label: 'Institutional Banking', icon: <ShieldCheck size={20} /> }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                      className={`flex items-center justify-between p-8 rounded-[2rem] border-2 cursor-pointer transition-all ${selectedMethod === method.id ? 'border-blue-700 bg-blue-50' : 'border-gray-50 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center space-x-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${selectedMethod === method.id ? 'bg-blue-700 text-white shadow-lg' : 'bg-white text-gray-300'}`}>{method.icon}</div>
                        <span className="font-black text-gray-800 uppercase text-xs tracking-widest">{method.label}</span>
                      </div>
                      {selectedMethod === method.id && <CheckCircle size={24} className="text-blue-700" />}
                    </div>
                  ))}
                </div>

                <div className="mt-auto bg-gray-950 text-white p-12 rounded-[4rem] shadow-2xl">
                   <div className="flex justify-between items-center mb-10">
                     <span className="text-xl font-black uppercase text-gray-500 text-[10px] tracking-[0.4em]">Total Payable</span>
                     <span className="text-4xl font-black text-blue-500 tracking-tighter">₹{total.toLocaleString()}</span>
                   </div>
                   <button 
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-8 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center group"
                   >
                     Complete Handshake <ChevronRight size={28} className="ml-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error/Success/Processing */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-60 animate-fade-in text-center h-full">
             <div className="relative w-56 h-56 mb-16">
               <div className="absolute inset-0 border-[10px] border-blue-50 rounded-full"></div>
               <div className="absolute inset-0 border-[10px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center"><Terminal size={80} className="text-blue-700 animate-pulse" /></div>
             </div>
             <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Synchronizing...</h2>
             <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px]">Processing via Elite Hub Port 9090</p>
          </div>
        )}

        {step === 'error' && (
          <div className="p-10 md:p-20 text-center animate-scale-up h-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-red-50 text-red-600 rounded-[3rem] flex items-center justify-center mb-12 border border-red-100 shadow-sm">
              <AlertTriangle size={64} />
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">{errorMessage || "Protocol Error"}</h2>
            <button onClick={() => setStep('selection')} className="bg-gray-950 text-white px-20 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-black transition-all shadow-xl">Retry Handshake</button>
          </div>
        )}

        {step === 'success' && (
          <div className="p-10 md:p-20 text-center animate-scale-up h-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mb-12 shadow-xl border border-green-100">
              <CheckCircle size={64} strokeWidth={2.5} />
            </div>
            <h2 className="text-6xl font-black text-gray-900 mb-8 tracking-tighter uppercase">Access Granted</h2>
            <p className="text-gray-500 text-2xl font-medium mb-16 max-w-2xl mx-auto italic leading-relaxed">Industrial credentials have been synchronized with your Elite ID.</p>
            <button onClick={onClose} className="bg-blue-700 text-white px-20 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-black transition-all shadow-2xl">Access Elite Portal</button>
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
    <div className="bg-white rounded-[4rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-[0_50px_100px_-20px_rgba(29,78,216,0.1)] transition-all duration-700">
      <div className="p-12 bg-gray-950 text-white flex items-center space-x-8">
        <div className="p-5 bg-blue-700 rounded-2xl group-hover:rotate-6 transition-transform shadow-xl shadow-blue-900/40">{getIcon()}</div>
        <h3 className="text-3xl font-black tracking-tighter uppercase">{category}</h3>
      </div>
      <div className="p-10 flex-grow">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10 border-b border-gray-50 pb-6">Available Program Tracks</p>
        <div className="space-y-5">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="w-full flex items-center justify-between p-8 bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-700/10 rounded-[2.5rem] transition-all group/item text-left"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mr-6 shadow-sm group-hover/item:shadow-lg transition-all">
                  <Star size={18} className="fill-current text-gray-200 group-hover/item:text-blue-500" />
                </div>
                <div>
                  <p className="font-black text-xl text-gray-900 group-hover/item:text-blue-900 leading-tight tracking-tight">{course.title}</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Enrollment Active</p>
                </div>
              </div>
              <Info size={24} className="text-gray-200 group-hover/item:text-blue-400 transition-colors" />
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
      return (activeFilter === 'All' ? matchesSearch : matchesFilter && matchesSearch);
    });
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    if (selectedCourse) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedCourse]);

  return (
    <div className="bg-white pb-48 min-h-screen">
      <div className="bg-blue-950 py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/10 blur-[200px] rounded-full"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-4 bg-blue-600/10 border border-blue-600/20 px-10 py-4 rounded-full mb-12">
            <Globe size={20} className="text-blue-400 animate-spin-slow" />
            <span className="text-blue-400 font-black tracking-[0.5em] uppercase text-[10px]">Technical Excellence Hub</span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black text-white mb-12 leading-[0.8] tracking-tighter">
            Acquire Elite <br/><span className="shimmer-text">Credentials.</span>
          </h1>
          <p className="text-gray-400 text-2xl md:text-3xl max-w-5xl mx-auto leading-relaxed font-medium">
            Bridging the divide between academic potential and technical mastery through industrial-grade certifications.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="bg-white p-12 rounded-[5rem] shadow-2xl border border-gray-100 mb-32 flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="flex bg-gray-50 p-3 rounded-[3rem] overflow-x-auto max-w-full custom-scrollbar border border-gray-100">
                {['All', ...COURSE_DATA.map(c => c.title)].map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-blue-700 text-white shadow-2xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="relative w-full lg:w-[500px] group">
                <Search size={28} className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-700 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search technical tracks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent rounded-[3rem] pl-24 pr-12 py-8 text-xl focus:border-blue-700 focus:bg-white outline-none transition-all shadow-inner font-bold"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
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
                <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-12 border-2 border-dashed border-gray-200">
                    <Search size={64} className="text-gray-200" />
                </div>
                <h3 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">No Nodes Found.</h3>
                <p className="text-gray-400 font-medium text-2xl max-w-xl mx-auto italic">Adjust your search parameters to find the industrial track you're looking for.</p>
                <button 
                    onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                    className="mt-16 bg-blue-700 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-700/20"
                >
                    Reset Portal Query
                </button>
            </div>
        )}
      </div>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};

export default Courses;
