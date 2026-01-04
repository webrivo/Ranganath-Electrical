import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Award, 
  ArrowRight, 
  Menu, 
  X, 
  Lightbulb, 
  ShieldCheck, 
  Smartphone,
  ChevronDown
} from 'lucide-react';

// --- Assets & Data ---
const CONTACT_INFO = {
  name: "Ranganath Electrical",
  phone: "9740068926",
  address: "No 13 1st A Cross Maruti Nagar, St Miras School, Vrushabhavathi Nagar, Kamakshipalya, Bangalore-560079, Karnataka",
  shortAddress: "Kamakshipalya, Bangalore"
};

const IMAGES = [
  "https://images.jdmagicbox.com/v2/comp/bangalore/t1/080pxx80.xx80.240826085452.u6t1/catalogue/ranganath-electrical-kamakshipalya-bangalore-electricians-op7nztma7u.jpg",
  "https://images.jdmagicbox.com/v2/comp/bangalore/t1/080pxx80.xx80.240826085452.u6t1/catalogue/ranganath-electrical-kamakshipalya-bangalore-electricians-9f89jmyer7.jpg",
  "https://images.jdmagicbox.com/v2/comp/bangalore/t1/080pxx80.xx80.240826085452.u6t1/catalogue/ranganath-electrical-kamakshipalya-bangalore-electricians-z7mfksalfq.jpg",
  "https://images.jdmagicbox.com/v2/comp/bangalore/t1/080pxx80.xx80.240826085452.u6t1/catalogue/ranganath-electrical-kamakshipalya-bangalore-electricians-2gs16eyy22.jpg"
];

const FEATURES = [
  { title: "24/7 Support", desc: "Always available for emergencies." },
  { title: "Certified Expert", desc: "Licensed professional electrician." },
  { title: "Affordable", desc: "Competitive market pricing." },
];

// --- Utility Functions ---
const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
  e.preventDefault();
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Utility Hooks ---

// Hook for scroll animations (Performance Guardrail: IntersectionObserver)
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

// --- Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExit(true), 2500);
    const completeTimer = setTimeout(onComplete, 3000); // Allow exit anim to finish
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black text-white transition-transform duration-700 ease-in-out ${exit ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="flex flex-col items-center">
        <Zap className="w-16 h-16 text-yellow-400 animate-pulse mb-4" />
        <h1 className="text-3xl font-light tracking-widest uppercase">Ranganath</h1>
        <div className="w-32 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glassmorphism py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo wrapped in anchor to go to home */}
        <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center gap-2 cursor-pointer">
          <div className="bg-black text-white p-1 rounded-md">
            <Zap size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Ranganath<span className="font-light text-slate-500">Electrical</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-black transition-colors cursor-pointer">Home</a>
          <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-black transition-colors cursor-pointer">Services</a>
          <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')} className="hover:text-black transition-colors cursor-pointer">Projects</a>
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="px-5 py-2 bg-black text-white rounded-full hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer">
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden animate-fade-in-down">
          <a href="#home" onClick={(e) => { handleScroll(e, '#home'); setMobileMenuOpen(false); }} className="text-lg font-medium cursor-pointer">Home</a>
          <a href="#services" onClick={(e) => { handleScroll(e, '#services'); setMobileMenuOpen(false); }} className="text-lg font-medium cursor-pointer">Services</a>
          <a href="#gallery" onClick={(e) => { handleScroll(e, '#gallery'); setMobileMenuOpen(false); }} className="text-lg font-medium cursor-pointer">Projects</a>
          <a href="#contact" onClick={(e) => { handleScroll(e, '#contact'); setMobileMenuOpen(false); }} className="text-lg font-medium text-blue-600 cursor-pointer">Contact Us</a>
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle: string }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div ref={ref} className={`mb-12 md:mb-20 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 block">{subtitle}</span>
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">{children}</h2>
    </div>
  );
};

// Section 1: Hero (Kinetic Typography + Particles)
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-yellow-50 opacity-80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-noise" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1 mb-6 border border-slate-200 rounded-full bg-white/50 backdrop-blur-sm">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">Premium Electrical Services in Bangalore</span>
        </div>
        
        {/* Kinetic Typography */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9]">
          POWERING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">YOUR WORLD</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Expert residential and commercial electrical solutions in Kamakshipalya. Safety, precision, and reliability delivered.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`tel:${CONTACT_INFO.phone}`} className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2 group cursor-pointer">
            <Phone size={18} /> Call Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')} className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center cursor-pointer">
            View Projects
          </a>
        </div>
      </div>

      {/* Marquee Effect at Bottom */}
      <div className="absolute bottom-0 left-0 w-full py-4 bg-black text-white overflow-hidden whitespace-nowrap opacity-90 z-20">
        <div className="inline-block animate-marquee">
          <span className="mx-8 text-sm font-bold tracking-widest uppercase">• RESIDENTIAL WIRING • COMMERCIAL INSTALLATION • 24/7 SUPPORT • CERTIFIED ELECTRICIANS</span>
          <span className="mx-8 text-sm font-bold tracking-widest uppercase">• RESIDENTIAL WIRING • COMMERCIAL INSTALLATION • 24/7 SUPPORT • CERTIFIED ELECTRICIANS</span>
          <span className="mx-8 text-sm font-bold tracking-widest uppercase">• RESIDENTIAL WIRING • COMMERCIAL INSTALLATION • 24/7 SUPPORT • CERTIFIED ELECTRICIANS</span>
        </div>
      </div>
    </section>
  );
};

// Section 2: Introduction (Text Reveal)
const Introduction = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl md:text-4xl font-serif italic text-slate-400 mb-4">Since 2010</h2>
          <p className="text-3xl md:text-5xl font-medium text-slate-900 leading-tight">
            We don't just fix wires; we build the <span className="text-blue-600">nervous system</span> of your home. 
            From subtle lighting to heavy-duty industrial setups, Ranganath Electrical brings energy to life in Bangalore.
          </p>
        </div>
      </div>
    </section>
  );
};

// Section 3: Services (Bento Grid)
const ServicesBento = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Our Expertise">Comprehensive Electrical <br/>Solutions</SectionHeading>
        
        {/* Mobile: 2 Columns as requested. Desktop: Bento Grid */}
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Large Card */}
          <div className="col-span-2 row-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Industrial & Commercial</h3>
              <p className="text-slate-500">High-capacity wiring, 3-phase connections, and factory setups handled with extreme precision.</p>
            </div>
          </div>

          {/* Medium Card */}
          <div className="col-span-2 md:col-span-2 bg-slate-900 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Lightbulb size={80} />
             </div>
             <h3 className="text-xl font-bold mb-1 relative z-10">Smart Lighting</h3>
             <p className="text-slate-400 text-sm relative z-10">Mood lighting, LED strips, and automated controls.</p>
          </div>

          {/* Small Cards */}
          <div className="col-span-1 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center hover:border-blue-200 transition-colors">
            <ShieldCheck className="text-green-500 mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">Safety Audits</h4>
          </div>

          <div className="col-span-1 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center hover:border-blue-200 transition-colors">
            <Smartphone className="text-purple-500 mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">Home Auto</h4>
          </div>

          {/* Wide Bottom Card */}
          <div className="col-span-2 md:col-span-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Emergency Repairs?</h3>
              <p className="text-blue-100 text-sm">We are available for urgent calls.</p>
            </div>
            <a href={`tel:${CONTACT_INFO.phone}`} className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 transition-transform cursor-pointer">
              <Phone size={20} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

// Section 4: Featured Work (Image Gallery - 2 Cols Mobile)
const Gallery = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Portfolio">Recent Projects</SectionHeading>
        
        {/* Specific Requirement: 2 images in a row in mobile mode */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {IMAGES.map((src, idx) => (
            <a 
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              key={idx} 
              className={`block group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <img 
                src={src} 
                alt={`Ranganath Electrical Work ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-md">View</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 5: Stats (Scroll Counter)
const Stats = () => {
  return (
    <section className="py-20 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Years Experience", val: "15+" },
          { label: "Projects Done", val: "500+" },
          { label: "Happy Clients", val: "450+" },
          { label: "Safety Rating", val: "100%" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">{stat.val}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// Section 6: Why Us (Tilt Cards)
const WhyUs = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
       <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <SectionHeading subtitle="Why Choose Us">Powered by <br/>Trust & Quality</SectionHeading>
             <p className="text-slate-600 mb-8 leading-relaxed">
               At Ranganath Electrical, we combine traditional expertise with modern technology. Located in the heart of Kamakshipalya, we serve the entire Bangalore region with promptness and integrity.
             </p>
             <ul className="space-y-4">
               {FEATURES.map((feat, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                     <CheckCircle size={14} />
                   </div>
                   <span className="font-medium text-slate-800">{feat.title}</span>
                   <span className="text-slate-400 text-sm hidden sm:inline">- {feat.desc}</span>
                 </li>
               ))}
             </ul>
          </div>

          <div className="md:w-1/2 relative w-full h-[400px]">
             {/* Abstract Composition */}
             <div className="absolute top-10 left-10 w-full h-full bg-blue-600 rounded-3xl opacity-10 transform rotate-6"></div>
             <div className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col justify-center items-center text-center transform hover:-translate-y-2 transition-transform duration-500">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-600">
                  <Award size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Award Winning Service</h3>
                <p className="text-slate-500">Recognized for excellence in electrical safety and installation standards across Karnataka.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 7: Process (Simple Steps)
const Process = () => {
  const steps = [
    { num: "01", title: "Contact", desc: "Call or book online." },
    { num: "02", title: "Inspection", desc: "We analyze the site." },
    { num: "03", title: "Execution", desc: "Safe & clean work." },
    { num: "04", title: "Support", desc: "Post-service care." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Workflow">How We Work</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group p-6 border-l border-slate-200 hover:border-blue-500 transition-colors duration-300">
              <span className="text-6xl font-black text-slate-100 absolute -top-4 -left-4 z-0 group-hover:text-blue-50 transition-colors">{step.num}</span>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 8: FAQ (Accordion / Neumorphism)
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "Do you provide emergency services?", a: "Yes, we are available for critical electrical emergencies in Bangalore." },
    { q: "Do you serve outside Kamakshipalya?", a: "Absolutely. We cover most major areas in Bangalore." },
    { q: "What is your pricing model?", a: "We offer transparent, per-job pricing with no hidden fees." },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading subtitle="FAQ">Common Questions</SectionHeading>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div 
              key={i} 
              className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${openIndex === i ? 'ring-2 ring-blue-500/10' : ''}`}
              onClick={() => setOpenIndex(i)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-slate-900">{item.q}</h4>
                <ChevronDown className={`transform transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 9: Contact (Glassmorphism Card + Magnetic Buttons)
const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-900 text-white">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900 to-slate-900 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Contact Us</h2>
        <p className="text-slate-400 mb-12 max-w-lg mx-auto">Ready to upgrade your electrical systems? Reach out to Ranganath Electrical today.</p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
           {/* Phone Card */}
           <a href={`tel:${CONTACT_INFO.phone}`} className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group cursor-pointer">
             <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
               <Phone className="text-white w-8 h-8" />
             </div>
             <h4 className="font-bold text-xl mb-2">Call Us</h4>
             <p className="text-slate-300 text-lg font-mono">{CONTACT_INFO.phone}</p>
           </a>

           {/* Address Card (Reverted to Div) */}
           <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
             <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
               <MapPin className="text-white w-8 h-8" />
             </div>
             <h4 className="font-bold text-xl mb-2">Visit Us</h4>
             <p className="text-slate-300 leading-relaxed">{CONTACT_INFO.address}</p>
           </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-black text-slate-500 py-12 border-t border-slate-900 text-sm">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h3 className="text-white font-bold text-lg mb-1">Ranganath Electrical</h3>
        <p>{CONTACT_INFO.shortAddress}</p>
      </div>
      <div className="flex gap-6">
        <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-white transition-colors cursor-pointer">Home</a>
        <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-white transition-colors cursor-pointer">Services</a>
        <a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')} className="hover:text-white transition-colors cursor-pointer">Projects</a>
      </div>
      <p>© {new Date().getFullYear()} All Rights Reserved.</p>
    </div>
  </footer>
);

// --- Main App Component ---

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Custom Styles for Animations
  const styles = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes loading-bar {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    @keyframes fade-in-down {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-marquee { animation: marquee 20s linear infinite; }
    .animate-blob { animation: blob 7s infinite; }
    .animate-loading-bar { animation: loading-bar 2.5s ease-in-out forwards; }
    .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
    
    .glassmorphism {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
    }
    html { scroll-behavior: smooth; }
  `;

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-blue-200 overflow-x-hidden">
      <style>{styles}</style>
      
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Navbar />
        <Hero />
        <Introduction />
        <ServicesBento />
        <Gallery />
        <Stats />
        <WhyUs />
        <Process />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}