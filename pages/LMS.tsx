
import React, { useState, useEffect } from 'react';
import { Play, Link as LinkIcon, FileText, Share2, Search, Clock, ChevronRight, Users, CheckCircle, Trash2, RefreshCw, Shield, Layout, Filter, User } from 'lucide-react';
import { MOCK_RESOURCES } from '../constants';
// Fixed: Imported useAuth from correct AuthContext location
import { useAuth } from '../AuthContext.tsx';
import { Navigate } from 'react-router-dom';

const LMS: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'modules' | 'resources' | 'admin'>('modules');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Specific Master Admin identification
  const isAdmin = user?.email === 'chandugoru927@gmail.com';
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      setRegisteredUsers(users);
      setActiveTab('admin'); // Default to management for admin
    } else {
      setActiveTab('modules'); // Default to modules for student
    }
  }, [isAdmin]);

  if (!user) return <Navigate to="/" />;

  const categories = ['All', 'IT Programs', 'Core Engineering', 'Services'];
  
  const filteredResources = MOCK_RESOURCES.filter(res => 
    (activeCategory === 'All' || res.category === activeCategory) &&
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (email: string) => {
    const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    const updated = users.map((u: any) => u.email === email ? { ...u, approved: true } : u);
    localStorage.setItem('keshava_registered_users', JSON.stringify(updated));
    setRegisteredUsers(updated);
  };

  // Fixed: Finding the user role before confirmation to fix the 'role' is not defined error
  const handleDelete = (email: string) => {
    const userToRecord = registeredUsers.find(u => u.email === email);
    const userRole = userToRecord?.role || 'user';
    if (window.confirm(`Permanently remove this ${userRole.toUpperCase()} record: ${email}?`)) {
      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      const updated = users.filter((u: any) => u.email !== email);
      localStorage.setItem('keshava_registered_users', JSON.stringify(updated));
      setRegisteredUsers(updated);
    }
  };

  const syncData = () => {
    setAdminLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
      setRegisteredUsers(users);
      setAdminLoading(false);
    }, 600);
  };

  return (
    <div className="bg-blue-950 min-h-screen pt-12 pb-24 text-white">
      <div className="container mx-auto px-6">
        {/* Hub Navigation Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-black mb-3">Elite <span className="text-blue-500">Hub</span></h1>
            <p className="text-blue-300 font-medium text-lg">
              {isAdmin ? "Master Administrator View" : `Student Access: ${user.name}`}
            </p>
          </div>
          
          <div className="flex bg-blue-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === 'modules' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-blue-400 hover:text-white'}`}
            >
              Modules
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === 'resources' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-blue-400 hover:text-white'}`}
            >
              Library
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center whitespace-nowrap ${activeTab === 'admin' ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/30' : 'text-orange-400 hover:text-orange-200'}`}
              >
                <Shield size={14} className="mr-2" />
                User Management
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Dashboard Control Sidebar */}
          <div className="space-y-8">
            <div className="bg-blue-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[3rem] shadow-2xl">
              <h3 className="font-black mb-6 flex items-center text-blue-400 text-[10px] uppercase tracking-widest">
                <Search size={14} className="mr-3" />
                Intelligent Search
              </h3>
              <input 
                type="text" 
                placeholder="Find a course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-blue-600/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <h4 className="text-2xl font-black mb-3 leading-none tracking-tight">Active Events</h4>
              <p className="text-sm text-blue-100 font-medium mb-8 leading-relaxed">STEM National Robotics Competition registration is open.</p>
              <button className="w-full bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-xl">
                Register Team
              </button>
            </div>
            
            <div className="p-8 border border-white/5 rounded-[3rem] bg-white/5">
               <h5 className="font-black text-blue-400 text-[10px] uppercase tracking-widest mb-6">Network Health</h5>
               <div className="space-y-6">
                 <div className="flex items-center justify-between">
                   <span className="text-xs text-gray-400 font-bold">Relay Service</span>
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-xs text-gray-400 font-bold">Local Auth DB</span>
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Synchronized</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Tab Display Area */}
          <div className="lg:col-span-3">
            {activeTab === 'modules' && (
              <div className="animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                  <h2 className="text-3xl font-black flex items-center tracking-tight">
                    <Play className="mr-4 text-blue-500 fill-current" size={24} />
                    Training Modules
                  </h2>
                  <div className="flex bg-white/5 p-1 rounded-xl overflow-x-auto">
                    {categories.map(c => (
                      <button 
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === c ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredResources.filter(r => r.type === 'video').map(video => (
                    <div key={video.id} className="bg-blue-900/20 border border-white/5 rounded-[3rem] overflow-hidden group hover:border-blue-600/40 transition-all shadow-2xl">
                      <div className="relative aspect-video">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-blue-900/40">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                            <Play fill="white" size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-4 block">{video.category}</span>
                        <h4 className="font-black text-xl leading-tight mb-6 group-hover:text-blue-500 transition-colors">{video.title}</h4>
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex items-center text-gray-500 text-[10px] font-black uppercase tracking-widest">
                            <Clock size={12} className="mr-2 text-blue-600" />
                            {video.date}
                          </div>
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-black mb-10 flex items-center tracking-tight">
                  <LinkIcon className="mr-4 text-blue-500" size={24} />
                  Institutional Library
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {filteredResources.filter(r => r.type !== 'video').map(res => (
                    <div key={res.id} className="bg-blue-900/10 border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between hover:bg-blue-900/30 transition-all group border-l-[12px] border-l-blue-700">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          {res.type === 'pdf' ? <FileText size={20} /> : <LinkIcon size={20} />}
                        </div>
                        <div>
                          <h4 className="font-black text-lg text-gray-100 mb-1 leading-tight">{res.title}</h4>
                          <div className="flex space-x-3 text-[9px] font-black uppercase tracking-widest text-gray-500">
                            <span>{res.category}</span>
                            <span className="text-blue-700">•</span>
                            <span>{res.date}</span>
                          </div>
                        </div>
                      </div>
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 hover:bg-blue-600 rounded-2xl transition-all shadow-lg">
                        <ChevronRight size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'admin' && isAdmin && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black flex items-center tracking-tight">
                    <Users className="mr-4 text-orange-500" size={24} />
                    Registration Review
                  </h2>
                  <button onClick={syncData} className="flex items-center space-x-2 bg-white/5 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                    <RefreshCw size={14} className={adminLoading ? 'animate-spin' : ''} />
                    <span>Sync Database</span>
                  </button>
                </div>
                
                <div className="bg-blue-900/20 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Identity / Role</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Contact</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Date</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Status</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 text-right">Action Hub</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {registeredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-8 py-32 text-center text-gray-600 font-bold uppercase tracking-[0.4em] text-xs">No pending registration packets found.</td>
                          </tr>
                        ) : (
                          registeredUsers.map((u, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-12 h-12 ${u.role === 'admin' ? 'bg-orange-600/20 text-orange-400' : 'bg-blue-600/20 text-blue-400'} rounded-2xl flex items-center justify-center font-black text-lg border border-white/5`}>{u.firstName[0]}</div>
                                  <div>
                                    <p className="font-black text-white">{u.firstName} {u.lastName}</p>
                                    <p className={`text-[8px] font-black uppercase tracking-[0.2em] ${u.role === 'admin' ? 'text-orange-500' : 'text-blue-500'}`}>{u.role}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <p className="text-xs font-bold text-gray-400 tracking-tight">{u.email}</p>
                                <p className="text-[10px] text-gray-600 font-medium">{u.mobile}</p>
                              </td>
                              <td className="px-8 py-6">
                                <p className="text-[10px] font-black text-gray-500">{new Date(u.timestamp).toLocaleDateString()}</p>
                              </td>
                              <td className="px-8 py-6">
                                {u.approved ? (
                                  <div className="flex items-center text-green-400">
                                    <CheckCircle size={12} className="mr-2" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-orange-400 animate-pulse">
                                    <Clock size={12} className="mr-2" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Reviewing</span>
                                  </div>
                                )}
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end space-x-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                  {!u.approved && (
                                    <button onClick={() => handleApprove(u.email)} className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20" title="Authorize Account">
                                      Grant Access
                                    </button>
                                  )}
                                  <button onClick={() => handleDelete(u.email)} className="bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl transition-all" title="Purge Record">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMS;
