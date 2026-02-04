
import React from 'react';
import { Terminal, Briefcase, Rocket, Star } from 'lucide-react';

const CourseCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-red-200 transition-all group">
    <div className="flex items-center space-x-4 mb-8">
      <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center text-gray-600 text-sm">
          <Star size={12} className="text-red-500 mr-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Courses: React.FC = () => {
  return (
    <div className="bg-gray-50 pb-24">
      <div className="bg-red-600 py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-white mb-6">Professional Programs</h1>
          <p className="text-red-100 text-xl max-w-3xl mx-auto">Industry-aligned professional certification programs for career excellence.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CourseCard 
            title="Information Technology"
            icon={<Terminal size={24} />}
            items={[
              "Full-Stack Development",
              "Data Science",
              "Artificial Intelligence",
              "Machine Learning",
              "Power BI & Analytics",
              "App Development (Mobile)",
              "Cybersecurity",
              "Cloud Computing",
              "Quantum AI Computing",
              "Software Testing",
              "Python Developer",
              "Data Analyst"
            ]}
          />
          <CourseCard 
            title="Business & Management"
            icon={<Briefcase size={24} />}
            items={[
              "Business Growth Specialist",
              "Stock Market & Investment Training",
              "Strategic Operations",
              "Digital Marketing Automation",
              "FinTech & Blockchain Basics"
            ]}
          />
          <CourseCard 
            title="Core Courses"
            icon={<Rocket size={24} />}
            items={[
              "AI Robotics",
              "Internet of Things (IoT)",
              "IoRT (Robotics Things)",
              "Embedded Systems",
              "Drone & Aerial Robotics",
              "Microcontroller Programming",
              "PCB Design & Fabrication"
            ]}
          />
        </div>
      </div>

      <section className="mt-24 container mx-auto px-6">
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Program Training Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'Hands-on Projects', img: 'https://picsum.photos/id/101/200/200' },
              { label: 'Industry Cases', img: 'https://picsum.photos/id/102/200/200' },
              { label: 'Certification', img: 'https://picsum.photos/id/103/200/200' },
              { label: 'Internship Support', img: 'https://picsum.photos/id/104/200/200' },
              { label: 'Placement Assistance', img: 'https://picsum.photos/id/106/200/200' },
              { label: 'Startup Mentorship', img: 'https://picsum.photos/id/107/200/200' }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-100 overflow-hidden ring-4 ring-gray-50 group-hover:ring-red-100 transition-all">
                   <img src={feature.img} alt={feature.label} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-bold text-gray-800 leading-tight">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
