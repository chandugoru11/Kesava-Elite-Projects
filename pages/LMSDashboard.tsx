
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Play, FileText, Award, Calendar, ChevronRight, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

const LMSDashboard: React.FC = () => {
  return (
    <DashboardLayout portal="lms">
      <div className="animate-fade-in max-w-6xl">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Elite Dashboard</h1>
            <p className="text-gray-500 font-medium text-lg mt-2 italic">Optimizing your technical evolution path.</p>
          </div>
          <div className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-100">
             <Sparkles size={16} className="text-blue-700 animate-pulse" />
             <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Tier 01 Student Access</span>
          </div>
        </div>

        {/* High-Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Network Attendance', value: '94%', icon: Calendar, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Active Tracks', value: '02', icon: Play, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Milestones Hit', value: '14/18', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Certifications', value: '01', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center uppercase">
              Current Engineering Tracks
              <div className="ml-4 h-px flex-grow bg-gray-100"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Full Stack Architecture', progress: 68, deadline: 'Session 12' },
                { title: 'Robotics Kinematics', progress: 32, deadline: 'Session 04' }
              ].map((course, i) => (
                <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:border-blue-700/20 transition-all group">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 bg-gray-950 text-white rounded-2xl flex items-center justify-center group-hover:bg-blue-700 transition-all">
                        <BookOpen size={24} />
                      </div>
                      <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full tracking-widest">{course.deadline}</span>
                   </div>
                   <h3 className="text-xl font-black text-gray-900 mb-8 leading-tight">{course.title}</h3>
                   
                   <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span>Completion Node</span>
                        <span className="text-blue-700">{course.progress}%</span>
                     </div>
                     <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                        <div className="h-full bg-blue-700 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${course.progress}%` }}></div>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Session Log</h2>
            <div className="space-y-4">
               {[
                 { time: '09:00', subject: 'Embedded C Fundamentals', node: 'Lab 2' },
                 { time: '14:30', subject: 'NodeJS Secure Hubs', node: 'Virtual' }
               ].map((session, i) => (
                 <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between hover:bg-blue-700 hover:text-white transition-all group cursor-pointer border-l-8 border-l-blue-700">
                    <div className="flex items-center space-x-6">
                      <div className="text-[10px] font-black uppercase text-gray-400 group-hover:text-blue-200">{session.time}</div>
                      <div>
                        <h4 className="font-black text-sm">{session.subject}</h4>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">{session.node}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                 </div>
               ))}
            </div>

            <div className="bg-blue-950 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
               <TrendingUp className="text-blue-500 mb-6" />
               <h4 className="text-xl font-black mb-4 tracking-tight">Performance Boost</h4>
               <p className="text-xs text-blue-300 font-medium leading-relaxed mb-8">Maintain current velocity to achieve Senior Certification 12 days ahead of schedule.</p>
               <button className="w-full py-4 bg-white text-blue-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all">
                 System Analysis
               </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LMSDashboard;
