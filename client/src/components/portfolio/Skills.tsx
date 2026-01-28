import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Three.js', level: 75 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'Figma', level: 85 },
    ],
  },
];

const technologies = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'Three.js',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'AWS', 'Tailwind',
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-4 md:px-8">
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
              <span className="text-xs font-mono text-white/50 tracking-wider">EXPERTISE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Skills & <span className="text-gradient-light">Technologies</span>
            </motion.h2>

            <div className="relative overflow-hidden py-6 mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1a2535] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1a2535] to-transparent z-10" />
              
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="flex gap-4 whitespace-nowrap"
              >
                {[...technologies, ...technologies].map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="px-4 py-2 text-sm font-medium glass rounded-full text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="group relative h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent rounded-3xl -z-10 blur-sm group-hover:from-sky-500/20 transition-all duration-500" />
                  
                  <div className="h-full border border-white/5 rounded-3xl p-8 bg-[#141E30]/40 backdrop-blur-xl relative overflow-hidden transition-all duration-500 group-hover:border-sky-400/20 group-hover:shadow-[inset_0_0_20px_rgba(125,211,252,0.1)]">
                    {/* Background Grid Accent */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-mono text-xl font-bold tracking-[0.2em] text-white/90 group-hover:text-sky-400 transition-colors">
                            {category.title.toUpperCase()}
                          </h3>
                          <div className="text-[10px] font-mono text-white/20 tracking-tighter">
                            SEC_0{categoryIndex + 1}
                          </div>
                        </div>

                        <div className="space-y-8">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skill.name} className="group/skill">
                              <div className="flex justify-between items-baseline mb-3">
                                <span className="text-xs font-mono uppercase tracking-widest text-white/50 group-hover/skill:text-sky-300 transition-colors">
                                  {skill.name}
                                </span>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={`w-1 h-3 rounded-full transition-all duration-500 ${
                                        i < Math.round(skill.level / 20) 
                                          ? 'bg-sky-400 shadow-[0_0_8px_rgba(125,211,252,0.5)]' 
                                          : 'bg-white/5'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="relative h-px w-full bg-white/5 overflow-hidden">
                                <motion.div
                                  initial={{ x: '-100%' }}
                                  whileInView={{ x: '0%' }}
                                  viewport={{ once: false }}
                                  transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-30"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Industrial Accent */}
                    <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center pt-6 border-t border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                      </div>
                      <span className="text-[8px] font-mono text-white/20 tracking-widest">
                        MODULE_LOADED
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}