
import React from 'react';

const Partners: React.FC = () => {
  const partnerTypes = [
    { title: "Schools & Engineering Colleges", icon: "🎓" },
    { title: "Government Departments", icon: "🏛️" },
    { title: "CSR Foundations", icon: "🤝" },
    { title: "Innovation Hubs", icon: "💡" },
    { title: "Research Institutions", icon: "🔬" }
  ];

  return (
    <div className="bg-gray-50 pb-24">
      <div className="bg-gray-900 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">Our Partners</h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">We collaborate with diverse organizations to expand the horizon of technology education.</p>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerTypes.map((partner, i) => (
            <div key={i} className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center group border border-gray-100">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform block">{partner.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{partner.title}</h3>
              <div className="w-12 h-1 bg-red-600 mx-auto rounded-full group-hover:w-24 transition-all"></div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white rounded-3xl shadow-lg border border-red-50">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you are an educational institution looking to upgrade your labs or a corporate entity seeking impactful CSR projects, we have a model that works for you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-sm font-semibold text-gray-700">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Joint Research & Development</span>
                </li>
                <li className="flex items-center space-x-3 text-sm font-semibold text-gray-700">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Customized Curriculum Design</span>
                </li>
                <li className="flex items-center space-x-3 text-sm font-semibold text-gray-700">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>National Level Competition Host</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-video bg-gray-50 rounded-xl flex items-center justify-center p-4">
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
