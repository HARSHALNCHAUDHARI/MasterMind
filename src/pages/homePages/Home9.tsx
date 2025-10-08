import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BannerV1 from "../../components/banner/BannerV1";
import BrandV1 from "../../components/brand/BrandV1";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV2 from "../../components/header/HeaderV2";
import MultiSection from "../../components/multi/MultiSection";
import TestimonialV1 from "../../components/testimonial/TestimonialV1";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV3 from "../../components/banner/BannerV3";
import ContactV1 from "../../components/contact/ContactV1";
import PortfolioV3 from "../../components/portfolio/PortfolioV3";
import BlogV2 from "../../components/blog/BlogV2";







// Type definitions for Modal props
interface ModalOption {
    name: string;
    href: string;
}

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    options: ModalOption[];
}

// Reusable Modal Component
const Modal: React.FC<ModalProps> = ({ show, onClose, title, options }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>&times;</button>
                <h2>{title}</h2>
                <div className="modal-options">
                    {options.map((option, index) => (
                        <a key={index} href={option.href} target="_blank" rel="noopener noreferrer" className="modal-option">
                            {option.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Home9 = () => {
    const [showWhatsappModal, setShowWhatsappModal] = useState(false);
    const [showCallModal, setShowCallModal] = useState(false);

    const whatsappOptions: ModalOption[] = [
        { name: 'Chetan Patil', href: 'https://wa.me/+917385855808' },
        { name: 'Ritesh Patil', href: 'https://wa.me/+919175830994' },
    ];

    const callOptions: ModalOption[] = [
        { name: 'Chetan Patil', href: 'tel:+917385855808' },
        { name: 'Ritesh Patil', href: 'tel:+919175830994' },
    ];

    return (
        <>
            <Helmet>
                <title>MasterMind Web Developers</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                <style>
                    {`
                        html, body {
                            background: transparent !important;
                        }
                    `}
                </style>
            </Helmet>

            {/* Animated background - kept outside of the main scroll container */}
            <div className="tech-elements">
                <svg className="tech-svg" viewBox="0 0 1920 1080">
                    <defs>
                        <linearGradient id="techGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,59,48,0.6)" />
                            <stop offset="100%" stopColor="rgba(255,69,58,0.2)" />
                        </linearGradient>
                        <linearGradient id="techGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,45,85,0.5)" />
                            <stop offset="100%" stopColor="rgba(235,87,87,0.2)" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {/* SVG elements from your original code */}
                    <polygon className="tech-element hex-1" points="200,100 250,130 250,190 200,220 150,190 150,130" 
                             fill="none" stroke="url(#techGrad1)" strokeWidth="2" filter="url(#glow)" />
                    <polygon className="tech-element hex-2" points="800,200 850,230 850,290 800,320 750,290 750,230" 
                             fill="url(#techGrad1)" opacity="0.3" />
                    <polygon className="tech-element hex-3" points="1400,150 1450,180 1450,240 1400,270 1350,240 1350,180" 
                             fill="none" stroke="url(#techGrad2)" strokeWidth="1.5" />
                    <path className="circuit-path path-1" d="M 150 400 L 300 400 L 320 380 L 500 380" 
                          stroke="url(#techGrad1)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    <path className="circuit-path path-2" d="M 600 500 L 800 500 L 820 520 L 1000 520" 
                          stroke="url(#techGrad2)" strokeWidth="1.5" fill="none" strokeDasharray="8,3" />
                    <path className="circuit-path path-3" d="M 1100 600 L 1300 600 L 1320 580 L 1500 580" 
                          stroke="url(#techGrad1)" strokeWidth="2" fill="none" strokeDasharray="4,6" />
                    <rect className="tech-rect rect-1" x="300" y="150" width="80" height="40" 
                          fill="none" stroke="url(#techGrad1)" strokeWidth="1.5" rx="5" />
                    <rect className="tech-rect rect-2" x="1000" y="300" width="60" height="30" 
                          fill="url(#techGrad2)" opacity="0.4" rx="3" />
                    <rect className="tech-rect rect-3" x="500" y="700" width="90" height="35" 
                          fill="none" stroke="url(#techGrad1)" strokeWidth="2" rx="4" />
                    <circle className="tech-node node-1" cx="400" cy="250" r="6" fill="url(#techGrad1)" />
                    <circle className="tech-node node-2" cx="700" cy="400" r="4" fill="url(#techGrad2)" />
                    <circle className="tech-node node-3" cx="1200" cy="350" r="5" fill="url(#techGrad1)" />
                    <circle className="tech-node node-4" cx="600" cy="650" r="7" fill="url(#techGrad2)" />
                    <path className="vector-arrow arrow-1" d="M 100 300 L 180 300 M 170 290 L 180 300 L 170 310" 
                          stroke="url(#techGrad1)" strokeWidth="2" fill="none" />
                    <path className="vector-arrow arrow-2" d="M 900 450 L 980 450 M 970 440 L 980 450 L 970 460" 
                          stroke="url(#techGrad2)" strokeWidth="1.5" fill="none" />
                </svg>
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className={`floating-particle particle-${i + 1}`}></div>
                ))}
            </div>
            
            {/* Social Buttons */}
            <div className="social-buttons-container">
                <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); setShowWhatsappModal(true); }} className="social-button whatsapp">
                    <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); setShowCallModal(true); }} className="social-button call">
                    <i className="fas fa-phone"></i>
                </a>
            </div>

            {/* Modals */}
            <Modal
                show={showWhatsappModal}
                onClose={() => setShowWhatsappModal(false)}
                title="Chat on WhatsApp"
                options={whatsappOptions}
            />
            <Modal
                show={showCallModal}
                onClose={() => setShowCallModal(false)}
                title="Call Us"
                options={callOptions}
            />

            <div id="home" className="smooth-scroll-container">
                <HeaderV2 />
                <CursorEffect />
                <BannerV1 />
                <AboutV1 />
                <BrandV1 />
                <PortfolioV3 hasTitle={true} sectionClass='default-padding' />
                <MultiSection />
                <BannerV3 />
                <TestimonialV1 />
                <BlogV2 />
                <ContactV1 />
                <FooterV3 />
                <DarkClass />
                <ThemeDark />
            </div>
            
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* --- Core Styles for Background --- */
                    .smooth-scroll-container {
                        position: relative;
                        z-index: 1;
                    }
                    .tech-elements {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        pointer-events: none;
                        z-index: -1;
                        overflow: hidden;
                    }
                    .tech-svg { width: 100%; height: 100%; }
                    .tech-element { animation: techFloat 12s ease-in-out infinite; }
                    .hex-1 { animation-delay: 0s; transform-origin: center; }
                    .hex-2 { animation-delay: 4s; transform-origin: center; }
                    .hex-3 { animation-delay: 8s; transform-origin: center; }
                    .circuit-path { animation: circuitPulse 6s linear infinite; }
                    .path-1 { animation-delay: 0s; }
                    .path-2 { animation-delay: 2s; }
                    .path-3 { animation-delay: 4s; }
                    .tech-rect { animation: rectGlow 8s ease-in-out infinite; }
                    .rect-1 { animation-delay: 1s; }
                    .rect-2 { animation-delay: 3s; }
                    .rect-3 { animation-delay: 5s; }
                    .tech-node { animation: nodePulse 4s ease-in-out infinite; }
                    .node-1 { animation-delay: 0s; }
                    .node-2 { animation-delay: 1s; }
                    .node-3 { animation-delay: 2s; }
                    .node-4 { animation-delay: 3s; }
                    .vector-arrow { animation: arrowMove 5s ease-in-out infinite; }
                    .arrow-1 { animation-delay: 0s; }
                    .arrow-2 { animation-delay: 2.5s; }
                    .floating-particle {
                        position: absolute; width: 4px; height: 4px;
                        background: rgba(255, 59, 48, 0.7);
                        border-radius: 50%;
                        animation: particleFloat 15s ease-in-out infinite;
                        box-shadow: 0 0 10px rgba(255, 59, 48, 0.4);
                    }
                    /* Particle positions */
                    .particle-1 { top: 10%; left: 5%; animation-delay: 0s; }
                    .particle-2 { top: 15%; left: 95%; animation-delay: 1s; }
                    .particle-3 { top: 25%; left: 10%; animation-delay: 2s; }
                    .particle-4 { top: 30%; left: 90%; animation-delay: 3s; }
                    .particle-5 { top: 40%; left: 8%; animation-delay: 4s; }
                    .particle-6 { top: 45%; left: 92%; animation-delay: 5s; }
                    .particle-7 { top: 55%; left: 12%; animation-delay: 6s; }
                    .particle-8 { top: 60%; left: 88%; animation-delay: 7s; }
                    .particle-9 { top: 70%; left: 15%; animation-delay: 8s; }
                    .particle-10 { top: 75%; left: 85%; animation-delay: 9s; }
                    .particle-11 { top: 20%; left: 50%; animation-delay: 10s; }
                    .particle-12 { top: 35%; left: 45%; animation-delay: 11s; }
                    .particle-13 { top: 50%; left: 55%; animation-delay: 12s; }
                    .particle-14 { top: 65%; left: 40%; animation-delay: 13s; }
                    .particle-15 { top: 80%; left: 60%; animation-delay: 14s; }
                    .particle-16 { top: 12%; left: 75%; animation-delay: 0.5s; }
                    .particle-17 { top: 38%; left: 25%; animation-delay: 1.5s; }
                    .particle-18 { top: 58%; left: 70%; animation-delay: 2.5s; }
                    .particle-19 { top: 78%; left: 30%; animation-delay: 3.5s; }
                    .particle-20 { top: 85%; left: 80%; animation-delay: 4.5s; }

                    /* --- Keyframes --- */
                    @keyframes techFloat { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; } 50% { transform: translateY(-20px) rotate(5deg); opacity: 1; } }
                    @keyframes circuitPulse { 0% { stroke-dashoffset: 0; opacity: 0.4; } 50% { opacity: 0.8; } 100% { stroke-dashoffset: 40; opacity: 0.4; } }
                    @keyframes rectGlow { 0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 5px rgba(255,59,48,0.3)); } 50% { opacity: 0.8; filter: drop-shadow(0 0 15px rgba(255,59,48,0.6)); } }
                    @keyframes nodePulse { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.5); opacity: 1; } }
                    @keyframes arrowMove { 0%, 100% { transform: translateX(0); opacity: 0.5; } 50% { transform: translateX(20px); opacity: 1; } }
                    @keyframes particleFloat { 0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.4; } 33% { transform: translateY(-30px) translateX(15px) scale(1.2); opacity: 0.8; } 66% { transform: translateY(20px) translateX(-10px) scale(0.8); opacity: 0.6; } }

                    /* --- Responsive and Social Button Styles --- */
                    @media (max-width: 768px) { .tech-svg { transform: scale(0.8); } .floating-particle { width: 3px; height: 3px; } }
                    .social-buttons-container { position: fixed; bottom: 20px; left: 20px; display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
                    .social-button { display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 50%; font-size: 24px; text-decoration: none; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease; background-color: #ffffff19; border: 1px solid #fafafa47; }
                    .social-button:hover { transform: scale(1.1); }
                    .social-button.whatsapp { color: #00cc66; }
                    .social-button.call { color: #0073e6; transform: rotate(90deg); }

                    /* --- Modal Styles --- */
                    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
                    .modal-content { background: rgba(0, 0, 0, 0.2) !important; backdrop-filter: blur(10px) !important; -webkit-backdrop-filter: blur(10px) !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; padding: 30px; border-radius: 10px; width: 90%; max-width: 400px; text-align: center; position: relative; color: #fff !important; }
                    .close-modal { position: absolute; top: 10px; right: 15px; font-size: 28px; border: none; background: none; cursor: pointer; color: #ccc; }
                    .modal-content h2 { margin-bottom: 20px; font-size: 24px; }
                    .modal-options { display: flex; flex-direction: column; gap: 15px; }
                    .modal-option { padding: 15px; background: rgba(255, 255, 255, 0.1) !important; color: #fff !important; text-decoration: none; border-radius: 8px; transition: background-color 0.3s ease; font-weight: 500; border: 1px solid rgba(255, 255, 255, 0.2) !important; }
                    .modal-option:hover { background: rgba(255, 255, 255, 0.2) !important; }
                `
            }} />
        </>
    );
};

export default Home9;
