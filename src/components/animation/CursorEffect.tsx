import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "/assets/img/logo1.png";

const CursorEffect = () => {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const followerRef = useRef<HTMLDivElement | null>(null);
    const animationId = useRef<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const posX = useRef(0);
    const posY = useRef(0);
    const mouseX = useRef(0);
    const mouseY = useRef(0);

    // Define inline styles
    const cursorStyle: React.CSSProperties = {
        position: 'fixed',
        width: '8px',
        height: '8px',
        background: '#000',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        display: isMobile ? 'none' : 'block' // Hide on mobile
    };

    const followerStyle: React.CSSProperties = {
        position: 'fixed',
        width: '40px',
        height: '40px',
        border: '1px solid #ff0000ff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        transition: 'transform 0.3s ease',
        display: isMobile ? 'none' : 'flex', // Hide on mobile
        alignItems: 'center',
        justifyContent: 'center'
    };

    const containerStyle: React.CSSProperties = {
        cursor: isMobile ? 'auto' : 'none' // Show default cursor on mobile
    };

    // Function to detect mobile and tablet devices
    const checkIsMobile = () => {
        const userAgent = navigator.userAgent;
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 1024; // Hide on screens <= 1024px (tablets and below)
        
        // Check for mobile/tablet user agents
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileUserAgent = mobileRegex.test(userAgent);
        
        return isTouchDevice || isSmallScreen || isMobileUserAgent;
    };

    useEffect(() => {
        // Initial check
        setIsMobile(checkIsMobile());

        // Add resize listener to check on window resize
        const handleResize = () => {
            setIsMobile(checkIsMobile());
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Don't initialize cursor effects on mobile devices
        if (isMobile) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Initialize positions
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
        };

        const animateFollower = () => {
            posX.current += (mouseX.current - posX.current) * 0.1;
            posY.current += (mouseY.current - posY.current) * 0.1;

            gsap.set(follower, { 
                x: posX.current, 
                y: posY.current 
            });
            
            gsap.set(cursor, { 
                x: mouseX.current, 
                y: mouseY.current 
            });

            animationId.current = requestAnimationFrame(animateFollower);
        };

        document.addEventListener("mousemove", moveCursor);
        animateFollower();

        const cards = document.querySelectorAll(".cursor-target");
        const handleMouseEnter = () => {
            if (cursor) {
                gsap.to(cursor, { scale: 2, duration: 0.3 });
            }
            if (follower) {
                gsap.to(follower, { scale: 1.5, duration: 0.3 });
            }
        };

        const handleMouseLeave = () => {
            if (cursor) {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
            if (follower) {
                gsap.to(follower, { scale: 1, duration: 0.3 });
            }
        };

        cards.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            if (animationId.current) {
                cancelAnimationFrame(animationId.current);
            }
            cards.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [isMobile]);

    return (
        <div style={containerStyle}>
            <div 
                ref={cursorRef} 
                style={cursorStyle}
            />
            <div 
                ref={followerRef} 
                style={followerStyle}
            >
                <img
                    src={logo}
                    alt="Cursor logo"
                    loading="lazy"
                    style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        pointerEvents: "none",
                        padding: "2px"
                    }}
                />
            </div>
        </div>
    );
};

export default CursorEffect;
