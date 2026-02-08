import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "subrahmanyamkolipakula@gmail.com", // Update with your actual email
      href: "subrahmanyamkolipakula@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7670815170", // Update with your actual phone number
      href: "tel:+917670815170",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Visakhapatnam, India",
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-center"
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center mb-12"
        >
          Have a project in mind? Let's build something amazing together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="terminal-bg p-8 md:p-10"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-accent/50" />
            <div className="w-3 h-3 rounded-full bg-primary/50" />
            <span className="ml-3 text-muted-foreground text-xs">contact@terminal</span>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary font-mono text-sm">$</span>
                      <span className="text-primary font-mono text-sm">{contact.label.toLowerCase()}</span>
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-foreground text-lg hover:text-primary transition-colors"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-foreground text-lg">{contact.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Terminal prompt */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
              <span className="text-primary">$</span>
              <span>Feel free to reach out anytime!</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
