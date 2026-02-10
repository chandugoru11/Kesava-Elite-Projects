
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Box, Cpu, ShieldCheck, Zap, 
  Globe, Star, ShieldAlert, Search, Sparkles, Terminal, 
  ExternalLink, Loader2, BarChart3, Binary 
} from 'lucide-react';
import { COMPANY_INFO } from '../constants.tsx';
import { ASSETS } from '../assets.ts';
import Logo from '../components/Logo.tsx';
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

interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an AI Technical Advisor for ${COMPANY_INFO.brandName}. Provide professional, concise insights about: ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResponse(res.text || "Neural hub returned an empty packet.");
      const groundingChunks = (res.candidates?.[0]?.groundingMetadata?.groundingChunks || []) as GroundingChunk[];
      setChunks(groundingChunks);
    } catch (err) {
      setResponse("Elite Neural Hub is temporarily offline. Please re-try shortly.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid opacity-[0.15]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-50/50 blur-[180px] rounded-full"></div>
          <img 
            src={ASSETS.HERO.ENGINEERING} 
            className="w-full h-full object-cover opacity-[0.02] grayscale" 
            alt="Elite Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <Reveal type="right">
                <div className="flex flex-col items-start mb-12">
                   <div className="inline-flex items-center space-x-3 bg-blue-50 border border-blue-100 px-6 py-2.5 rounded-full mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    <span className="text-blue-700 font-black tracking-[0.25em] uppercase text-[10px]">India's Elite STEM Innovator</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <ShieldAlert size={14} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Identity: {COMPANY_INFO.cin}</span>
                  </div>
                </div>
              </Reveal>
              
              <Reveal type="right" delay="delay-100">
                <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-black text-gray-900 mb-10 leading-[0.82] tracking-tighter">
                  Forging <br/>
                  <div className="scanner-container">
                    <div className="scanner-line"></div>
                    <span className="shimmer-text">Elite</span>
                  </div> <br/>
                  Futures.
                </h1>
              </Reveal>

              <Reveal type="right" delay="delay-200">
                <p className="text-2xl text-gray-500 mb-14 leading-relaxed max-w-2xl font-medium">
                  Designing the master blueprint for tomorrow's technology. Premium STEM ecosystems and industrial-grade robotics for elite institutions.
                </p>
              </Reveal>

              <Reveal type="right" delay="delay-300">
                <div className="flex flex-wrap gap-8">
                  <Link to="/courses" className="bg-blue-700 text-white px-14 py-7 rounded-[2.5rem] font-black text-xl hover:bg-blue-800 transition-all flex items-center shadow-2xl shadow-blue-700/20 hover:-translate-y-1 group">
                    Start Learning <ArrowRight size={26} className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link to="/contact" className="bg-white border-2 border-gray-100 text-gray-900 px-14 py-7 rounded-[2.5rem] font-black text-xl hover:bg-gray-50 transition-all hover:border-blue-700 hover:text-blue-700">
                    Partner Program
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="hidden lg:block relative">
              <Reveal type="left" delay="delay-400">
                <div className="relative z-10">
                  <div className="absolute -inset-20 bg-blue-600/5 blur-[120px] rounded-full"></div>
                  <div className="relative rounded-[6rem] overflow-hidden border border-blue-50 shadow-2xl shadow-blue-900/10">
                    <img 
                      src={ASSETS.HERO.INNOVATION_LAB} 
                      alt="Innovation Hub" 
                      className="w-full h-auto transform hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-16 -left-16 bg-white/90 backdrop-blur-xl p-12 rounded-[4rem] shadow-2xl border border-blue-50 flex items-center space-x-8 animate-float-y">
                    <div className="bg-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-700/30">
                      <Cpu size={40} />
                    </div>
                    <div>
                      <p className="text-gray-900 font-black text-2xl tracking-tight">Elite Labs</p>
                      <p className="text-blue-600 text-xs font-black tracking-widest uppercase mt-1">Industry 4.0 Standard</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* AI Intelligence Hub Section */}
      <section className="py-48 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <Reveal type="up">
              <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-600/20 px-8 py-3 rounded-full mb-10">
                <Sparkles size={18} className="text-blue-400 animate-pulse" />
                <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-[10px]">Elite Neural Processor</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white mb-10 leading-[0.9] tracking-tighter">
                Intelligent <span className="shimmer-text">Insights.</span>
              </h2>
              
              <form onSubmit={handleAISearch} className="relative group max-w-2xl mx-auto mb-20">
                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-[3rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                 <div className="relative flex bg-gray-900/80 backdrop-blur-md rounded-[3rem] p-4 border border-white/10 shadow-2xl">
                    <div className="flex-grow flex items-center px-6">
                      <Search size={26} className="text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search AI Robotics trends..." 
                        className="bg-transparent w-full px-6 py-5 text-white text-xl outline-none placeholder:text-gray-700 font-medium" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSearching}
                      className="bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center shadow-xl disabled:bg-gray-800"
                    >
                      {isSearching ? <Loader2 size={20} className="animate-spin" /> : "Analyze"}
                    </button>
                 </div>
              </form>

              {response && (
                <div className="bg-white/5 border border-white/10 rounded-[4rem] p-16 backdrop-blur-2xl max-w-4xl mx-auto text-left animate-scale-up">
                   <div className="flex items-center space-x-6 mb-12 border-b border-white/5 pb-10">
                     <div className="w-16 h-16 bg-blue-700 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-blue-700/20"><Terminal size={28} /></div>
                     <div>
                        <p className="text-white font-black uppercase text-sm tracking-widest">Elite Intelligence Hub</p>
                        <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em] mt-1">NODE: ELITE-V4-CORE</p>
                     </div>
                  </div>
                  <p className="text-gray-300 text-xl leading-relaxed font-medium mb-10">{response}</p>
                  <CitationsList chunks={chunks} />
                </div>
              )}
            </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
