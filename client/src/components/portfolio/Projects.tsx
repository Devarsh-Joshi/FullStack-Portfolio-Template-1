import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Nova Dashboard',
    description: 'Real-time analytics with AI-powered insights.',
    tags: ['React', 'D3.js', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'EcoTrack Mobile',
    description: 'Sustainability app with gamification.',
    tags: ['React Native', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Artisan Marketplace',
    description: 'E-commerce with 3D product previews.',
    tags: ['Next.js', 'Three.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="metallic-border rounded-2xl">
        <div className="browser-frame rounded-xl overflow-hidden">
          <div className="relative aspect-[4/3]">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141E30] via-transparent to-transparent" />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center bg-[#141E30]/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="glass p-4 rounded-full cursor-pointer"
              >
                <ArrowUpRight size={24} className="text-sky-400" />
              </motion.div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[10px] font-mono text-white/50">PROJECT 0{index + 1}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-xs text-white/60 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono glass rounded-full text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="text-xs font-mono text-white/50 tracking-wider">SELECTED WORK</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="font-serif text-4xl md:text-5xl font-bold text-white mb-12"
        >
          Featured <span className="text-gradient-light">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}