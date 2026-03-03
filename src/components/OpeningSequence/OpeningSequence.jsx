import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import PropTypes from 'prop-types';
import './OpeningSequence.css';

gsap.registerPlugin(CustomEase);

const NameContent = ({ layerClass }) => (
    <div className={`loader-layer ${layerClass}`}>
        <div className="name-container">
            <div className="first-name">
                G<span className="hidden-letters">uru</span>
            </div>
            <div className="last-name">
                W<span className="hidden-letters">angchuk</span>
                <span className="asterisk">*</span>
            </div>
        </div>
    </div>
);

NameContent.propTypes = {
    layerClass: PropTypes.string.isRequired,
};

const OpeningSequence = () => {
    const containerRef = useRef(null);
    const mainContentRef = useRef(null);
    const selectedCasesRef = useRef(null);
    const imageRevealRef = useRef(null);
    const contentSectionsRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            CustomEase.create("mainEase", "0.76, 0, 0.24, 1");

            const tl = gsap.timeline({
                defaults: { ease: "mainEase", duration: 1.5 }
            });

            // Initial state
            gsap.set(".hidden-letters", { width: 0, opacity: 0 });
            gsap.set(".light-layer", { clipPath: "inset(100% 0 0 0)" });
            gsap.set(".dark-layer .name-container", { y: 20, opacity: 0 });
            gsap.set(".resume-section", { opacity: 0, y: 30 });

            // Start animation
            tl.to(".dark-layer .name-container", {
                y: 0,
                opacity: 1,
                duration: 1.2,
            })
                .to(".light-layer", {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 2,
                    ease: "mainEase"
                }, "+=0.3")
                .to(".hidden-letters", {
                    width: "auto",
                    opacity: 1,
                    duration: 1.5,
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    },
                    ease: "power4.inOut"
                }, "-=1.2")
                // Shift name up and scale down
                .to(".name-container", {
                    scale: 0.4,
                    y: "-35vh",
                    x: "-30vw",
                    duration: 2,
                    ease: "mainEase"
                }, "+=0.4")
                // Reveal main content background
                .to(mainContentRef.current, {
                    opacity: 1,
                    duration: 1,
                    pointerEvents: "auto"
                }, "-=1.8")
                // Stagger in nav links
                .from(".nav-bar > *", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1
                }, "-=1.2")
                // Reveal resume content
                .to(".resume-section", {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=1")
                // Reveal image reveal container
                .to(imageRevealRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1.5
                }, "-=1.5")
                .to(".placeholder-image", {
                    scale: 1,
                    duration: 2.5,
                    ease: "power2.out"
                }, "-=1.5");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="hero-container" ref={containerRef}>
            {/* Background Content - The Resume */}
            <div className="main-content" ref={mainContentRef}>
                <nav className="nav-bar">
                    <div className="logo">G.W*</div>
                    <div className="nav-links">
                        <a href="mailto:guruwangchuk1234@gmail.com">Email</a>
                        <a href="https://github.com/guruwangchuk7" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="http://lnkd.in/dw3Xf4Q6" target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </nav>

                <div className="resume-grid">
                    <div className="resume-left">
                        <div className="resume-section">
                            <h3>Experience</h3>
                            <div className="entry">
                                <h4>Saidpiece Architecture / Full Stack Engineer</h4>
                                <p className="date">May 2025 - Current • Thimphu, Bhutan</p>
                                <p className="desc">Led end-to-end development as Team Lead. Designed responsive pages and optimized performance.</p>
                            </div>
                            <div className="entry">
                                <h4>Blockvocates / FrontEnd Engineer</h4>
                                <p className="date">July 2025 - 2025 • Dubai, UAE</p>
                                <p className="desc">Developed modern UIs using React. Implemented client-based features and fixed UI bugs.</p>
                            </div>
                        </div>

                        <div className="resume-section">
                            <h3>Projects</h3>
                            <div className="entry">
                                <h4>CivicSense (CivicPulse)</h4>
                                <p className="desc">Real-time civic engagement platform mapping infrastructure issues for local authorities.</p>
                            </div>
                            <div className="entry">
                                <h4>Druk SmartPark</h4>
                                <p className="desc">AI-driven KPI tracking and violation detection for smart parking operations.</p>
                            </div>
                        </div>
                    </div>

                    <div className="resume-right">
                        <div className="resume-section">
                            <h3>Education</h3>
                            <div className="entry">
                                <h4>Chandigarh University</h4>
                                <p className="date">2023 - 2026 • BCA Full Stack</p>
                                <p className="desc">GPA: 7.85/10. Major in Full Stack Development.</p>
                            </div>
                        </div>

                        <div className="resume-section">
                            <h3>Skills</h3>
                            <div className="skills-tag-container">
                                {['React', 'Next.js', 'Node.js', 'Solidity', 'Blockchain', 'Python', 'Tailwind', 'GSAP', 'Docker', 'MySQL'].map(skill => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="image-reveal-container resume-visual" ref={imageRevealRef}>
                            <div className="placeholder-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop)' }}></div>
                        </div>
                    </div>
                </div>

                <div className="hero-footer">
                    <div className="selected-cases" ref={selectedCasesRef}>
                        Bhutanese Developer<br />based in Chandigarh
                    </div>
                </div>
            </div>

            {/* Layer 1: Dark */}
            <NameContent layerClass="dark-layer" />

            {/* Layer 2: Light (Clipped) */}
            <NameContent layerClass="light-layer" />
        </div>
    );
};

export default OpeningSequence;
