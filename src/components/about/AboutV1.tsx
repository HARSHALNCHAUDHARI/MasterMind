import arrowIcon from '/assets/img/logo1.png';
import arrowThemeIcon from '/assets/img/logo1.png';
import { Link } from "react-router-dom";
import ModalVideo from 'react-modal-video';
import { useState, useRef, useEffect } from 'react';
import TextScrollAnimation from '../animation/TextScrollAnimation';
import CountUp from 'react-countup';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useThumbParallax from '../../hooks/useThumbParallax';

interface DataType {
    lightMode?: boolean;
}

const platformsData = [
    { id: 1, logo: "/assets/img/socialprofiles/designrush.png", alt: "DesignRush", url: "https://www.designrush.com/agency/profile/digital-marketing-agency-in-pune-mastermind-web-developers" },
    { id: 2, logo: "/assets/img/socialprofiles/selectedfirms.png", alt: "Selected Firms", url: "https://selectedfirms.co/agency/mastermind-web-developers" },
    { id: 3, logo: "/assets/img/socialprofiles/techbehemoths.png", alt: "TechBehemoths", url: "https://techbehemoths.com/company/mastermind-web-developers" },
    { id: 4, logo: "/assets/img/socialprofiles/techreviewer.png", alt: "Techreviewer", url: "https://techreviewer.co/companies/mastermind-web-developers" },
    { id: 5, logo: "/assets/img/socialprofiles/clutch.png", alt: "Clutch", url: "https://clutch.co/profile/mastermind-web-developers" },
    { id: 6, logo: "/assets/img/socialprofiles/superbcompanies.png", alt: "Superb Companies", url: "https://superbcompanies.com/organizations/mastermind-web-developers/" },
    { id: 7, logo: "/assets/img/socialprofiles/exportersindia.png", alt: "Exporters India", url: "https://www.exportersindia.com/mastermind-web-developers-pune/" },
    { id: 8, logo: "/assets/img/socialprofiles/puneonline.png", alt: "Pune Online", url: "https://www.puneonline.in/business/mastermind-web-developers-63888" },
];

const AboutV1 = ({ lightMode }: DataType) => {
    const [isOpen, setOpen] = useState(false);
    const containerRef = useScrollAnimation();
    const constellationWrapperRef = useRef<HTMLDivElement>(null);
    useThumbParallax();

    useEffect(() => {
        const wrapper = constellationWrapperRef.current;
        if (!wrapper) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 30;
            const y = (e.clientY - rect.top - rect.height / 2) / 30;
            wrapper.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        };

        const handleMouseLeave = () => {
            wrapper.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div id="about" className={`about-style-one-area bg-cover default-padding ${lightMode ? 'light-mode' : ''}`}
                style={{ backgroundImage: lightMode ? 'none' : 'url(/assets/img/shape/13.png)' }}>
                <div className="container">
                    <div className="row mb-80 mb-md-50 mb-xs-30">
                        <div className="col-lg-3">
                            <div className="about-style-one-left-info">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={150} enableScrollSpy /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Completed Projects</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={500} enableScrollSpy /></div>
                                        <div className="operator">+</div>
                                    </div>
                                    <span className="medium">Awesome Clients</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1">
                            <div className="about-content">
                                <div className="about-style-one-info text-scroll-animation" ref={containerRef}>
                                    <div className="d-flex">
                                        {lightMode ?
                                            <Link to="#"><img src={arrowThemeIcon} alt="Image Not Found" /></Link> :
                                            <Link to="#"><img src={arrowIcon} alt="Image Not Found" /></Link>
                                        }
                                        <TextScrollAnimation triggerClassName="text">
                                            <h2 className="title text">Your Trusted Partner in Digital Marketing.</h2>
                                        </TextScrollAnimation>
                                    </div>
                                    <p className="text" style={{ fontWeight: "bold" }}>
                                        Where AI Meets Creativity for Smarter Marketing
                                    </p>
                                    <p className="text">
                                        At MasterMind Web Developers we believe the future of marketing is AI-powered, data-driven, and creativity-fueled. Based in Pune, we are a leading digital marketing agency with 8+ years of proven expertise in building brands that win online. Our team of strategists, designers, and tech innovators specialize in SEO, PPC, social media, and AI-driven campaigns that deliver measurable ROI. Unlike traditional agencies, we harness the power of artificial intelligence to predict trends, optimize campaigns in real time, and personalize customer journeys—giving your business the unfair advantage it deserves. With a reputation for trust, transparency, and results, we are proud to be the go-to digital growth partner for startups, SMEs, and enterprises across India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="platform-recognition-content">
                                <h2 className="platform-title">Recognized On Major Platforms</h2>
                                <p>
                                    Our commitment to excellence and results has been recognized by leading industry platforms. We are proud to be a trusted partner for businesses seeking to elevate their digital presence and achieve measurable growth.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="constellation-wrapper" ref={constellationWrapperRef}>
                                <div className="constellation-inner">
                                    {platformsData.map((platform, index) => (
                                        <a
                                            href={platform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`platform-card platform-${index + 1}`}
                                            key={platform.id}
                                        >
                                            <img src={platform.logo} alt={platform.alt} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo channel='youtube' isOpen={isOpen} videoId="izTDbJ23_ws" onClose={() => setOpen(false)} />
        </>
    );
};

export default AboutV1;
