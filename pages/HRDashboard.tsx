import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Users, Fingerprint, Calendar, BadgeIndianRupee, Search, Plus, Filter, MoreVertical, ShieldCheck } from 'lucide-react';

const HRDashboard: React.FC = () => {
  return (
    <DashboardLayout portal="hr">
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">HR Control Hub</h1>
            <p className="text-gray-500 font-medium text-lg mt-2 italic">Institutional Personnel Management</p>
          </div>
          <button className="bg-blue-700 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-700/20 hover:bg-black transition-all">
            Initialize Employee Node
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Network Staff', value: '54', icon: Users, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Active Presence', value: '48', icon: Fingerprint, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Pending Requests', value: '04', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Total Payroll', value: '₹5.8L', icon: BadgeIndianRupee, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all">
              <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-10`}>
                <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[4rem] border border-gray-100 shadow-xl overflow-hidden min-h-[500px]">
           <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-10">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Registry Access</h3>
           </div>
           <div className="overflow-x-auto p-4">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-gray-50/50">
                   <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Identity</th>
                   <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Unit</th>
                   <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sync Rate</th>
                   <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {[
                   { name: 'Kushal Reddy', role: 'Staff Engineer', dept: 'Robotics', sync: '98%', status: 'Active' },
                   { name: 'Ananya Rao', role: 'HR Lead', dept: 'Protocol', sync: '100%', status: 'Remote' },
                 ].map((emp, i) => (
                   <tr key={i} className="hover:bg-blue-50/40 transition-all">
                     <td className="px-10 py-8">
                       <div className="flex items-center space-x-6">
                         <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center font-black">{emp.name[0]}</div>
                         <p className="font-black text-gray-900">{emp.name}</p>
                       </div>
                     </td>
                     <td className="px-10 py-8 text-sm font-bold">{emp.role}</td>
                     <td className="px-10 py-8 text-xs font-black">{emp.sync}</td>
                     <td className="px-10 py-8">
                       <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-100">{emp.status}</span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;