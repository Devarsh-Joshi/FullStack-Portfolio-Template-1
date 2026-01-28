import { useState } from 'react';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import CustomCursor from '@/components/portfolio/CustomCursor';
import Preloader from '@/components/portfolio/Preloader';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="relative min-h-screen">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}