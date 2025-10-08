const FooterV3 = () => {
    return (
        <>
            <footer>
                <div className="footer-box">
                    <div className="container">
                        <div className="f-items">
                            {/* Centered Heading */}
                            <div className="row">
                                <div className="col-12 text-center mb-4 footer-item">
                                    <div className="top">
                                        <h2>Get Support?</h2>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                {/* Left Section - Quick Links & Social Links */}
                                <div className="col-lg-6 footer-item">
                                    {/* Address Information */}
                                    <div className="address-list md:ml-50">
                                        <h4 className="widget-title">Contact Info</h4>
                                        <ul className="contact-info-list mb-4 mobile-center">
                                            <li className="contact-item">
                                                <i className="fas fa-phone fa-rotate-90"></i>
                                                <div className="phone-numbers">
                                                    
                                                    <a href="tel:+917385855808">+91 73858 55808</a>
                                                   
                                                    <a href="tel:+919175830994">+91 91758 30994</a>
                                                </div>
                                            </li>
                                            <li className="contact-item">
                                                <i className="fas fa-envelope"></i>
                                                <a href="mailto:info@MastermindWeb.in">info@MastermindWeb.in</a>
                                            </li>
                                            <li className="contact-item">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>Ayush Business Square, A-213, Varale,<br/> Talegaon Dabhade, Maharashtra 410507.</span>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                
                                {/* Right Section - Google Map & Address */}
                                <div className="col-lg-6 footer-item ">
                                    <h4 className="widget-title">Find Us</h4>
                                    
                                    {/* Google Map Embed */}
                                    <div className="map-container mb-4">
                                        
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.1675338572404!2d73.68662437536136!3d18.746052282391798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b3e95bec21e3%3A0xcaf78af4c01eaaf!2sMasterMind%20Web%20Developers%20Pune!5e0!3m2!1sen!2sin!4v1756501852587!5m2!1sen!2sin"
                                            width="80%"
                                            height="250"
                                            style={{ border: 0, borderRadius: '8px' }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Office Location"
                                        />
                                    </div>
                                
                                </div>
                              
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <p>
                                        Copyright &copy; {(new Date().getFullYear())} MasterMind. All Rights Reserved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV3;
