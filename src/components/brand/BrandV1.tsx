import { 
    FaHeartbeat, 
    FaGraduationCap, 
    FaShoppingCart, 
    FaRocket, 
    FaPlane, 
    FaDollarSign, 
    FaLaptopCode, 
    FaTshirt, 
    FaUtensils 
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface DataType {
    lightMode?: boolean;
}

const BrandV1 = ({ lightMode }: DataType) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('bg-dark') ||
                          document.documentElement.getAttribute('data-theme') === 'dark';
            setIsDarkMode(isDark);
        };
        
        checkDarkMode();
        
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class', 'data-theme'] 
        });
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => observer.disconnect();
    }, []);

    const isLightMode = lightMode !== undefined ? lightMode : !isDarkMode;

    return (
        <>
            <div 
                className={`brand-area ${isLightMode ? 'light-mode' : 'dark-mode'}`}
            >
                <div className="brand-style-one">
                    <div className="container-fill">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="site-heading text-center" style={{marginBottom:"0"}}>
                                    <h4 className="sub-title brand-heading">
                                        Industries We Work With
                                    </h4>
                                </div>
                                <div className="brand-items">
                                    <div className="brand-content">
                                        <div className="item">
                                            <div className="text-slider">
                                                <div className="slide-text">
                                                    <FaHeartbeat className="brand-icon" />
                                                    <span>Healthcare & Dental</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaGraduationCap className="brand-icon" />
                                                    <span>Education & EdTech</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaShoppingCart className="brand-icon" />
                                                    <span>E-commerce & Retail</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaHeartbeat className="brand-icon" />
                                                    <span>Healthcare & Dental</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="text-slider">
                                                <div className="slide-text">
                                                    <FaRocket className="brand-icon" />
                                                    <span>Startups & SMEs</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaPlane className="brand-icon" />
                                                    <span>Hospitality & Travel</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaDollarSign className="brand-icon" />
                                                    <span>Finance & FinTech</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaRocket className="brand-icon" />
                                                    <span>Startups & SMEs</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="text-slider">
                                                <div className="slide-text">
                                                    <FaLaptopCode className="brand-icon" />
                                                    <span>Technology & SaaS</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaTshirt className="brand-icon" />
                                                    <span>Fashion & Lifestyle</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaUtensils className="brand-icon" />
                                                    <span>Food & Beverage</span>
                                                </div>
                                                <div className="slide-text">
                                                    <FaLaptopCode className="brand-icon" />
                                                    <span>Technology & SaaS</span>
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

export default BrandV1;
