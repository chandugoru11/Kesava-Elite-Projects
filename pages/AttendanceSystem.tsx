import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { CheckCircle2, XCircle, ChevronRight, QrCode, FileText, Calendar, Users, Target } from 'lucide-react';

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Attendance Node</h1>
            <p className="text-gray-500 font-medium text-lg mt-2 italic">Institutional Presence Synchronizer</p>
          </div>
          <div className="flex items-center space-x-4">
             <button className="p-5 bg-white border border-gray-100 rounded-[1.5rem] text-blue-700 hover:shadow-2xl transition-all shadow-sm">
                <QrCode size={24} />
             </button>
             <button className="bg-gray-950 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center shadow-2xl shadow-gray-950/20 hover:bg-blue-700 transition-all">
                <FileText size={18} className="mr-3" /> Operational Report
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          <div className="space-y-8 sticky top-32">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center px-4">
               <Target size={14} className="mr-3 text-blue-700" /> Active Registry
             </h3>
             <div className="space-y-4">
               {['B-004 (Industrial Robotics)', 'B-005 (Full Stack)', 'B-012 (STEM K12)'].map((batch) => (
                 <button 
                  key={batch}
                  onClick={() => setSelectedBatch(batch)}
                  className={`w-full text-left p-8 rounded-[3rem] border transition-all ${selectedBatch === batch ? 'bg-blue-700 border-blue-700 text-white shadow-2xl shadow-blue-700/20' : 'bg-white border-gray-100 text-gray-500 hover:border-blue-700 hover:-translate-y-1'}`}
                 >
                    <p className="font-black text-lg leading-tight">{batch.split(' (')[1].replace(')', '')}</p>
                 </button>
               ))}
             </div>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <div className="bg-white rounded-[4.5rem] border border-gray-100 shadow-[0_50px_100px_-40px_rgba(29,78,216,0.1)] overflow-hidden">
               <div className="p-12 border-b border-gray-50 bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="flex items-center space-x-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm border border-gray-100">
                      <Users size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">{selectedBatch}</h3>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                     <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Protocol Active</span>
                  </div>
               </div>

               <div className="p-10 space-y-4">
                   {attendanceList.map((student) => (
                     <div 
                      key={student.id}
                      onClick={() => toggleAttendance(student.id)}
                      className={`flex items-center justify-between p-8 rounded-[3rem] border-2 cursor-pointer transition-all ${student.present ? 'border-green-600 bg-green-50/20' : 'border-gray-50 bg-white hover:border-red-100'}`}
                     >
                       <div className="flex items-center space-x-8">
                         <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black ${student.present ? 'bg-green-600 text-white shadow-xl shadow-green-600/20' : 'bg-gray-100 text-gray-400'}`}>
                           {student.present ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                         </div>
                         <div>
                            <h4 className="font-black text-xl text-gray-900 leading-tight mb-1">{student.name}</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{student.roll}</p>
                         </div>
                       </div>
                       <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${student.present ? 'text-green-600' : 'text-red-400'}`}>
                         {student.present ? 'Verified' : 'Unsynced'}
                       </span>
                     </div>
                   ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendanceSystem;