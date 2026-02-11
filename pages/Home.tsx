
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Box, Cpu, ShieldCheck, Zap, 
  Globe, Star, ShieldAlert, Search, Sparkles, Terminal, 
  ExternalLink, Loader2, BarChart3, Binary, GraduationCap, Settings, Building2,
  ChevronRight, Rocket
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

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fix: Handle AI search following Search Grounding guidelines
  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResponse(null);
    setSources([]);

    try {
      // Create new GoogleGenAI instance right before use
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an AI Technical Advisor for ${COMPANY_INFO.brandName}. Provide professional, concise insights about: ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResponse(res.text || "Neural hub returned an empty packet.");
      
      // Fix: Mandatory extraction of URLs from groundingChunks
      const chunks = res.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSources(chunks);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setResponse("Elite Neural Hub is temporarily offline.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-animated-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <Reveal type="right">
                <div className="inline-flex items-center space-x-3 bg-elite-blue/5 px-6 py-2.5 rounded-full mb-8 border border-elite-blue/10">
                  <Cpu size={14} className="text-elite-blue" />
                  <span className="text-elite-blue font-black tracking-widest uppercase text-xs">{COMPANY_INFO.brandName}</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-tech-dark mb-10 leading-[1.05] tracking-tighter">
                  Building India’s <br/>
                  <span className="text-elite-blue italic">Next Generation</span> <br/>
                  of Engineers.
                </h1>
              </Reveal>
              <Reveal type="right" delay="delay-200">
                <p className="text-xl md:text-2xl text-gray-500 mb-14 leading-relaxed max-w-2xl font-medium">
                  {COMPANY_INFO.tagline}. We transform schools and colleges into technology-driven innovation hubs.
                </p>
              </Reveal>
              <Reveal type="right" delay="delay-300">
                <div className="flex flex-wrap gap-6">
                  <Link to="/courses" className="bg-innovation-orange text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-innovation-orange-hover transition-all flex items-center shadow-2xl shadow-innovation-orange/20 group">
                    Explore Programs <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link to="/contact" className="bg-white border-2 border-elite-blue text-elite-blue px-12 py-6 rounded-2xl font-black text-xl hover:bg-elite-blue hover:text-white transition-all flex items-center group">
                    Partner With Us
                  </Link>
                </div>
              </Reveal>
            </div>
            
            <Reveal type="left" className="hidden lg:block">
               <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-4 border-elite-blue/10">
                 <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80" alt="Robotics Innovation" className="w-full h-auto" />
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-32 bg-tech-light">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-xs font-black text-elite-blue uppercase tracking-[0.5em] mb-4">Core Ecosystem</h2>
            <h3 className="text-4xl md:text-6xl font-black text-tech-dark tracking-tighter uppercase mb-8">What We <span className="text-innovation-orange">Do.</span></h3>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                icon: <GraduationCap size={32} />, 
                title: "STEM Robotics Labs", 
                desc: "Transforming K1–K12 classrooms into innovation labs with complete setup and kits.",
                link: "/services#stem-labs"
              },
              { 
                icon: <Building2 size={32} />, 
                title: "Center of Excellence", 
                desc: "Advanced Innovation Hubs for Colleges at keshavaeliteprojects.in.",
                link: "/services#coe"
              },
              { 
                icon: <Rocket size={32} />, 
                title: "Student Innovation", 
                desc: "Beyond the classroom learning: Hackathons, Bootcamps, and Robotics Competitions.",
                link: "/impact"
              }
            ].map((item, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="bg-white p-12 rounded-[2rem] border-l-[6px] border-elite-blue shadow-sm hover:shadow-2xl transition-all h-full group">
                  <div className="w-16 h-16 bg-elite-blue/5 text-elite-blue rounded-2xl flex items-center justify-center mb-10 group-hover:bg-elite-blue group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-tech-dark leading-tight">{item.title}</h4>
                  <p className="text-gray-500 font-medium mb-10 leading-relaxed">{item.desc}</p>
                  <Link to={item.link} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-elite-blue hover:text-innovation-orange transition-colors">
                    Learn More <ChevronRight size={14} className="ml-2" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Intelligence Hub */}
      <section className="py-48 bg-tech-dark relative">
        <div className="container mx-auto px-6 text-center">
            <Reveal type="up">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter">
                Analyze Technical <span className="text-innovation-orange">Trends.</span>
              </h2>
              <form onSubmit={handleAISearch} className="relative max-w-2xl mx-auto mb-20">
                 <div className="flex bg-white/5 rounded-[3rem] p-4 border border-white/10 shadow-2xl">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search AI Robotics trends..." className="bg-transparent w-full px-6 py-5 text-white text-xl outline-none" />
                    <button type="submit" disabled={isSearching} className="bg-innovation-orange text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest disabled:opacity-50">
                      {isSearching ? <Loader2 size={20} className="animate-spin" /> : "Analyze"}
                    </button>
                 </div>
              </form>
              {response && (
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-16 text-left animate-scale-up max-w-4xl mx-auto">
                  <p className="text-gray-300 text-xl leading-relaxed mb-8">{response}</p>
                  
                  {/* Fix: Mandatory Grounding display for googleSearch tool */}
                  {sources.length > 0 && (
                    <div className="pt-8 border-t border-white/10">
                      <p className="text-[10px] font-black text-innovation-orange uppercase tracking-[0.3em] mb-6">Research Sources</p>
                      <div className="flex flex-wrap gap-4">
                        {sources.map((chunk, idx) => chunk.web && (
                          <a 
                            key={idx} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/5 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                          >
                            <Globe size={14} className="group-hover:text-innovation-orange" />
                            <span className="font-bold">{chunk.web.title || 'Source'}</span>
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
