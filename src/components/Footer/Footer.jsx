import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".footer-big-text", {
                scrollTrigger: {
                    trigger: ".footer-section",
                    start: "top 90%",
                },
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });

            gsap.from(".footer-link-item", {
                scrollTrigger: {
                    trigger: ".footer-links",
                    start: "top 95%",
                },
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-section" ref={containerRef} id="footer">
            <div className="section-container">
                <div className="footer-content">
                    <p className="footer-sub">Let's build something beautiful</p>
                    <h2 className="footer-big-text">
                        <a href="mailto:guruwangchuk1234@gmail.com">Get in touch</a>
                    </h2>
                </div>

                <div className="footer-bottom">
                    <div className="footer-links">
                        <a href="https://github.com/guruwangchuk7" target="_blank" rel="noreferrer" className="footer-link-item">
                            GitHub <ArrowUpRight size={18} />
                        </a>
                        <a href="http://lnkd.in/dw3Xf4Q6" target="_blank" rel="noreferrer" className="footer-link-item">
                            LinkedIn <ArrowUpRight size={18} />
                        </a>
                        <a href="mailto:guruwangchuk1234@gmail.com" className="footer-link-item">
                            Email <ArrowUpRight size={18} />
                        </a>
                    </div>

                    <div className="footer-meta footer-link-item" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                        Local Time — Chandigarh, India <br /> Back to Top ↑
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
