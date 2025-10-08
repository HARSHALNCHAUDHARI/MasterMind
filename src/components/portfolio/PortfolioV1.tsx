import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { useState } from 'react';
import PortfolioV1Data from '../../assets/jsonData/portfolio/PortfolioV1Data.json';
import SplitText from "../animation/SplitText.jsx";

const PortfolioV1 = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const currentPortfolio = PortfolioV1Data[activeSlide];

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveSlide(swiper.realIndex);
    };

    return (
        <>
            <div className="row align-center">
                {/* Left Side - Description */}
                <div className="col-lg-6 pr-50 pr-md-15 pr-xs-15">
                    <div className="portfolio-style-one-left-info">
                        <h4 className="sub-title">Recent Work</h4>
                        <div className="portfolio-description">
                            {currentPortfolio?.description?.split('\n').map((line, index) => (
                                <p key={`${activeSlide}-${index}`} className="description-line">
                                    <SplitText
                                        delay={5 + (index * 2)}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        {line.startsWith('•') ? line : `• ${line}`}
                                    </SplitText>
                                </p>
                            ))}
                        </div>
                        <div className="portfolio-info-card">
                            <h5>Experience the perfect blend of creativity and functionality</h5>
                        </div>
                    </div>
                </div>

                {/* Right Side - Title and Slider */}
                <div className="col-lg-6">
                    <div className="portfolio-style-one-content">
                        {/* Dynamic Title with Better Styling */}
                        <div className="portfolio-title-section mb-4">
                            <h2 className="portfolio-main-title">
                                <span className="text-regular">{currentPortfolio?.text}</span>
                                <strong className="text-bold">{currentPortfolio?.textBold}</strong>


                            </h2>
                        </div>

                        {/* Swiper Slider */}
                        <Swiper 
                            className="portfolio-style-two-carousel"
                            direction="horizontal"
                            loop={true}
                            autoplay={false}
                            effect={"fade"}
                            fadeEffect={{ crossFade: true }}
                            speed={1000}
                            onSlideChange={handleSlideChange}
                            pagination={{
                                el: ".project-pagination",
                                type: "custom",
                                clickable: true,
                                renderCustom: (_swiper, current, total) => `${current} <span></span> ${total}`,
                            }}
                            navigation={{
                                nextEl: ".project-button-next",
                                prevEl: ".project-button-prev",
                            }}
                            modules={[Navigation, Pagination, EffectFade, Keyboard]}
                        >
                            <div className="swiper-wrapper">
                                {PortfolioV1Data.map(portfolio =>
                                    <SwiperSlide key={portfolio.id}>
                                        <div className="portfolio-slide-content">
                                            <img 
                                                src={`/assets/img/portfolio/${portfolio.thumb}`}
                                                alt={`${portfolio.text} ${portfolio.textBold} ${portfolio.description}`}
                                                style={{
                                                    width: "100%",          // Full width of container
                                                    height: "300px",        // Fixed height for all
                                                    objectFit: "cover",     // Prevent distortion
                                                    borderRadius: "10px"    // Match UI style
                                                }}
                                                onError={(e) => {
                                                    console.log('Image failed to load:', portfolio.thumb);
                                                }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )}
                            </div>
                        </Swiper>
                        
                        {/* Navigation Controls */}
                        <div className="project-swiper-nav">
                            <div className="project-pagination" />
                            <div className="project-button-prev" />
                            <div className="project-button-next" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV1;
