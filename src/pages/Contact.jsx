import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/animations/ScrollReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTearing, setIsTearing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTearing(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsTearing(false);
    }, 800);
  };

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "Sells Middle School, Dublin, Ohio" },
    { icon: Phone, label: "Phone", value: "(614) 555-DYSO" },
    { icon: Mail, label: "Email", value: "info@dyso.org" },
    { icon: Clock, label: "Rehearsals", value: "Thursdays, 6:30 PM - 8:30 PM" }
  ];

  return (
    <div className="bg-[#0a0a0a] pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase">
              Get in Touch
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] italic mt-4 mb-6">
              Connect
            </h1>
            <p className="text-[#a1a1a1] max-w-xl mx-auto">
              Have questions about auditions, performances, or want to support DYSO? We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form - Dark Ticket Style */}
          <ScrollReveal delay={0.1}>
            <div className="relative">
              <AnimatePresence>
                {!isSubmitted ? (
                  <motion.div
                    key="ticket"
                    className="relative"
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <form onSubmit={handleSubmit}>
                      {/* Main Form Body */}
                      <div className="relative bg-[#161616] rounded-2xl p-8 border-2 border-[#333]">
                        {/* Perforated Edge Visual */}
                        <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-around py-4">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
                          ))}
                        </div>

                        {/* Header */}
                        <div className="mb-8 pb-6 border-b-2 border-dashed border-[#333]">
                          <h2 className="font-serif text-3xl text-[#ededed] italic mb-2">
                            Contact Form
                          </h2>
                          <p className="text-[#a1a1a1] text-sm">
                            Send us a message and we'll get back to you soon
                          </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6 mb-8">
                          <div>
                            <label className="block text-[#2e8b57] text-xs uppercase tracking-wider mb-2 font-medium">
                              Your Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full bg-[#0a0a0a] border-b-2 border-[#333] py-3 px-3 text-[#ededed] focus:outline-none focus:border-[#2e8b57] transition-colors"
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label className="block text-[#2e8b57] text-xs uppercase tracking-wider mb-2 font-medium">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full bg-[#0a0a0a] border-b-2 border-[#333] py-3 px-3 text-[#ededed] focus:outline-none focus:border-[#2e8b57] transition-colors"
                              placeholder="john@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-[#2e8b57] text-xs uppercase tracking-wider mb-2 font-medium">
                              Your Message
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={4}
                              className="w-full bg-[#0a0a0a] border-2 border-[#333] py-3 px-3 text-[#ededed] focus:outline-none focus:border-[#2e8b57] transition-colors resize-none rounded-lg"
                              placeholder="Tell us what you'd like to know..."
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full bg-[#2e8b57] hover:bg-[#256f46] text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-3 group"
                        >
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Ticket Number */}
                        <p className="text-[#666] text-xs font-mono mt-4 text-center">
                          MESSAGE ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                      </div>

                      {/* Stub - Decorative */}
                      <motion.div
                        className="absolute -right-2 top-8 bottom-8 w-16 bg-[#161616] border-2 border-l-0 border-[#333] rounded-r-xl flex flex-col items-center justify-center gap-2"
                        animate={isTearing ? {
                          x: 80,
                          rotate: 8,
                          opacity: 0
                        } : {}}
                        transition={{ duration: 0.8 }}
                      >
                        {/* Decorative barcode lines */}
                        {[2, 1, 3, 2, 1, 4, 2, 3, 1, 2].map((width, i) => (
                          <div
                            key={i}
                            className="bg-[#2e8b57]"
                            style={{ width: `${width * 4}px`, height: '2px' }}
                          />
                        ))}
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-[#161616] rounded-2xl p-12 border-2 border-[#2e8b57]"
                  >
                    {/* Success State */}
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-block mb-6"
                      >
                        <CheckCircle className="w-20 h-20 text-[#2e8b57] mx-auto" />
                      </motion.div>
                      <h3 className="font-serif text-3xl text-[#ededed] italic mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-[#a1a1a1] mb-8">
                        Thank you for contacting us! We'll get back to you soon.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', message: '' });
                        }}
                        className="px-8 py-3 bg-[#2e8b57] hover:bg-[#256f46] text-white rounded-lg transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Map & Contact Info */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-[#333]">
                <div className="absolute inset-0 bg-[#1c1c1c]">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#2e8b57] mx-auto mb-3" />
                      <p className="text-[#a1a1a1]">Sells Middle School</p>
                      <p className="text-[#666] text-sm">Dublin, Ohio</p>
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(46,139,87,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(46,139,87,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#1c1c1c] rounded-xl p-6 border border-[#333] group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2e8b57]/20 flex items-center justify-center mb-4 group-hover:bg-[#2e8b57]/30 transition-colors">
                      <info.icon className="w-5 h-5 text-[#2e8b57]" />
                    </div>
                    <p className="text-[#a1a1a1] text-sm mb-1">{info.label}</p>
                    <p className="text-[#ededed]">{info.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Additional CTA */}
              <div className="bg-gradient-to-br from-[#2e8b57]/20 to-[#1c1c1c] rounded-2xl p-8 border border-[#2e8b57]/30">
                <h3 className="font-serif text-2xl text-[#ededed] italic mb-3">
                  Ready to Audition?
                </h3>
                <p className="text-[#a1a1a1] mb-6">
                  Auditions for the 2024-2025 season are now open. Download our audition packet for requirements and scheduling.
                </p>
                <MagneticButton variant="secondary">
                  Download Audition Packet
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}