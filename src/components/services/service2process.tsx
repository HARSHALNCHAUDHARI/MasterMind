'use client'
import SplitText from "../animation/SplitText.jsx"
import {FaCheckCircle} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';


interface DataType {
    title?: string;
}


interface ServiceDetailsProps {
    serviceInfo?: DataType;
    sectionClass?: string;
}


const ServiceProcess2 = ({sectionClass }: ServiceDetailsProps) => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileOrTablet(window.innerWidth <= 1024);
        };
        
        const checkTheme = () => {
            // Check if body has bg-dark class
            const hasDarkClass = document.body.classList.contains('bg-dark');
            setIsDarkTheme(hasDarkClass);
        };
        
        checkScreenSize();
        checkTheme();
        
        window.addEventListener('resize', checkScreenSize);
        
        // Observer to watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => {
            window.removeEventListener('resize', checkScreenSize);
            observer.disconnect();
        };
    }, []);

    const processItems = [
        {
            number: "01",
            title: "Discovery & Audit",
            points: [
                { bold: "Deep-dive", text: " into your website, competitors, and industry benchmarks." },
                { bold: "", text: "We begin with a thorough technical and content audit to uncover all opportunities and threats." }
            ]
        },
        {
            number: "02",
            title: "Keyword & Market Research",
            points: [
                { bold: "Identify opportunities", text: " aligned with commercial and informational intent." },
                { bold: "", text: "We find the exact search terms your future customers use, focusing on high-conversion intent." }
            ]
        },
        {
            number: "03",
            title: "On-Page Optimization",
            points: [
                { bold: "Tweak website structure", text: ", content, and metadata for relevance and performance." },
                { bold: "", text: "This phase locks in your relevance for target keywords to boost organic click-through rates (CTR)." }
            ]
        },
        {
            number: "04",
            title: "Content Strategy",
            points: [
                { bold: "Create and optimize", text: " high-quality content that attracts and converts." },
                { bold: "", text: "We develop pillar pages, blogs, and landing pages that establish your authority and engage users." }
            ]
        },
        {
            number: "05",
            title: "Backlink Creation",
            points: [
                { bold: "Build authority", text: " through strategic link-building campaigns." },
                { bold: "", text: "Our outreach team secures high-DA links, transferring powerful authority to your domain." }
            ]
        },
        {
            number: "06",
            title: "Performance Monitoring",
            points: [
                { bold: "Track KPIs", text: ", refine tactics, and report results monthly." },
                { bold: "", text: "We continually analyze data, adapt the strategy, and provide transparent reports on your progress and ROI." }
            ]
        }
    ];

    const renderProcessItem = (item: typeof processItems[0], index: number) => (
        <div className="process-style-two-item" style={{ marginBottom: isMobileOrTablet ? '0' : '60px' }} key={index}>
            <span style={{ 
                transform: 'translateY(-50%)',
                left: isMobileOrTablet ? '50%' : undefined,
                marginLeft: isMobileOrTablet ? '-20px' : undefined
            }}>
                {item.number}
            </span>
            <h4>{item.title}</h4>
            {item.points.map((point, pIndex) => (
                <p key={pIndex} style={{ marginBottom: pIndex === item.points.length - 1 ? '0' : '8px' }}>
                    <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                    {point.bold && <strong style={{ color: '#EE4B2B' }}>{point.bold}</strong>}
                    {point.text}
                </p>
            ))}
        </div>
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .swiper-pagination-bullet {
                        background: #EE4B2B !important;
                        opacity: 0.5;
                    }
                    .swiper-pagination-bullet-active {
                        opacity: 1 !important;
                    }
                `
            }} />
            
            <div className={`services-details-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="services-details-items">
                        <div className="mt-50 mt-xs-20" style={{ 
                            minHeight: '100vh',
                            paddingTop: '100px',
                            paddingBottom: '100px'
                        }}>
                            <div className="site-heading text-center" style={{ marginBottom: '80px' }}>
                                <h4 className="sub-title" style={{ 
                                    color: isDarkTheme ? '#ffffff' : '#000000', 
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '1.5rem'
                                }}>
                                    Process
                                </h4>
                                <h2 className="title" style={{ 
                                    color: isDarkTheme ? '#ffffff' : '#000000', 
                                    fontSize: '2.5rem',
                                    fontWeight: '700',
                                    lineHeight: '1.2',
                                    marginBottom: '0.5rem'
                                }}>
                                    <SplitText
                                        delay={80}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                    Our SEO Process 
                                    </SplitText>
                                </h2>
                            </div>
                            
                            {isMobileOrTablet ? (
                                <Swiper
                                    modules={[Pagination]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                        }
                                    }}
                                    style={{ paddingTop: '40px', paddingBottom: '60px' }}
                                >
                                    {processItems.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            {renderProcessItem(item, index)}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="process-style-two" style={{ 
                                    paddingTop: '40px',
                                    paddingBottom: '40px'
                                }}>
                                    {processItems.map((item, index) => renderProcessItem(item, index))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ServiceProcess2;
