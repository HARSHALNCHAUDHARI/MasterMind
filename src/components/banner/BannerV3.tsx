import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import SplitText from "../animation/SplitText.jsx";

// Website data interface
interface WebsiteData {
    id: number;
    url: string;
    title: string;
    image: string;
}

// Add the interface for light mode prop
interface DataType {
    lightMode?: boolean;
}

// Website data
const websiteData: WebsiteData[] = [
    {
        id: 1,
        url: 'https://www.coconutbeachfarm.com/',
        title: 'Coconut Beach Farm',
        image: '/assets/img/portfolio/coconut1.jpg'
    },
    {
        id: 2,
        url: 'https://www.kosmixdentalclinic.com/',
        title: 'Kosmix Dental Clinic',
        image: '/assets/img/portfolio/kosmix1.jpg'
    },
    {
        id: 3,
        url: 'https://www.hsrdentalbooth.com/',
        title: 'HSR Dental Booth',
        image: '/assets/img/portfolio/hsr1.jpg'
    },
    {
        id: 4,
        url: 'https://www.symphonydentalcare.in/',
        title: 'Symphony Dental Care',
        image: '/assets/img/portfolio/symphony1.jpg'
    },
    {
        id: 5,
        url: 'https://weekendhome.in/',
        title: 'Weekend Homes',
        image: '/assets/img/portfolio/weekend1.jpg'
    },
    {
        id: 6,
        url: 'https://www.smilesolutionsclinic.com/',
        title: 'Smile Solutions',
        image: '/assets/img/portfolio/smilesolutions.jpg'
    },
     {
        id: 7,
        url: 'https://www.smiledentdentalcare.com/',
        title: 'Dr.Manes Dental Clinic ',
        image: '/assets/img/portfolio/drmane.jpg'
    },
         {
        id: 8,
        url: 'https://www.vtechpowersystems.com/',
        title: 'VTech Power Systems',
        image: '/assets/img/portfolio/vtech1.jpg'
    },
         {
        id: 9,
        url: 'https://www.abbaddentalclinic.com/',
        title: 'Abbad Dental Clinic',
        image: '/assets/img/portfolio/abbad.jpg'
    },
         {
        id: 10,
        url: 'https://www.maulihospitalanddentalcare.com/',
        title: 'Mauli Hospital Dental Care',
        image: '/assets/img/portfolio/mauli.jpg'
    },
         {
        id: 11,
        url: '#',
        title: '1to1 Guru',
        image: '/assets/img/portfolio/1to1.jpg'
    },
];

// WebsitePreview Component - UPDATED
const WebsitePreview: React.FC<{ website: WebsiteData; lightMode?: boolean }> = ({ website, lightMode }) => {
    // MODIFICATION: Removed unused 'id' and corrected useState syntax
    const { url, title, image } = website;
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const titleColor = lightMode ? '#000000 !important' : '#faf8f8ff !important';

    // Function to handle navigation
    const handleNavigate = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="website-preview-container" style={{
            width: '100%',
            height: '100%',
            paddingBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        }}>
            <h3 style={{
                margin: '0 0 15px 0',
                fontStyle: 'normal',
                fontSize: '22px',
                fontWeight: '200',
                color: titleColor,
                lineHeight: '8',
                textAlign: 'center',
                padding: '0 10px',
                transition: 'all 0.3s ease',
                flexShrink: 0,
                marginBottom:"-60px",
            }}>{title}</h3>

            <div className="website-preview-card" style={{
                position: 'relative',
                height: '300px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                background: 'transparent',
                backdropFilter: 'blur(10px)',
                width: '100%',
                marginBottom:'10px',
                transition: 'all 0.3s ease',
                flexShrink: 0
            }}>
                {!imageError ? (
                    <div className="image-container" style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        background: 'rgba(248, 249, 250, 0.1)',
                        cursor: 'pointer',
                        borderRadius: '12px'
                    }}
                    onClick={handleNavigate}>
                        <img
                            src={image}
                            alt={title}
                            onError={handleImageError}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease',
                                borderRadius: '12px'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.3)',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px'
                            }}
                            className="image-overlay"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                                const img = e.currentTarget.previousElementSibling as HTMLImageElement;
                                if (img) img.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0';
                                const img = e.currentTarget.previousElementSibling as HTMLImageElement;
                                if (img) img.style.transform = 'scale(1)';
                            }}
                        >
                        </div>
                    </div>
                ) : (
                    <div className="preview-fallback" style={{
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <div style={{
                            background: 'rgba(248, 249, 250, 0.2)',
                            padding: '40px 20px',
                            borderRadius: '8px',
                            border: '2px dashed rgba(222, 226, 230, 0.3)',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'rgba(222, 226, 230, 0.3)',
                                borderRadius: '8px',
                                margin: '0 auto 20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                color: '#6c757d'
                            }}>
                                🖼️
                            </div>
                            <p style={{
                                color: '#6c757d',
                                margin: '0',
                                fontSize: '14px'
                            }}>Image not available</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="button-section" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '0px',
                flexShrink: 0
            }}>
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleNavigate}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '500'
                    }}
                >
                    View Full Site
                </button>
            </div>
        </div>
    );
};

// Main BannerV3 Component
const BannerV3: React.FC<DataType> = ({ lightMode }) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .banner-slide-counter .swiper-slide {
                transition: all 0.3s ease;
                transform: scale(0.7);
                opacity: 0.6;
                height: 570px !important;
            }

            .banner-slide-counter .swiper-slide-active {
                transform: scale(1.3) !important;
                opacity: 1 !important;
                z-index: 2;
            }

            .banner-slide-counter .swiper-slide-next,
            .banner-slide-counter .swiper-slide-prev {
                transform: scale(0.85);
                opacity: 0.75;
                height: 550px !important;
            }

            .website-preview-container {
                padding-bottom: 20px !important;
                height: 100% !important;
                box-sizing: border-box;
            }

            @media (max-width: 768px) {
                .banner-slide-counter .swiper-slide {
                    transform: scale(0.75);
                    height: 480px !important;
                }

                .banner-slide-counter .swiper-slide-active {
                    transform: scale(1.2) !important;
                    height: 520px !important;
                }


                .website-preview-card {
                    height: 230px !important;
                    width: 80% !important;
                    margin-left: auto;
                    margin-right: auto;
                }

                .button-section {
                    width: 80% !important;
                    margin: 15px auto 0 auto !important;
                    justify-content: center !important;
                    flex-direction: row !important;
                }

                .button-section button {
                    padding: 8px 16px !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    width: auto !important;
                    min-width: 140px !important;
                    opacity: 1 !important;
                    display: flex !important;
                    justify-content: center !important;
                    background-color: #dc3545 !important;
                    border-color: #dc3545 !important;
                    color: white !important;
                    margin-top: -10px;
                }

                .banner-slide-button-prev,
                .banner-slide-button-next {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            <div id="ourportfolio" className="banner-style-three-area overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Crafted for the Digital Edge</h4>
                                <h2 className="title split-text">
                                    <SplitText
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Explore Our Latest Web Design Projects
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    gap: "20px",
                    position: "absolute",
                    bottom: "20px",
                    right: "0",
                    padding: "50px",
                    zIndex: 10
                }}>
                    <div
                        ref={prevRef}
                        className="banner-slide-button-prev"
                        style={{
                            cursor: "pointer",
                            width: "40px",
                            height: "40px",
                            background: "rgba(238, 238, 238, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "20px",
                            fontSize: "24px",
                            userSelect: "none",
                            transition: "all 0.3s ease",
                            color: "#333",
                            backdropFilter: "blur(10px)"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 0, 0, 0.9)";
                            e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(238, 238, 238, 0.9)";
                            e.currentTarget.style.color = "#333";
                        }}
                    >
                        ‹
                    </div>
                    <div
                        ref={nextRef}
                        className="banner-slide-button-next"
                        style={{
                            cursor: "pointer",
                            width: "40px",
                            height: "40px",
                            background: "rgba(238, 238, 238, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "20px",
                            fontSize: "24px",
                            userSelect: "none",
                            transition: "all 0.3s ease",
                            color: "#333",
                            backdropFilter: "blur(10px)"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 0, 0, 0.9)";
                            e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(238, 238, 238, 0.9)";
                            e.currentTarget.style.color = "#333";
                        }}
                    >
                        ›
                    </div>
                </div>

                <Swiper
                    className="banner-slide-counter"
                    loop={true}
                    grabCursor={true}
                    mousewheel={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    pagination={{
                        clickable: true,
                        type: "fraction",
                        el: ".banner-slide-pagination",
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper: any) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 30 },
                        480: { slidesPerView: 1.2, spaceBetween: 40 },
                        768: { slidesPerView: 1.8, spaceBetween: 30 },
                        991: { slidesPerView: 2.2, spaceBetween: 40 },
                        992: { slidesPerView: 2.5, spaceBetween: 50 },
                        1400: { slidesPerView: 3, spaceBetween: 60 },
                    }}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
                >
                    {websiteData.map(website =>
                        <SwiperSlide key={website.id}>
                            <WebsitePreview website={website} lightMode={lightMode} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    );
};

export default BannerV3;
