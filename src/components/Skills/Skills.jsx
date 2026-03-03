import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TerminalSquare } from 'lucide-react';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillsList = [
    'React', 'Next.js', 'Node.js', 'Javascript',
    'Python', 'C/C++', 'Solidity', 'HTML/CSS',
    'PHP', 'Laravel', 'MySQL', 'Docker',
    'Apache', 'Scaffold Eth2'
];

const Skills = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".skill-pill", {
                scrollTrigger: {
                    trigger: ".skills-wrapper",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)"
            });

            gsap.from(".edu-card", {
                scrollTrigger: {
                    trigger: ".edu-grid",
                    start: "top 85%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="skills-section" ref={containerRef} id="skills">
            <div className="section-container split-layout">

                {/* Left Side: Skills */}
                <div className="skills-half">
                    <div className="sk-header">
                        <TerminalSquare size={32} strokeWidth={1.5} />
                        <h2>Technical Arsenal</h2>
                    </div>
                    <div className="skills-wrapper">
                        {skillsList.map((skill, index) => (
                            <span key={index} className="skill-pill">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Side: Education & Achievements */}
                <div className="edu-half">
                    <h2 className="edu-title">Education & Accolades</h2>
                    <div className="edu-grid">
                        <div className="edu-card">
                            <span className="edu-date">2023 - 2026</span>
                            <h4>Chandigarh University</h4>
                            <p className="edu-role">BCA Full Stack • GPA: 7.85/10</p>
                            <p className="edu-desc">Full Stack Dev, Cybersecurity, Blockchain.</p>
                        </div>
                        <div className="edu-card">
                            <span className="edu-date">2009 - 2023</span>
                            <h4>Peljorling HSS</h4>
                            <p className="edu-role">Science Student • Samtse, Bhutan</p>
                            <p className="edu-desc">Best Student & Scout Award. Troop Leader.</p>
                        </div>
                        <div className="edu-card highlight-card">
                            <h4>Achievements</h4>
                            <p className="edu-desc">
                                <strong>Hackathons:</strong> GovTech (Bhutan), Zero to One (India).
                            </p>
                            <p className="edu-desc">
                                <strong>Certifications:</strong> Coursera & Multiple Hackathon Wins.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
