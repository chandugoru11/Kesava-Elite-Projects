import React, { useState, useEffect } from 'react';
import { Play, Link as LinkIcon, FileText, Share2, Search, Clock, ChevronRight, Users, CheckCircle, Trash2, RefreshCw, Shield, Layout, Filter, User } from 'lucide-react';
import { MOCK_RESOURCES } from '../constants.tsx';
import { useAuth } from '../AuthContext.tsx';
import { Navigate } from 'react-router-dom';

const LMS: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'modules' | 'resources' | 'admin'>('modules');
  const isAdmin = user?.email === 'chandugoru927@gmail.com';
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      setRegisteredUsers(users);
      setActiveTab('admin');
    }
  }, [isAdmin]);

  if (!user) return <Navigate to="/" />;

  const handleApprove = (email: string) => {
    const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    const updated = users.map((u: any) => u.email === email ? { ...u, approved: true } : u);
    localStorage.setItem('keshava_registered_users', JSON.stringify(updated));
    setRegisteredUsers(updated);
  };

  const handleDelete = (email: string) => {
    if (window.confirm(`Purge record for: ${email}?`)) {
      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      const updated = users.filter((u: any) => u.email !== email);
      localStorage.setItem('keshava_registered_users', JSON.stringify(updated));
      setRegisteredUsers(updated);
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen pt-12 pb-24 text-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-5xl font-black">Elite <span className="text-blue-500">Hub</span></h1>
          <div className="flex bg-blue-900/50 p-2 rounded-2xl border border-white/5">
            <button onClick={() => setActiveTab('modules')} className={`px-8 py-3 rounded-xl text-xs font-black ${activeTab === 'modules' ? 'bg-blue-600' : 'text-blue-400'}`}>Modules</button>
            <button onClick={() => setActiveTab('resources')} className={`px-8 py-3 rounded-xl text-xs font-black ${activeTab === 'resources' ? 'bg-blue-600' : 'text-blue-400'}`}>Library</button>
            {isAdmin && <button onClick={() => setActiveTab('admin')} className={`px-8 py-3 rounded-xl text-xs font-black ${activeTab === 'admin' ? 'bg-orange-600' : 'text-orange-400'}`}>Admin</button>}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
             {activeTab === 'admin' && isAdmin && (
               <div className="bg-blue-900/20 rounded-[3rem] border border-white/5 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-8 py-6 text-[9px] font-black uppercase text-blue-400">Identity</th>
                        <th className="px-8 py-6 text-[9px] font-black uppercase text-blue-400">Status</th>
                        <th className="px-8 py-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {registeredUsers.map((u, i) => (
                        <tr key={i}>
                          <td className="px-8 py-6">
                             <p className="font-black text-white">{u.firstName} {u.lastName}</p>
                             <p className="text-xs text-gray-500">{u.email}</p>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`text-[9px] font-black uppercase ${u.approved ? 'text-green-500' : 'text-orange-500'}`}>{u.approved ? 'Active' : 'Reviewing'}</span>
                          </td>
                          <td className="px-8 py-6 text-right space-x-3">
                            {!u.approved && <button onClick={() => handleApprove(u.email)} className="bg-blue-600 px-4 py-2 rounded-lg text-[9px] font-black uppercase">Approve</button>}
                            <button onClick={() => handleDelete(u.email)} className="text-red-400"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMS;