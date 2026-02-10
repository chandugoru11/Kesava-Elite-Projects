import React from 'react';
import DashboardLayout from '../components/DashboardLayout.tsx';
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

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Attendance', value: '94%', icon: Calendar, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Active Tracks', value: '02', icon: Play, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Milestones', value: '14/18', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Certificates', value: '01', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
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
            <h2 className="text-2xl font-black text-gray-900 uppercase">Engineering Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Full Stack Architecture', progress: 68 },
                { title: 'Robotics Kinematics', progress: 32 }
              ].map((course, i) => (
                <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm group">
                   <h3 className="text-xl font-black text-gray-900 mb-8 leading-tight">{course.title}</h3>
                   <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                        <span>Completion Node</span>
                        <span className="text-blue-700">{course.progress}%</span>
                     </div>
                     <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                        <div className="h-full bg-blue-700 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LMSDashboard;