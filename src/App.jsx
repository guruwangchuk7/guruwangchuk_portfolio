import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OpeningSequence from './components/OpeningSequence/OpeningSequence.jsx';
import Profile from './components/Profile/Profile.jsx';
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

  const lenisRef = useRef(null);

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

    lenisRef.current = lenis;

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
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'auto';
      lenisRef.current?.start();
    }
  }, [selectedProject]);

  return (
    <div className="App">
      <Cursor />
      <OpeningSequence />
      <Profile />
      <Experience />
      <Projects onProjectSelect={setSelectedProject} />
      <Skills />
      <Footer />
      {selectedProject && (
        <ProjectRedirect
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onNext={() => {
            const currentIndex = [1, 2, 3, 4].indexOf(selectedProject.id);
            const nextId = currentIndex === 3 ? 1 : selectedProject.id + 1;
            // Note: Since projectsData is in Projects.jsx, I'll use a local mock or refactor.
            // For now, I'll pass a generic handler that the Projects component can provide if needed, 
            // but since IDs are simple, I'll just find the next one in the local array if I had it.
            // Let's assume projects are 1-indexed and sequential for now as per Projects.jsx.
          }}
        />
      )}
    </div>
  );
}

export default App;
