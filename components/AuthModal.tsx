
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Smartphone, ShieldCheck, AlertCircle, Wifi, Server, Shield, UserCircle, Briefcase, Database, Inbox, RefreshCcw, Activity, Globe, WifiOff, Terminal } from 'lucide-react';
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
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [apiBase, setApiBase] = useState('http://localhost:8080');
  const [isServerOnline, setIsServerOnline] = useState<boolean | null>(null);
  const [diagnosticLog, setDiagnosticLog] = useState<string[]>([]);

  const { login } = useAuth();
  const navigate = useNavigate();

  const addLog = (msg: string) => setDiagnosticLog(prev => [msg, ...prev].slice(0, 5));

  // Background heartbeat to monitor server status
  useEffect(() => {
    let interval: any;
    if (isOpen) {
      const checkStatus = async () => {
        try {
          const res = await fetch(`${apiBase}/api/health`, { method: 'GET', mode: 'cors' });
          setIsServerOnline(res.ok);
          if (res.ok && isServerOnline === false) addLog(`Reconnected to ${apiBase}`);
        } catch (e) {
          setIsServerOnline(false);
        }
      };
      checkStatus();
      interval = setInterval(checkStatus, 4000);
    }
    return () => clearInterval(interval);
  }, [isOpen, apiBase, isServerOnline]);

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

  const troubleshoot = async () => {
    setIsCheckingConnection(true);
    setError(null);
    addLog("Scanning local ports...");
    
    const hosts = [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'http://0.0.0.0:8080'
    ];
    
    let workingHost = null;

    for (const host of hosts) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1000);
        const res = await fetch(`${host}/api/health`, { 
          signal: controller.signal,
          mode: 'cors'
        });
        clearTimeout(timeout);
        if (res.ok) {
          workingHost = host;
          break;
        }
      } catch (e) {
        addLog(`Fail: ${host}`);
      }
    }

    if (workingHost) {
      setApiBase(workingHost);
      setIsServerOnline(true);
      setError(`CONNECTED! Using ${workingHost}.`);
      addLog(`Selected: ${workingHost}`);
    } else {
      setIsServerOnline(false);
      setError("SERVER OFFLINE. Step 1: Open STS. Step 2: Click 'Run'. Step 3: Check port 8080.");
      addLog("All probes failed.");
    }
    setIsCheckingConnection(false);
  };

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
      setError(`Invalid credentials.`);
      return;
    }

    if (registeredUser.role !== role) {
      setError(`Log in as ${registeredUser.role.toUpperCase()}.`);
      return;
    }

    if (!registeredUser.approved) {
      setError("Pending Admin Approval.");
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
      setError("Passwords do not match.");
      return;
    }
    
    setView('connecting');

    try {
      addLog(`Sending request to ${apiBase}`);
      const response = await fetch(`${apiBase}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, mobile, role,
          approvalLink: `${window.location.origin}/#/admin-verify?email=${encodeURIComponent(email)}&key=elite_${Math.random().toString(36).substring(7)}&action=approve`
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Network error.");
      }

      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      users.push({ firstName, lastName, email, password, mobile, role, approved: false, timestamp: Date.now() });
      localStorage.setItem('keshava_registered_users', JSON.stringify(users));
      
      setView('success');
    } catch (err: any) {
      setError(`CONNECTION FAILED. Please ensure Spring Boot (STS) is running at ${apiBase}.`);
      addLog("Fetch failed - Network issue.");
      setView('signup');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="bg-white rounded-[4rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-scale-up border border-white/20">
        
        {/* Status Dashboard Mini */}
        <div className="absolute top-8 left-10 flex flex-col items-start space-y-1">
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isServerOnline === true ? 'bg-green-500 animate-pulse' : isServerOnline === false ? 'bg-red-500' : 'bg-gray-300'}`}></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
              {isServerOnline === true ? 'Link Active' : isServerOnline === false ? 'Link Broken' : 'Syncing...'}
            </span>
          </div>
          {diagnosticLog.length > 0 && (
            <div className="text-[7px] font-mono text-gray-300 uppercase overflow-hidden h-3">
              {diagnosticLog[0]}
            </div>
          )}
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all z-10">
          <X size={20} />
        </button>

        <div className="p-10 md:p-14 custom-scrollbar overflow-y-auto max-h-[90vh] flex flex-col">
          {view === 'login' && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Shield size={36} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">Portal Access</h2>
                <p className="text-gray-500 font-medium text-sm">Secure Authentication</p>
              </div>

              <RoleSelector role={role} setRole={setRole} />

              {error && (
                <div className="mb-6 p-5 bg-red-50 border border-red-100 rounded-3xl flex items-center space-x-3 text-red-600 animate-fade-in text-[10px] font-black uppercase">
                  <AlertCircle size={14} className="shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <InputField icon={Mail} type="email" placeholder="Email Address" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Access Key" required value={password} onChange={(e: any) => setPassword(e.target.value)} rightIcon={showPassword ? EyeOff : Eye} onRightIconClick={() => setShowPassword(!showPassword)} />
                <button type="submit" className={`w-full ${role === 'admin' ? 'bg-gray-900' : 'bg-blue-700'} text-white font-black py-5 rounded-3xl hover:opacity-95 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm`}>
                  Login
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
                <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">Registration</h2>
                <RoleSelector role={role} setRole={setRole} variant="dark" />
              </div>
              
              {error && (
                <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-[2.5rem] flex flex-col items-center text-center space-y-4 animate-fade-in shadow-inner">
                  <div className="flex items-center space-x-3 text-red-600 text-[10px] font-black uppercase tracking-tight">
                    <WifiOff size={16} />
                    <p>{error}</p>
                  </div>
                  <button 
                    onClick={troubleshoot}
                    disabled={isCheckingConnection}
                    className="text-[10px] font-black uppercase tracking-widest bg-white border border-red-200 px-6 py-3 rounded-2xl text-red-700 hover:bg-red-50 flex items-center space-x-3 shadow-sm active:scale-95 transition-all"
                  >
                    {isCheckingConnection ? <RefreshCcw size={14} className="animate-spin" /> : <Activity size={14} />}
                    <span>Test Connection</span>
                  </button>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField icon={User} type="text" placeholder="First Name" required value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                  <InputField type="text" placeholder="Last Name" required value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                </div>
                <InputField icon={Mail} type="email" placeholder="Email" required value={email} onChange={(e: any) => setEmail(e.target.value)} />
                <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Set Access Key" required value={password} onChange={(e: any) => setPassword(e.target.value)} rightIcon={showPassword ? EyeOff : Eye} onRightIconClick={() => setShowPassword(!showPassword)} />
                <InputField icon={ShieldCheck} type="password" placeholder="Confirm Key" required value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
                <InputField icon={Smartphone} type="tel" placeholder="Mobile Number" required value={mobile} onChange={(e: any) => setMobile(e.target.value)} />
                <button type="submit" className={`w-full ${role === 'admin' ? 'bg-gray-900' : 'bg-blue-700'} text-white font-black py-5 rounded-3xl mt-6 uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all`}>
                  Submit Application
                </button>
                <button onClick={() => setView('login')} className="w-full text-center text-xs font-black uppercase tracking-widest text-gray-300 mt-6 hover:text-gray-400">Cancel</button>
              </form>
            </div>
          )}

          {view === 'connecting' && (
            <div className="text-center py-24 animate-fade-in flex flex-col items-center">
              <div className="relative w-40 h-40 mb-12">
                <div className="absolute inset-0 border-[6px] border-blue-50 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal size={44} className="text-blue-700 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase">Syncing...</h2>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Bridging Local Data Boundary</p>
            </div>
          )}

          {view === 'success' && (
            <div className="text-center py-10 animate-scale-up flex flex-col items-center">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mb-10 border border-green-100 shadow-sm">
                <Inbox size={48} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Applied</h2>
              <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 mb-8 w-full">
                <p className="text-blue-900 text-xs font-black uppercase tracking-widest leading-loose">
                  Admin Verification Dispatched To:<br/>
                  <span className="text-blue-700 text-sm font-black">chandugoru927@gmail.com</span>
                </p>
              </div>
              <button onClick={() => setView('login')} className="w-full bg-blue-900 text-white font-black py-5 rounded-3xl hover:bg-black transition-all uppercase tracking-widest text-sm shadow-2xl">
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
