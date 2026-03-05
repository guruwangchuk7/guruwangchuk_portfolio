import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(CustomEase);

import certImg from '../../assets/project-photos/blockchain project.png';
import civicImg from '../../assets/project-photos/civic.png';
import saidpieceImg from '../../assets/project-photos/saidpiece project.png';

const projectsData = [
    {
        id: 1,
        title: "Certificate Validation",
        tech: "Blockchain / React",
        bg: certImg
    },
    {
        id: 2,
        title: "Civic Sense",
        tech: "Next.js / GIS",
        bg: civicImg
    },
    {
        id: 3,
        title: "Druk SmartPark",
        tech: "Python / AI",
        bg: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Saidpiece website",
        tech: "React / GSAP",
        bg: saidpieceImg
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
