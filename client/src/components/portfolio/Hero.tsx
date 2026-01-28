import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Scene from '../three/Scene';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [easterEgg, setEasterEgg] = useState<string | null>(null);

  const triggerEasterEgg = (type: string) => {
    setEasterEgg(type);
    setTimeout(() => setEasterEgg(null), 3000);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const navItems = ['Home', 'About', 'Work', 'Skills', 'Contact'];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center p-4 md:p-8"
    >
      <AnimatePresence>
        {easterEgg === 'close' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="glass-strong p-8 rounded-3xl text-center">
              <h2 className="text-4xl font-serif font-bold text-gradient mb-4">Nice try!</h2>
              <p className="text-white/60">You can't close the future.</p>
            </div>
          </motion.div>
        )}
        {easterEgg === 'minimize' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center pointer-events-none"
          >
            <motion.p 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="font-mono text-sky-400 text-xl"
            >
              &gt; SYSTEM_MINIMIZED: HIBERNATION_MODE_ACTIVE
            </motion.p>
          </motion.div>
        )}
        {easterEgg === 'maximize' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-sky-400/10 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-8xl font-mono font-bold text-white tracking-widest opacity-20">OVERCLOCKING</h2>
              <div className="flex justify-center gap-4 mt-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 40, 10] }}
                    transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
                    className="w-1 bg-sky-400"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        {easterEgg === 'info' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none grid grid-cols-4 gap-4 p-8"
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="font-mono text-[10px] text-sky-400"
              >
                {Math.random().toString(16).substring(2, 15)}
                <br />
                {Math.random().toString(16).substring(2, 15)}
              </motion.div>
            ))}
            <div className="fixed inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-strong p-8 rounded-full border border-sky-400/50"
              >
                <p className="font-mono text-sky-400">&gt; ENVIRONMENTAL_SCAN_COMPLETE</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ 
          scale: easterEgg === 'minimize' ? 0.4 : 1,
          rotateX: easterEgg === 'minimize' ? 45 : 0,
          opacity: easterEgg === 'minimize' ? 0.5 : 1
        }}
        style={{ opacity }}
        className="relative w-full max-w-7xl mx-auto transition-all duration-700"
      >
        <div className="metallic-border rounded-[2rem] md:rounded-[2.5rem]">
          <div className="browser-frame rounded-[1.8rem] md:rounded-[2.3rem] overflow-hidden noise">
            <div className="relative min-h-[85vh] md:min-h-[90vh] p-6 md:p-10 flex flex-col">
              
              <Scene />
              
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-20 flex items-center justify-between mb-auto"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    onClick={() => triggerEasterEgg('logo')}
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 cursor-pointer"
                  />
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      className="hidden md:block px-4 py-1.5 text-xs font-medium text-white/70 hover:text-white rounded-full transition-colors"
                      data-testid={`link-nav-${item.toLowerCase()}`}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { color: 'bg-red-500', type: 'close' },
                    { color: 'bg-yellow-500', type: 'minimize' },
                    { color: 'bg-green-500', type: 'maximize' },
                    { color: 'bg-blue-500', type: 'info' }
                  ].map((btn, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      onClick={() => triggerEasterEgg(btn.type)}
                      whileHover={{ 
                        scale: 1.2, 
                        filter: 'brightness(1.2)',
                        boxShadow: '0 0 15px rgba(255,255,255,0.3)'
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${btn.color} cursor-pointer transition-all duration-300 relative group`}
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 rounded-full bg-white/20 animate-pulse"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.nav>

              <motion.div
                style={{ y }}
                className="relative z-10 flex-1 flex flex-col justify-center py-12 md:py-20"
              >
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="overflow-hidden mb-8"
                  >
                    <motion.h1
                      className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
                      data-testid="text-hero-title"
                    >
                      <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="block text-white"
                      >
                        <span className="inline-block px-6 py-2 bg-white/90 text-[#141E30] rounded-full">
                          Creative
                        </span>
                      </motion.span>
                      
                      <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.75, ease: [0.76, 0, 0.24, 1] }}
                        className="block mt-2"
                      >
                        <span className="inline-block px-6 py-2 bg-white/80 text-[#141E30] rounded-full mr-2">
                          Developer
                        </span>
                        <span className="inline-block px-4 py-2 bg-white/60 text-[#141E30] rounded-full text-4xl md:text-5xl">
                          &
                        </span>
                      </motion.span>
                      
                      <motion.span
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
                        className="block mt-2"
                      >
                        <span className="inline-block px-6 py-2 bg-white/70 text-[#141E30] rounded-full">
                          Designer
                        </span>
                      </motion.span>
                    </motion.h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-3 h-3 rounded-full bg-sky-400"
                    />
                    <motion.span
                      className="text-sm md:text-base text-white/60 font-mono"
                      data-testid="text-hero-tagline"
                    >
                      Available for freelance
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              <div className="relative z-20 flex items-end justify-between">
                <div className="flex flex-col gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex gap-4 mb-2"
                  >
                    {[
                      { icon: Github, href: 'https://github.com', label: 'GitHub' },
                      { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                      { icon: Twitter, href: 'https://x.com', label: 'Twitter' }
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <social.icon size={18} />
                      </motion.a>
                    ))}
                  </motion.div>
                  <motion.a
                    href="#about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 px-5 py-2.5 glass rounded-full group w-fit"
                    data-testid="button-scroll-explore"
                  >
                    <span className="text-sm font-medium text-white/80">Explore</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.a>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="glass-strong p-5 rounded-2xl max-w-xs"
                >
                  <div className="space-y-2">
                    {['Full-stack Development', 'UI/UX Design', '3D & Motion Graphics'].map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 1.4 + i * 0.1 }}
                        className="h-2 bg-white/20 rounded-full overflow-hidden"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${90 - i * 10}%` }}
                          transition={{ duration: 1, delay: 1.5 + i * 0.15 }}
                          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-white/50 mt-3 font-mono">Core Expertise</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
              >
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="scroll-indicator text-[10px] font-mono text-white/40 tracking-widest"
                >
                  SCROLL
                </motion.span>
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}