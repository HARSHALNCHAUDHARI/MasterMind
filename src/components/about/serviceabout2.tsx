import thumb15 from "/assets/img/servicepage/service2about.jpeg";
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

const serviceabout2 = ({ sectionClass }: DataType) => {
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
                                            Why SEO is Essential for Your Business
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
                                        In a city as competitive as Pune, relying solely on paid ads or social media is a short-term solution. Search Engine Optimization (SEO) is the critical strategy that builds long-term, trustworthy authority, securing continuous, free, and high-quality traffic from users actively searching for your products or services. It is the foundation for lasting digital success and market leadership.
                                    </p>
                                    <p>
                                       The digital landscape in Pune, with its strong presence in the IT, manufacturing, and education sectors, demands a sophisticated approach. To truly dominate the SERPs (Search Engine Results Pages), you need more than generic marketing—you need a specialized SEO expert in Pune to tackle local competition and fluctuating Google algorithms. Our focus is clear: to ensure your business captures maximum organic traffic and becomes the recognizable leader in your niche within the SEO Pune market.
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

export default serviceabout2;
