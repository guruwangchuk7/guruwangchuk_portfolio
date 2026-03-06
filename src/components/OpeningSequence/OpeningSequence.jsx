import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import './OpeningSequence.css';

gsap.registerPlugin(CustomEase, ScrollTrigger);

const NameContent = ({ layerClass }) => (
    <div className={`loader-layer ${layerClass}`}>
        <div className="name-wrapper-relative">
            <div className="name-container">
                <div className="first-name">
                    G<span className="hidden-letters">uru</span>
                </div>
                <div className="last-name">
                    W<span className="hidden-letters">angchuk</span>
                </div>
            </div>
        </div>
    </div>
);

NameContent.propTypes = {
    layerClass: PropTypes.string.isRequired,
};

const OpeningSequence = () => {
    const containerRef = useRef(null);
    const mainContentRef = useRef(null);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const offset = 0; // Adjust if you have a sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 768px)",
            isDesktop: "(min-width: 769px)"
        }, (context) => {
            const { isMobile } = context.conditions;

            CustomEase.create("mainEase", "0.76, 0, 0.24, 1");

            const tl = gsap.timeline({
                defaults: { ease: "mainEase", duration: 1.5 }
            });

            // Initial state
            gsap.set(".hidden-letters", { width: 0, opacity: 0 });
            gsap.set(".light-layer", { clipPath: "inset(100% 0 0 0)" });
            gsap.set(".name-wrapper-relative", {
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                transformOrigin: "left top"
            });
            gsap.set(".dark-layer .name-wrapper-relative", { yPercent: -40, opacity: 0 });

            // Start animation
            tl.to(".dark-layer .name-wrapper-relative", {
                yPercent: -50,
                opacity: 1,
                duration: 1.2,
            })
                .to(".light-layer", {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 2,
                    ease: "mainEase"
                }, "+=0.3")
                .to(".hidden-letters", {
                    width: "auto",
                    opacity: 1,
                    duration: 1.5,
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    },
                    ease: "power4.inOut"
                }, "-=1.2")
                // Shift name up and scale down
                .to(".name-wrapper-relative", {
                    scale: isMobile ? 0.38 : 0.35, // Adjust scale for stacked vs horizontal
                    top: isMobile ? "10vh" : "14vh", // Higher top on mobile to avoid nav collision
                    left: "5vw",
                    xPercent: 0,
                    yPercent: 0,
                    duration: 2,
                    ease: "mainEase"
                }, "+=0.6")
                // Reveal main content background
                .to(mainContentRef.current, {
                    opacity: 1,
                    duration: 1,
                    pointerEvents: "auto"
                }, "-=1.8")
                // Stagger in nav
                .from(".nav-bar > *", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1
                }, "-=1.2")
                // Hero elements
                .from(".hero-introduction > *", {
                    y: 40,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1.5,
                    ease: "power3.out",
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                }, "-=1.4")
        }, containerRef);

        return () => mm.revert();
    }, []);

    return (
        <section className="hero-container" ref={containerRef}>
            <div className="main-content" ref={mainContentRef}>
                <nav className="nav-bar">
                    <div className="header-role" style={{ opacity: 0 }}>FULL STACK ENGINEER</div>
                    <div className="nav-links">
                        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
                        <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a>
                        <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Work</a>
                        <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Stack</a>
                        <a href="#footer" onClick={(e) => handleNavClick(e, '#footer')}>Contact</a>
                    </div>
                </nav>

                <div className="hero-introduction">
                    <h1>Building scalable and impactful digital solutions.</h1>
                    <p>
                        Specializing in high-performance React ecosystems and robust full-stack architectures. 
                        Currently leading end-to-end development at Saidpiece Architecture and 
                        integrating advanced solutions in Blockchain and AI. Based in Thimphu, Bhutan.
                    </p>

                    <div className="scroll-indicator">
                        <span className="scroll-text">SCROLL TO EXPLORE</span>
                        <div className="scroll-line"></div>
                    </div>
                </div>
            </div>

            {/* Layer 1: Dark */}
            <NameContent layerClass="dark-layer" />

            {/* Layer 2: Light (Clipped) */}
            <NameContent layerClass="light-layer" />
        </section>
    );
};

export default OpeningSequence;
