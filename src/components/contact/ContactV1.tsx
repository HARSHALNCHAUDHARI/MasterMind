import ContactForm from "../form/ContactForm";
import SocialShareV2 from "../social/SocialShareV2";

interface DataType {
    sectionClass?: string
}

const ContactV1 = ({ sectionClass }: DataType) => {
    const isMobile = window.innerWidth <= 767;

    return (
        <>
            <div id="contactform"  className={`contact-area overflow-hidden relative ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="contact-style-one-items">
                        <div className="row">
                            {!isMobile && (
                                <div className="col-tact-stye-one col-lg-4">
                                    <div className="contact-style-one-info">
                                        <ul className="contact-address">
                                            <li>
                                               <a className="phone-link" href="tel:+917385855808">
                                                  <i className="fas fa-user-headset"></i> +91 73858 55808
                                                </a> 
                                                <br/>
                                                <br/>
                                                <a className="phone-link" href="tel:+919175830994">
                                                  <i className="fas fa-user-headset"></i> +91 91758 30994
                                                </a>
                                            </li>
                                            <li>
                                                <div className="info">
                                                    <h4>Location</h4>
                                                    <p>
                                                      Ayush Business Square, A-213, Varale,<br /> Talegaon Dabhade, Maharashtra 410507.
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="info">
                                                    <h4>Official Email</h4>
                                                    <a href="mailto:info@MastermindWeb.in">info@MastermindWeb.in</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="info">
                                                    <h4>Follow Us</h4>
                                                    <ul className="social-link">
                                                        <SocialShareV2 />
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <div className={`col-tact-stye-one ${isMobile ? 'col-12' : 'col-lg-7 offset-lg-1'}`}>
                                <div className="contact-form-style-one">
                                    <h4 className="sub-title">Have Questions?</h4>
                                    <h2 className="title">Contact Us</h2>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactV1;
