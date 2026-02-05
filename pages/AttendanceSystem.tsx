
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Users, Search, CheckCircle2, XCircle, ChevronRight, QrCode, FileText, Download, Calendar } from 'lucide-react';

const AttendanceSystem: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState('B-004 (Industrial Robotics)');
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: 'Aditya Reddy', roll: 'KE-2024-001', present: true },
    { id: 2, name: 'Sanya Gupta', roll: 'KE-2024-002', present: true },
    { id: 3, name: 'Rahul Khanna', roll: 'KE-2024-003', present: false },
    { id: 4, name: 'Megha Rao', roll: 'KE-2024-004', present: true },
    { id: 5, name: 'Vikram Joshi', roll: 'KE-2024-005', present: true },
  ]);

  const toggleAttendance = (id: number) => {
    setAttendanceList(prev => prev.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  return (
    <DashboardLayout portal="attendance">
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Attendance Hub</h1>
            <p className="text-gray-500 font-medium mt-1">Institutional Student Attendance Management</p>
          </div>
          <div className="flex items-center space-x-4">
             <button className="p-4 bg-white border border-gray-100 rounded-2xl text-blue-700 hover:shadow-lg transition-all">
                <QrCode size={20} />
             </button>
             <button className="bg-gray-950 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center shadow-xl shadow-gray-900/20">
                <FileText size={18} className="mr-2" /> Daily Report
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Batch Selector Sidebar */}
          <div className="space-y-6">
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Active Batches</h3>
             <div className="space-y-3">
               {['B-004 (Industrial Robotics)', 'B-005 (Full Stack)', 'B-012 (STEM K12)'].map((batch) => (
                 <button 
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  className={`w-full text-left p-6 rounded-[2rem] border transition-all ${selectedBatch === batch ? 'bg-blue-700 border-blue-700 text-white shadow-xl shadow-blue-700/20' : 'bg-white border-gray-100 text-gray-500 hover:border-blue-700'}`}
                 >
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">Ref: {batch.split(' ')[0]}</p>
                    <p className="font-black text-sm">{batch.split(' (')[1].replace(')', '')}</p>
                 </button>
               ))}
             </div>
          </div>

          {/* Attendance Marking Interface */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl overflow-hidden">
               <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Marking: {selectedBatch}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Today: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                     <span className="text-xs font-black text-gray-400">SESSION: 02/45</span>
                  </div>
               </div>

               <div className="p-6">
                 <div className="grid grid-cols-1 gap-4">
                   {attendanceList.map((student) => (
                     <div 
                      key={student.id}
                      onClick={() => toggleAttendance(student.id)}
                      className={`flex items-center justify-between p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all ${student.present ? 'border-green-600 bg-green-50/30' : 'border-gray-50 bg-white hover:border-red-100'}`}
                     >
                       <div className="flex items-center space-x-6">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black ${student.present ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-gray-100 text-gray-400'}`}>
                           {student.present ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                         </div>
                         <div>
                            <h4 className="font-black text-lg text-gray-900 leading-tight">{student.name}</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{student.roll}</p>
                         </div>
                       </div>
                       
                       <div className="flex items-center space-x-6">
                         <span className={`text-[10px] font-black uppercase tracking-widest ${student.present ? 'text-green-600' : 'text-red-500'}`}>
                           {student.present ? 'PRESENT' : 'ABSENT'}
                         </span>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${student.present ? 'border-green-600 bg-green-600' : 'border-gray-200'}`}>
                           {student.present && <CheckCircle2 size={12} className="text-white" />}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="p-10 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center space-x-12">
                     <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Strength</p>
                       <p className="text-2xl font-black text-gray-900">{attendanceList.length}</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Present Now</p>
                       <p className="text-2xl font-black text-green-600">{attendanceList.filter(s => s.present).length}</p>
                     </div>
                  </div>
                  <button className="bg-blue-700 text-white px-12 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-blue-700/20 hover:bg-blue-800 transition-all flex items-center">
                    Submit Session Attendance <ChevronRight size={20} className="ml-2" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendanceSystem;
