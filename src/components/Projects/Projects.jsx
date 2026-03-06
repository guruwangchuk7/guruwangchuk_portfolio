import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(CustomEase);

import certImg from '../../assets/project-photos/blockchain project.png';
import civicImg from '../../assets/project-photos/civic.png';
import saidpieceImg from '../../assets/project-photos/saidpiece project.png';
import drukImg from '../../assets/project-photos/druk.png';

export const projectsData = [
    {
        id: 1,
        title: "Certificate System",
        tech: "Blockchain / Solidity",
        bg: certImg,
        role: "Blockchain Developer",
        duration: "16 Weeks / 2024",
        vision: "Developing a tamper-proof verification ecosystem for academic institutions using decentralized ledger technology to eliminate certification fraud.",
        execution: [
            "Architected a secure verification workflow on the blockchain to ensure data transparency and immutable record keeping.",
            "Engineered a high-performance React frontend for seamless certificate issuance and real-time public validation.",
            "Implemented smart contract protocols to automate the verification process with maximum efficiency."
        ]
    },
    {
        id: 2,
        title: "CivicPulse",
        tech: "Next.js / GIS / Node",
        bg: civicImg,
        role: "Full Stack Lead",
        duration: "14 Weeks / 2024",
        vision: "A real-time civic engagement platform bridging the communication gap between citizens and local authorities via interactive mapping.",
        execution: [
            "Integrated advanced GIS mapping for real-time reporting of urban infrastructure issues like hazards and trash.",
            "Built a powerful administrative dashboard to track and manage complaint resolution workflows efficiently.",
            "Designed a responsive, mobile-first experience to empower citizens to engage with their local government on the go."
        ]
    },
    {
        id: 3,
        title: "Druk SmartPark",
        tech: "Python / AI / React",
        bg: drukImg,
        role: "Data & AI Engineer",
        duration: "Ongoing / 2025",
        vision: "Transforming urban mobility with AI-driven parking management, featuring real-time KPI tracking and predictive analytics.",
        execution: [
            "Implemented real-time monitoring for active parking sessions, revenue streams, and overall system health.",
            "Developed AI models for traffic density analysis and automated detection of parking violations.",
            "Engineered automated officer dispatching systems based on real-time violation triggers and zone performance."
        ]
    },
    {
        id: 4,
        title: "Saidpiece Portfolio",
        tech: "React / GSAP / Design",
        bg: saidpieceImg,
        role: "Team Lead • Full Stack",
        duration: "8 Weeks / 2025",
        vision: "Crafting a premium digital presence for an elite architectural firm, focusing on high-end visual storytelling and performance.",
        execution: [
            "Led the end-to-end development cycle as Project Lead, coordinating cross-functional tasks for timely delivery.",
            "Implemented sophisticated cinematic animations using GSAP and React to mirror the firm's architectural elegance.",
            "Optimized asset delivery and SEO strategies to ensure a global-reach presence for high-end architecture projects."
        ]
    }
];

const Projects = ({ onProjectSelect }) => {
    const containerRef = useRef(null);
    const activeImageRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            CustomEase.create("reveal", "0.76, 0, 0.24, 1");

            const rows = gsap.utils.toArray('.project-row');
            const imgContainer = activeImageRef.current;
            const imgElement = imgContainer.querySelector('img');

            const moveImageX = gsap.quickTo(imgContainer, "left", { duration: 0.6, ease: "power3" });
            const moveImageY = gsap.quickTo(imgContainer, "top", { duration: 0.6, ease: "power3" });

            const onMouseMove = (e) => {
                moveImageX(e.clientX);
                moveImageY(e.clientY);
            };

            window.addEventListener('mousemove', onMouseMove);

            rows.forEach((row, ix) => {
                row.addEventListener("mouseenter", () => {
                    imgElement.src = projectsData[ix].bg;
                    gsap.to(imgContainer, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: "reveal"
                    });

                    gsap.to(row.querySelector('.proj-title-text'), {
                        x: 40,
                        color: "#F4F4F4",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                row.addEventListener("mouseleave", () => {
                    gsap.to(imgContainer, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.6,
                        ease: "reveal"
                    });

                    gsap.to(row.querySelector('.proj-title-text'), {
                        x: 0,
                        color: "rgba(244, 244, 244, 0.4)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
            });

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
            };
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="projects-section-v2" ref={containerRef} id="projects">
            <div className="section-header">
                <span className="section-number">02</span>
                <h2 className="section-title">SELECTED WORK</h2>
            </div>

            <div className="project-list-container">
                {projectsData.map((proj, i) => (
                    <div
                        key={i}
                        className="project-row"
                        onClick={() => onProjectSelect(proj)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="proj-meta">
                            <span className="proj-idx">0{proj.id}</span>
                        </div>
                        <div className="proj-title">
                            <h3 className="proj-title-text">{proj.title}</h3>
                        </div>
                        <div className="proj-tech-box">
                            {proj.tech}
                        </div>
                        <div className="proj-icon">
                            <ArrowUpRight strokeWidth={1} size={40} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="cursor-follower-img" ref={activeImageRef}>
                <img src="" alt="" role="presentation" />
            </div>
        </section>
    );
};

export default Projects;
