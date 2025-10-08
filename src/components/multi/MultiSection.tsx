import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import ExpertiseV1 from "../expertise/ExpertiseV1";
import ProjectIdeaV1 from "../project/ProjectIdeaV1";
import WhyChooseV1 from "../whyChoose/WhyChooseV1";

const MultiSection = () => {
    // Only apply horizontal scroll on desktop
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 991;
    
    if (isDesktop) {
        useHorizontalScroll();
    }

    const dividerStyle = {
        position: 'absolute' as const,
        right: '-1px',
        top: '0',
        bottom: '0',
        width: '2px',
        background: 'linear-gradient(to bottom, transparent 0%, #6b7280 20%, #9ca3af 50%, #6b7280 80%, transparent 100%)',
        zIndex: 10
    };

    const dividerDotStyle = {
        position: 'absolute' as const,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '8px',
        height: '8px',
        background: '#374151',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(55, 65, 81, 0.4)'
    };

    return (
        <>
            <div id="whychooseus" className="multi-section">
                <div className="thecontainer">
                    <div className="panel why-choose-panel">
                        <WhyChooseV1 />
                        {isDesktop && (
                            <div style={dividerStyle}>
                                <div style={dividerDotStyle}></div>
                            </div>
                        )}
                    </div>
                    
                    <div className="panel expertise-panel">
                        <ExpertiseV1 />
                        {isDesktop && (
                            <div style={dividerStyle}>
                                <div style={dividerDotStyle}></div>
                            </div>
                        )}
                    </div>
                    
                    <div className="panel contact-panel">
                        <ProjectIdeaV1 />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiSection;
