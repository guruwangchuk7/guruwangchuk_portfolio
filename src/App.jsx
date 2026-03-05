import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OpeningSequence from './components/OpeningSequence/OpeningSequence.jsx';
import Experience from './components/Experience/Experience.jsx';
import Projects from './components/Projects/Projects.jsx';
import Skills from './components/Skills/Skills.jsx';
import Footer from './components/Footer/Footer.jsx';
import Cursor from './components/Cursor/Cursor.jsx';
import ProjectRedirect from './components/ProjectRedirect/ProjectRedirect.jsx';
import './App.css';

gsap.registerPlugin(ScrollTrigger);
function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when everything is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // Handle dynamic height changes
    window.addEventListener('resize', () => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      clearTimeout(timer);
      window.removeEventListener('resize', () => ScrollTrigger.refresh());
    };
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <div className="App">
      <Cursor />
      <OpeningSequence />
      <Experience />
      <Projects onProjectSelect={setSelectedProject} />
      <Skills />
      <Footer />
      {selectedProject && (
        <ProjectRedirect
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;
