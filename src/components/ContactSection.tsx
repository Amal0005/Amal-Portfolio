import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) ?? 'service_jhdq5k5';
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ?? 'template_tbjg0xj'; // for you
  const autoReplyTemplateId = (import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string | undefined) ?? 'template_tbjg0xj'; // for user
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ?? 'A78PGBAwaGHTVK690';

  if (!serviceId || !templateId || !publicKey) {
    toast({
      title: "Email service not configured",
      description: "Missing EmailJS keys. Please set your environment variables."
    });
    setIsSubmitting(false);
    return;
  }

  try {
    emailjs.init(publicKey);

    // 1️⃣ Send message to you
    await emailjs.send(serviceId, templateId, {
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
      to_email: "amalnt31@gmail.com",
    });

    // 2️⃣ Send auto-reply to sender
    await emailjs.send(serviceId, autoReplyTemplateId, {
      from_name: "Amal",
      to_name: formData.name,
      to_email: formData.email,
      message: formData.message,
    });

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. A confirmation email has been sent to you."
    });

    setFormData({ name: "", email: "", message: "" });
  } catch (err: any) {
    console.error("EmailJS send error:", err);
    toast({
      title: "Failed to send",
      description: err?.text || err?.message || "Please try again later or email me directly."
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "amalnt31@gmail.com",
      href: "mailto:amalnt31@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 81 38 977511",
      href: "tel:+918138977511"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Thrissur, Kerala, India",
      href: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Amal0005", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/amal-nt", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-10 md:py-12 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2.5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto px-4">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Information */}
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Get In Touch</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                I'm always interested in new opportunities and exciting projects. 
                Whether you're a company looking to hire, or you're a fellow developer 
                who wants to collaborate, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3.5">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center space-x-2.5 p-2.5 glass rounded-lg hover-scale group transition-all duration-300"
                  >
                    <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">{contact.label}</p>
                      <p className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2.5">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 glass rounded-lg flex items-center justify-center hover-scale group transition-all duration-300"
                    >
                      <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <Card className="glass p-4 border-accent/30">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <div>
                  <p className="text-xs font-medium text-foreground">Available for Work</p>
                  <p className="text-[11px] text-muted-foreground">
                    Currently accepting new projects and opportunities
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="glass p-5">
            <h3 className="text-lg font-bold text-foreground mb-3">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-medium text-foreground mb-1.5">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-border focus:border-accent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[11px] font-medium text-foreground mb-1.5">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50 border-border focus:border-accent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] font-medium text-foreground mb-1.5">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-secondary/50 border-border focus:border-accent resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 text-xs rounded-lg hover-scale transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-3.5 text-center">
              <p className="text-[11px] text-muted-foreground">
                Typically respond within 24 hours
              </p>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <div className="glass rounded-2xl p-5 max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-foreground mb-2.5">
              Ready to Start Your Project?
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Let's turn your vision into reality. From concept to deployment, 
              I'll help you build something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-2 text-xs rounded-full hover-scale"
              >
                Schedule a Call
              </Button>
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2 text-xs rounded-full hover-scale border inline-flex items-center justify-center"
              >
                View My Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-14 right-10 w-12 h-12 border border-accent/20 rounded-full float opacity-30" />
      <div className="absolute bottom-14 left-10 w-12 h-12 bg-primary/10 rotate-45 float opacity-40" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default ContactSection;