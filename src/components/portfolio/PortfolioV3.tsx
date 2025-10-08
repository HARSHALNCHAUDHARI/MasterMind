import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import PortfolioV3Data from '../../assets/jsonData/portfolio/PortfolioV3Data.json';
import SplitText from "../animation/SplitText.jsx";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
}

const PortfolioV3 = ({ hasTitle, sectionClass }: DataType) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('bg-dark') ||
                          document.documentElement.getAttribute('data-theme') === 'dark';
            setIsDarkMode(isDark);
        };
        
        checkDarkMode();
        
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class', 'data-theme'] 
        });
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div id="services" className={`creative-services-showcase ${sectionClass ? sectionClass : ""}`}>
                {/* Animated Background Elements */}
                <div className="showcase-bg-elements">
                    <div className="floating-tech-shapes">
                        <div className="tech-shape triangle-gradient"></div>
                        <div className="tech-shape hexagon-pulse"></div>
                        <div className="tech-shape circle-orbit"></div>
                        <div className="tech-shape diamond-spin"></div>
                        <div className="tech-shape pentagon-float"></div>
                    </div>
                    <div className="digital-grid">
                        <div className="grid-lines horizontal"></div>
                        <div className="grid-lines vertical"></div>
                        <div className="grid-nodes">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className={`grid-node node-${i + 1}`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Creative Header */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="creative-showcase-header text-center">
                                    <div className="service-badge-floating">
                                        <div className="badge-holographic-bg"></div>
                                        <span className="badge-icon">🚀</span>
                                        <span className="badge-text">SERVICES</span>
                                        <div className="badge-energy-trail"></div>
                                    </div>
                                    <h2 className="showcase-title split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            <span className="title-electric">NEXT-LEVEL</span><br/>
                                            <span className="title-hologram">DIGITAL SERVICES</span>
                                        </SplitText>
                                    </h2>
                                    <div className="title-accent-effects">
                                        <div className="accent-line left"></div>

                                        <div className="accent-line right"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container-fluid">
                    <div className="showcase-wrapper">
                        {/* Levitating Progress Indicator */}
                        <div className="progress-levitation">
                            <div className="progress-sphere">
                                <div className="sphere-rings">
                                    <div className="sphere-ring ring-outer"></div>
                                    <div className="sphere-ring ring-middle"></div>
                                    <div className="sphere-ring ring-inner"></div>
                                </div>
                                <div className="progress-core">
                                    <span className="current-number">{String(activeIndex + 1).padStart(2, '0')}</span>
                                    <div className="progress-divider">/</div>
                                    <span className="total-number">{String(PortfolioV3Data.length).padStart(2, '0')}</span>
                                </div>
                                <div className="energy-sparks">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className={`energy-spark spark-${i + 1}`}>✨</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={100}
                            slidesPerView={1}
                            centeredSlides={true}
                            navigation={{
                                nextEl: '.creative-nav-next',
                                prevEl: '.creative-nav-prev',
                            }}
                            pagination={{
                                el: '.creative-pagination',
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return `<div class="${className} creative-page-bullet">
                                        <div class="bullet-energy-core"></div>
                                        <div class="bullet-pulse-ring"></div>
                                        <span class="bullet-index">${String(index + 1).padStart(2, '0')}</span>
                                        <div class="bullet-trail"></div>
                                    </div>`;
                                },
                            }}
                            autoplay={{
                                delay: 9000,
                                disableOnInteraction: false,
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            className="creative-showcase-swiper"
                            breakpoints={{
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 80,
                                },
                                1200: {
                                    slidesPerView: 1,
                                    spaceBetween: 100,
                                }
                            }}
                        >
                            {PortfolioV3Data.map((portfolio, index) =>
                                <SwiperSlide key={portfolio.id}>
                                    <CreativeServiceShowcase 
                                        portfolio={portfolio} 
                                        darkMode={isDarkMode}
                                        isActive={index === activeIndex}
                                    />
                                </SwiperSlide>
                            )}
                        </Swiper>

                        {/* Advanced Navigation */}
                        <div className="advanced-controls">
                            <button className="creative-nav-prev advanced-nav-btn">
                                <div className="btn-quantum-bg"></div>
                                <div className="btn-core">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className="btn-energy-pulse"></div>
                                <span className="btn-text">PREVIOUS</span>
                            </button>

                            <div className="creative-pagination"></div>

                            <button className="creative-nav-next advanced-nav-btn">
                                <div className="btn-quantum-bg"></div>
                                <div className="btn-core">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className="btn-energy-pulse"></div>
                                <span className="btn-text">NEXT</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Creative Service Showcase Component
const CreativeServiceShowcase = ({ portfolio, darkMode = false, isActive = false }: { 
    portfolio: any, 
    darkMode?: boolean,
    isActive?: boolean 
}) => {
    const { thumb, titleFirst, titleLast, description } = portfolio;
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const formatDescription = (desc: string) => {
        if (!desc) return [];
        
        return desc.split('•').filter(item => item.trim()).map(item => {
            const trimmedItem = item.trim();
            const dashIndex = trimmedItem.indexOf('–');
            
            if (dashIndex !== -1) {
                const title = trimmedItem.substring(0, dashIndex).trim();
                const description = trimmedItem.substring(dashIndex + 1).trim();
                
                return { title, description };
            }
            
            return { title: trimmedItem, description: '' };
        });
    };

    const descriptionItems = formatDescription(description || '');

    // Service-specific emojis based on actual services
    const getServiceEmojis = () => {
        const serviceType = titleLast?.toLowerCase() || '';
        
        if (serviceType.includes('solutions') || serviceType.includes('app')) {
            return ['🌐', '📱', '💻', '🔗', '🛠️', '☁️']; // Web & App Solutions
        } else if (serviceType.includes('marketing')) {
            return ['📈', '🎯', '📢', '💬', '📧', '🔍']; // Digital Marketing
        } else if (serviceType.includes('branding')) {
            return ['🎨', '📸', '🎬', '✨', '🖌️', '🏆']; // Creative & Branding
        } else if (serviceType.includes('growth') || serviceType.includes('reputation')) {
            return ['⭐', '📰', '👥', '🌟', '📍', '💼']; // Reputation & Growth
        } else if (serviceType.includes('powered') || serviceType.includes('ai')) {
            return ['🤖', '🧠', '🎙️', '💬', '⚡', '🚀']; // AI-Powered Solutions
        }
        
        return ['⚡', '🚀', '💎', '🌟', '🔥', '✨'];
    };

    const getMainServiceIcon = () => {
        const serviceType = titleLast?.toLowerCase() || '';
        
        if (serviceType.includes('solutions') || serviceType.includes('app')) {
            return '🌐';
        } else if (serviceType.includes('marketing')) {
            return '📈';
        } else if (serviceType.includes('branding')) {
            return '🎨';
        } else if (serviceType.includes('growth') || serviceType.includes('reputation')) {
            return '⭐';
        } else if (serviceType.includes('powered') || serviceType.includes('ai')) {
            return '🤖';
        }
        
        return '🚀';
    };

    return (
        <div 
            ref={cardRef}
            className={`creative-service-showcase ${darkMode ? 'dark' : 'light'} ${isActive ? 'active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Dynamic Energy Field */}
            <div className="showcase-energy-field">
                <div className="energy-waves">
                    <div className="energy-wave wave-1"></div>
                    <div className="energy-wave wave-2"></div>
                    <div className="energy-wave wave-3"></div>
                </div>
                <div className="field-particles">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className={`field-particle fp-${i + 1}`}>
                            {['✨', '💫', '⚡', '🌟'][i % 4]}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="showcase-content-layout">
                {/* Left Content Section */}
                <div className="content-section">
                    {/* Service Badge */}
                    <div className="service-identifier">
                        <div className="identifier-bg"></div>
                        <span className="identifier-icon">{getMainServiceIcon()}</span>
                        <span className="identifier-text">SERVICES</span>
                        <div className="identifier-glow"></div>
                    </div>

                    {/* Dynamic Title */}
                    <div className="service-title-showcase">
                        <h1 className="showcase-service-title">
                            <span className="title-primary">
                                <span className="title-text">{titleFirst}</span>
                                <div className="title-effects">
                                    <div className="effect-shimmer"></div>
                                    <div className="effect-sparkles">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <span key={i} className={`effect-sparkle sp-${i + 1}`}>✨</span>
                                        ))}
                                    </div>
                                </div>
                            </span>
                            <span className="title-secondary holographic">
                                <span className="title-text">{titleLast}</span>
                                <div className="holographic-overlay"></div>
                            </span>
                        </h1>

                        <div className="title-constellation">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className={`constellation-star star-${i + 1}`}>
                                    {['⭐', '✨', '💫'][i % 3]}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Service Features as Floating Elements */}
                    <div className="floating-features-network">
                        {descriptionItems.map((item, index) => (
                            <div key={index} className={`feature-node node-${index + 1}`}>
                                <div className="node-connector">
                                    <div className="connector-line"></div>
                                    <div className="connector-pulse"></div>
                                </div>
                                <div className="node-content">
                                    <div className="node-icon">
                                        <span className="node-emoji">{getServiceEmojis()[index]}</span>
                                        <div className="icon-energy-ring"></div>
                                    </div>
                                    <div className="node-info">
                                        <h3 className="feature-title">{item.title}</h3>
                                        {item.description && (
                                            <p className="feature-description">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="node-aura">
                                    <div className="aura-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Portal */}
                    <div className="action-portal">
                        <button className="portal-btn">
                            <div className="btn-portal-bg"></div>
                            <div className="btn-content">
                                <span className="btn-text">EXPLORE SERVICE</span>
                                <div className="btn-arrow">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="btn-energy-burst">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className={`energy-burst-particle ebp-${i + 1}`}>⚡</div>
                                ))}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Visual Section */}
                <div className="visual-section">
                    <div className="visual-portal-frame">
                        <div className="portal-energy-field">
                            <div className="energy-rings">
                                <div className="energy-ring er-1"></div>
                                <div className="energy-ring er-2"></div>
                                <div className="energy-ring er-3"></div>
                                <div className="energy-ring er-4"></div>
                            </div>
                        </div>
                        
                        <div className="portal-display">
                            <img 
                                src={`/assets/img/services/${thumb}`} 
                                alt={`${titleFirst} ${titleLast}`}
                                loading="lazy"
                            />
                            <div className="display-overlay">
                                <div className="overlay-grid-pattern"></div>
                                <div className="overlay-scan-effect"></div>
                                <div className="overlay-hologram"></div>
                            </div>
                        </div>

                        {/* Orbiting Service Icons */}
                        <div className="orbiting-icons">
                            {getServiceEmojis().map((emoji, index) => (
                                <div 
                                    key={index} 
                                    className={`orbit-icon orbit-${index + 1}`}
                                    style={{ 
                                        '--orbit-delay': `${index * 1.2}s`,
                                        '--orbit-radius': `${140 + index * 20}px`
                                    } as React.CSSProperties}
                                >
                                    <div className="orbit-element">
                                        <span className="orbit-emoji">{emoji}</span>
                                        <div className="orbit-glow"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Digital Effects */}
                    {isHovered && (
                        <div className="digital-effects">
                            <div className="effect-glitch-lines">
                                <div className="glitch-line gl-1"></div>
                                <div className="glitch-line gl-2"></div>
                                <div className="glitch-line gl-3"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Interactive Scan Lines */}
            <div className="interactive-scan-system">
                <div className="scan-line horizontal"></div>
                <div className="scan-line vertical"></div>
            </div>
        </div>
    );
};

export default PortfolioV3;
