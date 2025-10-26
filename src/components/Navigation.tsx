import { useState, useEffect } from "react";
import { Menu, X, Code, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 glass backdrop-blur-md border-b border-border/50 ${
        isScrolled ? "shadow-lg/10" : ""
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-accent" />
              <span className="text-xl font-semibold tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Amal
              </span>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-accent transition-all duration-300 relative group hover-lift"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
                
                {/* Social Links */}
                <div className="flex items-center space-x-4 ml-8">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 text-foreground hover:text-accent transition-all hover-lift" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 text-foreground hover:text-accent transition-all hover-lift" />
                  </a>
                  <a href="mailto:contact@example.com">
                    <Mail className="w-5 h-5 text-foreground hover:text-accent transition-all hover-lift" />
                  </a>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground hover:text-accent hover-lift"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-30 glass backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-2xl font-medium text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Social Links */}
            <div className="flex items-center space-x-6 mt-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 text-foreground hover:text-accent transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 text-foreground hover:text-accent transition-colors" />
              </a>
              <a href="mailto:contact@example.com">
                <Mail className="w-6 h-6 text-foreground hover:text-accent transition-colors" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;