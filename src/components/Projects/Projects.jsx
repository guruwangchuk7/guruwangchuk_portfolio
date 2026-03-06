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
        tech: "Scaffold-ETH / Solidity / IPFS / MySQL",
        bg: certImg,
        role: "Full Stack DApp Developer",
        duration: "16 Weeks / 2024",
        vision: "A full-stack decentralized ecosystem for tamper-proof academic verification, utilizing SHA256 hashing and IPFS to ensure absolute document integrity.",
        execution: [
            "Architected a hybrid infrastructure combining decentralized IPFS storage with a MySQL metadata layer for high-performance student management.",
            "Implemented an integrity engine using SHA256 checksums to create immutable cryptographic signatures, making credential forgery mathematically impossible.",
            "Engineered a secure issuance workflow leveraging the Scaffold-ETH 2 framework and Pinata for reliable document pinning and real-time validation."
        ]
    },
    {
        id: 2,
        title: "CivicPulse",
        tech: "Next.js / Leaflet / MySQL / Supabase",
        bg: civicImg,
        role: "Full Stack Lead",
        duration: "14 Weeks / 2024",
        vision: "A cutting-edge civic engagement platform streamlining urban infrastructure reporting via a real-time, map-based interface and gamified community action.",
        execution: [
            "Architected a high-performance Next.js 14 application integrated with Leaflet.js for precision map-pinning, real-time reporting, and 'Civic Hero' gamification.",
            "Developed a robust administrative dashboard featuring a priority scoring engine and automated routing to optimize municipal resource allocation.",
            "Engineered a secure hybrid backend using MySQL for structured data and Supabase for authentication, storage, and real-time AI assistant logic."
        ]
    },
    {
        id: 3,
        title: "Druk SmartPark",
        tech: "Python / Django / Next.js / Flutter / AI",
        bg: drukImg,
        role: "Lead Developer & AI Engineer",
        duration: "Ongoing / 2025",
        vision: "A next-generation urban mobility platform for Thimphu Municipal, digitizing the end-to-end parking lifecycle through OCR, real-time data streaming, and predictive analytics.",
        execution: [
            "Architected a distributed ecosystem comprising a Django REST backend, a Next.js administrative dashboard, and a Flutter mobile app for field operations.",
            "Implemented OCR-powered license plate recognition and real-time KPI monitoring for live tracking of revenue, active sessions, and system health.",
            "Developed AI-driven insights for predictive traffic density optimization and automated violation detection with integrated officer dispatching."
        ]
    },
    {
        id: 4,
        title: "Saidpiece Architect",
        tech: "React 19 / GSAP / Supabase / Tailwind v4",
        bg: saidpieceImg,
        role: "Lead Full Stack Developer",
        duration: "8 Weeks / 2025",
        vision: "A premium, immersive web application for a Bhutan-based architecture studio, combining high-end visual storytelling with e-commerce, blogging, and a robust administrative backend.",
        execution: [
            "Architected a high-performance React 19 ecosystem with Vite, integrating GSAP and Framer Motion for immersive scroll-triggered reveals and magnetic cursor interactions.",
            "Developed a comprehensive e-commerce store with persistent cart management and a secure administrative dashboard for real-time project and content updates.",
            "Implemented a robust backend-as-a-service using Supabase for PostgreSQL database management, secure authentication, and high-resolution image storage."
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
