import { useState } from "react";
import { Code, Database, Globe, Smartphone, Server, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces",
      skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
      color: "accent"
    },
    {
      icon: Server,
      title: "Backend Development", 
      description: "Building robust server-side applications and APIs",
      skills: ["Node.js", "Express.js", "RESTful API", "JWT", "MVC Architecture"],
      color: "primary"
    },
    {
      icon: Database,
      title: "Database & Cloud",
      description: "Managing data and deploying scalable applications",
      skills: ["MongoDB", "Mongoose", "PostgreSQL", "AWS", "Firebase"],
      color: "neon"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "Modern web development tools and practices",
      skills: ["TypeScript", "Redux", "Bootstrap", "Socket.IO", "Next.js"],
      color: "accent"
    },
    {
      icon: Smartphone,
      title: "Payment & Auth",
      description: "Integration of payment systems and authentication",
      skills: ["Razorpay", "PayPal", "Google OAuth", "OTP Login", "JWT"],
      color: "primary"
    },
    {
      icon: Zap,
      title: "Tools & DevOps",
      description: "Development tools and deployment workflows",
      skills: ["Git", "GitHub", "Postman", "Figma", "Nginx"],
      color: "neon"
    }
  ];

  const techStack = [
    { name: "React.js", level: 90, color: "text-blue-400" },
    { name: "Node.js", level: 88, color: "text-green-400" },
    { name: "MongoDB", level: 85, color: "text-green-500" },
    { name: "Express.js", level: 87, color: "text-gray-400" },
    { name: "JavaScript", level: 92, color: "text-yellow-400" },
    { name: "TypeScript", level: 80, color: "text-blue-500" },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            A comprehensive toolkit for building modern web applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="glass p-6 hover-scale cursor-pointer transition-all duration-300 group border-border/50"
                onMouseEnter={() => setHoveredSkill(category.title)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-${category.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground border transition-all duration-300 ${
                          hoveredSkill === category.title
                            ? 'border-accent text-accent scale-105'
                            : 'border-border'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tech Stack - Compact cards with circular progress */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
            Technical Proficiency
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => {
              const radius = 18;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (tech.level / 100) * circumference;
              return (
                <div key={tech.name} className="glass p-3 rounded-xl flex items-center gap-3 hover-lift">
                  <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="4"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      transform="rotate(-90 22 22)"
                    />
                  </svg>
                  <div>
                    <div className={`text-sm font-medium ${tech.color}`}>{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.level}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 border border-accent/20 rounded-full float opacity-30" />
      <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-primary/10 rounded-full float opacity-40" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default SkillsSection;