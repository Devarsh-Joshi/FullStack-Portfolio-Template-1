import { motion } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function MarqueeText({ 
  text, 
  direction = 'left', 
  speed = 20,
  className = '' 
}: MarqueeTextProps) {
  const items = Array(10).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="flex items-center mx-4"
          >
            <span className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-transparent"
              style={{
                WebkitTextStroke: '1px rgba(139, 92, 246, 0.3)',
              }}
            >
              {item}
            </span>
            <span className="mx-8 w-4 h-4 rounded-full bg-accent animate-pulse" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}