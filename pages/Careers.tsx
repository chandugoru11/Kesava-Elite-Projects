
import React from 'react';
import { Search, Briefcase, MapPin } from 'lucide-react';

const Careers: React.FC = () => {
  const jobs = [
    { title: "Robotics Trainer", type: "Full-Time", location: "Andhra Pradesh" },
    { title: "STEM Instructor", type: "Full-Time", location: "Various Locations" },
    { title: "AI & IoT Engineer", type: "Contract", location: "Remote/Hybrid" },
    { title: "Curriculum Designer", type: "Full-Time", location: "Headquarters" },
    { title: "Internship Opportunities", type: "Internship", location: "Flexible" }
  ];

  return (
    <div className="bg-gray-50 pb-24">
      <div className="bg-gray-900 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6">Join Our Mission</h1>
          <p className="text-red-500 text-xl max-w-2xl mx-auto">We are looking for passionate innovators to transform education.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row gap-4 border border-gray-100">
           <div className="flex-grow flex items-center px-4 bg-gray-50 rounded-xl">
             <Search size={20} className="text-gray-400 mr-3" />
             <input type="text" placeholder="Search for roles..." className="bg-transparent w-full py-4 text-sm focus:outline-none" />
           </div>
           <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold">Find Jobs</button>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center hover:border-red-600 transition-colors shadow-sm">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-gray-500">
                  <span className="flex items-center"><Briefcase size={16} className="mr-2" /> {job.type}</span>
                  <span className="flex items-center"><MapPin size={16} className="mr-2" /> {job.location}</span>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-3 rounded-xl border-2 border-red-600 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-white p-12 rounded-3xl border border-dashed border-gray-300">
          <h3 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h3>
          <p className="text-gray-600 mb-8">We are always looking for great talent. Send your resume and we will get back to you.</p>
          <a href="mailto:info@keshavaeliteprojects.com" className="text-red-600 font-bold underline text-lg">Send Resume</a>
        </div>
      </div>
    </div>
  );
};

export default Careers;
