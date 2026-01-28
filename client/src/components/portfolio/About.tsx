import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const highlights = [
  { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, scalable solutions.' },
  { icon: Palette, title: 'Creative Design', description: 'Crafting stunning visual experiences.' },
  { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency.' },
  { icon: Globe, title: 'Global Reach', description: 'Building accessible products worldwide.' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} id="about" className="relative py-20 px-4 md:px-8 -mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="metallic-border rounded-[2rem]">
          <div className="browser-frame rounded-[1.8rem] p-8 md:p-12 noise">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div style={{ y }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="text-xs font-mono text-white/50 tracking-wider">ABOUT ME</span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white"
                  data-testid="text-about-title"
                >
                  Turning ideas into{' '}
                  <span className="text-gradient-light">reality</span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4 text-white/60 leading-relaxed"
                >
                  <p>
                    I'm Alex Chen, a full-stack developer with over 5 years of experience
                    building digital products that make a difference.
                  </p>
                  <p>
                    My journey began with a fascination for how things work on the web.
                    Today, I specialize in creating seamless user experiences using
                    modern technologies like React, Node.js, and Three.js.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  {[
                    { value: '5+', label: 'Years' },
                    { value: '50+', label: 'Projects' },
                    { value: '30+', label: 'Clients' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="glass px-5 py-3 rounded-2xl"
                    >
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                      <span className="text-xs text-white/50 ml-2">{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.05,
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
                    }}
                    onPointerMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                    }}
                    className="glass p-6 rounded-2xl group cursor-pointer relative overflow-hidden transition-all duration-300 border border-white/5 hover:border-sky-400/30"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(125,211,252,0.1),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-600/20 flex items-center justify-center mb-4 relative z-10"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={24} className="text-sky-400 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="font-serif text-lg font-bold text-white mb-2 relative z-10 group-hover:text-sky-400 transition-colors">{item.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed relative z-10 group-hover:text-white/70 transition-colors">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}