
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Smartphone, ShieldCheck, AlertCircle, Wifi, Server, Shield, UserCircle, Briefcase, Database, Inbox } from 'lucide-react';
import { useAuth } from '../App';
import { simulateJWT } from '../utils/jwtUtils';

type AuthView = 'login' | 'signup' | 'connecting' | 'success';
type UserRole = 'student' | 'admin';

const InputField = ({ icon: Icon, rightIcon: RightIcon, onRightIconClick, ...props }: any) => (
  <div className="relative group">
    {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-700 transition-colors" size={18} />}
    <input 
      {...props}
      className={`w-full bg-gray-50 border border-gray-200 rounded-2xl ${Icon ? 'pl-14' : 'px-6'} ${RightIcon ? 'pr-14' : 'px-6'} py-4 text-sm focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 font-medium`}
    />
    {RightIcon && (
      <button 
        type="button" 
        onClick={onRightIconClick} 
        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
      >
        <RightIcon size={18} />
      </button>
    )}
  </div>
);

const RoleSelector = ({ role, setRole, variant = 'blue' }: { role: UserRole, setRole: (r: UserRole) => void, variant?: 'blue' | 'dark' }) => (
  <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full max-w-[280px] mx-auto mb-10 border border-gray-200">
    <button 
      type="button"
      onClick={() => setRole('student')}
      className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'student' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-400'}`}
    >
      <UserCircle size={14} />
      <span>Student</span>
    </button>
    <button 
      type="button"
      onClick={() => setRole('admin')}
      className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'admin' ? (variant === 'blue' ? 'bg-blue-700 text-white' : 'bg-gray-900 text-white') : 'text-gray-400'}`}
    >
      <Briefcase size={14} />
      <span>Admin</span>
    </button>
  </div>
);

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('login');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setView('login');
      setRole('student');
      setError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email === 'chandugoru927@gmail.com' && password === 'Chandu@123') {
      const jwtToken = simulateJWT({ email, name: "Chandu (Admin)", role: 'admin' });
      login(jwtToken);
      onClose();
      navigate('/lms');
      return;
    }

    const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    const registeredUser = users.find((u: any) => u.email === email && u.password === password);

    if (!registeredUser) {
      setError(`Identity not found in database. Check credentials.`);
      return;
    }

    if (registeredUser.role !== role) {
      setError(`Identity mismatch: Found ${registeredUser.role.toUpperCase()} profile.`);
      return;
    }

    if (!registeredUser.approved) {
      setError("ACCOUNT PENDING: Administrator (Chandu) must approve via the link sent to his Gmail.");
      return;
    }
    
    const jwtToken = simulateJWT({ email, name: registeredUser.firstName, role: registeredUser.role });
    login(jwtToken);
    onClose();
    navigate('/lms');
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Access keys do not match.");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      setError("Email already registered.");
      return;
    }

    const verificationKey = 'elite_' + Math.random().toString(36).substring(2, 12);
    const newUser = {
      firstName, lastName, email, password, mobile, role,
      approved: false,
      verificationKey,
      timestamp: Date.now()
    };
    
    setView('connecting');

    try {
      // Use 127.0.0.1 to avoid some local DNS issues that 'localhost' can have
      const response = await fetch('http://127.0.0.1:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, mobile, role,
          approvalLink: `${window.location.origin}/#/admin-verify?email=${encodeURIComponent(email)}&key=${verificationKey}&action=approve`
        })
      });

      if (!response.ok) throw new Error("Server responded with an error.");

      users.push(newUser);
      localStorage.setItem('keshava_registered_users', JSON.stringify(users));
      setView('success');
    } catch (err: any) {
      console.error("Connection Error:", err);
      if (err.message === 'Failed to fetch') {
        setError("BACKEND OFFLINE: Please start your Spring Boot Application in Spring Tool Suite (Port 8080).");
        setView('signup');
      } else {
        setError(err.message || "Unknown error occurred.");
        setView('signup');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="bg-white rounded-[4rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-scale-up border border-white/20">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all z-10">
          <X size={20} />
        </button>

        <div className="p-10 md:p-14 custom-scrollbar overflow-y-auto max-h-[90vh] flex flex-col">
          {view === 'login' && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Shield size={36} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Access Portal</h2>
                <p className="text-gray-500 font-medium text-sm">Secure Entry Protocol</p>
              </div>

              <RoleSelector role={role} setRole={setRole} />

              {error && (
                <div className="mb-6 p-5 bg-red-50 border border-red-100 rounded-3xl flex items-start space-x-4 text-red-600 animate-fade-in">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-black leading-relaxed">{error}</p>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <InputField icon={Mail} type="email" placeholder={`${role.toUpperCase()} Email`} required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Access Key" required value={password} onChange={(e: any) => setPassword(e.target.value)} rightIcon={showPassword ? EyeOff : Eye} onRightIconClick={() => setShowPassword(!showPassword)} />
                <button type="submit" className={`w-full ${role === 'admin' ? 'bg-gray-900' : 'bg-blue-700'} text-white font-black py-5 rounded-3xl flex items-center justify-center space-x-4 hover:opacity-90 transition-all shadow-xl active:scale-95`}>
                  <span className="text-sm uppercase tracking-widest">Authorize Session</span>
                  <ArrowRight size={20} />
                </button>
              </form>
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-medium">New student? <button onClick={() => setView('signup')} className="ml-1 font-black text-blue-700 hover:underline">Enroll Now</button></p>
              </div>
            </div>
          )}

          {view === 'signup' && (
            <div className="animate-fade-in flex flex-col">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Elite Registration</h2>
                <div className="h-1.5 w-16 bg-blue-700 mx-auto rounded-full mb-8"></div>
                <RoleSelector role={role} setRole={setRole} variant="dark" />
              </div>
              
              {error && (
                <div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-3xl flex items-start space-x-4 text-red-600">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-black">{error}</p>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField icon={User} type="text" placeholder="First Name" required value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                  <InputField type="text" placeholder="Last Name" required value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                </div>
                <InputField icon={Mail} type="email" placeholder="Official Email" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Set Access Key" required value={password} onChange={(e: any) => setPassword(e.target.value)} rightIcon={showPassword ? EyeOff : Eye} onRightIconClick={() => setShowPassword(!showPassword)} />
                <InputField icon={ShieldCheck} type="password" placeholder="Confirm Access Key" required value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
                <InputField icon={Smartphone} type="tel" placeholder="Contact Mobile" required value={mobile} onChange={(e: any) => setMobile(e.target.value)} />
                <button type="submit" className={`w-full ${role === 'admin' ? 'bg-gray-900' : 'bg-blue-700'} text-white font-black py-5 rounded-3xl hover:opacity-90 transition-all shadow-xl mt-6 uppercase tracking-widest text-sm`}>
                  Initialize Account
                </button>
                <button onClick={() => setView('login')} className="w-full text-center text-sm font-bold text-gray-400 mt-4 hover:text-gray-600 transition-colors">Return to Login</button>
              </form>
            </div>
          )}

          {view === 'connecting' && (
            <div className="text-center py-20 animate-fade-in flex flex-col items-center">
              <div className="relative w-48 h-48 mb-16">
                <div className="absolute inset-0 border-[6px] border-blue-50 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Database size={32} className="text-blue-700 mb-2 animate-pulse" />
                  <Server size={44} className="text-blue-900 animate-bounce" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Backend Relay</h2>
              <p className="text-gray-500 font-bold text-xs px-8">Contacting Spring Boot Server...</p>
            </div>
          )}

          {view === 'success' && (
            <div className="text-center py-10 animate-scale-up flex flex-col items-center">
              <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mb-10 shadow-sm border border-green-100">
                <Inbox size={56} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight uppercase leading-tight">Check Primary Inbox</h2>
              <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100 mb-8 w-full">
                <p className="text-blue-900 text-sm font-black leading-relaxed">
                  Verification link sent to Administrator:<br/>
                  <span className="text-blue-700 font-black text-lg block mt-2">chandugoru927@gmail.com</span>
                </p>
              </div>
              <p className="text-[10px] text-gray-500 font-bold leading-relaxed mb-10 px-8 uppercase tracking-widest">
                Check your <span className="text-blue-600">Primary Inbox</span>. If not there, check Spam.
              </p>
              <button onClick={() => setView('login')} className="w-full bg-blue-900 text-white font-black py-5 rounded-3xl hover:bg-black transition-all shadow-2xl uppercase tracking-widest text-sm">
                Return to Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
