import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

const SplitText = ({
    children, 
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = 'easeOutCubic',
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'inherit', // Add missing textAlign prop
    onLetterAnimationComplete,
}) => {
    // Enhanced text extraction with better error handling
    const extractText = (children) => {
        if (!children) return '';
        
        if (typeof children === 'string') return children;
        if (typeof children === 'number') return children.toString();
        
        // Handle React elements
        if (children.props) {
            if (typeof children.props.children === 'string') {
                return children.props.children;
            }
            if (typeof children.props.children === 'number') {
                return children.props.children.toString();
            }
            // Handle nested children
            return extractText(children.props.children);
        }
        
        // Handle arrays of children
        if (Array.isArray(children)) {
            return children.map(child => extractText(child)).join('');
        }
        
        return '';
    };

    const text = extractText(children);
    
    // Add safety check for empty text
    if (!text || text.length === 0) {
        return <span className={className}></span>;
    }

    // Split text into words and letters with safety checks
    const words = text.split(' ').map(word => 
        word ? word.split('') : []
    ).filter(word => word.length > 0);

    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef();
    const animatedCount = useRef(0);

    useEffect(() => {
        // Add safety check for ref
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    // Add safety check for empty letters array
    if (letters.length === 0) {
        return <span ref={ref} className={`split-parent ${className}`}></span>;
    }

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing },
        }))
    );

    return (
        <span
            ref={ref}
            className={`split-parent ${className}`}
            style={{ 
                textAlign, 
                overflow: 'hidden', 
                display: 'inline', 
                whiteSpace: 'normal', 
                wordWrap: 'break-word' 
            }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        // Add safety check for springs array bounds
                        if (index >= springs.length) {
                            return null;
                        }

                        return (
                            <animated.span
                                key={`${wordIndex}-${letterIndex}`} // Better key generation
                                style={{
                                    ...springs[index],
                                    display: 'inline-block',
                                    willChange: 'transform, opacity',
                                }}
                            >
                                {letter}
                            </animated.span>
                        );
                    })}
                    {/* Only add space if not the last word */}
                    {wordIndex < words.length - 1 && (
                        <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                    )}
                </span>
            ))}
        </span>
    );
};

export default SplitText;
