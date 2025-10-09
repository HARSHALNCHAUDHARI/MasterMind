import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import PortfolioV3Data from '../../assets/jsonData/portfolio/PortfolioV3Data.json';
import SinglePortfolioV3 from './SinglePortfolioV3.js';
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
    // Add dark mode detection
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
        // Check for dark mode class on body or html
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('bg-dark') ||
                          document.documentElement.getAttribute('data-theme') === 'dark';
            setIsDarkMode(isDark);
        };
        
        // Initial check
        checkDarkMode();
        
        // Optional: Listen for theme changes
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
            <div id="services" className={`portfolio-style-three-area ${sectionClass ? sectionClass : ""}`}>
                {/* Portfolio Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 offset-lg-3">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">services</h4>
                                    <h2 className="title split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Our Digital Marketing Services 
                                        </SplitText>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="portfolio-swiper-container">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            pagination={{
                                el: '.swiper-pagination-custom',
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                992: {
                                    slidesPerView: 1,
                                    spaceBetween: 30,
                                },
                                1200: {
                                    slidesPerView: 1,
                                    spaceBetween: 40,
                                }
                            }}
                            className="portfolio-swiper"
                        >
                            {PortfolioV3Data.map(portfolio =>
                                <SwiperSlide key={portfolio.id}>
                                    <SinglePortfolioV3 
                                        portfolio={portfolio} 
                                        darkMode={isDarkMode}
                                    />
                                </SwiperSlide>
                            )}
                        </Swiper>

                        {/* Simple Clean Navigation */}
                        <div className="portfolio-controls">
                            {/* Navigation Buttons */}
                            <div className="navigation-wrapper">
                                <button className="swiper-button-prev-custom nav-button">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button className="swiper-button-next-custom nav-button">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>

                            {/* Pagination */}
                            <div className="swiper-pagination-custom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV3;