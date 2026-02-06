
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cpu, GraduationCap, ShieldCheck, Zap, Globe, Star, ShieldAlert, Search, Sparkles, Terminal, ExternalLink, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { ASSETS } from '../assets';
import Logo from '../components/Logo';
import { GoogleGenAI } from "@google/genai";

const Reveal: React.FC<{ children: React.ReactNode; className?: string; type?: 'up' | 'left' | 'right'; delay?: string }> = ({ children, className = '', type = 'up', delay = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const revealClass = type === 'up' ? 'reveal-up' : type === 'left' ? 'reveal-left' : 'reveal-right';

  return (
    <div ref={ref} className={`reveal ${revealClass} ${isActive ? 'active' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
};

// Fix: Updated GroundingChunk interface to match @google/genai SDK types where uri and title can be optional
interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

// Fix: Updated CitationsList to ensure only chunks with valid URIs are rendered and handled safely
const CitationsList: React.FC<{ chunks: GroundingChunk[] }> = ({ chunks }) => {
  const links = chunks?.filter(c => c.web && c.web.uri).map(c => c.web!) || [];
  if (links.length === 0) return null;
  
  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center">
        <Globe size={12} className="mr-2" /> Verified Source Citations
      </p>
      <div className="flex flex-wrap gap-3">
        {links.map((link, i) => (
          <a 
            key={i} 
            href={link.uri} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:bg-white/10 hover:border-blue-500 transition-all shadow-sm"
          >
            <span className="max-w-[150px] truncate mr-2">{link.title || 'Source Reference'}</span>
            <ExternalLink size={12} className="text-gray-500 group-hover:text-blue-400" />
          </a>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [chunks, setChunks] = useState<GroundingChunk[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResponse(null);
    setChunks([]);

    try {
      // Fix: Initializing GoogleGenAI with named parameter apiKey from process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `As a Keshava Elite Technical Consultant, answer this question about modern technology or robotics trends: ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      // Fix: Directly accessing .text property on the response object
      setResponse(res.text || "No insights found for this query.");
      // Fix: Safely casting groundingChunks to resolve type mismatch with local interface
      const groundingChunks = (res.candidates?.[0]?.groundingMetadata?.groundingChunks || []) as GroundingChunk[];
      setChunks(groundingChunks);
    } catch (err) {
      setResponse("Elite Intelligence Hub is currently undergoing maintenance. Please try again shortly.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-100/50 blur-[150px] rounded-full"></div>
          <img 
            src={ASSETS.HERO.ENGINEERING} 
            className="w-full h-full object-cover opacity-[0.03] grayscale" 
            alt="Robotics Engineering" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Reveal type="right">
                <div className="flex flex-col items-start mb-12">
                   <div className="inline-flex items-center space-x-3 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    <span className="text-blue-700 font-black tracking-[0.2em] uppercase text-[10px]">India's Elite STEM Innovator</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <ShieldAlert size={14} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">CIN: {COMPANY_INFO.cin}</span>
                  </div>
                </div>
              </Reveal>
              
              <Reveal type="right" delay="delay-100">
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-gray-900 mb-8 leading-[0.85] tracking-tighter">
                  Architecting <br/>
                  <span className="shimmer-text">Elite</span> <br/>
                  Innovation.
                </h1>
              </Reveal>

              <Reveal type="right" delay="delay-200">
                <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-medium">
                  Designing the blueprint for tomorrow's technology. Premium STEM labs and industrial robotics ecosystems for elite institutions.
                </p>
              </Reveal>

              <Reveal type="right" delay="delay-300">
                <div className="flex flex-wrap gap-6">
                  <Link to="/courses" className="bg-blue-700 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-800 transition-all flex items-center shadow-2xl shadow-blue-700/20 hover:-translate-y-1">
                    Start Learning <ArrowRight size={24} className="ml-3" />
                  </Link>
                  <Link to="/contact" className="bg-white border-2 border-blue-700 text-blue-700 px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-50 transition-all">
                    Partner Program
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="hidden lg:block relative">
              <Reveal type="left" delay="delay-400">
                <div className="relative z-10 animate-float-y">
                  <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
                  <img 
                    src={ASSETS.HERO.INNOVATION_LAB} 
                    alt="Elite Innovation Lab" 
                    className="relative z-10 rounded-[5rem] border border-blue-50 shadow-2xl shadow-blue-900/10"
                  />
                  <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[3rem] shadow-2xl border border-blue-50 flex items-center space-x-6 animate-float-x">
                    <div className="bg-blue-700 p-5 rounded-2xl text-white shadow-xl shadow-blue-700/30">
                      <Cpu size={32} />
                    </div>
                    <div>
                      <p className="text-gray-900 font-black text-xl">Elite Labs</p>
                      <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Ind. 4.0 Standard</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Box className="text-blue-700" size={32} />, title: 'STEM Labs', desc: 'Transforming institutional spaces into vibrant innovation hubs.' },
              { icon: <Cpu className="text-blue-700" size={32} />, title: 'CoE Programs', desc: 'Industrial Centers of Excellence for research and deep-tech.' },
              { icon: <Zap className="text-blue-700" size={32} />, title: 'AI Robotics', desc: 'Advanced AI and Robotics curriculum from K1 to K12.' },
              { icon: <GraduationCap className="text-blue-700" size={32} />, title: 'Certifications', desc: 'Industry-recognized credentials for the tech workforce.' }
            ].map((feature, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="group bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 hover:border-blue-600/30 hover:bg-white hover:shadow-2xl transition-all h-full">
                  <div className="bg-white w-20 h-20 flex items-center justify-center rounded-3xl mb-8 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-all group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-base">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Intelligence Hub Section (Implementing Citations & URL code) */}
      <section className="py-40 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal type="right">
              <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-6 py-2 rounded-full mb-8">
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-blue-400 font-black tracking-widest uppercase text-[10px]">Elite Neural Engine</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-none tracking-tighter">
                Intelligent <br/><span className="shimmer-text">Insights.</span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-xl font-medium">
                Query our neural network for the latest real-time industrial trends, verified by Google Search grounding.
              </p>
              
              <form onSubmit={handleAISearch} className="relative group max-w-xl">
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-900 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
                 <div className="relative flex bg-gray-900 rounded-[2rem] p-3 border border-white/10">
                    <div className="flex-grow flex items-center px-6">
                      <Search size={22} className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Latest robotics trends in India..." 
                        className="bg-transparent w-full px-6 py-4 text-white text-lg outline-none placeholder:text-gray-700 font-medium" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSearching}
                      className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center shadow-2xl disabled:bg-gray-800"
                    >
                      {isSearching ? <Loader2 size={18} className="animate-spin" /> : "Analyze"}
                    </button>
                 </div>
              </form>
            </Reveal>

            <Reveal type="left">
               <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 backdrop-blur-xl min-h-[500px] flex flex-col shadow-2xl">
                  <div className="flex items-center space-x-4 mb-10 border-b border-white/5 pb-8">
                     <div className="w-12 h-12 bg-blue-700 text-white rounded-2xl flex items-center justify-center"><Terminal size={22} /></div>
                     <div>
                        <p className="text-white font-black uppercase text-xs tracking-widest">Keshava Hub Terminal</p>
                        <p className="text-gray-500 font-black uppercase text-[10px] tracking-widest">Node: ELITE-V3-ALPHA</p>
                     </div>
                  </div>

                  <div className="flex-grow">
                    {isSearching ? (
                      <div className="flex flex-col space-y-4">
                        <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse"></div>
                      </div>
                    ) : response ? (
                      <div className="animate-fade-in">
                        <p className="text-gray-300 text-lg leading-relaxed font-medium mb-8">
                          {response}
                        </p>
                        {/* URL CITATION CODE IMPLEMENTATION */}
                        <CitationsList chunks={chunks} />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-20 opacity-30">
                        <Box size={80} className="text-gray-700 mb-6" />
                        <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-xs">Waiting for Query Packets</p>
                      </div>
                    )}
                  </div>
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trusted Clients Marquee Section */}
      <section className="py-40 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 mb-24 relative z-10 text-center">
          <Reveal>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center space-x-3 bg-blue-50 text-blue-700 px-6 py-2.5 rounded-full mb-8 border border-blue-100">
                <Globe size={18} className="animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Strategic Ecosystem</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-gray-900 mb-10 leading-none tracking-tighter">Powered by the <span className="text-blue-700">Best.</span></h2>
              <div className="w-40 h-2 bg-blue-700 rounded-full mb-12 shadow-xl shadow-blue-700/20"></div>
              <p className="text-gray-500 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
                We are integrated with the world's leading technology and educational entities to deliver industrial-grade excellence.
              </p>
            </div>
          </Reveal>
        </div>

        {/* LOGOS MARQUEE COMPONENT */}
        <div className="relative flex marquee-mask overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          
          <div className="animate-marquee flex items-center gap-12 md:gap-20 py-16 px-6 group-hover:[animation-play-state:paused] transition-all duration-1000">
            {[...ASSETS.CLIENTS, ...ASSETS.CLIENTS, ...ASSETS.CLIENTS].map((client, i) => (
              <a 
                key={i} 
                href={client.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[3.5rem] p-12 min-w-[320px] md:min-w-[400px] h-64 shadow-sm hover:shadow-2xl hover:shadow-blue-600/15 hover:border-blue-600/40 transition-all duration-700 cursor-pointer overflow-hidden transform hover:-translate-y-4"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                
                {/* Logo Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-[140px] object-contain transition-all duration-1000 transform group-hover/card:scale-110 filter grayscale group-hover/card:grayscale-0"
                    onError={(e) => {
                      const initials = client.name.split(' ').map(n => n[0]).join('').slice(0, 3);
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const div = document.createElement('div');
                        div.className = 'logo-fallback w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-black text-2xl border-4 border-white shadow-xl';
                        div.innerText = initials;
                        parent.appendChild(div);
                      }
                    }}
                  />
                </div>
                
                {/* Logo Label */}
                <div className="absolute inset-x-0 bottom-8 text-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-y-4 group-hover/card:translate-y-0">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.5em] bg-blue-50 px-5 py-2 rounded-full border border-blue-100">
                    {client.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 mt-32 text-center">
            <Reveal type="up">
                <Link to="/impact" className="inline-flex items-center space-x-3 text-blue-700 font-black text-xs uppercase tracking-[0.4em] hover:opacity-70 transition-all group">
                    <span>Explore Our Impact Roadmap</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </Reveal>
        </div>
      </section>

      {/* Brand Identity Section (Matching PDF Logo Layout) */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col items-center">
           <Reveal>
             <div className="bg-white p-20 rounded-[5rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-4xl hover:scale-[1.02] transition-transform duration-700">
                <Logo className="h-48 w-auto mb-10" />
                <h3 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Official Corporate Identity</h3>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
                    <ShieldCheck size={18} className="text-blue-700" />
                    <span className="text-xs font-black text-blue-900 uppercase tracking-widest">CIN: {COMPANY_INFO.cin}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-950 px-6 py-3 rounded-2xl">
                    <Star size={18} className="text-blue-500" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">ISO 9001:2015</span>
                  </div>
                </div>
                <p className="mt-12 text-gray-500 font-medium leading-relaxed">
                  The standard of innovation across India. Authorized provider of high-end technology solutions for the next generation.
                </p>
             </div>
           </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
