import { useState, useEffect } from "react";
import { Code, Terminal } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("");
  
  const loadingTexts = [
    "Initializing portfolio...",
    "Loading creative modules...",
    "Compiling experiences...",
    "Rendering innovation...",
    "Welcome to my digital space"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        const textIndex = Math.floor(newProgress / 20);
        
        if (textIndex < loadingTexts.length) {
          setCurrentText(loadingTexts[textIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Code className="w-12 h-12 text-primary animate-spin" />
            <Terminal className="w-12 h-12 text-accent float" />
          </div>
          
          {/* Glowing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-primary/30 animate-ping"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground typewriter">
            {currentText}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-secondary rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full gradient-primary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Percentage */}
          <p className="text-sm text-muted-foreground font-mono">
            {progress}% complete
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;