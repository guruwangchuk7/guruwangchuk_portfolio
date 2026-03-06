import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import myPhoto from '../../assets/myphoto/DSC_0064.JPG';
import './Profile.css';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main image parallax and reveal
            gsap.fromTo(".profile-image-wrapper", 
                { clipPath: "inset(100% 0 0 0)", scale: 1.2, opacity: 0 },
                { 
                    clipPath: "inset(0% 0 0 0)", 
                    scale: 1, 
                    opacity: 1,
                    duration: 1.8, 
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".profile-section",
                        start: "top 70%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Floating movement for the image
            gsap.to(".profile-img", {
                y: -30,
                duration: 2,
                scrollTrigger: {
                    trigger: ".profile-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Content text stagger
            gsap.from(".profile-text > *", {
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".profile-text",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="profile-section" ref={sectionRef} id="about">
            <div className="profile-container">
                <div className="profile-grid">
                    <div className="profile-image-container">
                        <div className="profile-image-wrapper" ref={imageRef}>
                            <img src={myPhoto} alt="Guru Wangchuk" className="profile-img" />
                            <div className="image-overlay"></div>
                        </div>
                    </div>

                    <div className="profile-content" ref={contentRef}>
                        <div className="profile-text">
                            <span className="profile-intro-tag">THE PERSON BEHIND THE CODE</span>
                            <h2 className="profile-heading">Full Stack & <br /> Blockchain Developer</h2>
                            <p className="profile-bio">
                                I am Guru Wangchuk, a developer based in Chandigarh, originally from Bhutan. 
                                My approach to engineering is rooted in the intersection of technical 
                                excellence and intentional design. 
                            </p>
                            <p className="profile-bio">
                                Whether I am architecting secure blockchain validation systems or 
                                building high-performance real-time analytics platforms, 
                                my goal is always to create digital experiences that feel 
                                seamless, fluid, and purposeful.
                            </p>
                            
                            <div className="profile-stats">
                                <div className="stat-box">
                                    <span className="stat-num">4+</span>
                                    <span className="stat-label">Years Learning</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-num">7+</span>
                                    <span className="stat-label">Projects Built</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
