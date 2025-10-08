import illustration5 from '/assets/img/illustration/logo3.png';
import illustration8 from '/assets/img/illustration/logo3.png';
import { Link } from "react-router-dom";
import SplitText from "../animation/SplitText.jsx"
import Animate from '../animation/Animate.js';

const BannerV1 = () => {
    return (
        <>
            <div id="home" className="banner-style-one-area bg-cover"
                style={{ backgroundImage: `url("/assets/img/shape/3.jpg")` }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/8.jpg)' }} />
                
                {/* Mobile Background Logo - ONLY background element */}
                <div className="mobile-background-logo mobile-only">
                    <img className='regular-img' src={illustration5} alt="MasterMind Background" />
                    <img className='light-img' src={illustration8} alt="MasterMind Background" />
                </div>
                
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="banner-style-one-heading">
                                <div className="banner-title">
                                    {/* Desktop version with split text */}
                                    <h2 className="title-left split-text desktop-only">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Shaping the Next Era of  
                                        </SplitText>
                                    </h2>
                                    <h2 className="title-right split-text desktop-only">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Digital Marketing With AI
                                        </SplitText>
                                    </h2>
                                    
                                    {/* Mobile Creative Hero - Clean Version */}
                                    <div className="mobile-hero-container mobile-only">
                                        <div className="mobile-hero-content">
                                            <div className="hero-logo-section">
                                                <div className="logo-container">
                                                    <div className="logo-glow-ring"></div>
                                                    <div className="logo-pulse-ring"></div>
                                                    <img className='regular-img' src={illustration5} alt="MasterMind" />
                                                    <img className='light-img' src={illustration8} alt="MasterMind" />
                                                </div>
                                            </div>
                                            
                                            <div className="hero-text-section">
                                                <h1 className="mobile-hero-title">
                                                    <span className="line-1">SHAPING THE NEXT ERA OF</span>
                                                    <span className="line-2">DIGITAL MARKETING WITH AI</span>
                                                </h1>
                                                
                                                <div className="hero-tagline">
                                                    <div className="tagline-badge">
                                                        <span className="badge-text">Best Digital Marketing Agency in Pune, India</span>
                                                        <div className="badge-glow"></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="hero-description">
                                                    <p>India's #1 AI-first digital marketing agency, where data, creativity, and automation unite to drive unstoppable growth.</p>
                                                </div>
                                                
                                                <div className="hero-cta">
                                                    <Link 
                                                        to="#contactform" 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const element = document.getElementById('contactform');
                                                            if (element) {
                                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                            }
                                                        }}
                                                        className="mobile-cta-button"
                                                    >
                                                        <div className="btn-bg-animation"></div>
                                                        <div className="btn-content">
                                                            <span className="btn-text">GET FREE CONSULTATION</span>
                                                            <div className="btn-arrow">
                                                                <i className="fas fa-arrow-right"></i>
                                                            </div>
                                                        </div>
                                                        <div className="btn-ripple"></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <Animate className='animate__animated animate__fadeInRight desktop-only'>
                                    <div className="thumb">
                                        <img className='regular-img' src={illustration5} alt="Image Not Found" />
                                        <img className='light-img' src={illustration8} alt="Image Not Found" />
                                    </div>
                                </Animate>
                            </div>
                        </div>
                        <div className="col-xl-3 offset-xl-1 desktop-only">
                            <Animate className='animate__animated animate__fadeInUp' delay="1s" duration="0.6s">
                                <div className="banner-style-one-info">
                                    <div className="top-info">
                                        <h4>Best Digital Marketing Agency in Pune, India</h4>
                                    </div>
                                    <div className="bottom">
                                        <p>
                                        India's #1 AI-first digital marketing agency, where data, creativity, and automation unite to drive unstoppable growth.
                                        </p>
                                        <Link 
                                            to="#contactform" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById('contactform');
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }}
                                            className="btn-style-two mt-30"
                                        >
                                            <i className="fas fa-long-arrow-right" /> Get Free <br /> Consultation
                                        </Link>
                                    </div>
                                </div>
                            </Animate>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV1;
