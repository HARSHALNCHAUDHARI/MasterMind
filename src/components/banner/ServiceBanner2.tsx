import thumb6 from "/assets/img/servicepage/service2hero.jpeg";
import shape1 from "/assets/img/shape/1.png";
import SplitText from "../animation/SplitText.jsx"

const ServiceBanner2 = () => {
    return (
        <>
            <div className="banner-style-ten-area shadow dark-hard">
                {/* Background Video  */}
                <video loop muted autoPlay>
                    <source src="/assets/video/abstract.mp4" type="video/mp4" />
                </video>

                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/7.jpg)' }} />

                <div className="container">
                    <div className="row align-center justify-content-center">
                        <div className="col-lg-7 col-12">
                            <div className="banner-two-content banner-center-content">
                                <div className="mobile-heading-center">
    <h2 className="item-title">Result-Driven <strong>SEO Agency in Pune</strong> <br /> Boost Your Online Visibility</h2>
</div>

                                
                                {/* Show on Desktop, Show on Mobile with different styling */}
                                <div className="d-flex d-none d-lg-block">
                                    <p className="split-text">
                                        <SplitText
                                            delay={5}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                           Mastermind Web is your dedicated, ROI-focused SEO agency in Pune, committed to transforming your website into a powerful, organic lead-generation machine. We deliver custom SEO services in Pune designed to achieve top Google rankings and sustainable business growth.

                                        </SplitText>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Hide image on mobile screens */}
                        <div className="col-lg-4 offset-lg-1 d-none d-lg-block">
                            <div className="banner-two-thumb">
                                <img src={thumb6} alt="Image Not Found" />
                                <img className="shape-image" src={shape1} alt="Image Not Found" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceBanner2;
