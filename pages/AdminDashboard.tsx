
import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, CheckCircle, XCircle, Trash2, Clock, Mail, 
  Phone, ArrowLeft, RefreshCw, Lock, Activity, Database, 
  Cpu, Globe, Zap, ArrowUpRight, Filter, Search, 
  LayoutDashboard, Server, MessageSquare, Terminal, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

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
    // Fetching from local storage registry
    const storedUsers = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    setUsers(storedUsers);
    setTimeout(() => setLoading(false), 800);
  };

  useEffect(() => {
    fetchUsers();
    // Simulate real-time system monitoring heartbeat
    const interval = setInterval(() => {
      setSystemHealth({
        api: Math.random() > 0.02 ? 'online' : 'maintenance',
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
    // Add to simulated logs
    addLog(`Access Authorized: ${email}`, 'SUCCESS', 'ADMIN_PORT');
  };

  const handleDelete = (email: string) => {
    if (window.confirm(`Permanently purge record ${email}? This cannot be undone.`)) {
      const updatedUsers = users.filter(user => user.email !== email);
      localStorage.setItem('keshava_registered_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      addLog(`Record Purged: ${email}`, 'WARNING', 'ADMIN_PORT');
    }
  };

  // Activity Log State
  const [logs, setLogs] = useState<any[]>([
    { time: new Date().toLocaleTimeString(), event: 'Admin Session Initialized', node: 'ELITE_CORE', color: 'text-blue-500' },
    { time: new Date().toLocaleTimeString(), event: 'Database Handshake OK', node: 'SQL_CLUSTER', color: 'text-green-500' }
  ]);

  const addLog = (event: string, type: 'SUCCESS' | 'WARNING' | 'ERROR', node: string) => {
    const colors = { SUCCESS: 'text-green-500', WARNING: 'text-orange-500', ERROR: 'text-red-500' };
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), event, node, color: colors[type] || 'text-gray-400' }, ...prev].slice(0, 50));
  };

  const StatusPill = ({ status }: { status: string }) => (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${status === 'online' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'} transition-all duration-500`}>
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
      <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Dynamic Header */}
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
              <p className="text-gray-500 text-xl font-medium">Secure Administrative Hub • Elite Infrastructure</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               <StatusPill status={systemHealth.api} />
               <div className="flex items-center space-x-3 px-5 py-2.5 rounded-full border bg-white/5 border-white/10 text-blue-400">
                  <Database size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Local Sync: Active</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-20">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Registry', value: users.length, change: 'Lifetime', icon: Users, color: 'text-blue-600' },
            { label: 'Pending Access', value: users.filter(u => !u.approved).length, change: 'Action Required', icon: Shield, color: 'text-orange-500' },
            { label: 'Network Nodes', value: '14 Active', change: 'STEM Labs', icon: Globe, color: 'text-purple-600' },
            { label: 'System Uptime', value: '99.98%', change: 'Stable Core', icon: Activity, color: 'text-green-500' },
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

        {/* Workspace Hub */}
        <div className="bg-white rounded-[4.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden min-h-[700px] flex flex-col">
          <div className="p-12 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex bg-gray-50 p-2 rounded-3xl border border-gray-100">
              <button 
                onClick={() => setActiveTab('users')}
                className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}
              >
                Access Registry
              </button>
              <button 
                onClick={() => setActiveTab('system')}
                className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'system' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}
              >
                Infrastructure
              </button>
              <button 
                onClick={() => setActiveTab('logs')}
                className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'logs' ? 'bg-blue-700 text-white shadow-xl shadow-blue-700/20' : 'text-gray-400 hover:text-blue-700'}`}
              >
                Log Stream
              </button>
            </div>

            <div className="flex items-center space-x-4 w-full lg:w-auto">
               <div className="relative flex-grow lg:w-80">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                 <input 
                  type="text" 
                  placeholder="Query Registry..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-8 py-5 text-sm focus:border-blue-700 outline-none transition-all shadow-inner"
                 />
               </div>
               <button 
                onClick={fetchUsers}
                className="p-5 bg-gray-50 rounded-2xl text-gray-400 hover:bg-blue-700 hover:text-white transition-all shadow-sm group"
               >
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
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact Details</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Access Status</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Direct Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-10 py-40 text-center text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Registry Empty • Waiting for connections</td>
                      </tr>
                    ) : (
                      users.map((user, i) => (
                        <tr key={i} className="hover:bg-blue-50/40 transition-all group">
                          <td className="px-10 py-8">
                            <div className="flex items-center space-x-6">
                               <div className={`w-14 h-14 ${user.role === 'admin' ? 'bg-gray-900' : 'bg-blue-700'} text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-700/10`}>
                                  {user.firstName ? user.firstName[0] : 'U'}
                               </div>
                               <div>
                                  <p className="font-black text-gray-900 text-lg leading-tight">{user.firstName} {user.lastName}</p>
                                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">{user.role}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium">
                                <Mail size={16} className="text-blue-700" />
                                <span>{user.email}</span>
                             </div>
                             <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold mt-2">
                                <Phone size={14} />
                                <span>{user.mobile}</span>
                             </div>
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
                                 <span>Pending Approval</span>
                               </div>
                             )}
                          </td>
                          <td className="px-10 py-8 text-right">
                             <div className="flex items-center justify-end space-x-4">
                                {!user.approved && (
                                  <button 
                                    onClick={() => handleApprove(user.email)}
                                    className="bg-blue-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-700/20"
                                  >
                                    Verify Access
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDelete(user.email)}
                                  className="p-4 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all shadow-sm"
                                  title="Purge Record"
                                >
                                  <Trash2 size={20} />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="p-12 animate-fade-in h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                   <div className="bg-gray-50 rounded-[4rem] p-12 border border-gray-100 shadow-inner">
                      <h4 className="text-2xl font-black text-gray-900 mb-10 flex items-center">
                        <Server size={28} className="mr-5 text-blue-700" /> Distributed Performance
                      </h4>
                      <div className="space-y-10">
                         {[
                           { label: 'Cloud CPU Load', value: '14%', color: 'bg-green-500' },
                           { label: 'Cluster Memory', value: '38%', color: 'bg-blue-600' },
                           { label: 'Network Latency', value: '18ms', color: 'bg-purple-600' },
                           { label: 'Disk Integrity', value: '96%', color: 'bg-green-500' }
                         ].map((s, i) => (
                           <div key={i} className="space-y-3">
                             <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400 px-1">
                               <span>{s.label}</span>
                               <span className="text-gray-900">{s.value}</span>
                             </div>
                             <div className="h-3 bg-white rounded-full overflow-hidden border border-gray-100 shadow-sm">
                               <div className={`h-full ${s.color} rounded-full transition-all duration-1000`} style={{ width: s.value }}></div>
                             </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-gray-950 rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                      <h4 className="text-2xl font-black mb-10 flex items-center">
                        <Lock size={28} className="mr-5 text-blue-500" /> Security Protocol Status
                      </h4>
                      <div className="space-y-5">
                         {[
                           'Intrusion Detection: Normal Range',
                           'Encryption Tier: RSA 4096 / AES-256',
                           'Global Sync: Synchronized',
                           'Firewall Node: Active & Guarding'
                         ].map((status, i) => (
                           <div key={i} className="flex items-center space-x-5 bg-white/5 p-5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-default">
                              <CheckCircle size={18} className="text-green-500" />
                              <span className="text-sm font-bold text-gray-300">{status}</span>
                           </div>
                         ))}
                      </div>
                      <div className="mt-12 pt-10 border-t border-white/5">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Master Key: ELITE_SYNC_K9921</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="p-12 animate-fade-in flex flex-col h-full">
                 <div className="flex-grow space-y-4 overflow-y-auto max-h-[550px] custom-scrollbar pr-4">
                    {logs.map((log, i) => (
                      <div key={i} className="flex items-center space-x-8 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 font-mono group hover:bg-white hover:shadow-xl transition-all animate-fade-in">
                         <span className="text-[10px] font-black text-gray-400 w-24">{log.time}</span>
                         <span className="text-blue-700 font-black text-[10px] tracking-tighter w-24 uppercase">{log.node}</span>
                         <div className="h-1.5 w-1.5 rounded-full bg-blue-700 shrink-0"></div>
                         <span className={`text-sm font-bold flex-grow ${log.color}`}>{log.event}</span>
                         <ArrowUpRight size={16} className="text-gray-200 group-hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Zone */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 bg-blue-700 p-16 rounded-[4.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="relative z-10 max-w-lg">
                 <h3 className="text-4xl font-black text-white tracking-tighter mb-4 leading-none">Global Infrastructure Sync</h3>
                 <p className="text-blue-100 font-medium text-lg leading-relaxed">Broadcast updates and synchronized credentials to all deployed STEM Labs and Hubs.</p>
              </div>
              <button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    addLog('Global Infrastructure Synchronized', 'SUCCESS', 'MASTER_HUB');
                    alert('Global Sync Successful');
                  }, 1500);
                }}
                className="relative z-10 bg-white text-blue-700 px-12 py-6 rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
              >
                 Initialize Broadcast
              </button>
           </div>
           
           <div className="bg-gray-950 p-12 rounded-[4.5rem] shadow-2xl flex flex-col justify-center text-center text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-700/20">
                <Terminal size={32} />
              </div>
              <h4 className="text-2xl font-black mb-4">Remote Shell</h4>
              <p className="text-gray-500 font-medium mb-10 text-sm">Access secure terminal for advanced node configuration.</p>
              <button className="w-full py-5 rounded-[2rem] border-2 border-white/10 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                Open Command Port
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
