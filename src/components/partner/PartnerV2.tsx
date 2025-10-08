import thumb15 from "/assets/img/servicepage/service1about.png";
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

const PartnerV2 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`partner-style-two-area default-padding overflow-hidden blurry-shape-right ${sectionClass ? sectionClass : ""}`} style={{ marginTop: '80px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pr-110 pr-md-15 pr-xs-15">
                            <div className="partner-two-thumb">
                                <img src={thumb15} alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="brand-style-two-items">
                                <div className="mobile-header-center">
                                    <h4 className="sub-title">About</h4>
                                    <h2 className="title">
                                        <SplitText
                                            delay={100}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Trusted Website Design Company in Pune
                                        </SplitText>
                                    </h2>
                                </div>
                                
                                {/* Image shows right AFTER title on mobile - MOVED HERE! */}
                                <div className="mobile-image-container d-lg-none">
                                    <div className="partner-two-thumb-mobile">
                                        <img src={thumb15} alt="Image Not Found" />
                                    </div>
                                </div>
                                
                                <div className="mobile-content-justified">
                                    <p>
                                        As a leading website design company in Pune, Mastermind blends strategy, creativity, and technology to craft websites that win attention and drive measurable results.
                                    </p>
                                    <p>
                                        With years of hands-on experience across B2B, D2C, and services, our team has launched conversion‑focused sites for startups, SMEs, and established brands in sectors like education, real estate, eCommerce, healthcare, and professional services. 
                                    </p>
                                    <p>
                                        Every project begins with research and ends with performance—clean UX, mobile‑first layouts, and SEO‑optimized architecture that supports long‑term visibility. We align design with business outcomes: more qualified leads, better engagement, and higher sales. Our process is transparent, timelines are clear, and support is proactive.
                                    </p>
                                    <p>
                                        Whether building from scratch or redesigning a legacy website, we ensure your digital presence looks premium, loads fast, and is easy to manage. Partner with Mastermind to turn your website into a true growth engine in the Pune market.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnerV2;
