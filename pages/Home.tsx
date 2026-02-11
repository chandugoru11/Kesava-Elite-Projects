
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Box, Cpu, ShieldCheck, Zap, 
  Globe, Star, ShieldAlert, Search, Sparkles, Terminal, 
  ExternalLink, Loader2, BarChart3, Binary, GraduationCap, Settings, Building2,
  ChevronRight
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
      // Create a new GoogleGenAI instance right before making an API call
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
                <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-2.5 rounded-full mb-8 border border-blue-100">
                  <Cpu size={14} className="text-blue-700" />
                  <span className="text-blue-700 font-black tracking-widest uppercase text-xs">Keshava Elite Projects</span>
                </div>
                <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black text-gray-900 mb-10 leading-[0.82] tracking-tighter">
                  Building <br/>
                  <div className="scanner-container">
                    <div className="scanner-line"></div>
                    <span className="shimmer-text">Next Gen</span>
                  </div> <br/>
                  Innovators.
                </h1>
              </Reveal>
              <Reveal type="right" delay="delay-200">
                <p className="text-2xl text-gray-500 mb-14 leading-relaxed max-w-2xl font-medium">
                  Empowering Future Innovators Through Robotics & STEM Excellence. We transform schools and colleges into technology-driven innovation hubs — enabling students to learn, build, and innovate for the future.
                </p>
              </Reveal>
              <Reveal type="right" delay="delay-300">
                <div className="flex flex-wrap gap-6">
                  <Link to="/courses" className="bg-blue-700 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-800 transition-all flex items-center shadow-2xl shadow-blue-700/20 group">
                    Explore Programs <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link to="/contact" className="bg-white border-2 border-gray-100 text-gray-900 px-12 py-6 rounded-[2rem] font-black text-xl hover:border-blue-700 hover:text-blue-700 transition-all flex items-center group">
                    Partner With Us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - NEW SECTION FROM PDF */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-xs font-black text-blue-700 uppercase tracking-[0.5em] mb-4">Core Ecosystem</h2>
            <h3 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase mb-8">What We <span className="text-blue-700">Do.</span></h3>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              We design future-ready learning ecosystems where students gain hands-on experience in Robotics, AI, IoT, and Emerging Technologies — bridging the gap between classroom education and industry expectations.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                icon: <GraduationCap size={32} />, 
                title: "STEM Labs (K1-K12)", 
                desc: "Hands-on robotics, coding, and AI learning environments that nurture creativity from an early age.",
                link: "/services#stem-labs"
              },
              { 
                icon: <Building2 size={32} />, 
                title: "CoE for Colleges", 
                desc: "Advanced innovation centers where students work on real-world industry and research projects.",
                link: "/services#coe"
              },
              { 
                icon: <Settings size={32} />, 
                title: "Teacher Empowerment", 
                desc: "Training educators with modern STEM teaching methodologies and lab management skills.",
                link: "/services"
              },
              { 
                icon: <Zap size={32} />, 
                title: "Student Innovation", 
                desc: "Workshops, bootcamps, hackathons, robotics competitions, and expos.",
                link: "/impact"
              },
              { 
                icon: <Cpu size={32} />, 
                title: "Research & Industry", 
                desc: "Guidance for advanced prototypes, product development, and research publications.",
                link: "/services#coe"
              },
              { 
                icon: <Terminal size={32} />, 
                title: "SaaS Products", 
                desc: "Learning Management Platforms and AI-based analytics for smart campus management.",
                link: "/services#saas"
              }
            ].map((item, i) => (
              <Reveal key={i} delay={`delay-${i * 100}`}>
                <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all h-full group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-700 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{item.title}</h4>
                  <p className="text-gray-500 font-medium mb-10 leading-relaxed">{item.desc}</p>
                  <Link to={item.link} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-700 group-hover:text-gray-900 transition-colors">
                    Learn More <ChevronRight size={14} className="ml-2" />
                  </Link>
                </div>
              </Reveal>
            ))}
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
