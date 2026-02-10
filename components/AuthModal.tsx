
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Smartphone, ShieldCheck, AlertCircle, Shield, UserCircle, Briefcase, Inbox, Terminal } from 'lucide-react';
import { useAuth } from '../AuthContext.tsx';
import { simulateJWT } from '../utils/jwtUtils.ts';

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
  const [isServerOnline, setIsServerOnline] = useState<boolean | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (isOpen) {
      const checkStatus = async () => {
        try {
          const res = await fetch('http://localhost:9090/api/health');
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:9090/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        const jwtToken = simulateJWT({ email, name: data.firstName || email.split('@')[0], role: data.role || role });
        login(jwtToken);
        onClose();
        navigate('/lms/dashboard');
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("SERVER OFFLINE: Local hub unreachable.");
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

    try {
      const response = await fetch('http://localhost:9090/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, mobile, role })
      });
      if (!response.ok) throw new Error();
      setView('success');
    } catch (err) {
      setError("Registration failed. Server unreachable.");
      setView('signup');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="bg-white rounded-[4rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-scale-up">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all z-10">
          <X size={20} />
        </button>

        <div className="p-10 md:p-14 custom-scrollbar overflow-y-auto max-h-[90vh] flex flex-col">
          {view === 'login' && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6"><Shield size={36} /></div>
                <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Access Portal</h2>
                <RoleSelector role={role} setRole={setRole} />
                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">{error}</div>}
              </div>
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <InputField icon={Mail} type="email" placeholder="Email" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={(e: any) => setPassword(e.target.value)} rightIcon={showPassword ? EyeOff : Eye} onRightIconClick={() => setShowPassword(!showPassword)} />
                <button type="submit" className="w-full bg-blue-700 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-sm shadow-xl">Login to Hub</button>
              </form>
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-medium">New student? <button onClick={() => setView('signup')} className="font-black text-blue-700">Register</button></p>
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
              <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Syncing...</h2>
            </div>
          )}

          {view === 'success' && (
            <div className="text-center py-10 animate-scale-up flex flex-col items-center">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mb-10 border border-green-100"><Inbox size={48} /></div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Applied</h2>
              <button onClick={() => setView('login')} className="w-full bg-blue-900 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-sm shadow-2xl">Back to Portal</button>
            </div>
          )}

          {view === 'signup' && (
            <div className="animate-fade-in">
               <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">Registration</h2>
                <RoleSelector role={role} setRole={setRole} variant="dark" />
              </div>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField icon={User} type="text" placeholder="First Name" required value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                  <InputField type="text" placeholder="Last Name" required value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                </div>
                <InputField icon={Mail} type="email" placeholder="Email" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type="password" placeholder="Password" required value={password} onChange={(e: any) => setPassword(e.target.value)} />
                <InputField icon={ShieldCheck} type="password" placeholder="Confirm" required value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
                <InputField icon={Smartphone} type="tel" placeholder="Mobile" required value={mobile} onChange={(e: any) => setMobile(e.target.value)} />
                <button type="submit" className="w-full bg-blue-700 text-white font-black py-5 rounded-3xl mt-6 uppercase tracking-widest text-sm shadow-xl">Submit Registration</button>
                <button onClick={() => setView('login')} className="w-full text-center text-xs font-black uppercase tracking-widest text-gray-300 mt-6">Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
