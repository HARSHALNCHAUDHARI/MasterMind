'use client'
import SplitText from "../animation/SplitText.jsx"
import {FaCheckCircle} from 'react-icons/fa';
import { useState, useEffect } from 'react';


interface DataType {
    title?: string;
}


interface ServiceDetailsProps {
    serviceInfo?: DataType;
    sectionClass?: string;
}


const ServiceProcess1 = ({sectionClass }: ServiceDetailsProps) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const hasDarkClass = document.body.classList.contains('bg-dark');
            setIsDarkTheme(hasDarkClass);
        };
        
        checkTheme();
        
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        
        return () => observer.disconnect();
    }, []);

    return (
        <>
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
                                    Our Website Development Process 
                                    </SplitText>
                                </h2>
                            </div>
                            <div className="process-style-two" style={{ 
                                paddingTop: '40px',
                                paddingBottom: '40px'
                            }}>
                                {/* Discovery */}
                                <div className="process-style-two-item" style={{ marginBottom: '60px' }}>
                                    <span style={{ transform: 'translateY(-50%)' }}>01</span>
                                    <h4>Discovery</h4>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Purpose:</strong> Align on goals, audience, scope, and success metrics.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Key activities:</strong> Stakeholder interviews, site/app audit, competitive review, analytics baseline, personas & journeys, sitemap, risk & dependency mapping, tech stack selection.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Deliverables:</strong> Project brief, prioritized feature list (MoSCoW), sitemap & user flows, timeline & milestones.
                                    </p>
                                    <p>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Your role:</strong> Share inputs, review scope, approve plan.
                                    </p>
                                </div>

                                {/* Design & Prototyping */}
                                <div className="process-style-two-item" style={{ marginBottom: '60px' }}>
                                    <span style={{ transform: 'translateY(-50%)' }}>02</span>
                                    <h4>Design & Prototyping</h4>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Purpose:</strong> Translate strategy into an intuitive, conversion-focused interface.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Key activities:</strong> Moodboards, design system (colors, type, components), low-fi to high-fi wireframes, clickable prototype (Figma), microcopy, accessibility planning.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Deliverables:</strong> High-fidelity screens for key pages, interactive prototype, design system tokens & guidelines.
                                    </p>
                                    <p>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Your role:</strong> Structured feedback in defined review rounds; sign-off on visuals and UX.
                                    </p>
                                </div>

                                {/* Development */}
                                <div className="process-style-two-item" style={{ marginBottom: '60px' }}>
                                    <span style={{ transform: 'translateY(-50%)' }}>03</span>
                                    <h4>Development</h4>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Purpose:</strong> Build fast, secure, scalable experiences on a modern stack.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Key activities:</strong> Git repo setup, CI/CD, component-driven frontend, CMS architecture, API/integration wiring, responsive templates, SEO foundations (metadata, schema), performance budget, security hardening.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Deliverables:</strong> Staging URL, code repository access, CMS credentials, implementation notes.
                                    </p>
                                    <p>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Your role:</strong> Content provision, periodic reviews on staging.
                                    </p>
                                </div>

                                {/* QA & Testing */}
                                <div className="process-style-two-item" style={{ marginBottom: '60px' }}>
                                    <span style={{ transform: 'translateY(-50%)' }}>04</span>
                                    <h4>QA & Testing</h4>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Purpose:</strong> Ensure reliability, speed, and accessibility across devices.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Key activities:</strong> Functional & regression testing, cross-browser/device checks, Lighthouse performance audits, WCAG 2.2 AA accessibility checks, form & payment tests, integration verification, pre-launch SEO audit, UAT with scripts.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Deliverables:</strong> Defect log with priorities, QA sign-off report, optimization recommendations.
                                    </p>
                                    <p>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Your role:</strong> UAT participation and final approval.
                                    </p>
                                </div>

                                {/* Deployment & Support */}
                                <div className="process-style-two-item">
                                    <span style={{ transform: 'translateY(-50%)' }}>05</span>
                                    <h4>Deployment & Support</h4>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Purpose:</strong> Launch safely, monitor closely, and keep improving.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Key activities:</strong> Backup & migration plan, DNS/SSL, zero-downtime deployment, analytics & event tracking, error/performance monitoring, post-launch hardening, admin training, documentation handover.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Deliverables:</strong> Launch checklist, training videos/docs, maintenance schedule, roadmap recommendations.
                                    </p>
                                    <p>
                                        <FaCheckCircle style={{ color: '#EE4B2B', fontSize: '14px', marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
                                        <strong style={{ color: '#EE4B2B' }}>Your role:</strong> Go-live window confirmation and access coordination.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ServiceProcess1;
