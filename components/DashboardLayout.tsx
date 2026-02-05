
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, ClipboardList, FolderKanban, Award, 
  Users, Calendar, FileText, BadgeIndianRupee, Fingerprint, 
  BarChart3, Settings, LogOut, Bell, UserCircle, Menu, X, ChevronRight,
  ShieldCheck, Briefcase
} from 'lucide-react';
import { useAuth } from '../App';
import Logo from './Logo';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  portal: 'lms' | 'hr' | 'attendance';
}

const DASHBOARD_NAV: NavItem[] = [
  // LMS Nav
  { label: 'Dashboard', path: '/lms/dashboard', icon: LayoutDashboard, portal: 'lms' },
  { label: 'My Courses', path: '/lms/courses', icon: BookOpen, portal: 'lms' },
  { label: 'Assignments', path: '/lms/assignments', icon: ClipboardList, portal: 'lms' },
  { label: 'Projects', path: '/lms/projects', icon: FolderKanban, portal: 'lms' },
  { label: 'Certificates', path: '/lms/certificates', icon: Award, portal: 'lms' },
  
  // HR Nav
  { label: 'HR Admin', path: '/hr/dashboard', icon: ShieldCheck, portal: 'hr' },
  { label: 'Employees', path: '/hr/employees', icon: Users, portal: 'hr' },
  { label: 'Attendance', path: '/hr/attendance', icon: Fingerprint, portal: 'hr' },
  { label: 'Leave Mgmt', path: '/hr/leaves', icon: Calendar, portal: 'hr' },
  { label: 'Payroll', path: '/hr/payroll', icon: BadgeIndianRupee, portal: 'hr' },
  
  // Attendance Nav
  { label: 'Student Status', path: '/attendance/dashboard', icon: BarChart3, portal: 'attendance' },
  { label: 'Mark Attendance', path: '/attendance/mark', icon: Users, portal: 'attendance' },
  { label: 'QR Scan', path: '/attendance/qr', icon: Fingerprint, portal: 'attendance' },
  { label: 'Reports', path: '/attendance/reports', icon: FileText, portal: 'attendance' },
];

const DashboardLayout: React.FC<{ children: React.ReactNode, portal: 'lms' | 'hr' | 'attendance' }> = ({ children, portal }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const activeNav = DASHBOARD_NAV.filter(item => item.portal === portal);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-100 transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-50 overflow-hidden">
          <Link to="/" className="flex items-center space-x-3">
             <Logo className="h-10 min-w-[40px]" />
             {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Elite Hub</span>}
          </Link>
        </div>

        <nav className="flex-grow py-8 px-4 space-y-2 overflow-y-auto">
          {activeNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive 
                  ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20' 
                  : 'text-gray-400 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-blue-700'} />
                {sidebarOpen && <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-black text-xs uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'pl-72' : 'pl-20'}`}>
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-50 sticky top-0 z-40 px-8 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
            {sidebarOpen ? <X size={20}/> : <Menu size={20} />}
          </button>

          <div className="flex items-center space-x-6">
            <div className="relative group">
               <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-700 transition-all">
                  <Bell size={20} />
               </button>
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 leading-none">{user?.name}</p>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">
                  {portal.toUpperCase()} Access
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-black">
                {user?.name?.[0] || 'U'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
