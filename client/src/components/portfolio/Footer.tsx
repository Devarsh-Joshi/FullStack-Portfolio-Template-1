import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com', label: 'Twitter' },
];

const footerLinks = ['Home', 'About', 'Work', 'Skills', 'Contact'];

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-sky-400 to-blue-600" />
              <span className="font-serif text-xl font-bold text-white">Alex Chen</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs text-white/50 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Alex Chen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}