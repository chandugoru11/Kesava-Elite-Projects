
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { ContactFormData } from '../types';

interface ExtendedContactFormData extends ContactFormData {
  inquiryType: 'general' | 'partnership' | 'recovery' | 'career';
}

const Contact: React.FC = () => {
  const { hash } = useLocation();
  const [formData, setFormData] = useState<ExtendedContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (hash === '#recovery') {
      setFormData(prev => ({ ...prev, inquiryType: 'recovery' }));
      const element = document.getElementById('contact-form');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const recipient = "info@keshavaeliteprojects.in";
    const isRecovery = formData.inquiryType === 'recovery';
    
    const subject = isRecovery 
      ? `LMS RECOVERY REQUEST: ${formData.name} (${formData.email})`
      : `New Inquiry from ${formData.name} - ${formData.inquiryType.toUpperCase()}`;
    
    const body = isRecovery 
? `LMS ACCOUNT RECOVERY TICKET
--------------------------------------------------
REQUESTER DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

STATUS: Student lost access to registered mobile/email.
ADMIN ACTION REQUIRED: Please verify student identity, enter their email in the system to trigger a new login link and password reset.

MESSAGE:
${formData.message}
--------------------------------------------------`
: `Hello Keshava Elite Team,

New ${formData.inquiryType} inquiry received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', inquiryType: 'general' });
      setTimeout(() => setIsSuccess(false), 8000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="bg-white">
      {/* Header Section - Shifted to Deep Blue Gradient */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10">Connect <span className="text-blue-500">Elite</span></h1>
        <p className="text-blue-300 text-xl max-w-2xl mx-auto relative z-10 font-medium">Dedicated support for the pioneers of the technical world.</p>
      </div>

      <div className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-10 leading-tight">Official Channels of <br/>Administration</h2>
            <p className="text-lg text-gray-500 mb-16 leading-relaxed font-medium">
              Our support team at <span className="text-blue-700 font-bold">info@keshavaeliteprojects.in</span> operates as a centralized hub for all institutional recoveries and elite partnerships.
            </p>

            <div className="space-y-12">
              <div className="flex items-start space-x-8 p-8 rounded-[2.5rem] bg-gray-50 hover:bg-blue-50 transition-all border border-gray-100 hover:border-blue-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="text-blue-700" size={30} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-xs tracking-[0.3em] uppercase mb-2">Administrative Hub</h4>
                  <p className="text-gray-600 text-xl font-bold">{COMPANY_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-8 p-8 rounded-[2.5rem] bg-gray-50 hover:bg-blue-50 transition-all border border-gray-100 hover:border-blue-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="text-blue-700" size={30} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-xs tracking-[0.3em] uppercase mb-2">Technical Support</h4>
                  <p className="text-gray-600 text-xl font-bold">{COMPANY_INFO.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-16 border-t border-gray-100">
               <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 flex items-start space-x-8">
                 <ShieldAlert className="text-blue-700 shrink-0 mt-1" size={28} />
                 <div>
                   <h5 className="font-black text-gray-900 text-lg mb-3">Security & Recovery Protocols</h5>
                   <p className="text-gray-600 leading-relaxed font-medium">
                     Students requesting account recovery should provide their full course details for manual identity verification. Verified access will be granted within 24 business hours.
                   </p>
                 </div>
               </div>
            </div>
          </div>

          <div id="contact-form" className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-[0_50px_100px_-30px_rgba(29,78,216,0.1)] relative overflow-hidden">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in py-16">
                <div className="w-24 h-24 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle size={56} />
                </div>
                <h3 className="text-3xl font-black">Email Generated!</h3>
                <p className="text-gray-500 font-medium px-10">Your default mail client has been opened. Please hit "Send" in your application to transmit your inquiry to our administration.</p>
                <button onClick={() => setIsSuccess(false)} className="text-blue-700 font-black text-sm uppercase tracking-widest pt-6 hover:underline">Draft another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Full Identity</label>
                    <input 
                      type="text" id="name" required value={formData.name} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all" 
                      placeholder="e.g. Rahul Sharma" 
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Inquiry Category</label>
                    <div className="relative">
                      <select 
                        id="inquiryType" value={formData.inquiryType} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none appearance-none cursor-pointer"
                      >
                        <option value="general">General Support</option>
                        <option value="partnership">Institutional Partnership</option>
                        <option value="recovery">LMS Recovery (Admin-led)</option>
                        <option value="career">Elite Careers</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="email" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Contact Email</label>
                    <input 
                      type="email" id="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Primary Phone</label>
                    <input 
                      type="tel" id="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all" 
                      placeholder="+91 00000 00000" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Detailed Message</label>
                  <textarea 
                    id="message" rows={5} required value={formData.message} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none resize-none transition-all" 
                    placeholder={formData.inquiryType === 'recovery' ? "Which institution are you from? Describe your lost access..." : "Briefly explain your requirement..."}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-blue-700 text-white font-black py-6 rounded-3xl flex items-center justify-center space-x-4 hover:bg-blue-800 transition-all shadow-2xl shadow-blue-700/20 disabled:bg-gray-400"
                >
                  {isSubmitting ? (
                    <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="text-lg">{formData.inquiryType === 'recovery' ? 'Submit Recovery Case' : 'Initialize Contact'}</span>
                      <Send size={22} />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 text-center font-black uppercase tracking-[0.3em]">
                  Managed by Keshava Elite Administration
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
