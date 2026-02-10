
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert, ChevronDown, Globe, MessageSquare, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

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
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Direct communication for institutional partnerships and technical recovery protocols.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight uppercase">Support Network</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                Our centralized hub at <span className="text-blue-700 font-black">info@keshavaeliteprojects.in</span> ensures your inquiry is routed to the correct technical node.
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

            <div className="bg-blue-50 p-12 rounded-[4rem] border border-blue-100 flex items-start space-x-8">
              <ShieldAlert className="text-blue-700 shrink-0" size={32} />
              <div>
                <h5 className="text-lg font-black text-gray-900 mb-3 tracking-tight">Recovery Protocol</h5>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Lost access to your LMS hub? Use the form to trigger a manual identity verification. Please specify your batch reference.
                </p>
              </div>
            </div>
          </div>

          <div id="contact-form" className="bg-white p-14 rounded-[4.5rem] border border-gray-100 shadow-[0_60px_100px_-40px_rgba(29,78,216,0.15)] relative">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20 animate-scale-up">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center border border-green-100 shadow-sm">
                  <CheckCircle size={56} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Handshake Received</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto">Your message has been queued in the Elite Hub. Expect a response shortly.</p>
                <button onClick={() => setIsSuccess(false)} className="text-blue-700 font-black text-[10px] uppercase tracking-[0.3em] hover:underline">Draft New Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Identity</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="Full Name" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Inquiry Node</label>
                    <div className="relative">
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none appearance-none font-bold">
                        <option value="general">General Support</option>
                        <option value="recovery">Account Recovery</option>
                        <option value="partnership">Institutional Partner</option>
                        <option value="career">Career Hub</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Contact Endpoint</label>
                  <input type="email" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:border-blue-700 outline-none transition-all font-bold" placeholder="Email Address" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Message Packet</label>
                  <textarea rows={6} required className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-5 text-sm focus:border-blue-700 outline-none resize-none transition-all font-bold" placeholder="How can we assist?"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-700 text-white font-black py-7 rounded-[2rem] flex items-center justify-center space-x-4 hover:bg-blue-800 transition-all shadow-2xl shadow-blue-700/20">
                  {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                    <>
                      <span className="text-lg uppercase tracking-widest">Broadcast Message</span>
                      <Send size={22} />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center space-x-3 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
                   <Terminal size={12} />
                   <span>Secured via Elite Node Protocol</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
