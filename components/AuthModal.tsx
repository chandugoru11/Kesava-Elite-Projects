
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Smartphone, ShieldCheck, AlertCircle, Shield, UserCircle, Briefcase, Inbox, Terminal, WifiOff, Zap, ArrowLeft } from 'lucide-react';
import { useAuth } from '../AuthContext.tsx';
import { simulateJWT } from '../utils/jwtUtils.ts';

type AuthView = 'login' | 'signup' | 'connecting' | 'success';
type UserRole = 'student' | 'admin';

const InputField = ({ icon: Icon, rightIcon: RightIcon, onRightIconClick, ...props }: any) => (
  <div className="relative group">
    {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-700 transition-colors" size={18} />}
    <input 
      {...props}
      className={`w-full bg-gray-50 border border-gray-200 rounded-2xl text-gray-950 font-bold ${Icon ? 'pl-14' : 'px-6'} ${RightIcon ? 'pr-14' : 'px-6'} py-4 text-sm focus:border-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400`}
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isServerOnline, setIsServerOnline] = useState<boolean | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (isOpen) {
      const checkStatus = async () => {
        try {
          const res = await fetch('http://localhost:9090/api/health').catch(() => fetch('http://localhost:8080/api/health'));
          setIsServerOnline(res.ok);
        } catch (e) {
          setIsServerOnline(false);
        }
      };
      checkStatus();
      interval = setInterval(checkStatus, 4000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackStep = () => {
    if (view === 'login') {
      onClose(); // On login page, "Back" exits the modal
    } else {
      setView('login'); // On other pages, "Back" returns to login
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email === 'chandugoru927@gmail.com' && password === 'admin123') {
      const jwtToken = simulateJWT({ email, name: 'Master Admin', role: 'admin' });
      login(jwtToken);
      onClose();
      navigate('/admin');
      return;
    }

    const localUsers = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    const localUser = localUsers.find((u: any) => u.email === email && u.role === role);

    if (localUser && localUser.approved) {
       const jwtToken = simulateJWT({ email, name: localUser.firstName, role });
       login(jwtToken);
       onClose();
       navigate(role === 'admin' ? '/admin' : '/lms/dashboard');
       return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = simulateJWT({ email, name: data.firstName || email.split('@')[0], role: data.role || role });
        login(jwtToken);
        onClose();
        navigate(data.role === 'admin' || role === 'admin' ? '/admin' : '/lms/dashboard');
        return;
      }
    } catch (err) {
      if (localUser && !localUser.approved) {
        setError("Your account is pending Administrative Approval.");
      } else {
        setError("Invalid credentials or user not found in registry.");
      }
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setView('connecting');
    setError(null);

    const verificationKey = 'VKEY_' + Math.random().toString(36).substring(7);
    const payload = {
      firstName,
      lastName,
      email,
      mobile,
      role,
      password,
      verificationKey,
      approved: false,
      timestamp: new Date().toISOString()
    };

    const existingUsers = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    localStorage.setItem('keshava_registered_users', JSON.stringify([payload, ...existingUsers]));

    try {
      await fetch('http://localhost:9090/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, approvalLink: `http://localhost:9090/api/approveUser?email=${email}` })
      });
    } catch (err) {
      console.log("Backend offline, data kept in local storage node.");
    }

    setTimeout(() => setView('success'), 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="bg-white rounded-[4rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-scale-up">
        {/* Navigation Layer - Back button is permanently present */}
        <div className="absolute top-8 left-0 right-0 px-8 flex justify-between items-center z-10">
          <button 
            onClick={handleBackStep} 
            className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm flex items-center justify-center group"
            title={view === 'login' ? "Return to Hub" : "One Step Backward"}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button 
            onClick={onClose} 
            className="p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all shadow-sm flex items-center justify-center group"
            title="Terminate Session"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="p-10 md:p-14 custom-scrollbar overflow-y-auto max-h-[90vh] flex flex-col">
          {view === 'login' && (
            <div className="animate-fade-in pt-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6"><Shield size={36} /></div>
                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Access Portal</h2>
                <RoleSelector role={role} setRole={setRole} />
                
                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">{error}</div>}
              </div>
              
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <InputField icon={Mail} type="text" placeholder="Email Address" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type="text" placeholder="Access Password" required value={password} onChange={(e: any) => setPassword(e.target.value)} />
                
                <button type="submit" className="w-full bg-blue-700 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-sm shadow-xl hover:bg-blue-800 transition-all active:scale-[0.98]">
                  Initialize Hub Login
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-medium">New student? <button onClick={() => setView('signup')} className="font-black text-blue-700 hover:underline">Register Node</button></p>
                {/* Textual Back Button on Login Page */}
                <button onClick={onClose} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-gray-300 mt-8 hover:text-red-500 transition-colors flex items-center justify-center group">
                  <ArrowLeft size={12} className="mr-2 group-hover:-translate-x-1 transition-transform" /> One Step Backward
                </button>
              </div>
            </div>
          )}

          {view === 'connecting' && (
            <div className="text-center py-24 animate-fade-in flex flex-col items-center">
              <div className="relative w-40 h-40 mb-12">
                <div className="absolute inset-0 border-[6px] border-blue-50 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center"><Terminal size={44} className="text-blue-700 animate-pulse" /></div>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Synchronizing Registry...</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Protocol: Hybrid Storage Node</p>
              <button onClick={() => setView('signup')} className="mt-10 text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-blue-700 transition-colors">Cancel Sync</button>
            </div>
          )}

          {view === 'success' && (
            <div className="text-center py-10 animate-scale-up flex flex-col items-center">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mb-10 border border-green-100 shadow-xl">
                <Inbox size={48} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Packet Transmitted</h2>
              <p className="text-gray-500 font-medium mb-12 italic">Registration stored in local node. Notify admin for authorization.</p>
              <button onClick={() => setView('login')} className="w-full bg-blue-900 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-sm shadow-2xl flex items-center justify-center group">
                <ArrowLeft size={18} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                Back to Access Portal
              </button>
            </div>
          )}

          {view === 'signup' && (
            <div className="animate-fade-in pt-6">
               <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">Registry Entry</h2>
                <RoleSelector role={role} setRole={setRole} variant="dark" />
              </div>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField icon={User} type="text" placeholder="First Name" required value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                  <InputField type="text" placeholder="Last Name" required value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                </div>
                <InputField icon={Mail} type="text" placeholder="Email Address" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type="text" placeholder="Create Password" required value={password} onChange={(e: any) => setPassword(e.target.value)} />
                <InputField icon={ShieldCheck} type="text" placeholder="Confirm Password" required value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
                <InputField icon={Smartphone} type="tel" placeholder="Mobile Contact" required value={mobile} onChange={(e: any) => setMobile(e.target.value)} />
                
                <button type="submit" className="w-full bg-blue-700 text-white font-black py-5 rounded-3xl mt-6 uppercase tracking-widest text-sm shadow-xl active:scale-[0.98]">
                  Submit Registration
                </button>
                <button onClick={() => setView('login')} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-gray-300 mt-8 hover:text-blue-700 transition-colors flex items-center justify-center group">
                  <ArrowLeft size={12} className="mr-2 group-hover:-translate-x-1 transition-transform" /> One Step Backward
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
