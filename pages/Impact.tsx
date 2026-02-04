
import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Globe, Heart, ShieldCheck, Award, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface LogoItem {
  name: string;
  logo: string;
}

const Impact: React.FC = () => {
  const approvedBy: LogoItem[] = [
    { name: "ISO 9001", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/ISO_9001_Logo.svg" },
    { name: "MSME AP", logo: "https://apmsme.ap.gov.in/images/logo.png" },
    { name: "Startup India", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Startup_India_logo.png" },
    { name: "AICTE", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png" },
    { name: "APSSDC", logo: "https://www.apssdc.in/home/img/apssdc_logo.png" },
    { name: "NSDC", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/National_Skill_Development_Corporation_logo.svg/1200px-National_Skill_Development_Corporation_logo.svg.png" }
  ];

  const trustedBy: LogoItem[] = [
    { name: "IITM", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" },
    { name: "Infosys Springboard", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    { name: "Great Learning", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Great_Learning_Logo.png" },
    { name: "IDPS", logo: "https://idpsnarasaraopet.com/wp-content/uploads/2021/04/cropped-IDPS-Logo-1.png" },
    { name: "MAM Group", logo: "https://mamgroup.edu.in/images/logo.png" }
  ];

  const LogoCard: React.FC<{ item: LogoItem }> = ({ item }) => (
    <div className="group relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[3rem] p-10 min-w-[280px] h-48 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-600/30 transition-all duration-500 cursor-default overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <img 
          src={item.logo} 
          alt={item.name} 
          className="max-w-full max-h-[100px] object-contain transition-all duration-700 transform group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${item.name}&background=eff6ff&color=1d4ed8&bold=true&length=4`;
          }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.3em]">{item.name}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Hero Section - Elite Blue Theme */}
      <div className="relative py-40 bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
            <ShieldCheck size={20} className="text-blue-500" />
            <span className="text-blue-500 font-black tracking-widest uppercase text-xs">Certified Industrial Excellence</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 leading-[0.9] tracking-tight">
            Our Global <br/><span className="text-blue-500 italic">Impact</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            Setting the elite standard for technical education through industrial collaborations and accredited results.
          </p>
        </div>
      </div>

      {/* Approved By Section - Marquee on White */}
      <section className="py-32 bg-white overflow-hidden border-b border-gray-50">
        <div className="container mx-auto px-6 mb-20 text-center">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.5em] mb-6">Standards & Protocols</h2>
          <h3 className="text-5xl font-black text-gray-900">Approved By</h3>
          <div className="w-24 h-2 bg-blue-700 rounded-full mt-8 mx-auto shadow-xl shadow-blue-700/20"></div>
        </div>
        
        <div className="flex relative">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="animate-marquee flex items-center gap-16 py-12 px-6">
            {[...approvedBy, ...approvedBy].map((item, i) => (
              <LogoCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Clean White/Light Blue */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-32">
            {[
              { label: 'Learners Trained', value: '5,000+' },
              { label: 'Elite Partners', value: '25+' },
              { label: 'Rural Impact', value: '85%' },
              { label: 'Hub Networks', value: '12+' },
              { label: 'Quality Score', value: '100%' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-14 rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group text-center hover:-translate-y-2">
                <p className="text-4xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{stat.value}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight">Empowering <br/><span className="text-blue-700 shimmer-text">The New Future.</span></h2>
                <p className="text-gray-500 text-xl leading-relaxed font-medium">We lead the technical revolution by ensuring every aspirant has the bridge to high-end industrial knowledge.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: <Globe />, title: "Inclusive Tech", text: "Removing geographical barriers for elite industrial labs." },
                  { icon: <Heart />, title: "Social Impact", text: "Direct support for underprivileged technical clusters." },
                  { icon: <CheckCircle2 />, title: "Certification", text: "Industry-vetted curriculum for maximum employability." },
                  { icon: <Map />, title: "Mission Focus", text: "Aligned with national goals for a digital-first India." }
                ].map((item, i) => (
                  <div key={i} className="space-y-6 group p-6 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-50">
                    <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-all shadow-sm">
                      {item.icon}
                    </div>
                    <h4 className="font-black text-gray-900 text-2xl leading-none">{item.title}</h4>
                    <p className="text-gray-400 text-base leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-10 bg-blue-600/5 blur-[150px] rounded-full"></div>
              <div className="relative h-[750px] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(29,78,216,0.15)] group border-[12px] border-white">
                {/* Specific Impact Image - Student in Lab */}
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                  alt="Student Empowerment" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent p-20 flex flex-col justify-end">
                  <div className="w-24 h-2 bg-blue-600 rounded-full mb-10"></div>
                  <h4 className="text-5xl font-black text-white mb-8 italic leading-tight">"Innovation is the bridge to reality."</h4>
                  <p className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs">Accredited Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - White/Marquee */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-20 text-center">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.5em] mb-6">Strategic Collaborations</h2>
          <h3 className="text-5xl font-black text-gray-900">Trusted By</h3>
          <div className="w-24 h-2 bg-blue-700 rounded-full mt-8 mx-auto shadow-xl shadow-blue-700/20"></div>
          <p className="text-gray-500 mt-12 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Collaborating with the most respected names in the technical ecosystem.
          </p>
        </div>
        
        <div className="flex relative">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="animate-marquee flex items-center gap-16 py-12 px-6">
            {[...trustedBy, ...trustedBy].map((item, i) => (
              <LogoCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean Blue Accent */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto bg-blue-950 rounded-[6rem] p-24 md:p-32 shadow-[0_50px_100px_-20px_rgba(29,78,216,0.3)] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Partner with Excellence</h2>
              <p className="text-gray-400 text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed">
                Connect with our administration to establish your own Center of Excellence or STEM Lab today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-10">
                <Link to="/contact" className="bg-blue-600 text-white px-16 py-8 rounded-[3rem] font-black text-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/40 hover:scale-105">
                  Start Partnership
                </Link>
                <button className="border-2 border-white/10 text-white px-16 py-8 rounded-[3rem] font-black text-2xl hover:bg-white/10 transition-all hover:scale-105">
                  Impact Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
