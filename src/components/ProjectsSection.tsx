import { useState, useEffect } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectTasks from "@/assets/project-tasks.jpg";
import projectWeather from "@/assets/project-weather.jpg";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  created_at: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  github: string;
  live: string | null;
  featured: boolean;
  stars: number;
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const excludedRepos = [
    'Amal0005',
    'Leetcode-solutions',
    'DSA-5Sorting',
    'react-portfolio',
    'FrameDecor',
    'todo-list',
    'starbucks',
    'Clone-Netflix',
  ];

  const projectImages = [projectEcommerce, projectTasks, projectWeather];

  const getCategoryFromLanguage = (language: string | null, topics: string[]): string => {
    if (!language) return "Miscellaneous";
    
    const frontendLangs = ["JavaScript", "TypeScript", "HTML", "CSS", "Vue", "React"];
    const backendLangs = ["Node.js", "Python", "Java", "C++", "C#", "Go", "PHP"];
    
    if (topics.includes("fullstack") || topics.includes("full-stack")) return "Full-Stack";
    if (frontendLangs.includes(language) || topics.some(topic => ["frontend", "react", "vue", "angular"].includes(topic))) return "Frontend";
    if (backendLangs.includes(language) || topics.some(topic => ["backend", "api", "server"].includes(topic))) return "Backend";
    
    return "Miscellaneous";
  };

  const getTechnologies = (language: string | null, topics: string[]): string[] => {
    const technologies = [];
    if (language) technologies.push(language);
    
    // Add relevant technologies based on topics
    const techMap: Record<string, string> = {
      "react": "React",
      "nodejs": "Node.js",
      "mongodb": "MongoDB",
      "express": "Express",
      "typescript": "TypeScript",
      "javascript": "JavaScript",
      "html": "HTML5",
      "css": "CSS3",
      "tailwindcss": "Tailwind CSS",
      "bootstrap": "Bootstrap",
      "api": "REST API",
      "mysql": "MySQL",
      "postgresql": "PostgreSQL",
      "firebase": "Firebase",
      "socketio": "Socket.io"
    };

    topics.forEach(topic => {
      const tech = techMap[topic.toLowerCase()];
      if (tech && !technologies.includes(tech)) {
        technologies.push(tech);
      }
    });

    return technologies.slice(0, 5); // Limit to 5 technologies
  };

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Amal0005/repos?sort=updated&per_page=50');
        const repos: GitHubRepo[] = await response.json();
        
        const filteredRepos = repos.filter(repo => 
          !excludedRepos.includes(repo.name) && 
          repo.description !== null
        );

        const projectsData: Project[] = filteredRepos.map((repo, index) => ({
          id: repo.id,
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || "A GitHub repository showcasing development skills and best practices.",
          image: projectImages[index % projectImages.length],
          category: getCategoryFromLanguage(repo.language, repo.topics),
          technologies: getTechnologies(repo.language, repo.topics),
          github: repo.html_url,
          live: repo.homepage || null,
          featured: repo.stargazers_count > 0 || index < 3, // Feature repos with stars or first 3
          stars: repo.stargazers_count
        }));

        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Fallback to empty array if API fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Loading Projects...
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Showcasing my best work in web development and software engineering
          </p>
        </div>

        {/* Featured Projects Highlight */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            ⭐ Spotlight Projects
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <Card key={project.id} className="glass overflow-hidden group hover-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="aspect-video bg-secondary/50 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Project Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary/90 hover:bg-primary">
                          <Play className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      </a>
                    ) : (
                      <Button size="sm" className="bg-primary/90 hover:bg-primary" disabled>
                        <Play className="w-4 h-4 mr-2" />
                        No Demo
                      </Button>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="bg-secondary/90">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-full p-2 flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="glass overflow-hidden group hover-scale cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-secondary/50 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-3">
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-accent transition-colors" />
                      </a>
                    ) : (
                      <ExternalLink className="w-4 h-4 text-muted-foreground/50 cursor-not-allowed" />
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 text-muted-foreground hover:text-accent transition-colors" />
                    </a>
                  </div>
                  {project.stars > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <span>⭐</span>
                      <span>{project.stars}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="https://github.com/Amal0005" target="_blank" rel="noopener noreferrer">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full hover-scale"
            >
              View All Projects on GitHub
              <Github className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/3 left-10 w-20 h-20 border border-primary/20 rotate-45 float opacity-30" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-accent/10 rounded-full float opacity-40" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default ProjectsSection;