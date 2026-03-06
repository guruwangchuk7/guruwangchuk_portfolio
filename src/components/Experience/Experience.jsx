import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import govtechImg from '../../assets/myphoto/govtech.JPG';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        company: "Saidpiece architects",
        role: "Full Stack Engineer",
        date: "May 2025 - Current",
        location: "Thimphu, Bhutan",
        desc: "Led end-to-end development of the company website as Team Lead. Designed responsive, user-friendly pages and optimized performance."
    },
    {
        company: "Blockvocates",
        role: "FrontEnd Engineer",
        date: "July 2025 - 2025",
        location: "Dubai, UAE",
        desc: "Developed responsive modern user interfaces using React for client-based web applications. Fixed UI bugs and enhanced frontend performance."
    }
];

const Experience = () => {
    const containerRef = useRef(null);
    const photoRef     = useRef(null);
    const revealRef    = useRef(null);

    const now        = new Date();

    useEffect(() => {
        let ctx = gsap.context(() => {
            const header = containerRef.current.querySelector('.section-header');
            if (header) {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 90%",
                        toggleActions: "play none none none" // No reverse — prevents re-animation jank
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            const items = gsap.utils.toArray('.exp-item');
            // Set will-change before animating for GPU compositing
            gsap.set(items, { willChange: "transform, opacity" });

            items.forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                        toggleActions: "play none none none" // One-shot: play once, no reverse
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: i * 0.08,
                    onComplete: () => {
                        // Release will-change after animation to free GPU memory
                        gsap.set(item, { willChange: "auto" });
                    }
                });
            });

            /* ── Photo: cinematic clip-path wipe reveal ── */
            if (revealRef.current && photoRef.current) {
                gsap.set(revealRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
                gsap.set(photoRef.current,  { scale: 1.1 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 65%',
                        toggleActions: 'play none none none',
                    }
                });

                tl.to(revealRef.current, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.4,
                    ease: 'power4.inOut',
                }).to(photoRef.current, {
                    scale: 1,
                    duration: 1.6,
                    ease: 'power3.out',
                }, '<');

                /* Parallax drift while scrolling */
                gsap.to(photoRef.current, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end:   'bottom top',
                        scrub: 1.5,
                    },
                    yPercent: -10,
                    ease: 'none',
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="experience-section" ref={containerRef} id="experience">
            <div className="exp-row">

                {/* ── LEFT: existing layout — untouched ── */}
                <div className="exp-row-left">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="section-number">01</span>
                            <h2 className="section-title">Experience</h2>
                        </div>

                        <div className="exp-grid">
                            {experiences.map((exp, idx) => (
                                <div key={idx} className="exp-item">
                                    <div className="exp-top">
                                        <h3>{exp.company}</h3>
                                        <span className="exp-role">{exp.role}</span>
                                    </div>
                                    <div className="exp-meta">
                                        <span>{exp.date}</span>
                                        <span>{exp.location}</span>
                                    </div>
                                    <p>{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: cinematic photo panel ── */}
                <div className="exp-row-right">
                    <div className="exp-photo-reveal" ref={revealRef}>
                        <img
                            ref={photoRef}
                            src={govtechImg}
                            alt="Guru Wangchuk at GovTech"
                            className="exp-photo-img"
                        />
                        
                        <div className="exp-photo-overlay" />

                        <div className="exp-photo-badge">
                            <span>In Action</span>
                        </div>

                        <div className="exp-photo-badge">
                            <span>In Action</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Experience;