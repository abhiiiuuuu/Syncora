import { useEffect, useRef, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';
import MagneticButton from './components/MagneticButton';
import Reveal from './components/Reveal';
import { ATELIER_NOIR_URL, CONTACT_EMAIL } from './config/site';

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'studio', label: 'Studio' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

const CAPABILITIES = [
  'Web design',
  'Front-end development',
  'Art direction',
  'UI / UX',
  'Creative motion',
  'Performance',
  'Accessibility',
  'Redesigns',
];

const SERVICES = [
  {
    number: '01',
    title: 'Website design & development',
    description:
      'Considered, responsive websites built around your business — from structure and visual direction to the last line of code.',
  },
  {
    number: '02',
    title: 'Landing pages & campaigns',
    description:
      'Focused pages for a launch, offer, or campaign. A clear narrative, a clear next step, and no wasted pixels.',
  },
  {
    number: '03',
    title: 'Portfolio & brand sites',
    description:
      'Editorial online homes for studios, practices, and independent brands that need their work to speak for itself.',
  },
  {
    number: '04',
    title: 'UI / UX & interaction design',
    description:
      'Clear flows, thoughtful interfaces, and prototypes that make a complex offer feel simple to navigate.',
  },
  {
    number: '05',
    title: 'Redesigns & technical care',
    description:
      'A sharper, faster, more accessible version of the site you already have — without losing what works.',
  },
  {
    number: '06',
    title: 'Creative development & motion',
    description:
      'Scroll narratives, hover states, and motion used with restraint to add depth, not distraction.',
  },
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Direct collaboration',
    description:
      'You speak with the people designing and building your site. No account layer, no telephone game.',
  },
  {
    number: '02',
    title: 'Considered, not decorated',
    description:
      'Every layout, type choice, and interaction has a reason to exist. Restraint is part of the craft.',
  },
  {
    number: '03',
    title: 'Performance is design',
    description:
      'Fast, responsive, and accessible are part of the brief — not a final polish before launch.',
  },
  {
    number: '04',
    title: 'Built around the business',
    description:
      'The goal is a site that earns trust and moves people to act, not one that only looks good in a portfolio.',
  },
];

const PROCESS = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We start with your business, audience, and goals. What needs to be said, and to whom.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      'We agree the structure, content direction, and visual language before a line of code is written.',
  },
  {
    number: '03',
    title: 'Design & build',
    description:
      'Design and development move together in the browser, with progress you can see and react to.',
  },
  {
    number: '04',
    title: 'Launch & refine',
    description:
      'We test the details, connect the domain, hand over the keys, and stay available after launch.',
  },
];

const PROJECT_TYPES = [
  'New business website',
  'Landing page',
  'Portfolio / brand site',
  'Redesign',
  'UI / UX design',
  'Something else',
];

const BUDGETS = ['Not sure yet', 'Under $3,000', '$3,000 – $5,000', '$5,000 – $10,000', '$10,000+'];

const TIMELINES = ['Flexible', 'Within 1 month', '1–3 months', '3+ months'];

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  projectType: PROJECT_TYPES[0],
  budget: BUDGETS[0],
  timeline: TIMELINES[0],
  brief: '',
};

const GENERAL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry — Syncora')}`;
const ATELIER_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Project enquiry — Atelier Noir-inspired website',
)}`;

const ArrowUpRight = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const ArrowDown = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

const ArrowUp = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </svg>
);

const CopyIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

const CheckIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const PlusIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');
  const [lastMailto, setLastMailto] = useState('');

  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const posterWrapRef = useRef(null);
  const posterRef = useRef(null);
  const copyTimerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  /* Scroll progress + condensed header */
  useEffect(() => {
    let ticking = false;
    let wasScrolled = false;

    const update = () => {
      const nextScrolled = window.scrollY > 24;
      if (nextScrolled !== wasScrolled) {
        wasScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  /* Active navigation section */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Mobile menu: lock scroll, close on Escape and on desktop resize */
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };

    handleChange();
    desktop.addEventListener('change', handleChange);
    return () => desktop.removeEventListener('change', handleChange);
  }, []);

  /* Cursor-responsive ambient light in the hero */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const handlePointerMove = (event) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--spot-x', `${x}px`);
        hero.style.setProperty('--spot-y', `${y}px`);
      });
    };

    hero.addEventListener('pointermove', handlePointerMove);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  /* Subtle pointer tilt on the hero project frame */
  useEffect(() => {
    const wrapper = posterWrapRef.current;
    const poster = posterRef.current;
    if (!wrapper || !poster) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const handlePointerMove = (event) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      const rect = wrapper.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        poster.style.transform = `perspective(1100px) rotateY(${x * 4.5}deg) rotateX(${y * -4.5}deg)`;
      });
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      poster.style.transform = '';
    };

    wrapper.addEventListener('pointermove', handlePointerMove);
    wrapper.addEventListener('pointerleave', reset);

    return () => {
      cancelAnimationFrame(frame);
      wrapper.removeEventListener('pointermove', handlePointerMove);
      wrapper.removeEventListener('pointerleave', reset);
    };
  }, []);

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    },
    [],
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const brief = formData.brief.trim();

    if (!name || !email || !brief) {
      setFormError('Please add your name, email, and a short project brief.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('That email address doesn’t look right. Please check it and try again.');
      return;
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      formData.company.trim() ? `Company: ${formData.company.trim()}` : null,
      `Project type: ${formData.projectType}`,
      `Budget: ${formData.budget}`,
      `Timeline: ${formData.timeline}`,
      '',
      brief,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Project enquiry — ${name}`,
    )}&body=${encodeURIComponent(lines)}`;

    setFormError('');
    setLastMailto(href);
    setFormStatus('ready');
    window.location.href = href;
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setFormStatus('idle');
    setFormError('');
    setLastMailto('');
  };

  return (
    <div className="grain relative min-h-screen bg-ink font-body text-bone">
      <CustomCursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left scale-x-0 bg-accent"
      />

      {/* — Navigation — */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled
            ? 'border-line bg-ink/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 sm:h-20">
          <a
            href="#top"
            aria-label="Syncora — back to top"
            className="inline-flex text-bone transition-colors duration-300 hover:text-accent"
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive ? 'text-bone' : 'text-muted hover:text-bone'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-accent hover:text-accent lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'top-2 rotate-45' : 'top-1'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'top-2 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* — Mobile menu — */}
      <div
        id="mobile-menu"
        role={mobileMenuOpen ? 'dialog' : undefined}
        aria-modal={mobileMenuOpen ? 'true' : undefined}
        aria-label="Site navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl transition-[opacity,visibility] duration-500 lg:hidden ${
          mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-between overflow-y-auto pb-10 pt-28">
          <nav aria-label="Mobile">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className={`group flex items-baseline justify-between border-b border-line py-4 transition-all duration-500 ${
                  mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${90 + index * 55}ms` : '0ms' }}
              >
                <span className="display text-5xl text-bone transition-colors duration-300 group-hover:text-accent sm:text-6xl">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-5">
            <p className="eyebrow text-muted">Start a conversation</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block break-all font-editorial text-2xl text-bone transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex w-full items-center justify-between rounded-full bg-accent px-6 py-4 text-sm font-medium text-ink"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div inert={mobileMenuOpen}>
        <main id="main">
          {/* — Hero — */}
          <section
            id="top"
            ref={heroRef}
            className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="hero-spotlight absolute inset-0" />
              <div className="absolute -right-24 top-6 h-[28rem] w-[28rem] rounded-full bg-accent/[0.05] blur-[110px] sm:h-[38rem] sm:w-[38rem]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
            </div>

            <div className="shell relative">
              <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                  <div className="hero-rise flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" aria-hidden="true" />
                    <p className="eyebrow text-bone/70">Independent web studio</p>
                  </div>

                  <h1 className="mt-7 text-bone sm:mt-8">
                    <span
                      className="hero-rise display block text-[clamp(4.6rem,15vw,10.5rem)]"
                      style={{ animationDelay: '80ms' }}
                    >
                      Presence
                    </span>
                    <span
                      className="hero-rise mt-0.5 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6"
                      style={{ animationDelay: '180ms' }}
                    >
                      <span className="display text-[clamp(3.6rem,11.5vw,8.2rem)]">By</span>
                      <span className="serif-accent text-[clamp(4.4rem,13.5vw,9.6rem)] text-accent">
                        design.
                      </span>
                    </span>
                  </h1>

                  <p
                    className="hero-rise mt-8 max-w-[36rem] text-base leading-relaxed text-muted sm:text-lg"
                    style={{ animationDelay: '280ms' }}
                  >
                    Syncora designs and builds considered websites for businesses that care how
                    they show up. Editorial in feel, precise in code, and made to earn trust.
                  </p>

                  <div
                    className="hero-rise mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
                    style={{ animationDelay: '360ms' }}
                  >
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                    >
                      Start a project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href="#work"
                      className="group inline-flex items-center justify-center gap-3 rounded-full border border-line px-7 py-4 text-sm font-medium text-bone transition-colors duration-300 hover:border-bone/40 hover:bg-bone/[0.04]"
                    >
                      View selected work
                      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </a>
                  </div>

                  <div
                    className="hero-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                    style={{ animationDelay: '440ms' }}
                  >
                    <span>Remote studio</span>
                    <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
                    <span>Working worldwide</span>
                    <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
                    <span>Direct collaboration</span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div
                    ref={posterWrapRef}
                    className="hero-rise relative mx-auto w-full max-w-[27rem] lg:max-w-none"
                    style={{ animationDelay: '300ms' }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3 translate-x-4 translate-y-4 border border-line/80"
                    />

                    <a
                      href="#work"
                      data-cursor="View"
                      aria-label="View selected work — Atelier Noir"
                      className="group block"
                    >
                      <span
                        ref={posterRef}
                        className="relative block overflow-hidden border border-line bg-panel shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                      >
                        <img
                          src="/atelier-noir-cover.svg"
                          alt="Editorial interior visual for Atelier Noir, with a warm arched room and the words Light, held still."
                          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          width="1000"
                          height="1250"
                          fetchPriority="high"
                          decoding="async"
                        />
                        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                      </span>
                    </a>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        <span className="text-accent">01</span> — Atelier Noir preview
                      </p>
                      <a
                        href="#work"
                        className="group inline-flex items-center gap-1.5 text-xs font-medium text-bone transition-colors hover:text-accent"
                      >
                        View project
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-14 hidden items-center justify-between border-t border-line pt-5 sm:flex">
                <p className="eyebrow text-muted">Scroll to explore</p>
                <ArrowDown className="h-4 w-4 text-muted" />
              </div>
            </div>
          </section>

          {/* — Capability marquee — */}
          <div className="marquee relative overflow-hidden border-y border-line bg-panel/30">
            <div className="marquee-track flex w-max items-center">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center"
                  aria-hidden={copy === 1 ? 'true' : undefined}
                >
                  {CAPABILITIES.map((capability) => (
                    <span key={`${copy}-${capability}`} className="flex items-center">
                      <span className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:px-8">
                        {capability}
                      </span>
                      <PlusIcon className="h-2.5 w-2.5 text-accent/70" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* — Selected work — */}
          <section
            id="work"
            className="relative scroll-mt-24 py-24 sm:py-28 lg:py-32"
          >
            <div className="shell">
              <Reveal className="flex flex-col justify-between gap-8 border-b border-line pb-10 lg:flex-row lg:items-end">
                <div>
                  <p className="eyebrow text-accent">01 / Selected work</p>
                  <h2 className="display mt-4 text-[clamp(3.4rem,7vw,6.5rem)] text-bone">
                    Selected work
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-base">
                  One project, presented properly. A closer look at Atelier Noir and the visual
                  direction behind it.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-5">
                  <figure className="group relative">
                    <div className="relative overflow-hidden border border-line bg-panel">
                      <img
                        src="/atelier-noir-cover.svg"
                        alt="Atelier Noir project preview — a warm arched interior with editorial serif typography."
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                        width="1000"
                        height="1250"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                    </div>
                    <figcaption className="flex items-center justify-between gap-4 border-x border-b border-line bg-panel/50 px-4 py-3 sm:px-5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        Project preview — visual mockup
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        01 / 01
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>

                <Reveal delay={120} className="flex flex-col justify-center lg:col-span-7 lg:pl-6">
                  <p className="eyebrow text-muted">Featured project / Interior design</p>
                  <h3 className="mt-5 font-editorial text-[clamp(3.2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-bone">
                    Atelier Noir
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                    A refined digital experience for an interior design brand, showcasing its
                    visual identity and design-focused presentation.
                  </p>

                  <dl className="mt-9 max-w-xl border-t border-line">
                    {[
                      ['Category', 'Interior design website'],
                      ['Focus', 'Visual identity & presentation'],
                      ['Format', 'Responsive portfolio website'],
                      ['Status', ATELIER_NOIR_URL ? 'Live website' : 'Featured project'],
                    ].map(([label, value]) => {
                      const isLive = label === 'Status' && Boolean(ATELIER_NOIR_URL);
                      return (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-6 border-b border-line py-4"
                        >
                          <dt className="eyebrow text-muted">{label}</dt>
                          <dd
                            className={`flex items-center gap-2 text-right text-sm ${
                              isLive ? 'text-accent' : 'text-bone'
                            }`}
                          >
                            {isLive && (
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-accent"
                                aria-hidden="true"
                              />
                            )}
                            {value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {ATELIER_NOIR_URL ? (
                      <a
                        href={ATELIER_NOIR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View the live Atelier Noir website (opens in a new tab)"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                      >
                        View live website
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <a
                        href={ATELIER_MAILTO}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                      >
                        Discuss a similar project
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}

                    {ATELIER_NOIR_URL && (
                      <a
                        href={ATELIER_MAILTO}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        Discuss a similar project
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>

                  {import.meta.env.DEV && !ATELIER_NOIR_URL && (
                    <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-muted">
                      Add the published URL in src/config/site.js to enable the live-site button.
                    </p>
                  )}
                </Reveal>
              </div>

              <Reveal className="mt-16 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-editorial text-2xl text-bone sm:text-3xl">
                  Your project could be the next one here.
                </p>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            </div>
          </section>

          {/* — Services — */}
          <section
            id="services"
            className="scroll-mt-24 border-t border-line py-24 sm:py-28 lg:py-32"
          >
            <div className="shell">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <Reveal className="lg:col-span-7">
                  <p className="eyebrow text-accent">02 / Capabilities</p>
                  <h2 className="display mt-4 text-[clamp(3.4rem,8vw,7rem)] text-bone">
                    What we{' '}
                    <span className="serif-accent text-[0.92em] text-accent">build.</span>
                  </h2>
                </Reveal>
                <Reveal delay={100} className="lg:col-span-5">
                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    From a single landing page to a complete brand site, we cover the thinking,
                    the visual direction, and the code. Every engagement is scoped around what
                    your business actually needs.
                  </p>
                </Reveal>
              </div>

              <ul className="mt-14 border-t border-line">
                {SERVICES.map((service, index) => (
                  <Reveal
                    as="li"
                    key={service.title}
                    delay={index * 50}
                    className="group relative border-b border-line"
                  >
                    <div className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:py-8 lg:grid-cols-[4rem_1fr_1.05fr] lg:items-start lg:gap-10">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-muted lg:pt-2">
                        {service.number}
                      </span>
                      <h3 className="display text-3xl text-bone transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                        {service.title}
                      </h3>
                      <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                        {service.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-accent/80 transition-all duration-500 group-hover:w-full"
                    />
                  </Reveal>
                ))}
              </ul>

              <Reveal
                delay={100}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-sm text-muted">
                  Not sure where your project fits? Tell us what you’re trying to solve.
                </p>
                <a
                  href={GENERAL_MAILTO}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-accent"
                >
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            </div>
          </section>

          {/* — Studio — */}
          <section
            id="studio"
            className="scroll-mt-24 border-t border-line py-24 sm:py-28 lg:py-32"
          >
            <div className="shell">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-5">
                  <p className="eyebrow text-accent">03 / The studio</p>
                  <h2 className="display mt-4 text-[clamp(3.4rem,7vw,6.5rem)] text-bone">
                    Small by{' '}
                    <span className="serif-accent text-[0.92em] text-accent">design.</span>
                  </h2>

                  <div className="mt-8 max-w-md space-y-5 text-sm leading-relaxed text-muted sm:text-base">
                    <p>
                      Syncora is an independent web studio. You work directly with the people
                      designing and building your site — no account managers, no handoffs, no
                      layers in between.
                    </p>
                    <p>
                      That means fewer meetings, clearer decisions, and a website that sounds like
                      your business, not a copy of someone else’s.
                    </p>
                    <p>
                      We keep the studio deliberately small so every project gets proper attention,
                      from the first conversation to the final deployment.
                    </p>
                  </div>

                  <a
                    href="#process"
                    className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    How we work
                    <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </a>
                </Reveal>

                <Reveal delay={100} className="lg:col-span-7">
                  <div className="border-t border-line">
                    {PRINCIPLES.map((principle) => (
                      <div
                        key={principle.number}
                        className="group grid gap-3 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:py-7"
                      >
                        <span className="font-mono text-[10px] tracking-[0.16em] text-muted sm:pt-1.5">
                          {principle.number}
                        </span>
                        <div>
                          <h3 className="text-base font-medium text-bone transition-colors duration-300 group-hover:text-accent sm:text-lg">
                            {principle.title}
                          </h3>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal className="mt-16 border-t border-line pt-10 sm:mt-20 sm:pt-12">
                <blockquote className="max-w-4xl font-editorial text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.12] tracking-[-0.015em] text-bone">
                  “A website should feel like the best version of your business —{' '}
                  <span className="italic text-accent">not a template wearing its colours.</span>”
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  <p className="eyebrow text-muted">The Syncora standard</p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* — Process — */}
          <section
            id="process"
            className="scroll-mt-24 border-t border-line py-24 sm:py-28 lg:py-32"
          >
            <div className="shell">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="eyebrow text-accent">04 / Process</p>
                    <h2 className="display mt-4 text-[clamp(3.2rem,6vw,5.5rem)] text-bone">
                      A clear <br className="hidden lg:block" />
                      <span className="serif-accent text-[0.92em] text-accent">path.</span>
                    </h2>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
                      A straightforward process with visible progress at every stage. You always
                      know what’s happening, what’s next, and what we need from you.
                    </p>
                    <a
                      href="#contact"
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-accent"
                    >
                      Discuss your project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </Reveal>

                <div className="lg:col-span-8">
                  <ol className="border-t border-line">
                    {PROCESS.map((step, index) => (
                      <Reveal
                        as="li"
                        key={step.title}
                        delay={index * 70}
                        className="group border-b border-line"
                      >
                        <div className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-6 sm:py-9">
                          <span className="font-mono text-[10px] tracking-[0.16em] text-muted sm:pt-2">
                            {step.number}
                          </span>
                          <h3 className="display text-3xl text-bone transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                            {step.title}
                          </h3>
                          <p className="max-w-md text-sm leading-relaxed text-muted">
                            {step.description}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </ol>

                  <Reveal className="mt-6 flex items-center gap-3 text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    No black boxes. Just steady, visible progress.
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* — Contact — */}
          <section
            id="contact"
            className="relative scroll-mt-24 overflow-hidden border-t border-line"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/[0.05] blur-[120px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>

            <div className="shell relative py-24 sm:py-28 lg:py-32">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-5">
                  <p className="eyebrow text-accent">05 / Start a project</p>
                  <h2 className="mt-5 text-bone">
                    <span className="display block text-[clamp(3.2rem,7vw,5.8rem)]">
                      Let’s make
                    </span>
                    <span className="display block text-[clamp(3.2rem,7vw,5.8rem)]">
                      something
                    </span>
                    <span className="serif-accent mt-2 block text-[clamp(3.3rem,7.5vw,6.2rem)] text-accent">
                      worth visiting.
                    </span>
                  </h2>

                  <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
                    Tell us what you’re building, what isn’t working, or where you want to go next.
                    We read every enquiry and reply personally.
                  </p>

                  <div className="mt-10 border-t border-line pt-6">
                    <p className="eyebrow text-muted">Email</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="break-all font-editorial text-2xl tracking-[-0.01em] text-bone transition-colors hover:text-accent sm:text-3xl"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label={copied ? 'Email address copied' : 'Copy email address'}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {copied ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p
                      className="mt-2 h-4 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
                      aria-live="polite"
                    >
                      {copied ? 'Copied to clipboard' : ''}
                    </p>
                  </div>

                  <div className="mt-8">
                    <MagneticButton
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                        "Let's build something great",
                      )}`}
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                    >
                      Let’s build something great
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </MagneticButton>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.14em]">
                    <div>
                      <p className="text-muted">Studio</p>
                      <p className="mt-1.5 text-bone">Remote / worldwide</p>
                    </div>
                    <div>
                      <p className="text-muted">Response</p>
                      <p className="mt-1.5 text-bone">Personal, not automated</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} className="lg:col-span-7">
                  <div className="border border-line bg-panel/60 p-5 backdrop-blur-sm sm:p-8 lg:p-10">
                    {formStatus === 'ready' ? (
                      <div aria-live="polite" className="flex min-h-[28rem] flex-col justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                          <CheckIcon className="h-5 w-5" />
                        </div>
                        <h3 className="display mt-6 text-3xl text-bone sm:text-4xl">
                          Your brief is ready.
                        </h3>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                          Your email app should have opened with your details filled in. Send it
                          whenever you’re ready. If the draft didn’t open, use the button below or
                          email us directly.
                        </p>
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                          <a
                            href={lastMailto || GENERAL_MAILTO}
                            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                          >
                            Open the draft again
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                          <button
                            type="button"
                            onClick={resetForm}
                            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
                          >
                            Write another
                          </button>
                        </div>
                        <p className="mt-6 text-sm text-muted">
                          Or email{' '}
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="text-bone underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                          >
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
                          <h3 className="display text-2xl text-bone sm:text-3xl">
                            Project enquiry
                          </h3>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                            Brief / 01
                          </span>
                        </div>

                        <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="eyebrow text-muted/85">
                              Name <span className="text-accent">*</span>
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                              autoComplete="name"
                              placeholder="Your name"
                              required
                              className="field mt-1"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="eyebrow text-muted/85">
                              Email <span className="text-accent">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              autoComplete="email"
                              placeholder="you@company.com"
                              required
                              className="field mt-1"
                            />
                          </div>

                          <div>
                            <label htmlFor="company" className="eyebrow text-muted/85">
                              Company
                            </label>
                            <input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleInputChange}
                              autoComplete="organization"
                              placeholder="Optional"
                              className="field mt-1"
                            />
                          </div>

                          <div>
                            <label htmlFor="projectType" className="eyebrow text-muted/85">
                              Project type
                            </label>
                            <select
                              id="projectType"
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleInputChange}
                              className="field mt-1"
                            >
                              {PROJECT_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="budget" className="eyebrow text-muted/85">
                              Budget
                            </label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              className="field mt-1"
                            >
                              {BUDGETS.map((budget) => (
                                <option key={budget} value={budget}>
                                  {budget}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="timeline" className="eyebrow text-muted/85">
                              Timeline
                            </label>
                            <select
                              id="timeline"
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleInputChange}
                              className="field mt-1"
                            >
                              {TIMELINES.map((timeline) => (
                                <option key={timeline} value={timeline}>
                                  {timeline}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-7">
                          <label htmlFor="brief" className="eyebrow text-muted/85">
                            Project brief <span className="text-accent">*</span>
                          </label>
                          <textarea
                            id="brief"
                            name="brief"
                            rows="4"
                            value={formData.brief}
                            onChange={handleInputChange}
                            placeholder="What are you building, and what would make this project a success?"
                            required
                            className="field mt-1 resize-none"
                          />
                        </div>

                        {formError && (
                          <p
                            role="alert"
                            className="mt-5 border border-red-400/25 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300"
                          >
                            {formError}
                          </p>
                        )}

                        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                          <p className="max-w-[19rem] text-[11px] leading-relaxed text-muted/85">
                            Sending opens your email app with the brief filled in. Nothing is
                            submitted to a server.
                          </p>
                          <button
                            type="submit"
                            className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-bone"
                          >
                            Send the brief
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        {/* — Footer — */}
        <footer className="relative border-t border-line bg-panel/30">
          <div className="shell py-16 sm:py-20">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <a
                  href="#top"
                  aria-label="Syncora — back to top"
                  className="inline-flex text-bone transition-colors hover:text-accent"
                >
                  <Logo />
                </a>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                  Independent web design and development for businesses that care how they show
                  up.
                </p>
              </div>

              <div className="lg:col-span-2">
                <p className="eyebrow text-muted">Explore</p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="transition-colors hover:text-bone"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3">
                <p className="eyebrow text-muted">Start a conversation</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-4 block break-all font-editorial text-xl text-bone transition-colors hover:text-accent"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href="#contact"
                  className="group mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  Project enquiry
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="lg:col-span-2">
                <p className="eyebrow text-muted">Studio</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Remote studio
                  <br />
                  Working worldwide
                </p>
                <a
                  href="#top"
                  className="group mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  Back to top
                  <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Syncora Studio. All rights reserved.</p>
              <p className="font-mono uppercase tracking-[0.14em]">Design & build, in-house</p>
            </div>

            <div aria-hidden="true" className="pointer-events-none mt-10 select-none overflow-hidden">
              <p className="display text-center text-[clamp(4.5rem,18vw,17rem)] leading-[0.72] text-bone/[0.06]">
                Syncora
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
