import { useState, useEffect, useRef } from 'react';
import MagneticButton from './components/MagneticButton';

/**
 * Custom Cursor Component
 */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (typeof window === 'undefined' || !isVisible) return null;

  // Only show on desktop (fine-pointer)
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  if (!isDesktop) return null;

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div
        className={`w-full h-full rounded-full bg-white transition-transform duration-300 ease-in-out ${isHovering ? 'scale-[2.5] opacity-20' : 'scale-100 opacity-100'}`}
      />
    </div>
  );
};

// Custom inline SVG icons matching Lucide styling to avoid missing dependency
const ArrowUpRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const Code2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const Layers = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2l10 5-10 5L2 7l10-5z"></path>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const Cpu = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="15" x2="23" y2="15"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="15" x2="4" y2="15"></line>
  </svg>
);

const CheckCircle2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const Menu = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const X = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Send = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const Sparkles = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M3 5h4"></path>
    <path d="M19 17v4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

const MessageSquare = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ExternalLink = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const Clock = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ShieldCheck = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

const Zap = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    websiteType: 'Custom Business Website',
    budget: '$5,000 - $10,000',
    description: ''
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ submitted: false, error: '' });

    // Client-side validation
    if (!formData.name || !formData.email || !formData.description) {
      setFormStatus({ submitted: false, error: 'Please fill out all required fields (Name, Email, Description).' });
      setIsSubmitting(false);
      return;
    }

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({ submitted: true, error: '' });
      setFormData({
        name: '',
        businessName: '',
        email: '',
        websiteType: 'Custom Business Website',
        budget: '$5,000 - $10,000',
        description: ''
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] font-body selection:bg-[var(--accent-vivid)] selection:text-black scroll-smooth">
      <CustomCursor />

      {/* Background Grid Accent */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-20"></div>

      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-glow)] blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent-luminous)]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* --- NAVIGATION --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)] py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-vivid)] to-[var(--accent-luminous)] text-black font-black flex items-center justify-center rounded-xl text-xl tracking-tighter group-hover:rotate-12 transition-transform duration-500">
              S
            </div>
            <span className="font-bold text-2xl tracking-tighter text-white font-display">SYNCORA</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] font-utility">
            {['work', 'services', 'process', 'about'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-[var(--accent-luminous)] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-luminous)] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[var(--accent-luminous)] transition-all transform hover:-translate-y-1"
              >
                Contact
              </MagneticButton>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-[var(--bg-card)] rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-8 py-10 shadow-2xl flex flex-col gap-6 transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
          {['work', 'services', 'process', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-display font-bold text-white uppercase tracking-tight hover:text-[var(--accent-vivid)] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-40 pb-28 md:pt-56 md:pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <div className="lg:w-[60%] space-y-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold text-[var(--accent-luminous)] uppercase tracking-widest font-utility">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-vivid)] animate-pulse"></span>
              Boutique Website Studio
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[140px] font-bold tracking-tighter text-white leading-[0.85] font-display">
              DIGITAL <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-vivid)] to-[var(--accent-luminous)] italic">
                CRAFT
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-[var(--text-muted)] max-w-xl leading-relaxed font-body">
              Syncora builds high-impact, bespoke websites for ambitious brands. We fuse cinematic visuals, precision code, and smart strategy.
            </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-6">
                <MagneticButton
                  href="#contact"
                  className="px-10 py-5 rounded-full bg-[var(--accent-vivid)] text-black font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_var(--accent-glow)]"
                >
                  Start a Project
                  <ArrowUpRight className="w-5 h-5" />
                </MagneticButton>
                <MagneticButton
                  href="#work"
                  className="px-10 py-5 rounded-full bg-transparent border-2 border-[var(--border-color)] text-white font-bold text-sm uppercase tracking-widest hover:border-[var(--accent-luminous)] transition-all flex items-center justify-center gap-3"
                >
                  Our Portfolio
                </MagneticButton>
              </div>
          </div>

          {/* Hero Visual Composition */}
          <div className="lg:w-[35%] relative mt-10 lg:mt-0">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-vivid)]/10 to-[var(--accent-luminous)]/10 rounded-[2rem] transform rotate-3 blur-sm"></div>

             {/* Main Card */}
             <div className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2rem] p-10 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-[var(--border-color)]">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-white/20"></div>
                     <div className="w-3 h-3 rounded-full bg-white/20"></div>
                     <div className="w-3 h-3 rounded-full bg-white/20"></div>
                   </div>
                   <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
                    Showcase
                   </span>
                </div>

                <div className="space-y-6">
                    <h3 className="text-4xl font-display font-bold text-[var(--text-main)]">Atelier Noir</h3>
                    <p className="text-[var(--text-muted)] font-body leading-relaxed text-sm">
                        High-end editorial presence crafted for luxury interiors. A study in mood and spatial depth.
                    </p>
                    <div className="pt-6">
                        <a href="#" className="inline-flex items-center gap-3 text-[var(--accent-luminous)] font-bold hover:gap-5 transition-all font-utility text-xs uppercase tracking-widest">
                            VIEW CASE STUDY <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* --- PROOF / POSITIONING STRIP --- */}
      <section className="relative z-10 border-y border-[#272730] bg-[#121216]/50 py-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-[#18181d] border border-[#272730] text-[#ccff00]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Bespoke Custom Design</h4>
              <p className="text-sm text-[#9898a6] mt-0.5">Tailored exclusively to your brand identity</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-[#18181d] border border-[#272730] text-[#ccff00]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Lightning-Fast Responsive Dev</h4>
              <p className="text-sm text-[#9898a6] mt-0.5">Optimized for every screen and device</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 rounded-xl bg-[#18181d] border border-[#272730] text-[#ccff00]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Robust Deployment & Launch</h4>
              <p className="text-sm text-[#9898a6] mt-0.5">Secure hosting and seamless handoff</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SELECTED WORK --- */}
      <section id="work" className="relative z-10 py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ccff00] font-mono mb-3">Selected Work</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Crafted with precision.
            </h2>
          </div>
          <p className="text-[#9898a6] max-w-md text-base">
            Explore our flagship interactive studio demo and our current in-progress client builds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project 1: Atelier Noir */}
          <div className="group bg-[#121216] border border-[#272730] rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col justify-between">
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-semibold">
                  Featured Demo
                </span>
                <span className="text-xs text-[#9898a6] font-mono">Interior Architecture Studio</span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors mb-3">
                Atelier Noir
              </h3>
              <p className="text-[#9898a6] text-base leading-relaxed mb-6">
                A moody, immersive web presence designed for a high-end interior architecture firm. Features dark aesthetics, editorial typography, and high-resolution spatial portfolios.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#18181d] border border-[#272730] text-xs text-[#9898a6]">React</span>
                <span className="px-2.5 py-1 rounded-md bg-[#18181d] border border-[#272730] text-xs text-[#9898a6]">Tailwind CSS</span>
                <span className="px-2.5 py-1 rounded-md bg-[#18181d] border border-[#272730] text-xs text-[#9898a6]">Art Direction</span>
              </div>
            </div>

            <div className="px-8 py-6 bg-[#18181d]/50 border-t border-[#272730] flex items-center justify-between">
              <span className="text-xs text-[#9898a6] italic">Interactive Showcase Demo</span>
              <div className="flex items-center gap-3">
                {/* Notice: Local preview URL config as requested */}
                <a
                  href="http://127.0.0.1:4173/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#ccff00] transition-colors"
                >
                  View Local Preview <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 2: Clay & Form (In Progress) */}
          <div className="group bg-[#121216] border border-[#272730] rounded-2xl overflow-hidden hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col justify-between">
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> In Progress
                </span>
                <span className="text-xs text-[#9898a6] font-mono">Handcrafted E-Commerce</span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors mb-3">
                Clay & Form Studio
              </h3>
              <p className="text-[#9898a6] text-base leading-relaxed mb-6">
                A minimalist online shop and portfolio for a master ceramicist. Emphasizes tactile imagery, warm neutral typography, and streamlined enquiry flows for bespoke ceramic collections.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#18181d] border border-[#272730] text-xs text-[#9898a6]">E-Commerce UI</span>
                <span className="px-2.5 py-1 rounded-md bg-[#18181d] border border-[#272730] text-xs text-[#9898a6]">Catalog Design</span>
                <span className="px-2.5 py-1 rounded-md bg-[#18181d] border border-[#272730] text-xs text-[#9898a6]">Coming Soon</span>
              </div>
            </div>

            <div className="px-8 py-6 bg-[#18181d]/50 border-t border-[#272730] flex items-center justify-between">
              <span className="text-xs text-[#9898a6] italic">Currently crafting with the client</span>
              <span className="text-xs font-mono text-amber-400">Launch Q4</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="relative z-10 py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#272730]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs uppercase tracking-widest text-[#ccff00] font-mono mb-3">Our Services</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Everything your business needs to stand out online.
          </h2>
          <p className="text-lg text-[#9898a6]">
            We handle the strategy, custom design, responsive development, and secure deployment from end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#18181d] border border-[#272730] flex items-center justify-center text-[#ccff00] mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Business Websites</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Tailored multi-page websites built to showcase your expertise, build instant trust, and convert visitors into clients.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#272730] text-xs font-mono text-[#ccff00]">
              01 / Strategy & Design
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#18181d] border border-[#272730] flex items-center justify-center text-[#ccff00] mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">E-Commerce Websites</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Refined online storefronts designed to highlight your products with gorgeous imagery and friction-free checkout flows.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#272730] text-xs font-mono text-[#ccff00]">
              02 / Storefront & Catalog
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#18181d] border border-[#272730] flex items-center justify-center text-[#ccff00] mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Booking & Enquiry Experiences</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Custom scheduling and qualification funnels configured so you capture qualified client leads effortlessly 24/7.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#272730] text-xs font-mono text-[#ccff00]">
              03 / Conversion & Leads
            </div>
          </div>

          {/* Service 4 */}
          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#18181d] border border-[#272730] flex items-center justify-center text-[#ccff00] mb-6 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deployment & Support</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Lightning-fast hosting setup, custom domain configuration, security hardening, and ongoing maintenance support.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#272730] text-xs font-mono text-[#ccff00]">
              04 / Launch & Growth
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY SYNCORA --- */}
      <section id="about" className="relative z-10 py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#272730]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#ccff00] font-mono">Why Syncora</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Two experts. Zero bureaucracy.
            </h2>
            <p className="text-base text-[#9898a6] leading-relaxed">
              When you hire a large agency, you pay for account managers, office rent, and junior staff learning on your dime. At Syncora, you work directly with the two people designing and writing every line of code for your site.
            </p>
            <div className="pt-4">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b3e600] transition-colors"
              >
                Work with us directly
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Direct Collaboration</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Talk directly to your designers and developers. No telephone game through account executives.
              </p>
            </div>

            <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tailored Over Templates</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Every business is unique. Your website is custom-crafted to reflect your exact brand personality and goals.
              </p>
            </div>

            <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Crystal Clear Communication</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                Transparent timelines, weekly progress updates, and straightforward non-technical explanations.
              </p>
            </div>

            <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Focused on Business Goals</h3>
              <p className="text-sm text-[#9898a6] leading-relaxed">
                We design for impact—focusing on conversions, user trust, and helping your business grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS --- */}
      <section id="process" className="relative z-10 py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#272730]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-xs uppercase tracking-widest text-[#ccff00] font-mono mb-3">Our Process</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Simple, transparent, and stress-free.
          </h2>
          <p className="text-lg text-[#9898a6]">
            We guide you step-by-step from initial idea to live launch without the usual agency runaround.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 relative">
            <span className="text-4xl font-black text-[#272730] absolute top-6 right-6 font-mono">01</span>
            <h3 className="text-xl font-bold text-white mb-3 pt-4">Discover</h3>
            <p className="text-sm text-[#9898a6] leading-relaxed">
              We discuss your business, goals, target audience, and functional requirements to define the project scope.
            </p>
          </div>

          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 relative">
            <span className="text-4xl font-black text-[#272730] absolute top-6 right-6 font-mono">02</span>
            <h3 className="text-xl font-bold text-white mb-3 pt-4">Plan & Design</h3>
            <p className="text-sm text-[#9898a6] leading-relaxed">
              We design bespoke layouts, typography systems, and interactive previews for your complete approval.
            </p>
          </div>

          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 relative">
            <span className="text-4xl font-black text-[#272730] absolute top-6 right-6 font-mono">03</span>
            <h3 className="text-xl font-bold text-white mb-3 pt-4">Build & Review</h3>
            <p className="text-sm text-[#9898a6] leading-relaxed">
              We code your website using modern, performant web tech and review live interactive drafts together.
            </p>
          </div>

          <div className="bg-[#121216] border border-[#272730] rounded-2xl p-8 relative">
            <span className="text-4xl font-black text-[#272730] absolute top-6 right-6 font-mono">04</span>
            <h3 className="text-xl font-bold text-white mb-3 pt-4">Launch & Handover</h3>
            <p className="text-sm text-[#9898a6] leading-relaxed">
              We connect your domain, test responsiveness, deploy securely, and hand over complete control to you.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTACT / PROJECT ENQUIRY --- */}
      <section id="contact" className="relative z-10 py-28 px-6 md:px-12 max-w-5xl mx-auto border-t border-[#272730]">
        <div className="bg-[#121216] border border-[#272730] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-[#ccff00] font-mono mb-3">Start a Conversation</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to elevate your online presence?</h2>
            <p className="text-[#9898a6] text-base">
              Fill out the brief form below or reach out directly. We typically reply within 24 business hours.
            </p>
          </div>

          {formStatus.submitted ? (
            <div className="bg-[#18181d] border border-[#ccff00]/40 rounded-2xl p-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-[#ccff00] text-black rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
              <p className="text-[#9898a6] max-w-md mx-auto text-sm">
                Thank you for reaching out. Since this is a static demo preview, live backend submission is not connected. To connect this form, configure your preferred form endpoint (such as Formspree, Resend, or your server).
              </p>
              <button
                onClick={() => setFormStatus({ submitted: false, error: '' })}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b3e600] transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formStatus.error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {formStatus.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#9898a6] mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-[#18181d] border border-[#272730] rounded-xl px-4 py-3.5 text-white placeholder-[#9898a6]/50 focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#9898a6] mb-2">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Acme Studio"
                    className="w-full bg-[#18181d] border border-[#272730] rounded-xl px-4 py-3.5 text-white placeholder-[#9898a6]/50 focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#9898a6] mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@acme.com"
                    required
                    className="w-full bg-[#18181d] border border-[#272730] rounded-xl px-4 py-3.5 text-white placeholder-[#9898a6]/50 focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#9898a6] mb-2">Type of Website</label>
                  <select
                    name="websiteType"
                    value={formData.websiteType}
                    onChange={handleInputChange}
                    className="w-full bg-[#18181d] border border-[#272730] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                  >
                    <option value="Custom Business Website">Custom Business Website</option>
                    <option value="E-Commerce Website">E-Commerce Website</option>
                    <option value="Booking & Enquiry Experience">Booking & Enquiry Experience</option>
                    <option value="Redesign / Other">Redesign / Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#9898a6] mb-2">Approximate Budget (Optional)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-[#18181d] border border-[#272730] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                >
                  <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#9898a6] mb-2">Project Description & Goals *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about your business, current website (if any), and what you'd like to achieve..."
                  required
                  className="w-full bg-[#18181d] border border-[#272730] rounded-xl px-4 py-3.5 text-white placeholder-[#9898a6]/50 focus:outline-none focus:border-[#ccff00] transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[#9898a6] italic">
                  Note: Live form submission requires configuring an endpoint.
                </span>

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ccff00] text-black font-bold text-base hover:bg-[#b3e600] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  <Send className="w-4 h-4" />
                </MagneticButton>
              </div>
            </form>
          )}

          {/* Direct Contact info / WhatsApp placeholder */}
          <div className="mt-12 pt-8 border-t border-[#272730] flex flex-col sm:flex-row items-center justify-between text-sm text-[#9898a6] gap-4 text-center sm:text-left">
            <div>
              Prefer email? Reach us at <a href="mailto:hello@syncora.studio" className="text-white hover:text-[#ccff00] underline">hello@syncora.studio</a>
            </div>
            <div>
              Direct WhatsApp chat: <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ccff00] underline">Open WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-[#272730] bg-[#121216] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ccff00] text-black font-black flex items-center justify-center rounded-lg text-base tracking-tighter">
                S
              </div>
              <span className="font-bold text-lg text-white">Syncora Studio</span>
            </div>
            <p className="text-sm text-[#9898a6] max-w-sm leading-relaxed">
              A boutique website development studio founded by two people who create bespoke digital experiences for ambitious small businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 font-mono">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#9898a6]">
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 font-mono">Connect</h4>
            <ul className="space-y-2.5 text-sm text-[#9898a6]">
              <li><a href="mailto:hello@syncora.studio" className="hover:text-white transition-colors">hello@syncora.studio</a></li>
              <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Chat</a></li>
              <li><span className="text-[#9898a6]/70">Remote Studio (Global)</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#272730] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9898a6]">
          <div>© {new Date().getFullYear()} Syncora Studio. All rights reserved.</div>
          <div className="mt-4 sm:mt-0 flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
