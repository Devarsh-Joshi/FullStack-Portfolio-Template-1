import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@alexchen.dev' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
  ];

  return (
    <section id="contact" className="relative py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="metallic-border rounded-[2rem]">
          <div className="browser-frame rounded-[1.8rem] p-8 md:p-12 noise">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-xs font-mono text-white/50 tracking-wider">GET IN TOUCH</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-12"
            >
              Let's <span className="text-gradient-light">Connect</span>
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="space-y-6"
              >
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      x: 10,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      scale: 1.02
                    }}
                    className="flex items-center gap-4 p-5 glass rounded-2xl group cursor-pointer transition-all duration-300 border border-white/5 hover:border-sky-400/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-400/20 flex items-center justify-center group-hover:bg-sky-400/30 transition-colors">
                      <item.icon size={20} className="text-sky-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">{item.value}</p>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowUpRight size={18} className="text-white/20 group-hover:text-sky-400 transition-colors" />
                    </motion.div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                  className="glass p-6 rounded-xl"
                >
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Open for <span className="text-gradient-light">opportunities</span>
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Currently available for freelance projects and full-time positions.
                  </p>
                  <div className="flex gap-2">
                    {['Freelance', 'Full-time', 'Remote'].map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono glass rounded-full text-sky-400/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="glass p-6 rounded-2xl space-y-5"
              >
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-sky-400/50 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}