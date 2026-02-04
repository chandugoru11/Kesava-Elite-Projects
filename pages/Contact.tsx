
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call (CRUD - POST)
    setTimeout(() => {
      console.log("Submitted Data:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-900 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">Contact Us</h1>
        <p className="text-red-500 text-xl max-w-2xl mx-auto">Get in touch with our experts to discuss your requirements.</p>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Talk Technology</h2>
            <p className="text-lg text-gray-600 mb-12">
              Our team is ready to help you plan your next innovation hub. Drop us a message or visit our office.
            </p>

            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="text-red-600" size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Email Support</h4>
                  <p className="text-gray-600 text-lg">{COMPANY_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="text-red-600" size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                  <p className="text-gray-600 text-lg">{COMPANY_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-red-600" size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Office Location</h4>
                  <p className="text-gray-600 text-lg">{COMPANY_INFO.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100">
               <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Partner With Us:</h4>
               <p className="text-gray-600 font-medium">Schools | Colleges | CSR | Government Projects | Innovation Labs</p>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <CheckCircle size={64} className="text-green-500" />
                <h3 className="text-2xl font-bold">Message Sent Successfully!</h3>
                <p className="text-gray-600">Our team will get back to you shortly.</p>
                <button onClick={() => setIsSuccess(false)} className="text-red-600 font-bold underline pt-4">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" id="name" required value={formData.name} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:border-red-600 outline-none transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" id="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:border-red-600 outline-none transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" id="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:border-red-600 outline-none transition-colors" 
                    placeholder="+91 00000 00000" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message" rows={5} required value={formData.message} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:border-red-600 outline-none transition-colors resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-red-600 text-white font-bold py-5 rounded-xl flex items-center justify-center space-x-3 hover:bg-red-700 transition-all disabled:bg-gray-400"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
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
