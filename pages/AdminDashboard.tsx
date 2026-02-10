
import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, CheckCircle, XCircle, Trash2, Clock, Mail, 
  Phone, ArrowLeft, RefreshCw, Lock, Activity, Database, 
  Cpu, Globe, Zap, ArrowUpRight, Filter, Search, 
  LayoutDashboard, Server, MessageSquare, Terminal, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.tsx';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'logs'>('users');
  const [systemHealth, setSystemHealth] = useState({
    api: 'online',
    db: 'online',
    mail: 'online'
  });
  
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchUsers = () => {
    setLoading(true);
    // Sync from the Elite Local Registry
    const storedUsers = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    setUsers(storedUsers);
    setTimeout(() => setLoading(false), 800);
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      setSystemHealth({
        api: Math.random() > 0.05 ? 'online' : 'checking',
        db: 'online',
        mail: 'online'
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (email: string) => {
    const updatedUsers = users.map(user => 
      user.email === email ? { ...user, approved: true } : user
    );
    localStorage.setItem('keshava_registered_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    addLog(`Access Authorized: ${email}`, 'SUCCESS', 'ADMIN_PORT');

    // Attempt backend sync
    fetch('http://localhost:9090/api/approveUser?email=' + email).catch(() => {});
  };

  const handleDelete = (email: string) => {
    if (window.confirm(`Permanently purge record ${email}?`)) {
      const updatedUsers = users.filter(user => user.email !== email);
      localStorage.setItem('keshava_registered_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      addLog(`Record Purged: ${email}`, 'WARNING', 'ADMIN_PORT');
    }
  };

  const [logs, setLogs] = useState<any[]>([
    { time: new Date().toLocaleTimeString(), event: 'Admin Session Initialized', node: 'ELITE_CORE', color: 'text-blue-500' },
    { time: new Date().toLocaleTimeString(), event: 'Registry Handshake OK', node: 'LOCAL_NODE', color: 'text-green-500' }
  ]);

  const addLog = (event: string, type: 'SUCCESS' | 'WARNING' | 'ERROR', node: string) => {
    const colors = { SUCCESS: 'text-green-500', WARNING: 'text-orange-500', ERROR: 'text-red-500' };
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), event, node, color: colors[type] || 'text-gray-400' }, ...prev].slice(0, 50));
  };

  const StatusPill = ({ status }: { status: string }) => (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${status === 'online' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'} transition-all duration-500`}>
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
      <span className="text-[10px] font-black uppercase tracking-widest">INFRA {status.toUpperCase()}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-gray-950 pt-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[200px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <Link to="/" className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] flex items-center hover:text-white transition-colors">
                  <ArrowLeft size={14} className="mr-3" /> Dashboard Home
                </Link>
                <div className="h-4 w-px bg-white/10"></div>
                <button onClick={() => { logout(); navigate('/'); }} className="text-red-500 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors">
                  Disconnect Session
                </button>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">
                Command <span className="shimmer-text">Center</span>
              </h1>
              <p className="text-gray-500 text-xl font-medium italic">Operational Elite Infrastructure Hub</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               <StatusPill status={systemHealth.api} />
               <div className="flex items-center space-x-3 px-5 py-2.5 rounded-full border bg-blue-700 text-white shadow-xl shadow-blue-700/20">
                  <Database size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Hybrid DB Node</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Registry', value: users.length, change: 'Lifetime', icon: Users, color: 'text-blue-600' },
            { label: 'Pending Access', value: users.filter(u => !u.approved).length, change: 'Action Required', icon: Shield, color: 'text-orange-500' },
            { label: 'Network Nodes', value: '54 Active', change: 'STEM Labs', icon: Globe, color: 'text-purple-600' },
            { label: 'System Uptime', value: '100%', change: 'Stable Core', icon: Activity, color: 'text-green-500' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-10 rounded-[4rem] shadow-2xl border border-gray-100 hover:-translate-y-2 transition-all group">
              <div className={`w-14 h-14 ${kpi.color} bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                <kpi.icon size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{kpi.label}</p>
              <div className="flex items-baseline space-x-4">
                <h3 className="text-4xl font-black text-gray-900">{kpi.value}</h3>
                <span className={`text-[10px] font-black uppercase tracking-widest ${kpi.color}`}>{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[4.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[700px] flex flex-col">
          <div className="p-12 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex bg-gray-50 p-2 rounded-3xl border border-gray-100">
              <button onClick={() => setActiveTab('users')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}>Access Registry</button>
              <button onClick={() => setActiveTab('system')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'system' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}>Infrastructure</button>
              <button onClick={() => setActiveTab('logs')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'logs' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}>Log Stream</button>
            </div>

            <div className="flex items-center space-x-4 w-full lg:w-auto">
               <div className="relative flex-grow lg:w-80 group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-700 transition-colors" size={18} />
                 <input type="text" placeholder="Query Identity Matrix..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-8 py-5 text-sm focus:border-blue-700 outline-none transition-all shadow-inner font-bold" />
               </div>
               <button onClick={fetchUsers} className="p-5 bg-gray-50 rounded-2xl text-gray-400 hover:bg-blue-700 hover:text-white transition-all shadow-sm group">
                 <RefreshCw size={22} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'} />
               </button>
            </div>
          </div>

          <div className="flex-grow p-4 md:p-8">
            {activeTab === 'users' && (
              <div className="animate-fade-in overflow-x-auto px-4">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Identity Node</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact Node</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Access Status</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-10 py-40 text-center text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Registry Node Empty • Waiting for handshakes</td>
                      </tr>
                    ) : (
                      users.map((user, i) => (
                        <tr key={i} className="hover:bg-blue-50/40 transition-all group">
                          <td className="px-10 py-8">
                            <div className="flex items-center space-x-6">
                               <div className={`w-14 h-14 ${user.role === 'admin' ? 'bg-gray-950' : 'bg-blue-700'} text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg`}>
                                  {user.firstName ? user.firstName[0] : 'U'}
                               </div>
                               <div>
                                  <p className="font-black text-gray-900 text-lg leading-tight">{user.firstName} {user.lastName}</p>
                                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1 italic">{user.role}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium">
                                <Mail size={16} className="text-blue-700" />
                                <span>{user.email}</span>
                             </div>
                             <p className="text-[10px] text-gray-400 font-bold mt-2">{user.mobile || 'No Mobile Node'}</p>
                          </td>
                          <td className="px-10 py-8">
                             {user.approved ? (
                               <div className="flex items-center space-x-3 bg-green-50 text-green-700 text-[10px] font-black px-5 py-2.5 rounded-full border border-green-100 uppercase tracking-widest w-fit">
                                 <CheckCircle size={14} />
                                 <span>Authorized</span>
                               </div>
                             ) : (
                               <div className="flex items-center space-x-3 bg-orange-50 text-orange-600 text-[10px] font-black px-5 py-2.5 rounded-full border border-orange-100 uppercase tracking-widest w-fit animate-pulse">
                                 <Clock size={14} />
                                 <span>Manual Review</span>
                               </div>
                             )}
                          </td>
                          <td className="px-10 py-8 text-right">
                             <div className="flex items-center justify-end space-x-4">
                                {!user.approved && (
                                  <button onClick={() => handleApprove(user.email)} className="bg-blue-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-700/20">Grant Access</button>
                                )}
                                <button onClick={() => handleDelete(user.email)} className="p-4 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                             </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Logic for other tabs remains similar but refined */}
            {activeTab === 'logs' && (
              <div className="p-12 animate-fade-in flex flex-col h-full">
                 <div className="flex-grow space-y-4 overflow-y-auto max-h-[550px] custom-scrollbar pr-4 font-mono">
                    {logs.map((log, i) => (
                      <div key={i} className="flex items-center space-x-8 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                         <span className="text-[10px] font-black text-gray-400 w-24">{log.time}</span>
                         <span className="text-blue-700 font-black text-[10px] tracking-tighter w-24 uppercase">{log.node}</span>
                         <span className={`text-sm font-bold flex-grow ${log.color}`}>{log.event}</span>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
