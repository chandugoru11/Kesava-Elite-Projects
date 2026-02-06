
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, Building2, Landmark, GraduationCap, ExternalLink } from 'lucide-react';

interface LogoItem {
  name: string;
  logo: string;
  url?: string;
}

const Impact: React.FC = () => {
  const approvedBy: LogoItem[] = [
    { name: "APSSDC Skill AP", logo: "https://i.postimg.cc/vm0w2Ps7/APSSDC.jpg", url: "https://www.apssdc.in/" },
    { name: "MSME India", logo: "https://i.postimg.cc/4y6KrKQP/Micro_Small_and_Medium.jpg", url: "https://msme.gov.in/" },
    { name: "DPIIT Startup India", logo: "https://i.postimg.cc/Hxtz9KDZ/DPIIT.jpg", url: "https://www.startupindia.gov.in/" },
    { name: "ISO 9001 Certified", logo: "https://i.postimg.cc/VNkjnFWC/ISO-9001.jpg", url: "https://www.iso.org/" },
    { name: "AICTE India", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png", url: "https://www.aicte-india.org/" },
    { name: "MCA Govt of India", logo: "https://i.postimg.cc/J7ZP1P67/MCA-Govt-of-INDIA-jpg.jpg", url: "https://www.mca.gov.in/" }
  ];

  const trustedBy: LogoItem[] = [
    { name: "National Skill Development Corporation", logo: "https://i.postimg.cc/sxqn0NwF/NSDC.jpg", url: "https://nsdcindia.org/" },
    { name: "IIT Madras", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg", url: "https://www.iitm.ac.in/" },
    { name: "Infosys Springboard", logo: "https://i.postimg.cc/HWVBfT5T/Infosys-Springboard.jpg", url: "https://infosysspringboard.onwingspan.com/" },
    { name: "Great Learning", logo: "https://i.postimg.cc/QdL7VbvJ/Great-Learning.jpg", url: "https://www.greatlearning.in/" },
    { name: "Cisco Networking", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png", url: "https://www.netacad.com/" }
  ];

  const institutionalClients: LogoItem[] = [
    { name: "MAM Group of Colleges", logo: "https://i.postimg.cc/gkyR77Mc/MAM-Colleges.jpg", url: "https://mamgroup.edu.in/" },
    { name: "IDPS Narsaraopet", logo: "https://i.postimg.cc/zB3FZkLG/International-Delhi-Public-School.jpg", url: "https://idpsnarasaraopet.com/" },
    { name: "Ugyan Edutech", logo: "https://i.postimg.cc/906pBqFb/Ugyan.jpg", url: "https://www.ugyan.in/" },
    { name: "Code Tree Solutions", logo: "https://i.postimg.cc/mgXG8XRD/Code-Tree.jpg", url: "https://codetree.in/" },
    { name: "Flyhii Pvt Ltd", logo: "https://i.postimg.cc/vHCrfMxW/Flhi.jpg", url: "https://flyhii.com/" }
  ];

  const LogoCard: React.FC<{ item: LogoItem }> = ({ item }) => (
    <a 
      href={item.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[3rem] p-10 min-w-[340px] h-52 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-600/30 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-blue-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Logo Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <img 
          src={item.logo} 
          alt={item.name} 
          className="max-w-full max-h-[130px] object-contain transition-all duration-700 transform group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=eff6ff&color=1d4ed8&bold=true&length=4&size=256`;
          }}
        />
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex flex-col items-center">
        <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em] flex items-center">
          {item.name} <ExternalLink size={10} className="ml-2" />
        </span>
      </div>
    </a>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <div className="container mx-auto px-6 mb-20 text-center">
      <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-full mb-8 shadow-sm">
        <Icon size={18} className="animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">{subtitle}</span>
      </div>
      <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">{title}</h2>
      <div className="w-32 h-2 bg-blue-700 rounded-full mt-10 mx-auto shadow-xl shadow-blue-700/20"></div>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Impact Hero Section */}
      <div className="relative py-48 bg-blue-950 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-grid"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/10 blur-[180px] rounded-full"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
            <ShieldCheck size={24} className="text-blue-500" />
            <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-xs">Certified Institutional Excellence</span>
          </div>
          <h1 className="text-7xl md:text-[9rem] font-black text-white mb-10 leading-[0.85] tracking-tighter">
            Global <br/><span className="shimmer-text">Impact.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
            Bridging the gap between academic potential and industrial reality through world-class accreditation and elite partnerships.
          </p>
        </div>
      </div>

      {/* Approved By Section (The Legal/Quality Tier) */}
      <section className="py-32 bg-white overflow-hidden border-b border-gray-50">
        <SectionHeader 
          icon={Landmark} 
          title="Approved By" 
          subtitle="Regulatory & Quality Foundation" 
        />
        <div className="flex relative marquee-mask overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 py-12 px-6">
            {[...approvedBy, ...approvedBy].map((item, i) => <LogoCard key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* Trusted By Section (The Industry Tier) */}
      <section className="py-32 bg-white overflow-hidden border-b border-gray-50">
        <SectionHeader 
          icon={Award} 
          title="Trusted By" 
          subtitle="Strategic Technical Partners" 
        />
        <div className="flex relative marquee-mask overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 py-12 px-6">
            {[...trustedBy, ...trustedBy].map((item, i) => <LogoCard key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* Institutional Clients Section (The User Tier) */}
      <section className="py-32 bg-white overflow-hidden">
        <SectionHeader 
          icon={GraduationCap} 
          title="Elite Clients" 
          subtitle="The Institutional Network" 
        />
        <div className="flex relative marquee-mask overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 py-12 px-6">
            {[...institutionalClients, ...institutionalClients].map((item, i) => <LogoCard key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* Final Call to Impact */}
      <section className="py-32 bg-white pt-0">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto bg-blue-700 rounded-[5rem] p-24 md:p-32 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(29,78,216,0.3)]">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h2 className="text-6xl md:text-[6rem] font-black mb-12 tracking-tighter leading-none">Standardize Your <br/>Innovation.</h2>
              <p className="text-2xl text-blue-50 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
                Whether you are a government body, a university, or a research hub, let's collaborate to build the elite technical ecosystem of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                <Link to="/contact" className="bg-white text-blue-700 px-16 py-8 rounded-[3rem] font-black text-2xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105">
                  Partner with Us
                </Link>
                <div className="flex flex-col items-center sm:items-start text-left">
                  <p className="text-xs font-black uppercase tracking-[0.3em] opacity-60 mb-2">Corporate Relations</p>
                  <a href="mailto:info@keshavaeliteprojects.in" className="text-white font-black text-2xl hover:underline">
                    info@keshavaeliteprojects.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
