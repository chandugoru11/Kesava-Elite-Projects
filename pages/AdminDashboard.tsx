
import React, { useState, useEffect } from 'react';
import { Shield, Users, CheckCircle, XCircle, Trash2, Clock, Mail, Phone, ArrowLeft, RefreshCw, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    const storedUsers = JSON.parse(localStorage.getItem('keshava_registered_users') || '[]');
    setUsers(storedUsers);
    setTimeout(() => setLoading(false), 500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = (email: string) => {
    const updatedUsers = users.map(user => 
      user.email === email ? { ...user, approved: true } : user
    );
    localStorage.setItem('keshava_registered_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleDelete = (email: string) => {
    if (window.confirm(`Delete user ${email}? This action is permanent.`)) {
      const updatedUsers = users.filter(user => user.email !== email);
      localStorage.setItem('keshava_registered_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link to="/" className="text-blue-700 font-black text-xs uppercase tracking-widest flex items-center mb-4 hover:underline">
              <ArrowLeft size={14} className="mr-2" /> Back to Website
            </Link>
            <h1 className="text-4xl font-black text-gray-900 flex items-center">
              <Shield className="mr-4 text-blue-700" size={36} />
              Master Control Center
            </h1>
            <p className="text-gray-500 font-medium mt-2">Manage student registrations and security access</p>
          </div>
          <button 
            onClick={fetchUsers}
            className="bg-white border border-gray-200 p-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm flex items-center text-sm font-bold text-gray-600"
          >
            <RefreshCw size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Database
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Enrollments</p>
            <p className="text-4xl font-black text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pending Review</p>
            <p className="text-4xl font-black text-orange-600">{users.filter(u => !u.approved).length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Students</p>
            <p className="text-4xl font-black text-green-600">{users.filter(u => u.approved).length}</p>
          </div>
          <div className="bg-blue-700 p-8 rounded-[2.5rem] shadow-xl text-white">
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-2">System Status</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
              <p className="text-xl font-black">Admin Access: Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Enrollment Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <Users size={48} className="text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold">No registered users found in database.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center font-black mr-4">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-black text-gray-900">{user.firstName} {user.lastName}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {user.timestamp.toString().slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600 font-medium">
                            <Mail size={14} className="mr-2 text-blue-600" /> {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 font-medium">
                            <Phone size={14} className="mr-2 text-blue-600" /> {user.mobile}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-sm text-gray-500 font-bold">
                          <Clock size={14} className="mr-2" />
                          {new Date(user.timestamp).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {user.approved ? (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                            <CheckCircle size={12} className="mr-2" /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-widest border border-orange-100">
                            <Clock size={12} className="mr-2" /> Pending Review
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          {!user.approved && (
                            <button 
                              onClick={() => handleApprove(user.email)}
                              className="bg-blue-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-700/20"
                            >
                              Approve
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(user.email)}
                            className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
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

        <div className="mt-12 p-8 bg-blue-950 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="bg-blue-600 p-5 rounded-3xl"><Lock size={32} /></div>
              <div>
                <h3 className="text-xl font-black">Security Audit Logs</h3>
                <p className="text-blue-200/60 font-medium text-sm">Database updates are logged locally for session security.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Protocol Active</p>
              <p className="text-sm font-mono opacity-40">NODE_AUTH_MASTER_DB_772</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
