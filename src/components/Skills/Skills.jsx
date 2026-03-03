import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const containerRef = useRef(null);

    const skillsList = [
        'React', 'Next.js', 'Node.js', 'Javascript',
        'Python', 'C/C++', 'Solidity', 'HTML/CSS',
        'PHP', 'Laravel', 'MySQL', 'Docker',
        'Apache', 'Scaffold Eth2'
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mainEase = "0.76, 0, 0.24, 1";

            // Reveal content blocks on scroll
            const blocks = gsap.utils.toArray('.content-block');
            blocks.forEach((block) => {
                const title = block.querySelector('.section-title h2');
                const grid = block.querySelector('.skills-grid, .education-grid');

                if (title) {
                    gsap.from(title, {
                        y: 80,
                        opacity: 0,
                        duration: 1.2,
                        ease: mainEase,
                        scrollTrigger: {
                            trigger: title,
                            start: "top 90%",
                        }
                    });
                }

                if (grid) {
                    const items = grid.querySelectorAll('.skill-block, .edu-card');
                    gsap.from(items, {
                        y: 40,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: grid,
                            start: "top 85%",
                        }
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="skills-section-v3" ref={containerRef} id="skills">
            <div className="section-container">

                {/* ARSENAL SECTION */}
                <div className="content-block">
                    <div className="section-header">
                        <span className="section-number">02</span>
                        <h2 className="section-title">Technical Arsenal</h2>
                    </div>
                    <div className="skills-grid">
                        {skillsList.map((skill, index) => (
                            <div key={index} className="skill-block">
                                <span className="skill-name">{skill}</span>
                                <div className="skill-line"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EDUCATION SECTION */}
                <div className="content-block">
                    <div className="section-header">
                        <span className="section-number">03</span>
                        <h2 className="section-title">Education & Accolades</h2>
                    </div>
                    <div className="education-grid">
                        <div className="edu-card">
                            <div className="edu-header">
                                <span className="edu-period">2023 - 2026</span>
                                <h3>Chandigarh University</h3>
                            </div>
                            <p className="edu-main">BCA Full Stack • GPA: 7.85/10</p>
                            <p className="edu-sub">Specializing in Full Stack Dev, Cybersecurity, Blockchain.</p>
                        </div>
                        <div className="edu-card">
                            <div className="edu-header">
                                <span className="edu-period">2009 - 2023</span>
                                <h3>Peljorling HSS</h3>
                            </div>
                            <p className="edu-main">Science Student</p>
                            <p className="edu-sub">Best Student & Scout Award. Served as Troop Leader.</p>
                        </div>
                        <div className="edu-card achievements-card">
                            <h3>Achievements</h3>
                            <div className="achievements-list">
                                <div className="achievement">
                                    <span className="ach-label">Hackathons</span>
                                    <p>GovTech (Bhutan), Zero to One (India)</p>
                                </div>
                                <div className="achievement">
                                    <span className="ach-label">Certifications</span>
                                    <p>Coursera & Multiple Hackathon Wins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
