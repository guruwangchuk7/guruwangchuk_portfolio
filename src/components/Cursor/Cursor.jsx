import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cursor.css';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        const onMouseEnter = () => {
            gsap.to(follower, {
                opacity: 1,
                duration: 0.3
            });
        };

        const onMouseLeave = () => {
            gsap.to(follower, {
                opacity: 0,
                duration: 0.3
            });
        };

        const onMouseOver = (e) => {
            const el = e.target.closest('a, button, .project-row, .skill-block, .edu-card, .footer-big-text');
            if (el) {
                if (el.classList.contains('footer-big-text') || el.closest('.footer-big-text')) {
                    onLinkHoverLarge();
                } else {
                    onLinkHover();
                }
            }
        };

        const onMouseOut = (e) => {
            const el = e.target.closest('a, button, .project-row, .skill-block, .edu-card, .footer-big-text');
            if (el) {
                onLinkLeave();
            }
        };

        const onLinkHover = () => {
            gsap.to(follower, { scale: 1.5, borderColor: "rgba(0,0,0,0.5)", duration: 0.4 });
        };

        const onLinkHoverLarge = () => {
            gsap.to(follower, { scale: 3.5, backgroundColor: "rgba(0, 0, 0, 0.05)", borderColor: "transparent", duration: 0.4 });
        };

        const onLinkLeave = () => {
            gsap.to(follower, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(0,0,0,0.2)", duration: 0.4 });
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseenter', onMouseEnter);
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseover', onMouseOver);
        document.body.addEventListener('mouseout', onMouseOut);

        // Keep native cursor
        document.body.style.cursor = 'auto';

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.body.removeEventListener('mouseover', onMouseOver);
            document.body.removeEventListener('mouseout', onMouseOut);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div className="cursor-follower" ref={followerRef}></div>
    );
};

export default Cursor;
