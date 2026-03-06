import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Silk from '../Silk/Silk.jsx';
import './ProjectRedirect.css';

gsap.registerPlugin(CustomEase, ScrollTrigger);

const ProjectRedirect = ({ project, onBack }) => {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const detailsRef = useRef(null);

    useEffect(() => {
        if (!project) return;

        const scrollContainer = containerRef.current.querySelector('.project-scroll-container');

        // Initialize local smooth scroll for Case Study
        const lenis = new Lenis({
            wrapper: scrollContainer,
            content: scrollContainer.querySelector('.project-details-container').parentNode,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            infinite: false,
        });

        const ctx = gsap.context(() => {
            CustomEase.create("mainEase", "0.76, 0, 0.24, 1");

            const tl = gsap.timeline({
                defaults: { ease: "mainEase", duration: 1.2 }
            });

            // Entry Animation
            tl.fromTo(containerRef.current,
                { clipPath: "inset(100% 0 0 0)" },
                { clipPath: "inset(0% 0 0 0)", duration: 1.2 }
            )
                .fromTo(bgRef.current,
                    { scale: 1.4, filter: "brightness(0)" },
                    { scale: 1, filter: "brightness(0.8)", duration: 2.5 },
                    "-=0.8"
                )
                .from(".redirect-title span", {
                    y: 120,
                    rotate: 10,
                    opacity: 0,
                    stagger: 0.04,
                    duration: 1.5,
                    ease: "power4.out"
                }, "-=1.8")
                .from(".redirect-meta > *", {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1
                }, "-=1.2")
                .from(".nav-elements", {
                    opacity: 0,
                    y: -20,
                    duration: 1
                }, "-=1")
                .from(".scroll-prompt", {
                    opacity: 0,
                    y: 20,
                    duration: 1
                }, "-=0.8");

            // Scroll animations for details
            const sections = gsap.utils.toArray('.detail-section');
            sections.forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        scroller: ".project-scroll-container",
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // Progress fill animation
            gsap.to(".progress-fill", {
                scrollTrigger: {
                    trigger: ".project-scroll-container",
                    scroller: ".project-scroll-container",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                },
                scaleX: 1,
                ease: "none"
            });

            // Image Parallax Reveal
            const images = gsap.utils.toArray('.highlight-frame img');
            images.forEach((img) => {
                gsap.fromTo(img,
                    { y: "15%", scale: 1.2 },
                    {
                        y: "-15%",
                        scale: 1,
                        scrollTrigger: {
                            trigger: img.parentNode,
                            scroller: ".project-scroll-container",
                            scrub: true,
                            start: "top bottom",
                            end: "bottom top"
                        }
                    }
                );
            });

            // Heading Splitting Reveal
            const headings = gsap.utils.toArray('.detail-heading');
            headings.forEach(h => {
                const text = h.innerText;
                h.innerHTML = text.split('').map(c => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('');

                gsap.from(h.querySelectorAll('span'), {
                    scrollTrigger: {
                        trigger: h,
                        scroller: ".project-scroll-container",
                        start: "top 90%",
                    },
                    y: 20,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            // Sync Lenis with ScrollTrigger
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, [project]);

    if (!project) return null;

    const titleChars = project.title.split("");

    return (
        <div className="project-redirect-overlay" ref={containerRef}>
            <div className="scroll-progress-bar">
                <div className="progress-fill"></div>
            </div>

            <div className="redirect-bg-wrapper" ref={bgRef}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={(project.id - 1) * 90} // Unique orientation for each project
                />
                <div className="bg-overlay-gradient"></div>
            </div>

            <div className="project-scroll-container" data-lenis-prevent>
                {/* Hero Section */}
                <section className="project-hero">
                    <div className="nav-elements">
                        <button className="back-button" onClick={onBack}>
                            <ArrowLeft size={18} />
                            <span>RETURN TO ARCHIVE</span>
                        </button>
                        <div className="project-year">{project.duration || "2024 / CASE STUDY"}</div>
                    </div>

                    <div className="hero-center">
                        <div className="redirect-idx">0{project.id}</div>
                        <h1 className="redirect-title">
                            {titleChars.map((char, i) => (
                                <span key={i} style={{ display: 'inline-block' }}>{char === " " ? "\u00A0" : char}</span>
                            ))}
                        </h1>
                        <div className="redirect-meta">
                            <span className="tech-stack">{project.tech}</span>
                            <div className="status-container">
                                <div className="redirect-status"></div>
                                <span className="status-text">SYSTEMS OPERATIONAL</span>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-prompt">
                        <div className="mouse-icon">
                            <div className="wheel"></div>
                        </div>
                        <span>SCROLL TO EXPLORE CASE STUDY</span>
                    </div>
                </section>

                {/* Content Sections */}
                <div className="project-details-container" ref={detailsRef}>
                    <section className="detail-section intro-section">
                        <div className="section-grid">
                            <div className="grid-left">
                                <h2 className="detail-heading">THE VISION</h2>
                            </div>
                            <div className="grid-right">
                                <p className="detail-description large">
                                    {project.vision || `Engineering a seamless integration between ${project.tech.split(' / ')[0]} and user-centric design principles. This project redefines how we interact with digital high-performance systems.`}
                                </p>
                                <div className="meta-stats">
                                    <div className="stat">
                                        <span className="stat-label">ROLE</span>
                                        <span className="stat-value">{project.role || "Lead Design Engineer"}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">DURATION</span>
                                        <span className="stat-value">{project.duration || "12 Weeks / Q1"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="detail-section image-highlight">
                        <div className="highlight-frame">
                            <img src={project.bg} alt="Project Highlight" />
                            <div className="frame-border"></div>
                        </div>
                    </section>

                    <section className="detail-section execution">
                        <div className="section-grid">
                            <div className="grid-left">
                                <h2 className="detail-heading">EXECUTION</h2>
                            </div>
                            <div className="grid-right">
                                <div className="process-list">
                                    {project.execution ? (
                                        project.execution.map((step, idx) => (
                                            <div key={idx} className="process-item">
                                                <h3>0{idx + 1} / {["ARCHITECTURE", "INTERACTION", "DEPLOYMENT", "SCALE", "FUTURE"][idx] || "DEVELOPMENT"}</h3>
                                                <p>{step}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="process-item">
                                                <h3>01 / ARCHITECTURE</h3>
                                                <p>Developed a robust foundation using {project.tech}, ensuring maximum scalability and fluid performance across all interaction points.</p>
                                            </div>
                                            <div className="process-item">
                                                <h3>02 / INTERACTION</h3>
                                                <p>Implemented sophisticated micro-interactions that provide tactile feedback, elevating the overall sensory experience of the application.</p>
                                            </div>
                                            <div className="process-item">
                                                <h3>03 / DEPLOYMENT</h3>
                                                <p>Leveraged edge computing and optimized asset delivery to maintain a consistent sub-second response time globally.</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="case-study-footer">
                        <div className="footer-line"></div>
                        <div className="footer-content">
                            <div className="footer-left">
                                <h3>INTERESTED IN THE WORK?</h3>
                                <p>Let's discuss how we can build something exceptional together.</p>
                            </div>
                            <button className="visit-site-btn">
                                <span>VISIT LIVE PROJECT</span>
                                <ExternalLink size={18} />
                            </button>
                        </div>

                        {/* Next Project Section */}
                        <div className="next-project-section" onClick={onBack}>
                            <div className="next-label">NEXT PROJECT</div>
                            <h2 className="next-title">CIVIC SENSE</h2>
                            <div className="next-line"></div>
                        </div>

                        <div className="copyright">© 2024 GURU WANGCHUK / PORTFOLIO v2.0</div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ProjectRedirect;
