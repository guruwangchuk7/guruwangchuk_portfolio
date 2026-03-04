import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export function Globe({ className }) {
    const canvasRef = useRef();
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = useState(0);

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 2, // Brighter lighting interaction
            mapSamples: 16000,
            mapBrightness: 12, // Boosted to make dots a bright white
            baseColor: [0.3, 0.3, 0.3], // Lighter overall sphere color
            markerColor: [1, 1, 1],
            glowColor: [0.15, 0.15, 0.15], // More prominent glow inside the circular mask
            markers: [
                { location: [27.5142, 90.4336], size: 0.1 }, // Bhutan
            ],
            onRender: (state) => {
                // Auto-rotation
                if (!pointerInteracting.current) {
                    phi += 0.003;
                }
                state.phi = phi + r;
                state.width = width * 2;
                state.height = width * 2;
            }
        });

        setTimeout(() => {
            if (canvasRef.current) canvasRef.current.style.opacity = '1';
        }, 100)

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [r]);

    return (
        <div
            className={className}
            style={{
                width: "100%",
                maxWidth: 800, // Reduced canvas bounds slightly
                aspectRatio: 1,
                margin: "auto",
                position: "relative",
            }}
        >
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                    canvasRef.current.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = "grab";
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = "grab";
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        setR(delta / 200);
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        setR(delta / 100);
                    }
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    contain: "layout paint size",
                    opacity: 0,
                    transition: "opacity 1s ease",
                }}
            />
        </div>
    );
}
