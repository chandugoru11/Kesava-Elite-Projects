
import React, { useState, useEffect } from 'react';
import { Terminal, Briefcase, Rocket, Star, Info, X, Clock, CheckCircle, ArrowRight, CreditCard, ShieldCheck, Zap, Wallet, Smartphone, ChevronRight, Receipt, Loader2 } from 'lucide-react';
import { COURSE_DATA } from '../constants';
import { Course } from '../types';

type PaymentMode = 'full' | 'token';
type PaymentMethod = 'upi' | 'card' | 'netbanking';
type ModalStep = 'details' | 'selection' | 'processing' | 'success';

const CourseModal: React.FC<{ course: Course | null; onClose: () => void }> = ({ course, onClose }) => {
  const [step, setStep] = useState<ModalStep>('details');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('full');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');

  if (!course) return null;

  const handleStartEnrollment = () => setStep('selection');
  
  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 3000);
  };

  const amount = paymentMode === 'full' ? course.fullPrice : course.registrationFee;
  const gst = Math.round(amount * 0.18);
  const total = amount + gst;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-scale-up flex flex-col"
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
          <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
              <div>
                <span className="text-blue-700 font-black text-[10px] uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full mb-4 inline-block">Professional Certification</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter">{course.title}</h2>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 px-6 py-3 rounded-2xl text-gray-600 font-black text-sm w-fit border border-gray-100">
                <Clock size={20} className="text-blue-700" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <Info size={16} className="mr-2 text-blue-700" />
                    Curriculum Overview
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed bg-blue-50/50 p-8 rounded-[2rem] border-l-8 border-blue-700">
                    {course.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Industrial Skillset</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-700/30 transition-all">
                        <CheckCircle size={20} className="text-green-500 mr-4 shrink-0" />
                        <span className="text-gray-700 font-bold text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col">
                <h3 className="text-2xl font-black mb-8 text-gray-900">Enrollment Portal</h3>
                
                <div className="space-y-6 mb-10">
                   <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                     <span className="text-gray-500 font-bold">Pre-Payment (Full)</span>
                     <span className="text-2xl font-black text-gray-900">₹{course.fullPrice.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-500 font-bold">Post-Payment (Token)</span>
                     <span className="text-xl font-black text-blue-700">₹{course.registrationFee.toLocaleString()}</span>
                   </div>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-relaxed">
                     *Post-payment allows you to reserve a seat by paying only the registration fee now. The balance is due on batch commencement.
                   </p>
                </div>

                <div className="mt-auto space-y-4">
                  <button 
                    onClick={handleStartEnrollment}
                    className="w-full bg-blue-700 text-white px-10 py-6 rounded-3xl font-black text-xl hover:bg-blue-800 transition-all flex items-center justify-center shadow-2xl shadow-blue-700/20 group"
                  >
                    Enroll Now <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Secured by Elite SSL Encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SELECTION & PAYMENT STEP */}
        {step === 'selection' && (
          <div className="p-10 md:p-14 overflow-y-auto flex flex-col h-full animate-fade-in">
            <button onClick={() => setStep('details')} className="flex items-center text-blue-700 font-black text-xs uppercase tracking-widest mb-10 hover:underline">
              <ArrowRight size={14} className="rotate-180 mr-2" /> Back to Details
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-black mb-10">Select Enrollment Mode</h2>
                <div className="space-y-6">
                  {/* Pre-Payment Option */}
                  <div 
                    onClick={() => setPaymentMode('full')}
                    className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${paymentMode === 'full' ? 'border-blue-700 bg-blue-50/50 shadow-xl' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-700 text-white rounded-2xl flex items-center justify-center">
                        <Zap size={24} />
                      </div>
                      <span className="text-2xl font-black">₹{course.fullPrice.toLocaleString()}</span>
                    </div>
                    <h4 className="text-xl font-black mb-2">Pre-Payment (Full Access)</h4>
                    <p className="text-sm text-gray-500 font-medium">Unlock full LMS resources, project repositories, and placement portal immediately.</p>
                  </div>

                  {/* Post-Payment Option */}
                  <div 
                    onClick={() => setPaymentMode('token')}
                    className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${paymentMode === 'token' ? 'border-blue-700 bg-blue-50/50 shadow-xl' : 'border-gray-100 bg-white hover:border-blue-200'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center">
                        <Wallet size={24} />
                      </div>
                      <span className="text-2xl font-black text-blue-700">₹{course.registrationFee.toLocaleString()}</span>
                    </div>
                    <h4 className="text-xl font-black mb-2">Post-Payment (Reserve Seat)</h4>
                    <p className="text-sm text-gray-500 font-medium">Pay registration fee now. Pay balance of ₹{(course.fullPrice - course.registrationFee).toLocaleString()} after demo session.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-3xl font-black mb-10">Payment Method</h2>
                <div className="space-y-4 mb-10">
                  {[
                    { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: <Smartphone size={18} /> },
                    { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
                    { id: 'netbanking', label: 'Net Banking', icon: <ShieldCheck size={18} /> }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === method.id ? 'border-blue-700 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${selectedMethod === method.id ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {method.icon}
                        </div>
                        <span className="font-bold text-gray-800">{method.label}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-blue-700' : 'border-gray-200'}`}>
                        {selectedMethod === method.id && <div className="w-3 h-3 bg-blue-700 rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto bg-gray-950 text-white p-10 rounded-[3rem]">
                   <div className="flex justify-between mb-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                     <span>Course Fee</span>
                     <span className="text-white">₹{amount.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between mb-8 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                     <span>GST (18%)</span>
                     <span className="text-white">₹{gst.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center mb-10 pt-6 border-t border-white/10">
                     <span className="text-xl font-black">Total Payable</span>
                     <span className="text-3xl font-black text-blue-500">₹{total.toLocaleString()}</span>
                   </div>
                   <button 
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center group"
                   >
                     Pay Securely <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROCESSING STEP */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-40 animate-fade-in">
             <div className="relative w-48 h-48 mb-12">
               <div className="absolute inset-0 border-[8px] border-blue-50 rounded-full"></div>
               <div className="absolute inset-0 border-[8px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <ShieldCheck size={64} className="text-blue-700 animate-pulse" />
               </div>
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Encrypting Payment</h2>
             <p className="text-gray-400 font-black text-xs uppercase tracking-[0.4em]">Do not refresh or close the window</p>
          </div>
        )}

        {/* SUCCESS STEP */}
        {step === 'success' && (
          <div className="p-10 md:p-20 text-center animate-scale-up h-full flex flex-col items-center justify-center">
            <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mb-12 shadow-sm">
              <CheckCircle size={56} strokeWidth={2.5} />
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Enrollment Success</h2>
            <p className="text-gray-500 font-medium text-xl mb-12 max-w-xl">
              Welcome to the Elite program. Your registration for <span className="text-blue-700 font-black">{course.title}</span> is confirmed.
            </p>

            <div className="bg-gray-50 p-10 rounded-[3rem] w-full max-w-xl border border-gray-100 mb-12 text-left space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Receipt className="text-blue-700" size={24} />
                <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Digital Receipt</h4>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400">Transaction ID</span>
                <span className="font-mono">#KESHAVA_{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400">Date & Time</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-4 border-t border-gray-200">
                <span className="text-gray-900 uppercase">Amount Paid</span>
                <span className="text-blue-700">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="bg-gray-900 text-white px-16 py-6 rounded-[2.5rem] font-black text-xl hover:bg-black transition-all shadow-2xl"
            >
              Go to Dashboard
            </button>
          </div>
        )}
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
    <div className="bg-white rounded-[3.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
      <div className="p-10 bg-gray-950 text-white flex items-center space-x-6">
        <div className="p-4 bg-blue-700 rounded-2xl group-hover:rotate-6 transition-transform">
          {getIcon()}
        </div>
        <h3 className="text-2xl font-black tracking-tighter">{title}</h3>
      </div>
      
      <div className="p-8 flex-grow">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Course Modules</p>
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
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Starting from ₹{course.registrationFee.toLocaleString()}</p>
                </div>
              </div>
              <Info size={20} className="text-gray-300 group-hover/item:text-blue-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-10 py-8 bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest">
          <span className="flex items-center"><ShieldCheck size={12} className="mr-1 text-blue-700" /> Secure Payment</span>
          <span className="flex items-center"><Zap size={12} className="mr-1 text-blue-700" /> Instant Access</span>
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
    <div className="bg-white pb-32 min-h-screen">
      <div className="bg-blue-950 py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-6 py-2 rounded-full mb-8">
            <span className="text-blue-400 font-black tracking-widest uppercase text-[10px]">Elite Professional Hub</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            Elevate Your <br/><span className="text-blue-500 italic">Core Potential.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-4xl mx-auto font-medium opacity-90 leading-relaxed">
            Acquire industrial credentials with our streamlined digital enrollment process. Choose between full access or seated reservation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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

      {/* Trust Badges */}
      <section className="mt-40 container mx-auto px-6">
        <div className="bg-gray-50 rounded-[4rem] p-16 md:p-24 border border-gray-100 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-20 tracking-tight">Our Elite Learning Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <ShieldCheck size={40} />, title: "ISO Accredited", desc: "Global quality standards in technical training." },
              { icon: <Zap size={40} />, title: "Live Bootcamps", desc: "Interactive sessions with industry specialists." },
              { icon: <Briefcase size={40} />, title: "Placement Hub", desc: "Direct bridge to elite corporate partners." },
              { icon: <Terminal size={40} />, title: "Labs-on-Cloud", desc: "Access high-end hardware remotely." }
            ].map((standard, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white text-blue-700 rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-gray-100 hover:scale-105 transition-transform">
                  {standard.icon}
                </div>
                <h4 className="text-xl font-black mb-3">{standard.title}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{standard.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Modal for Details & Payment */}
      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </div>
  );
};

export default Courses;
