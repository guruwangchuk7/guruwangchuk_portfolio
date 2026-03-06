import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="experience-section" ref={containerRef} id="experience">
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
        </section>
    );
};

export default Experience;
