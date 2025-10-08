import Animate from '../animation/Animate';
import thumb3 from '/assets/img/thumb/image3.png';

interface DataType {
    sectionClass?: string
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`${sectionClass ? sectionClass : ""}`}>
                <div className="container" style={{padding:"20px"}}>
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="thumb-style-one">
                                <img src={thumb3} alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="choose-us-style-one">
                                <div className="pl-80 pl-md-0 pl-xs-0">
                                    <h4 className="sub-title">Why Choose Us</h4>
                                    <h2 className="title" > MasterMind Web Developers</h2>
                                    <div className="faq-style-one accordion mt-30" id="faqAccordion">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Result-Oriented Strategies
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        We don't just create campaigns, we deliver measurable growth for your business.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Custom Digital Solutions
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Every business is unique, so we design tailor-made strategies that fit your goals.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Creative & Technical Expertise
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                       From eye-catching websites to high-performing ad campaigns, we blend creativity with technology.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                         <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFour">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Proven Track Record 
                                                </button>
                                            </h2>
                                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                      Handling 25+ projects across industries within months of launch, showcasing trust & performance.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFive">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                    Transparent & Flexible Plans 
                                                </button>
                                            </h2>
                                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                      Clear pricing, no hidden costs, and the freedom to pause or scale anytime.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                         <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingSix">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                    24×7 Support 
                                                </button>
                                            </h2>
                                            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                      Always available to resolve queries and keep your business running smoothly online.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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

export default WhyChooseV1;
