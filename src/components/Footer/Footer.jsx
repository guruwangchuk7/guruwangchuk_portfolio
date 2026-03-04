import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Globe } from './Globe';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const containerRef = useRef(null);
    const [time, setTime] = useState('');

    useEffect(() => {
        // Live Clock
        const updateClock = () => {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Thimphu',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setTime(new Intl.DateTimeFormat('en-US', options).format(now));
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        let ctx = gsap.context(() => {
            // Big text reveal
            gsap.from(".footer-big-text span", {
                scrollTrigger: {
                    trigger: ".footer-section",
                    start: "top 70%",
                },
                y: "100%",
                stagger: 0.1,
                duration: 1.5,
                ease: "power4.out"
            });

            // Sub text and links reveal
            gsap.from(".footer-reveal", {
                scrollTrigger: {
                    trigger: ".footer-bottom",
                    start: "top 95%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power3.out"
            });
        }, containerRef);

        return () => {
            ctx.revert();
            clearInterval(interval);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-section" ref={containerRef} id="footer">
            <div className="footer-container">
                <div className="footer-top">
                    {/* Background Globe Container */}
                    <div className="globe-container-wrapper">
                        <Globe className="footer-globe" />
                        <div className="globe-gradient-overlay"></div>
                    </div>
                    {/* Foreground Content */}
                    <div className="footer-top-content">
                        <p className="footer-sub footer-reveal">Let's build something beautiful</p>
                        <div className="footer-big-text-wrapper">
                            <h2 className="footer-big-text">
                                <a href="mailto:guruwangchuk1234@gmail.com">
                                    <span className="text-line">GET IN</span><br />
                                    <span className="text-line">TOUCH</span>
                                </a>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="footer-grid footer-reveal">
                    <div className="footer-col">
                        <span className="col-label">Socials</span>
                        <div className="col-links">
                            <a href="https://github.com/guruwangchuk7" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
                            <a href="http://lnkd.in/dw3Xf4Q6" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <span className="col-label">Contact</span>
                        <div className="col-links">
                            <a href="mailto:guruwangchuk1234@gmail.com">Email <ArrowUpRight size={16} /></a>
                            <a href="tel:17738579">Call <ArrowUpRight size={16} /></a>
                        </div>
                    </div>

                    <div className="footer-col time-col">
                        <span className="col-label">Local Time</span>
                        <div className="local-time">{time} — Bhutan</div>
                    </div>
                </div>

                <div className="footer-credits footer-reveal">
                    <div className="credits-left">
                        © 2026 GURU WANGCHUK. ALL RIGHTS RESERVED.
                    </div>
                    <button className="back-to-top" onClick={scrollToTop}>
                        BACK TO TOP <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
