import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      setScrollProgress(pct);
    };
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpotlightPos({ x, y });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Vertical scroll tracker */}
      <div className="scroll-rail">
        <div
          className="scroll-dot"
          style={{ top: `calc(${scrollProgress}% )` }}
        />
        <div
          className="scroll-tooltip"
          style={{ top: `calc(${scrollProgress}% )` }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>

      {/* Cursor spotlight overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 cursor-spotlight"
        style={{
          // @ts-ignore custom CSS vars
          "--mx": `${spotlightPos.x}%`,
          // @ts-ignore
          "--my": `${spotlightPos.y}%`,
        }}
      />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Amal. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blank" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
