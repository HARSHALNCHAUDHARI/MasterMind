import { Link } from "react-router-dom";
import SplitTextV2 from "../animation/SplitTextV2.jsx"
import useScrollAnimation from "../../hooks/useScrollAnimation.js";


interface DataType {
    sectionClass?: string;
    title?: string;
    titleBold?: string
}


const QuickContact2 = ({ sectionClass, title, titleBold }: DataType) => {
    const containerRef = useScrollAnimation();


    return (
        <>
            <div className={`quick-contact-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2">
                            <div className="quick-contact-items text-scroll-animation" ref={containerRef}>
                                <h2 className="split-text">
                                    <SplitTextV2
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        {title ? title : "Get"} <span>&nbsp;</span> <strong>{titleBold ? titleBold : 'Touch'}</strong>
                                    </SplitTextV2>
                                </h2>

                                <div className="pl-100 pl-xs-0 d-flex align-items-center">
                                    <p className="text">
                                        Stop losing leads to your competitors. We're here to turn your website into your top-performing salesperson, delivering consistent organic traffic and a powerful return on investment. Ready to transform your digital presence and hire SEO expert support?
                                    </p>
                                    <div className="btn-large-border text-end">
                                        <Link to="/ContactUsPage"><i className="fas fa-long-arrow-right" /> Get a Quote</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default QuickContact2;
