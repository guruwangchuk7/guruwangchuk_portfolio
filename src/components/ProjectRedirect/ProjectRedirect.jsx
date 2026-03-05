import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import './ProjectRedirect.css';

gsap.registerPlugin(CustomEase);

const ProjectRedirect = ({ project, onBack }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        if (!project) return;

        const ctx = gsap.context(() => {
            CustomEase.create("mainEase", "0.76, 0, 0.24, 1");

            const tl = gsap.timeline({
                defaults: { ease: "mainEase", duration: 1.2 }
            });

            // Entry Animation
            tl.fromTo(containerRef.current,
                { clipPath: "inset(100% 0 0 0)" },
                { clipPath: "inset(0% 0 0 0)", duration: 1 }
            )
                .fromTo(bgRef.current,
                    { scale: 1.2, filter: "brightness(0)" },
                    { scale: 1, filter: "brightness(0.4)", duration: 2 },
                    "-=0.5"
                )
                .from(".redirect-title span", {
                    y: 100,
                    rotate: 5,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 1
                }, "-=1.5")
                .from(".redirect-meta > *", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8
                }, "-=0.8")
                .from(".redirect-status", {
                    width: 0,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.inOut"
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, [project]);

    if (!project) return null;

    // Split title for animation
    const titleChars = project.title.split("");

    return (
        <div className="project-redirect-overlay" ref={containerRef}>
            <div className="redirect-bg" ref={bgRef} style={{ backgroundImage: `url(${project.bg})` }}></div>

            <div className="redirect-content" ref={contentRef}>
                <button className="back-button" onClick={onBack}>
                    <ArrowLeft size={20} />
                    <span>BACK TO WORK</span>
                </button>

                <div className="redirect-center">
                    <div className="redirect-idx">0{project.id}</div>
                    <h1 className="redirect-title">
                        {titleChars.map((char, i) => (
                            <span key={i} style={{ display: 'inline-block' }}>{char === " " ? "\u00A0" : char}</span>
                        ))}
                    </h1>
                    <div className="redirect-meta">
                        <span className="tech-stack">{project.tech}</span>
                        <div className="status-container">
                            <div className="redirect-status"></div>
                            <span className="status-text">INITIALIZING SECURE GATEWAY...</span>
                        </div>
                    </div>
                </div>

                <div className="redirect-footer">
                    <div className="footer-item">
                        <span className="label">PREPARING</span>
                        <span className="value">DIGITAL EXPERIENCE</span>
                    </div>
                    <div className="footer-item">
                        <span className="label">LOCATION</span>
                        <span className="value">CLOUD ENGINE</span>
                    </div>
                    <div className="redirect-action">
                        <span className="action-text">OPENING PROJECT</span>
                        <ExternalLink size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectRedirect;
