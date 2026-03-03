import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        company: "Saidpiece Architecture",
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
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            }

            const items = gsap.utils.toArray('.exp-item');
            items.forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: i * 0.05
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
