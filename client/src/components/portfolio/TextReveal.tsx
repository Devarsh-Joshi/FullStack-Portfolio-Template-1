import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <span className="relative mr-3 mt-2">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export function CharacterReveal({ text, className = '' }: TextRevealProps) {
  const characters = text.split('');

  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.03,
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function GlitchText({ text, className = '' }: TextRevealProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-accent"
        variants={{
          hover: {
            x: [0, -2, 2, -2, 0],
            opacity: [0, 1, 1, 1, 0],
          },
        }}
        transition={{ duration: 0.3 }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-pink-500"
        variants={{
          hover: {
            x: [0, 2, -2, 2, 0],
            opacity: [0, 1, 1, 1, 0],
          },
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.span>
  );
}