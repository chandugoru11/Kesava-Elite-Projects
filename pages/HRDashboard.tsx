
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Users, Fingerprint, Calendar, BadgeIndianRupee, ArrowUpRight, Search, Plus, Filter, MoreVertical } from 'lucide-react';

const HRDashboard: React.FC = () => {
  return (
    <DashboardLayout portal="hr">
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">HR Administration</h1>
            <p className="text-gray-500 font-medium mt-1">Enterprise Employee Management Hub</p>
          </div>
          <button className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center shadow-xl shadow-blue-700/20 hover:-translate-y-1 transition-all">
            <Plus size={18} className="mr-2" /> Add Employee
          </button>
        </div>

        {/* HR Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Staff', value: '48', icon: Users, change: '+2 new', color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Today Present', value: '42', icon: Fingerprint, change: '87.5%', color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Leave Requests', value: '03', icon: Calendar, change: 'Pending', color: 'text-orange-700', bg: 'bg-orange-50' },
            { label: 'Monthly Payroll', value: '₹4.2L', icon: BadgeIndianRupee, change: 'Processing', color: 'text-purple-700', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50/50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
              <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon size={24} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline space-x-3">
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Employee Management Table Container */}
        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl overflow-hidden">
           <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <h3 className="text-xl font-black text-gray-900">Active Personnel</h3>
              <div className="flex items-center space-x-4 w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input type="text" placeholder="Search employee..." className="bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-6 py-3 text-sm focus:border-blue-700 outline-none w-full md:w-64" />
                 </div>
                 <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-700 transition-all">
                   <Filter size={20} />
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-gray-50/50">
                   <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Employee</th>
                   <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role & Dept</th>
                   <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Attendance</th>
                   <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                   <th className="px-8 py-6"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {[
                   { name: 'Arjun Das', role: 'Senior Robotics Trainer', dept: 'Curriculum', attendance: '95%', status: 'In-Office' },
                   { name: 'Priya Verma', role: 'HR Manager', dept: 'Administration', attendance: '100%', status: 'On-Leave' },
                   { name: 'Kunal Singh', role: 'Full Stack Mentor', dept: 'IT Systems', attendance: '88%', status: 'In-Office' },
                 ].map((emp, i) => (
                   <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                     <td className="px-8 py-6">
                       <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center font-black text-blue-700">{emp.name[0]}</div>
                         <span className="font-black text-sm text-gray-900">{emp.name}</span>
                       </div>
                     </td>
                     <td className="px-8 py-6">
                       <p className="text-sm font-bold text-gray-900">{emp.role}</p>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{emp.dept}</p>
                     </td>
                     <td className="px-8 py-6">
                       <div className="flex items-center space-x-3">
                         <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-700" style={{ width: emp.attendance }}></div>
                         </div>
                         <span className="text-xs font-black text-gray-900">{emp.attendance}</span>
                       </div>
                     </td>
                     <td className="px-8 py-6">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${emp.status === 'On-Leave' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                         {emp.status}
                       </span>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <button className="text-gray-300 hover:text-blue-700 transition-colors">
                          <MoreVertical size={18} />
                        </button>
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
