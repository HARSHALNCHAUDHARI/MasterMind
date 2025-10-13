import PriceV2Data from "../../assets/jsonData/price/PriceV2Data.json"
import SinglePriceV2 from "./SinglePriceV2.js";
import SplitText from "../animation/SplitText.jsx"


const PriceV2 = () => {
    return (
        <>
            <div id="pricing" className="pricing-style-two-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h5 className="sub-title">Pricing</h5>
                                <h2 className="title">
                                    <SplitText
                                        delay={20}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                      SEO Services & Digital Marketing Packages
                                    </SplitText>
                                </h2>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="pricing-style-two-items">
                        <div className="row">
                            {PriceV2Data.plans.map(plan =>
                                <div className="col-xl-4 col-lg-6 col-md-6 mb-30" key={plan.id}>
                                    <SinglePriceV2 plan={plan} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default PriceV2;
