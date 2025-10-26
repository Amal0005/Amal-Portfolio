import React from "react";
import { Card } from "@/components/ui/card";

const AboutSection = () => {

  const values = [
    {
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code that stands the test of time."
    },
    {
      title: "User-Centric",
      description: "Focusing on user experience and creating intuitive interfaces that people love to use."
    },
    {
      title: "Innovation",
      description: "Staying up-to-date with the latest technologies and best practices in web development."
    },
    {
      title: "Collaboration",
      description: "Working closely with teams and clients to deliver solutions that exceed expectations."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Passionate developer crafting digital experiences with modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 md:mb-16">
          {/* About Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Hello! I'm Amal, a MERN Stack Developer
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Full-stack Web Developer skilled in React, Node.js, Express.js, TypeScript, and MongoDB, 
                  with hands-on experience in building and deploying scalable, high-performance web applications. 
                  Proficient in MVC, Repository and Clean Architecture patterns for structured and maintainable backend development.
                </p>
                
                <p>
                  Strong expertise in RESTful API design, authentication/authorization (JWT, OAuth), and responsive UI 
                  development with Tailwind CSS. Adept at working with Git/GitHub, PostgreSQL, and cloud deployment 
                  (AWS, Vercel). I specialize in creating e-commerce platforms, task management systems, and full-stack applications.
                </p>
                
                <p>
                  Passionate about writing clean, efficient code, collaborating in team-driven environments, 
                  and pursuing continuous learning to stay updated with modern technologies. Always excited 
                  to take on new challenges and deliver solutions that exceed expectations.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="space-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="font-semibold text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image & Stats */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Profile Image Placeholder */}
            <div className="relative max-w-md mx-auto">
              <div className="w-full aspect-square max-w-80 mx-auto glass rounded-2xl p-6 md:p-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="text-center space-y-4">
                  <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-primary-foreground">AN</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">AMAL N T</h3>
                    <p className="text-sm md:text-base text-muted-foreground">MERN Stack Developer</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around profile */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full float opacity-70" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full float opacity-60" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -left-6 w-4 h-4 border-2 border-accent rotate-45 float opacity-50" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            My Journey
          </h3>
          
          <div className="space-y-8">
            {[
              {
                year: "2024",
                title: "MERN Stack Developer",
                company: "Independent Projects",
                description: "Built full-stack e-commerce applications with MongoDB, Express.js, React, and Node.js including payment integration and admin dashboards."
              },
              {
                year: "2023",
                title: "Full-Stack Projects Portfolio",
                company: "Personal Development",
                description: "Developed various web applications including Netflix clone, OLX clone, and task management systems using modern web technologies."
              },
              {
                year: "2022",
                title: "Web Development Journey",
                company: "Self-Taught Developer",
                description: "Started learning web development focusing on JavaScript, React, and backend technologies with hands-on project experience."
              }
            ].map((experience, index) => (
              <div key={experience.year} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <span className="text-sm font-bold text-accent">{experience.year}</span>
                  </div>
                </div>
                
                <div className="flex-grow space-y-2">
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {experience.title}
                  </h4>
                  <p className="text-primary font-medium">{experience.company}</p>
                  <p className="text-muted-foreground">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-10 w-28 h-28 border border-primary/20 rounded-full float opacity-20" />
      <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-accent/10 rotate-45 float opacity-30" style={{ animationDelay: '1.5s' }} />
    </section>
  );
};

export default AboutSection;