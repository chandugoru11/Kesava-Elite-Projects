
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, UserCheck, ShieldAlert, UserX, Trash2 } from 'lucide-react';

const AdminVerify: React.FC = () => {
  const [status, setStatus] = useState<'verifying' | 'approved' | 'denied' | 'error'>('verifying');
  const [studentEmail, setStudentEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const key = params.get('key');
    const action = params.get('action'); // 'approve' or 'deny'

    if (!email || !key) {
      setErrorMessage("Missing security identifiers. Link invalid.");
      setStatus('error');
      return;
    }

    setStudentEmail(email);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === email);

      if (userIndex > -1) {
        const user = users[userIndex];
        
        // Security Check: Key match
        if (user.verificationKey === key) {
          if (action === 'approve') {
            users[userIndex].approved = true;
            users[userIndex].verificationKey = 'VERIFIED_' + Date.now();
            localStorage.setItem('keshava_registered_users', JSON.stringify(users));
            setStatus('approved');
          } else if (action === 'deny') {
            // Remove the user from the database if denied
            const updatedUsers = users.filter((u: any) => u.email !== email);
            localStorage.setItem('keshava_registered_users', JSON.stringify(updatedUsers));
            setStatus('denied');
          } else {
            setErrorMessage("Invalid administrative action specified.");
            setStatus('error');
          }
        } else {
          setErrorMessage("SECURITY BREACH: Invalid authentication key for this student.");
          setStatus('error');
        }
      } else {
        setErrorMessage("Student record not found or already processed.");
        setStatus('error');
      }
    }, 2500);
  }, [location]);

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-[5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-scale-up">
        <div className="p-16 text-center">
          {status === 'verifying' && (
            <div className="animate-fade-in flex flex-col items-center">
              <div className="w-24 h-24 relative mb-12">
                <div className="absolute inset-0 border-[8px] border-blue-50 rounded-full"></div>
                <div className="absolute inset-0 border-[8px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Verifying Key</h2>
              <p className="text-gray-500 font-medium">Communicating with the Elite Hub...</p>
            </div>
          )}

          {status === 'approved' && (
            <div className="animate-scale-up flex flex-col items-center">
              <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mb-12">
                <UserCheck size={56} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Authorized</h2>
              <p className="text-gray-500 font-medium mb-16 text-lg">
                The account for <span className="text-blue-700 font-black">{studentEmail}</span> has been activated successfully.
              </p>
              <Link to="/" className="w-full bg-blue-700 text-white font-black py-6 rounded-3xl hover:bg-black transition-all flex items-center justify-center space-x-4 uppercase tracking-widest text-sm group">
                <span>Enter Admin View</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          )}

          {status === 'denied' && (
            <div className="animate-scale-up flex flex-col items-center">
              <div className="w-28 h-28 bg-orange-50 text-orange-600 rounded-[3rem] flex items-center justify-center mb-12">
                <UserX size={56} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Request Denied</h2>
              <p className="text-gray-500 font-medium mb-16 text-lg px-8">
                Enrollment for <span className="text-orange-600 font-black">{studentEmail}</span> was rejected. Records have been purged.
              </p>
              <Link to="/" className="w-full bg-gray-900 text-white font-black py-6 rounded-3xl hover:bg-black transition-all flex items-center justify-center space-x-4 uppercase tracking-widest text-sm group">
                <span>Return to Hub</span>
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="animate-fade-in flex flex-col items-center">
              <div className="w-28 h-28 bg-red-50 text-red-600 rounded-[3rem] flex items-center justify-center mb-12 shadow-sm">
                <ShieldAlert size={56} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Auth Failed</h2>
              <p className="text-red-600 font-black mb-16 leading-relaxed bg-red-50 p-8 rounded-[2.5rem] border border-red-100 text-sm">
                {errorMessage}
              </p>
              <Link to="/" className="w-full bg-gray-900 text-white font-black py-6 rounded-3xl hover:bg-black transition-all uppercase tracking-widest text-sm">
                Back to Site
              </Link>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-16 py-8 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ShieldCheck size={18} className="text-blue-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Security Protocol Alpha</span>
          </div>
          <Trash2 size={16} className="text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default AdminVerify;
