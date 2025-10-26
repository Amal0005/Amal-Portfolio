import { useState, useEffect } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroWorkspace from "@/assets/hero-workspace.jpg";

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    "MERN Stack Developer",
    "Frontend Specialist", 
    "Backend Engineer",
    "Full-Stack Creator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-24">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroWorkspace})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Animated Background Overlay */}
      <div className="absolute inset-0 gradient-secondary opacity-60">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Soft aura highlight */}
      <div className="absolute inset-0 aura" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Copy */}
          <div className="md:mr-auto md:ml-0 text-center md:text-left space-y-6 animate-slide-up">
          {/* Greeting */}
          <p className="text-accent font-medium text-lg md:text-xl">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in tracking-tight leading-tight whitespace-nowrap text-shine">
            AMAL N T
          </h1>

          {/* Dynamic Role */}
          <div className="min-h-[2.5rem] flex items-center justify-center md:justify-start">
            <h2 className="text-base md:text-xl font-semibold text-foreground">
              {roles[currentRole]}
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed px-4 md:px-0">
            Full-stack Web Developer skilled in React, Node.js, Express.js, TypeScript, and MongoDB. 
            Passionate about building scalable, high-performance web applications with clean architecture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center md:justify-start items-center pt-2">
            <Button 
              onClick={() => scrollToSection('#projects')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 text-xs md:text-sm rounded-full hover-scale neon-glow w-full sm:w-auto"
            >
              View My Work
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-5 py-3 text-xs md:text-sm rounded-full hover-scale w-full sm:w-auto inline-flex items-center justify-center border"
            >
              View Resume
                            <ExternalLink className="ml-2 w-4 h-4" />

            </a>
          </div>

          {/* Stats */}

          </div>

          {/* Right: Visual - Tech marquees */}
          <div className="relative hidden md:flex flex-col justify-center gap-4 h-[360px]">
            <div className="marquee">
              <div className="marquee-track">
                {[
                  'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Vite', 'Tailwind'
                ].map((t, i) => (
                  <span key={`m1-${i}`} className="badge">{t}</span>
                ))}
                {[
                  'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Vite', 'Tailwind'
                ].map((t, i) => (
                  <span key={`m1b-${i}`} className="badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="marquee marquee-reverse">
              <div className="marquee-track">
                {[
                  'JWT', 'Docker', 'ESLint', 'Prettier', 'Vercel', 'Git'
                ].map((t, i) => (
                  <span key={`m2-${i}`} className="badge">{t}</span>
                ))}
                {[
                  'JWT', 'Docker', 'ESLint', 'Prettier', 'Vercel', 'Git'
                ].map((t, i) => (
                  <span key={`m2b-${i}`} className="badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="marquee">
              <div className="marquee-track">
                {[
                  'WebSockets', 'Performance', 'Accessibility', 'Testing', 'Animations', 'Design Systems'
                ].map((t, i) => (
                  <span key={`m3-${i}`} className="badge">{t}</span>
                ))}
                {[
                  'WebSockets', 'Performance', 'Accessibility', 'Testing', 'Animations', 'Design Systems'
                ].map((t, i) => (
                  <span key={`m3b-${i}`} className="badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={() => scrollToSection('#about')}
          className="animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-accent" />
        </button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-accent/30 rounded-full float opacity-50" />
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-primary/20 rounded-full float opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-12 h-12 border border-primary/30 rotate-45 float opacity-40" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;