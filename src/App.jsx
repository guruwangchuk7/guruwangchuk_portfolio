import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OpeningSequence from './components/OpeningSequence/OpeningSequence.jsx';
import Profile from './components/Profile/Profile.jsx';
import Experience from './components/Experience/Experience.jsx';
import Projects, { projectsData } from './components/Projects/Projects.jsx';
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
      <Skills onArsenalSelect={setSelectedProject}/>
      <Footer />
      {selectedProject && (() => {
        let nextProjectTitle = "";
        let onNextHandler = null;
        
        if (typeof selectedProject.id === 'number') {
          const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
          if (currentIndex !== -1) {
            const nextIndex = currentIndex === projectsData.length - 1 ? 0 : currentIndex + 1;
            const nextProject = projectsData[nextIndex];
            nextProjectTitle = nextProject.title.toUpperCase();
            onNextHandler = () => setSelectedProject(nextProject);
          }
        }

        return (
          <ProjectRedirect
            key={selectedProject.id}
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            onNext={onNextHandler}
            nextProjectTitle={nextProjectTitle}
          />
        );
      })()}
    </div>
  );
}

export default App;
