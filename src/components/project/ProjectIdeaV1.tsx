import React, { useState, useEffect } from 'react';

const ProjectIdeaV1 = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const containerStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        width: '100%'
    };
    
    const headingStyles: React.CSSProperties = {
        textAlign: 'left',
        marginBottom: '1rem'
    };
    
    const contactListStyles: React.CSSProperties = {
        paddingLeft: 0,
        listStyleType: 'none',
        textAlign: 'left',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    };
    
    const contactItemStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '1rem',
        textAlign: 'left',
        width: '100%'
    };
    
    const iconContainerStyles: React.CSSProperties = {
        flexShrink: 0,
        marginRight: '15px'
    };
    
    const infoStyles: React.CSSProperties = {
        textAlign: 'left',
        flex: 1
    };

    return (
        <>
            <div className="contact-panel-bg" style={{ backgroundImage: 'url(/assets/img/logo1.png)' }} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-7" style={containerStyles}>
                        <h4 className="sub-title" style={headingStyles}>
                            Have you project in mind?
                        </h4>
                        <h2 className="title" style={headingStyles}>
                            For instant support <br /> Please reach us
                        </h2>
                        <ul className="contact-list" style={contactListStyles}>
                            <li style={contactItemStyles}>
                                <div className="icon" style={iconContainerStyles}>
                                    <i className="fas fa-phone fa-rotate-90" />
                                </div>
                                <div className="info" style={infoStyles}>
                                    <h4>Phone</h4>
                                    <a className="phone-link" href="tel:+917385855808">
                                        +91 73858 55808
                                    </a> <br />
                                    <a className="phone-link" href="tel:+919175830994">
                                        +91 91758 30994
                                    </a> <br />
                                </div>
                            </li>
                            <li style={contactItemStyles}>
                                <div className="icon" style={iconContainerStyles}>
                                    <i className="fas fa-envelope-open" />
                                </div>
                                <div className="info" style={infoStyles}>
                                    <h4>Official Email</h4>
                                    <a href="mailto:info@MastermindWeb.in">
                                        info@MastermindWeb.in
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectIdeaV1;
