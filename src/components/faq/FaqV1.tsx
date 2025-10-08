import { useState, useEffect } from 'react';
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

interface FaqItem {
    id: number;
    title: string;
    content: string;
}

const FaqV1 = ({ sectionClass }: DataType) => {
    const [activeItems, setActiveItems] = useState<number[]>([1, 8]); // Default open items
    const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false); // New state for show more functionality
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Mobile detection on component mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleAccordion = (itemId: number) => {
        setActiveItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const faqData: FaqItem[] = [
        {
            id: 1,
            title: "Do you provide website maintenance and support after launch?",
            content: "Yes, absolutely. At MasterMind Web Developers, we provide 6 months of free website maintenance and support after your site goes live. This includes bug fixes, performance checks, updates, and minor enhancements. After the free period, we also offer affordable support packages to keep your website secure, updated, and running smoothly."
        },
        {
            id: 2,
            title: "Can you help with website content and images?",
            content: "Absolutely. Our team can assist with content writing, copy optimization, and sourcing high-quality images or graphics that align with your brand. We also provide guidance on SEO-friendly content to improve your visibility."
        },
        {
            id: 3,
            title: "Do you build custom websites or only use templates?",
            content: "We specialize in both. If you want a fast and budget-friendly solution, we can customize premium templates. For unique requirements, we design fully custom websites tailored to your brand identity and goals."
        },
        {
            id: 4,
            title: "What platforms and technologies do you use?",
            content: "We work with WordPress, custom PHP, ReactJS, NextJS, Angular, Node.js, Python, and more. Our choice depends on your project's needs—whether it's a CMS-based site, eCommerce platform, or enterprise-level application."
        },
        {
            id: 5,
            title: "Can you integrate third-party tools or APIs into my website?",
            content: "Yes, we can integrate CRMs, payment gateways, chatbots, analytics tools, booking engines, ERP systems, and any third-party APIs to enhance your website's functionality."
        },
        {
            id: 6,
            title: "Do you provide domain registration and hosting services?",
            content: "Yes. We assist clients with domain registration through trusted providers like Hostinger or GoDaddy. For hosting, we provide reliable and secure hosting on our own servers, ensuring fast performance, regular backups, and 24/7 uptime monitoring. This way, you get everything under one roof—domain, hosting, and website development—without any hassle."
        },
        {
            id: 7,
            title: "Will my website be mobile-friendly?",
            content: "100%. All websites we build are mobile-first and responsive, ensuring seamless user experience on smartphones, tablets, and desktops."
        }
    ];

    const faqData2: FaqItem[] = [
        {
            id: 8,
            title: "What if I need changes after the website goes live?",
            content: "If the required changes are minor, we provide them free of cost as part of our post-launch support. However, if you need major modifications—such as redesigning a section, adding new features, or making structural changes—we charge on a per-hour basis. The final cost is shared with you after evaluating the scope of work, so you always have clarity before we begin."
        },
        {
            id: 9,
            title: "How do you ensure website security?",
            content: "We implement SSL certificates, firewalls, malware protection, encrypted databases, and follow secure coding practices. For eCommerce sites, we set up PCI-compliant payment gateways."
        },
        {
            id: 10,
            title: "Can you build eCommerce websites for businesses in Pune?",
            content: "Yes, we specialize in eCommerce development with features like product catalogs, inventory management, secure checkout, multi-payment gateways, and scalability to handle large traffic."
        },
        {
            id: 11,
            title: "How do I update or manage my website after it's built?",
            content: "We provide CMS-based websites (WordPress, custom dashboards, etc.) so you can easily add/edit content without coding knowledge. We also provide training sessions and documentation."
        },
        {
            id: 12,
            title: "Do you work with clients outside Pune?",
            content: "Yes. While we're based in Pune, we serve clients across India and internationally via remote collaboration, video calls, and online project management tools."
        },
        {
            id: 13,
            title: "Why should I choose MasterMind Web Developers over freelancers?",
            content: "Unlike freelancers, we bring a full team of designers, developers, and SEO experts who ensure quality, scalability, timely delivery, and long-term support. Plus, our portfolio and track record prove consistent results."
        }
    ];

    // Combine all FAQs for mobile filtering
    const allFaqs: FaqItem[] = [...faqData, ...faqData2];
    
    // Get FAQs to display based on mobile state and show more state
    const getFaqsToDisplay = () => {
        if (isMobile && !showAllFaqs) {
            return allFaqs.slice(0, 5);
        }
        if (isMobile && showAllFaqs) {
            return allFaqs;
        }
        return { col1: faqData, col2: faqData2 };
    };

    const displayFaqs = getFaqsToDisplay();

    return (
        <>
            <div className={`faq-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="site-heading text-center mb-5">
                        {/* REMOVED INLINE STYLES - NOW USES CSS CLASSES */}
                        <h4 className="sub-title faq-subtitle">
                            FAQs
                        </h4>
                        <h2 className="title split-text faq-main-title">
                            <SplitText
                                delay={120}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                easing="easeOutCubic"
                                threshold={0.2}
                                rootMargin="-50px"
                            >
                               Frequently Asked Questions 
                            </SplitText>
                        </h2>
                    </div>
                    
                    {/* Mobile Layout - Single Column with Limited FAQs */}
                    {isMobile ? (
                        <div className="mobile-faq-layout">
                            <div className="faq-style-one">
                                {Array.isArray(displayFaqs) && displayFaqs.map((faq: FaqItem) => (
                                    <div key={faq.id} className="faq-item mb-4">
                                        <div 
                                            className="faq-header"
                                            onClick={() => toggleAccordion(faq.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <h3 className="faq-title">
                                                <span className="faq-icon">
                                                    {activeItems.includes(faq.id) ? '−' : '+'}
                                                </span>
                                                {faq.title}
                                            </h3>
                                        </div>
                                        {activeItems.includes(faq.id) && (
                                            <div className="faq-body">
                                                <p>{faq.content}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Show More/Show Less Button */}
                            {allFaqs.length > 5 && (
                                <div className="text-center mt-4">
                                    <button 
                                        className="show-more-btn"
                                        onClick={() => setShowAllFaqs(!showAllFaqs)}
                                    >
                                        {showAllFaqs ? 'Show Less' : `Show More (${allFaqs.length - 5} more)`}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Desktop Layout - Two Columns */
                        <div className="row gutter-xl">
                            <div className="col-lg-6">
                                <div className="faq-style-one">
                                    {!Array.isArray(displayFaqs) && displayFaqs.col1.map((faq: FaqItem) => (
                                        <div key={faq.id} className="faq-item mb-4">
                                            <div 
                                                className="faq-header"
                                                onClick={() => toggleAccordion(faq.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <h3 className="faq-title">
                                                    <span className="faq-icon">
                                                        {activeItems.includes(faq.id) ? '−' : '+'}
                                                    </span>
                                                    {faq.title}
                                                </h3>
                                            </div>
                                            {activeItems.includes(faq.id) && (
                                                <div className="faq-body">
                                                    <p>{faq.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="col-lg-6">
                                <div className="faq-style-one">
                                    {!Array.isArray(displayFaqs) && displayFaqs.col2.map((faq: FaqItem) => (
                                        <div key={faq.id} className="faq-item mb-4">
                                            <div 
                                                className="faq-header"
                                                onClick={() => toggleAccordion(faq.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <h3 className="faq-title">
                                                    <span className="faq-icon">
                                                        {activeItems.includes(faq.id) ? '−' : '+'}
                                                    </span>
                                                    {faq.title}
                                                </h3>
                                            </div>
                                            {activeItems.includes(faq.id) && (
                                                <div className="faq-body">
                                                    <p>{faq.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* THEME-AWARE FAQ STYLES WITH FIXED HEADINGS */}
            <style>{`
                /* THEME-AWARE HEADING COLORS */
                body:not(.bg-dark) .faq-subtitle {
                    color: #666666 !important; /* Dark gray for light theme */
                    font-size: 1.1rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 1rem;
                }
                
                body:not(.bg-dark) .faq-main-title {
                    color: #333333 !important; /* Dark text for light theme */
                    font-size: 2.5rem;
                    font-weight: 700;
                    line-height: 1.2;
                }
                
                .bg-dark .faq-subtitle {
                    color: #fcfcfc !important; /* Light gray for dark theme */
                    font-size: 1.1rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 1rem;
                }
                
                .bg-dark .faq-main-title {
                    color: #ffffff !important; /* White text for dark theme */
                    font-size: 2.5rem;
                    font-weight: 700;
                    line-height: 1.2;
                }

                /* LIGHT THEME FAQ STYLES */
                body:not(.bg-dark) .faq-item {
                    background: rgba(0, 0, 0, 0.03);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                body:not(.bg-dark) .faq-item:hover {
                    background: rgba(0, 0, 0, 0.06);
                    border-color: rgba(220, 38, 38, 0.3);
                }
                
                body:not(.bg-dark) .faq-header:hover {
                    background: rgba(220, 38, 38, 0.1);
                }
                
                body:not(.bg-dark) .faq-title {
                    color: #333333; /* Dark text for light theme */
                }
                
                body:not(.bg-dark) .faq-body {
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                body:not(.bg-dark) .faq-body p {
                    color: #555555; /* Slightly lighter for content */
                }
                
                /* DARK THEME FAQ STYLES */
                .bg-dark .faq-item {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .bg-dark .faq-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(220, 38, 38, 0.3);
                }
                
                .bg-dark .faq-header:hover {
                    background: rgba(220, 38, 38, 0.1);
                }
                
                .bg-dark .faq-title {
                    color: #ffffff; /* White text for dark theme */
                }
                
                .bg-dark .faq-body {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .bg-dark .faq-body p {
                    color: #e0e0e0; /* Slightly dimmed white for content */
                }
                
                /* COMMON STYLES */
                .faq-header {
                    padding: 1.25rem 1.5rem;
                    transition: all 0.3s ease;
                }
                
                .faq-title {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0;
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    line-height: 1.4;
                }
                
                .faq-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    background: #dc2626;
                    color: #ffffff;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    font-weight: bold;
                    line-height: 1;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                
                .faq-body {
                    padding: 0 1.5rem 1.5rem 1.5rem;
                    animation: fadeInDown 0.3s ease;
                }
                
                .faq-body p {
                    line-height: 1.7;
                    margin: 0;
                    padding-top: 1rem;
                    padding-left: 40px;
                    font-size: 0.95rem;
                }
                
                /* THEME-AWARE SHOW MORE BUTTON */
                .show-more-btn {
                    background: linear-gradient(135deg, #dc2626, #b91c1c);
                    color: #ffffff;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
                }
                
                .show-more-btn:hover {
                    background: linear-gradient(135deg, #b91c1c, #991b1b);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
                }
                
                .show-more-btn:active {
                    transform: translateY(0);
                }
                
                .mobile-faq-layout {
                    max-width: 100%;
                }
                
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .faq-header {
                        padding: 1rem 1.25rem;
                    }
                    
                    .faq-body {
                        padding: 0 1.25rem 1.25rem 1.25rem;
                    }
                    
                    .faq-body p {
                        padding-left: 35px;
                    }
                    
                    .faq-title {
                        font-size: 0.95rem;
                    }
                    
                    .faq-body p {
                        font-size: 0.9rem;
                    }
                    
                    .show-more-btn {
                        padding: 10px 24px;
                        font-size: 0.9rem;
                    }
                    
                    body:not(.bg-dark) .faq-main-title,
                    .bg-dark .faq-main-title {
                        font-size: 2rem;
                    }
                    
                    body:not(.bg-dark) .faq-subtitle,
                    .bg-dark .faq-subtitle {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </>
    );
};

export default FaqV1;
