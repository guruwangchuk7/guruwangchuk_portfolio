import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, Server, Database, Cpu } from 'lucide-react';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const containerRef = useRef(null);

    const arsenalCategories = [
        {
            id: 'frontend',
            title: 'Frontend Master',
            icon: <Layout className="cat-icon" />,
            skills: ['React', 'Next.js', 'Javascript', 'HTML/CSS'],
            description: 'Crafting responsive, high-performance user interfaces with modern React ecosystems.'
        },
        {
            id: 'backend',
            title: 'Backend Architecture',
            icon: <Server className="cat-icon" />,
            skills: ['Node.js', 'PHP', 'Laravel', 'Python'],
            description: 'Building robust APIs and scalable server-side systems with a focus on performance.'
        },
        {
            id: 'databases',
            title: 'Systems & Data',
            icon: <Database className="cat-icon" />,
            skills: ['MySQL', 'Docker', 'Apache'],
            description: 'Managing data integrity and containerized environments for seamless deployment.'
        },
        {
            id: 'web3',
            title: 'Web3 / Low-Level',
            icon: <Cpu className="cat-icon" />,
            skills: ['Solidity', 'C/C++', 'Scaffold Eth2'],
            description: 'Exploring the frontier of decentralized finance and high-performance systems.'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mainEase = "expo.out";

            // Target Each Content Block
            const blocks = gsap.utils.toArray('.content-block');
            
            blocks.forEach((block) => {
                const header = block.querySelector('.section-header');
                const grid = block.querySelector('.arsenal-grid, .education-grid');
                const cards = block.querySelectorAll('.arsenal-card, .edu-card');

                if (header) {
                    gsap.from(header, {
                        y: 30, // Reduced for a more subtle, high-end slide
                        duration: 1,
                        ease: mainEase,
                        scrollTrigger: {
                            trigger: header,
                            start: "top bottom-=50",
                            toggleActions: "play none none none"
                        }
                    });
                }

                if (cards.length > 0 && grid) {
                    gsap.from(cards, {
                        y: 20,
                        stagger: 0.08, // Snappier stagger
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: grid,
                            start: "top bottom-=80",
                            toggleActions: "play none none none"
                        }
                    });
                }
            });

            // Ensure ScrollTrigger refreshes
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="skills-section-v5" ref={containerRef} id="skills">
            <div className="section-container">

                {/* ARSENAL SECTION */}
                <div className="content-block">
                    <div className="section-header">
                        <span className="section-number">03</span>
                        <h2 className="section-title">Technical Arsenal</h2>
                        <p className="section-subtitle">Multi-disciplinary skillset from core low-level bits to high-level reactive interfaces.</p>
                    </div>
                    
                    <div className="arsenal-grid">
                        {arsenalCategories.map((category) => (
                            <div key={category.id} className={`arsenal-card ${category.id}`}>
                                <div className="card-top">
                                    <div className="icon-wrapper">
                                        {category.icon}
                                    </div>
                                    <h3 className="card-title">{category.title}</h3>
                                </div>
                                <div className="card-body">
                                    <p className="card-desc">{category.description}</p>
                                    <div className="skill-tags">
                                        {category.skills.map((skill, idx) => (
                                            <span key={idx} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-corner-accent"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ACADEMIC & CAREER SECTION */}
                <div className="content-block">
                    <div className="section-header">
                        <span className="section-number">04</span>
                        <h2 className="section-title">Academic & Career</h2>
                        <p className="section-subtitle">A synthesis of academic rigor and high-stakes professional engineering.</p>
                    </div>
                    
                    <div className="education-grid">
                        <div className="edu-card career-highlight">
                            <div className="edu-header">
                                <span className="edu-period">2025 - Present</span>
                                <h3>Saidpiece Architecture</h3>
                            </div>
                            <p className="edu-main">Full Stack Engineer • Team Lead</p>
                            <p className="edu-sub">Leading end-to-end development and coordinating tasks for high-end architecture projects.</p>
                        </div>

                        <div className="edu-card">
                            <div className="edu-header">
                                <span className="edu-period">2023 - 2026</span>
                                <h3>Chandigarh University</h3>
                            </div>
                            <p className="edu-main">BCA Full Stack • GPA: 7.85/10</p>
                            <p className="edu-sub">Specializing in Full Stack Dev, Software Engineering, and Blockchain.</p>
                        </div>

                        <div className="edu-card achievements-card">
                            <div className="edu-header">
                                <h3>Accolades</h3>
                            </div>
                            <div className="achievements-list">
                                <div className="achievement">
                                    <span className="ach-label">Honors</span>
                                    <p>Best Student Award, Best Scout Award, Troop Leader.</p>
                                </div>
                                <div className="achievement">
                                    <span className="ach-label">Hackathons</span>
                                    <p>GovTech (Bhutan), Zero to One (India), CivicPulse.</p>
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
