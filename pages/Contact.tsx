import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert, ChevronDown, Globe, MessageSquare, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../constants.tsx';

const Contact: React.FC = () => {
  const { hash } = useLocation();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (hash === '#recovery') {
      setFormData(prev => ({ ...prev, inquiryType: 'recovery' }));
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Header Tier */}
      <div className="bg-blue-950 py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
            <MessageSquare size={18} className="text-blue-400" />
            <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px]">Administrative Liaison</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Corporate <br/><span className="shimmer-text">Interface.</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight uppercase">Support Network</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                Direct communication for institutional partnerships and technical recovery protocols.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: <Mail />, label: 'Administrative Hub', value: COMPANY_INFO.email },
                { icon: <Phone />, label: 'Operations Desk', value: COMPANY_INFO.phone },
                { icon: <Globe />, label: 'Corporate HQ', value: COMPANY_INFO.address }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-8 p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:border-blue-700/20 hover:bg-white hover:shadow-2xl transition-all">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm border border-gray-100">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">{item.label}</h4>
                    <p className="text-xl font-black text-gray-800 tracking-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="contact-form" className="bg-white p-14 rounded-[4.5rem] border border-gray-100 shadow-[0_60px_100px_-40px_rgba(29,78,216,0.15)] relative">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20 animate-scale-up">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center border border-green-100 shadow-sm">
                  <CheckCircle size={56} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Handshake Received</h3>
                <button onClick={() => setIsSuccess(false)} className="text-blue-700 font-black text-[10px] uppercase tracking-[0.3em] hover:underline">Draft New Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="Full Name" />
                <input type="email" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="Email Address" />
                <textarea rows={6} required className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-5 text-sm focus:border-blue-700 outline-none resize-none transition-all font-bold" placeholder="How can we assist?"></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 text-white font-black py-7 rounded-[2rem] flex items-center justify-center space-x-4 hover:bg-blue-800 transition-all shadow-2xl shadow-blue-700/20">
                  <span className="text-lg uppercase tracking-widest">Broadcast Message</span>
                  <Send size={22} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;