import team10 from '/assets/img/team/10.jpg';
import team11 from '/assets/img/team/11.jpg';
import team12 from '/assets/img/team/12.jpg';
import arrowIcon from '/assets/img/icon/arrow.png';
import arrowThemeIcon from '/assets/img/icon/arrow-theme.png';
import banner3 from '/assets/img/about.jpg';
import { Link } from "react-router-dom";
import SkillProgress from '../process/SkillProgress';
import SkillProgressData from "../../assets/jsonData/progress/SkillProgressData.json";
import ModalVideo from 'react-modal-video';
import { useState } from 'react';
import TextScrollAnimation from '../animation/TextScrollAnimation';
import CountUp from 'react-countup';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useThumbParallax from '../../hooks/useThumbParallax';


interface DataType {
    lightMode?: boolean;
}

const AboutV1 = ({ lightMode }: DataType) => {

    const [isOpen, setOpen] = useState(false);
    const containerRef = useScrollAnimation();

    useThumbParallax()

    return (
        <>
            <div className="about-style-one-area bg-cover default-padding"
                style={{ backgroundImage: lightMode ? 'none' : 'url(/assets/img/shape/13.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="about-style-one-left-info">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={48} enableScrollSpy /></div>
                                        <div className="operator">K</div>
                                    </div>
                                    <span className="medium">Completed Projects</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={16} enableScrollSpy /></div>
                                        <div className="operator">M</div>
                                    </div>
                                    <span className="medium">Awesome Clients</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 offset-lg-1">
                            <div className="about-style-one-info text-scroll-animation" ref={containerRef}>
                                                                <div className="d-flex">

                                    {lightMode ?
                                        <Link to="/about-us"><img src={arrowThemeIcon} alt="Image Not Found" /></Link> :
                                        <Link to="/about-us"><img src={arrowIcon} alt="Image Not Found" /></Link>
                                    }

                                    <TextScrollAnimation triggerClassName="text">
                                        <h2 className="title text">Your Trusted Partner in Digital Marketing.</h2>
                                    </TextScrollAnimation>
                                </div>
                                <p className="text" style={{fontWeight:"bold"}}>
                                    Where AI Meets Creativity for Smarter Marketing
                                </p>



                                <p className="text">
                                   At MasterMind Web Developers we believe the future of marketing is AI-powered, data-driven, and creativity-fueled. Based in Pune, we are a leading digital marketing agency with 8+ years of proven expertise in building brands that win online. Our team of strategists, designers, and tech innovators specialize in SEO, PPC, social media, and AI-driven campaigns that deliver measurable ROI.
Unlike traditional agencies, we harness the power of artificial intelligence to predict trends, optimize campaigns in real time, and personalize customer journeys—giving your business the unfair advantage it deserves. With a reputation for trust, transparency, and results, we are proud to be the go-to digital growth partner for startups, SMEs, and enterprises across India.

                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bottom-info mt-80 mt-md-50 mt-xs-30">
                                <div className="thumb">
                                    <div className="img-container">
                                        <img src={banner3} alt="Image Not Found" />
                                    </div>
                                    <div className="about-skills">
                                        {/* Progress Bar */}
                                        {SkillProgressData.map(skill =>
                                            <SkillProgress skill={skill} key={skill.id} />
                                        )}
                                    </div>
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