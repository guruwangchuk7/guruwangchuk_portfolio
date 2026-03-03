import React, { useEffect } from 'react';
import Lenis from 'lenis';
import OpeningSequence from './components/OpeningSequence/OpeningSequence.jsx';
import Experience from './components/Experience/Experience.jsx';
import Projects from './components/Projects/Projects.jsx';
import Skills from './components/Skills/Skills.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#1A1A1A' }}>
      <OpeningSequence />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;
