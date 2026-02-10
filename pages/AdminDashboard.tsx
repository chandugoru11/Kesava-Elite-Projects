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
            </div>
            <div className="flex flex-wrap gap-4">
               <StatusPill status={systemHealth.api} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Registry', value: users.length, icon: Users, color: 'text-blue-600' },
            { label: 'Pending Access', value: users.filter(u => !u.approved).length, icon: Shield, color: 'text-orange-500' },
            { label: 'Network Nodes', value: '54 Active', icon: Globe, color: 'text-purple-600' },
            { label: 'System Uptime', value: '100%', icon: Activity, color: 'text-green-500' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-10 rounded-[4rem] shadow-2xl border border-gray-100 hover:-translate-y-2 transition-all group">
              <div className={`w-14 h-14 ${kpi.color} bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                <kpi.icon size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{kpi.label}</p>
              <h3 className="text-4xl font-black text-gray-900">{kpi.value}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[4.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[700px] flex flex-col">
          <div className="p-12 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex bg-gray-50 p-2 rounded-3xl border border-gray-100">
              <button onClick={() => setActiveTab('users')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}>Access Registry</button>
              <button onClick={() => setActiveTab('logs')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'logs' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}>Log Stream</button>
            </div>
            <button onClick={fetchUsers} className="p-5 bg-gray-50 rounded-2xl text-gray-400 hover:bg-blue-700 hover:text-white transition-all shadow-sm">
              <RefreshCw size={22} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="flex-grow p-8">
            {activeTab === 'users' && (
              <div className="animate-fade-in overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Identity Node</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-10 py-8 text-right">Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map((user, i) => (
                      <tr key={i} className="hover:bg-blue-50/40 transition-all">
                        <td className="px-10 py-8">
                          <div className="flex items-center space-x-6">
                             <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center font-black">{user.firstName?.[0]}</div>
                             <p className="font-black text-gray-900">{user.firstName} {user.lastName}</p>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-sm font-medium text-gray-500">{user.email}</td>
                        <td className="px-10 py-8">
                           {user.approved ? (
                             <span className="bg-green-50 text-green-700 text-[10px] font-black px-4 py-2 rounded-full border border-green-100 uppercase">Authorized</span>
                           ) : (
                             <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-2 rounded-full border border-orange-100 uppercase animate-pulse">Pending</span>
                           )}
                        </td>
                        <td className="px-10 py-8 text-right space-x-4">
                          {!user.approved && <button onClick={() => handleApprove(user.email)} className="bg-blue-700 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">Approve</button>}
                          <button onClick={() => handleDelete(user.email)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'logs' && (
              <div className="space-y-4 font-mono max-h-[500px] overflow-y-auto custom-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className="flex space-x-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400">{log.time}</span>
                    <span className={`text-xs font-bold ${log.color}`}>{log.event}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;