
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
// Added Award to the lucide-react imports
import { Play, Clock, FileText, CheckCircle2, ChevronRight, TrendingUp, Calendar, Award } from 'lucide-react';
import { ASSETS } from '../assets';

const LMSDashboard: React.FC = () => {
  return (
    <DashboardLayout portal="lms">
      <div className="animate-fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back, Innovator!</h1>
          <p className="text-gray-500 font-medium mt-1">Here is your learning progress for this week.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Attendance', value: '92%', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Courses', value: '03', icon: Play, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Assignments', value: '12/15', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Certificates', value: '01', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Courses Area */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-black text-gray-900 flex items-center">
              Ongoing Projects
              <span className="ml-3 bg-blue-100 text-blue-700 text-[10px] px-3 py-1 rounded-full">ACTIVE</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Full Stack Web Dev', progress: 75, instructor: 'Dr. Anand', deadline: '2 Days left' },
                { title: 'Industrial Robotics', progress: 40, instructor: 'Er. Rakesh', deadline: '8 Days left' }
              ].map((course, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all">
                        <Play size={20} />
                      </div>
                      <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{course.deadline}</span>
                   </div>
                   <h3 className="text-lg font-black text-gray-900 mb-2">{course.title}</h3>
                   <p className="text-xs text-gray-400 font-bold mb-6 italic">Mentor: {course.instructor}</p>
                   
                   <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span>Progress</span>
                        <span className="text-blue-700">{course.progress}%</span>
                     </div>
                     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-700 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule / Sidebar */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-gray-900">Today's Sessions</h2>
            <div className="space-y-4">
               {[
                 { time: '10:00 AM', subject: 'Robotics Control Systems', room: 'Lab A-1' },
                 { time: '02:30 PM', subject: 'Cloud Infrastructure', room: 'Online Meet' }
               ].map((session, i) => (
                 <div key={i} className="bg-white p-6 rounded-[2rem] border-l-4 border-l-blue-700 border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-blue-50 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-50 p-3 rounded-xl text-blue-700 font-black text-[10px] uppercase">
                        {session.time.split(' ')[0]}<br/>{session.time.split(' ')[1]}
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-gray-900">{session.subject}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{session.room}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-700 transition-all" />
                 </div>
               ))}
            </div>

            <div className="bg-gray-950 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
               <TrendingUp className="text-blue-500 mb-4" />
               <h4 className="text-xl font-black mb-2">Weekly Goal</h4>
               <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">Complete the "React Hooks" module to stay on track for certification.</p>
               <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                 View Curriculum
               </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LMSDashboard;
