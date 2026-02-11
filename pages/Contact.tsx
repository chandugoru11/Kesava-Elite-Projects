
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, 
  Globe, Building2, Landmark, GraduationCap, Lightbulb, 
  ChevronDown, ClipboardList, ShieldCheck, Zap, UserPlus, 
  Handshake, HelpCircle, Heart, Star
} from 'lucide-react';
import { COMPANY_INFO } from '../constants.tsx';

const Contact: React.FC = () => {
  const { hash } = useLocation();
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    message: '', 
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (hash === '#recovery' || hash === '#approval') {
      setFormData(prev => ({ ...prev, inquiryType: 'lms-approval' }));
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation of institutional broadcast
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, inquiryType: type }));
  };

  const inquiryOptions = [
    { value: 'lms-approval', label: 'LMS Account Approval', icon: <ShieldCheck size={18} /> },
    { value: 'stem-lab', label: 'STEM Lab Installation', icon: <Zap size={18} /> },
    { value: 'coe-setup', label: 'CoE Hub Setup', icon: <Building2 size={18} /> },
    { value: 'partnership', label: 'Institutional Partner', icon: <Handshake size={18} /> },
    { value: 'training', label: 'Student Training', icon: <GraduationCap size={18} /> },
    { value: 'general', label: 'General Enquiry', icon: <HelpCircle size={18} /> }
  ];

  return (
    <div className="bg-white">
      {/* Header Tier */}
      <div className="bg-blue-950 py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-animated-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
            <MessageSquare size={18} className="text-blue-400" />
            <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">Institutional Liaison</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Elite <br/><span className="shimmer-text">Connectivity.</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight uppercase">Authorized Channels</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                Direct communication for robotics lab deployments, institutional CoE hubs, and professional certification programs.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: <Mail />, label: 'Official Correspondence', value: COMPANY_INFO.email },
                { icon: <Phone />, label: 'Liaison Desk', value: COMPANY_INFO.phone },
                { icon: <Globe />, label: 'Administrative HQ', value: COMPANY_INFO.address }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-8 p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:border-blue-700/20 hover:bg-white hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm border border-gray-100 group-hover:bg-blue-700 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">{item.label}</h4>
                    <p className="text-xl font-black text-gray-800 tracking-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Categories */}
            <div className="pt-16 border-t border-gray-100">
               <h3 className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em] mb-12">Who We Partner With</h3>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: 'Schools', icon: <GraduationCap size={16} /> },
                   { label: 'Colleges', icon: <Building2 size={16} /> },
                   { label: 'CSR Projects', icon: <HeartIcon /> },
                   { label: 'Govt Projects', icon: <Landmark size={16} /> },
                   { label: 'Innovation Labs', icon: <Lightbulb size={16} /> }
                 ].map((p, i) => (
                   <div key={i} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-blue-700">{p.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">{p.label}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div id="contact-form" className="bg-white p-14 rounded-[4.5rem] border border-gray-100 shadow-[0_60px_100px_-40px_rgba(29,78,216,0.15)] relative">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20 animate-scale-up">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center border border-green-100 shadow-sm">
                  <CheckCircle size={56} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Signal Received</h3>
                <p className="text-gray-500 font-medium">Your inquiry is being routed to the relevant technical department.</p>
                <button onClick={() => setIsSuccess(false)} className="text-blue-700 font-black text-[10px] uppercase tracking-[0.3em] hover:underline">Draft New Signal</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Identity</label>
                    <input name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="e.g. Rakesh V" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Auth Email</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="name@institution.in" />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Contact Node (Phone)</label>
                    <input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="+91 XXXXX XXXXX" />
                </div>

                {/* VISIBLE SUGGESTIONS GRID - Replaces Select Dropdown */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-700 ml-2">How can we assist your institution?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {inquiryOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleTypeSelect(opt.value)}
                        className={`flex items-center space-x-3 p-4 rounded-2xl border text-left transition-all ${
                          formData.inquiryType === opt.value 
                          ? 'bg-blue-700 border-blue-700 text-white shadow-lg' 
                          : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-blue-300'
                        }`}
                      >
                        <span className={`${formData.inquiryType === opt.value ? 'text-white' : 'text-blue-700'}`}>
                          {opt.icon}
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-tight">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Detailed Message</label>
                  <textarea name="message" rows={5} required value={formData.message} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-5 text-sm focus:border-blue-700 outline-none resize-none transition-all font-bold" placeholder="Provide specific details about your institutional requirements..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 text-white font-black py-7 rounded-[2rem] flex items-center justify-center space-x-4 hover:bg-blue-800 transition-all shadow-2xl shadow-blue-700/20 group">
                  <span className="text-lg uppercase tracking-widest">{isSubmitting ? 'Syncing...' : 'Broadcast Transmission'}</span>
                  <Send size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default Contact;
