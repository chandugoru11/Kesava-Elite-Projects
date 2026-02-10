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

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResponse(null);

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
    } catch (err) {
      setResponse("Elite Neural Hub is temporarily offline.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <Reveal type="right">
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
                  Designing the master blueprint for tomorrow's technology. Premium STEM ecosystems for elite institutions.
                </p>
              </Reveal>
              <Reveal type="right" delay="delay-300">
                <div className="flex flex-wrap gap-8">
                  <Link to="/courses" className="bg-blue-700 text-white px-14 py-7 rounded-[2.5rem] font-black text-xl hover:bg-blue-800 transition-all flex items-center shadow-2xl shadow-blue-700/20 group">
                    Start Learning <ArrowRight size={26} className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* AI Intelligence Hub */}
      <section className="py-48 bg-gray-950 relative">
        <div className="container mx-auto px-6 text-center">
            <Reveal type="up">
              <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter">
                Intelligent <span className="shimmer-text">Insights.</span>
              </h2>
              <form onSubmit={handleAISearch} className="relative max-w-2xl mx-auto mb-20">
                 <div className="flex bg-gray-900/80 rounded-[3rem] p-4 border border-white/10 shadow-2xl">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search AI Robotics trends..." className="bg-transparent w-full px-6 py-5 text-white text-xl outline-none" />
                    <button type="submit" disabled={isSearching} className="bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest disabled:opacity-50">
                      {isSearching ? <Loader2 size={20} className="animate-spin" /> : "Analyze"}
                    </button>
                 </div>
              </form>
              {response && (
                <div className="bg-white/5 border border-white/10 rounded-[4rem] p-16 text-left animate-scale-up max-w-4xl mx-auto">
                  <p className="text-gray-300 text-xl leading-relaxed">{response}</p>
                </div>
              )}
            </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;