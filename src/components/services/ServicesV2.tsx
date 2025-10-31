import { useState, useEffect } from "react";
import ServicesV2Data from "../../assets/jsonData/services/ServicesV2Data.json"
import SplitText from "../animation/SplitText.jsx"
import SingleServiceV2 from "./SingleServiceV2.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';


interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}


const ServicesV2 = ({ sectionClass }: DataType) => {
    const [showAll, setShowAll] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true);


    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const checkTheme = () => {
            const hasDarkClass = document.body.classList.contains('bg-dark');
            setIsDarkTheme(hasDarkClass);
        };

        checkScreenSize();
        checkTheme();

        window.addEventListener('resize', checkScreenSize);

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            observer.disconnect();
        };
    }, []);


    const handleViewMore = () => {
        setIsExpanding(true);
        setTimeout(() => {
            setShowAll(true);
            setIsExpanding(false);
        }, 100);
    };


    const handleShowLess = () => {
        setShowAll(false);
    };


    const servicesToShow = showAll ? ServicesV2Data : ServicesV2Data.slice(0, 3);


    return (
        <>
            <div className={`services-style-two-area overflow-hidden ${sectionClass ? sectionClass : ""}`}>
                {/* Section Title - Always show or check hasTitle */}
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title" style={{ 
                                    color: isDarkTheme ? '#ffffff' : '#000000', 
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '1rem'
                                }}>
                                    Why Choose Us
                                </h4>
                                <h2 className="title" style={{ 
                                    color: isDarkTheme ? '#ffffff' : '#000000', 
                                    fontSize: '2.5rem',
                                    fontWeight: '700',
                                    lineHeight: '1.2',
                                    marginBottom: '0.5rem'
                                }}>
                                    <SplitText
                                        delay={80}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                    Why Choose Us As Your Web Development Company in Pune
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="service-hover-items">
                                {isMobile ? (
                                    // Mobile Swiper Version
                                    <Swiper
                                        className="services-v2-mobile-swiper"
                                        slidesPerView={1}
                                        spaceBetween={20}
                                        autoplay={{
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        modules={[Pagination, Autoplay]}
                                    >
                                        {ServicesV2Data.map((service) => (
                                            <SwiperSlide key={service.id}>
                                                <ul className="mobile-service-list">
                                                    <SingleServiceV2 service={service} />
                                                </ul>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    // Desktop Version (Original)
                                    <>
                                        <ul className={`transition-all duration-500 ${isExpanding ? 'opacity-75' : 'opacity-100'}`}>
                                            {servicesToShow.map((service, index) =>
                                                <SingleServiceV2 
                                                    service={service} 
                                                    key={service.id}
                                                    style={{
                                                        opacity: showAll && index >= 3 ? 0 : 1,
                                                        animation: showAll && index >= 3 ? 'fadeInUp 0.6s ease forwards' : 'none',
                                                        animationDelay: showAll && index >= 3 ? `${(index - 3) * 0.1}s` : '0s'
                                                    }}
                                                />
                                            )}
                                        </ul>
                                        
                                        {/* View More / Show Less Button - Desktop Only */}
                                        <div className="text-center mt-5 mb-12">
                                            {!showAll ? (
                                                <button 
                                                    onClick={handleViewMore}
                                                    className="btn btn-primary btn-lg px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                                                    disabled={isExpanding}
                                                >
                                                    {isExpanding ? (
                                                        <span className="flex items-center gap-2">
                                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Loading...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            View More Services 
                                                            <i className="fas fa-chevron-down transition-transform duration-300"></i>
                                                        </span>
                                                    )}
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={handleShowLess}
                                                    className="btn btn-outline-primary btn-lg px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                                                    style={{
                                                        color: 'white',
                                                        borderColor: 'var(--bs-primary)',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = 'black';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = 'white';
                                                    }}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        Show Less
                                                        <i className="fas fa-chevron-up transition-transform duration-300"></i>
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* CSS for animations and mobile styles */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 767px) {
                    .services-style-two-area {
                        padding-bottom: 40px !important;
                    }
                    
                    .services-v2-mobile-swiper {
                        padding-bottom: 50px !important;
                        margin-bottom: 0 !important;
                    }
                    
                    .services-v2-mobile-swiper .swiper-pagination {
                        bottom: 20px !important;
                    }
                    
                    .services-v2-mobile-swiper .swiper-pagination-bullet {
                        background: #dc2626 !important;
                        opacity: 0.5;
                        width: 12px;
                        height: 12px;
                    }
                    
                    .services-v2-mobile-swiper .swiper-pagination-bullet-active {
                        opacity: 1 !important;
                        background: #dc2626 !important;
                    }
                    
                    .mobile-service-list {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                    }
                    
                    .mobile-service-list .service-hover-item {
                        padding: 35px 25px !important;
                        height: 520px !important;
                        display: flex !important;
                        align-items: stretch !important;
                        overflow: hidden !important;
                    }
                    
                    .mobile-service-list .service-hover-content {
                        display: flex !important;
                        flex-direction: column !important;
                        grid-template-columns: none !important;
                        grid-column-gap: 0 !important;
                        height: 100% !important;
                        width: 100% !important;
                    }
                    
                    .mobile-service-list .service-hover-content .left {
                        display: block !important;
                        margin-bottom: 25px !important;
                        flex-shrink: 0 !important;
                    }
                    
                    .mobile-service-list .service-hover-content .left .icon {
                        margin-bottom: 20px;
                    }
                    
                    .mobile-service-list .service-hover-content .left .icon img {
                        height: 55px !important;
                        margin-bottom: 15px !important;
                    }
                    
                    .mobile-service-list .service-hover-content .item-title {
                        margin-bottom: 20px !important;
                    }
                    
                    .mobile-service-list .service-hover-content .item-title span {
                        margin-bottom: 12px !important;
                        font-size: 0.9rem !important;
                        display: block !important;
                    }
                    
                    .mobile-service-list .service-hover-content .item-title h2 {
                        font-size: 1.5rem !important;
                        line-height: 1.3 !important;
                        margin-bottom: 0 !important;
                        min-height: 65px !important;
                        display: flex !important;
                        align-items: flex-start !important;
                    }
                    
                    .mobile-service-list .service-hover-content .details {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 20px !important;
                        flex: 1 !important;
                        justify-content: space-between !important;
                        overflow: hidden !important;
                    }
                    
                    .mobile-service-list .service-hover-content .details p {
                        font-size: 0.95rem !important;
                        line-height: 1.6 !important;
                        margin-bottom: 0 !important;
                        flex: 1 !important;
                        display: -webkit-box !important;
                        -webkit-line-clamp: 5 !important;
                        -webkit-box-orient: vertical !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .mobile-service-list .service-hover-content ul {
                        margin: 0 !important;
                        padding: 0 !important;
                        flex-shrink: 0 !important;
                        max-height: 120px !important;
                        overflow: hidden !important;
                    }
                    
                    .mobile-service-list .service-hover-content ul li {
                        font-size: 0.9rem !important;
                        padding-left: 25px !important;
                        margin-top: 10px !important;
                        line-height: 1.4 !important;
                    }
                    
                    .mobile-service-list .service-hover-content ul li::after {
                        width: 18px !important;
                    }
                    
                    /* Hide hover wrapper on mobile */
                    .mobile-service-list .service-hover-wrapper {
                        display: none !important;
                    }
                    
                    /* Simplify mobile layout */
                    .mobile-service-list .service-hover-item::after {
                        display: none !important;
                    }
                    
                    .mobile-service-list .service-hover-item::before {
                        display: none !important;
                    }
                    
                    /* Add mobile card styling */
                    .mobile-service-list .service-hover-item {
                        background: rgba(255, 255, 255, 0.05) !important;
                        border-radius: 15px !important;
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        margin-bottom: 0 !important;
                        box-sizing: border-box !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .services-style-two-area {
                        padding-bottom: 30px !important;
                    }
                    
                    .services-v2-mobile-swiper {
                        padding-bottom: 40px !important;
                    }
                    
                    .services-v2-mobile-swiper .swiper-pagination {
                        bottom: 15px !important;
                    }
                    
                    .mobile-service-list .service-hover-item {
                        padding: 30px 20px !important;
                        height: 480px !important;
                    }
                    
                    .mobile-service-list .service-hover-content .left .icon img {
                        height: 50px !important;
                    }
                    
                    .mobile-service-list .service-hover-content .item-title h2 {
                        font-size: 1.3rem !important;
                        min-height: 60px !important;
                    }
                    
                    .mobile-service-list .service-hover-content .details p {
                        font-size: 0.9rem !important;
                        -webkit-line-clamp: 4 !important;
                    }
                    
                    .mobile-service-list .service-hover-content ul li {
                        font-size: 0.85rem !important;
                    }
                    
                    .mobile-service-list .service-hover-content ul {
                        max-height: 100px !important;
                    }
                }
                
                @media (max-width: 400px) {
                    .services-style-two-area {
                        padding-bottom: 20px !important;
                    }
                    
                    .services-v2-mobile-swiper {
                        padding-bottom: 35px !important;
                    }
                    
                    .services-v2-mobile-swiper .swiper-pagination {
                        bottom: 12px !important;
                    }
                    
                    .mobile-service-list .service-hover-item {
                        padding: 25px 15px !important;
                        height: 450px !important;
                    }
                    
                    .mobile-service-list .service-hover-content .item-title h2 {
                        font-size: 1.2rem !important;
                    }
                    
                    .mobile-service-list .service-hover-content .details p {
                        font-size: 0.85rem !important;
                    }
                }
            `}</style>
        </>
    );
};


export default ServicesV2;
