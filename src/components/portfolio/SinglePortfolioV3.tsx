import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

interface DataType {
    id?: number;
    thumb?: string;
    
    titleFirst?: string;
    titleLast?: string;
    description?: string;
}

const SinglePortfolioV3 = ({ portfolio, darkMode = false }: { portfolio: DataType, darkMode?: boolean }) => {
    const { id, thumb, titleFirst, titleLast, description } = portfolio;
    const cardRef = useRef<HTMLDivElement>(null);
    const blobRef = useRef<HTMLDivElement>(null);

    // Function to format description text with proper structure
    const formatDescription = (desc: string) => {
        if (!desc) return [];
        
        return desc.split('•').filter(item => item.trim()).map(item => {
            const trimmedItem = item.trim();
            const dashIndex = trimmedItem.indexOf('–');
            
            if (dashIndex !== -1) {
                const title = trimmedItem.substring(0, dashIndex).trim();
                const description = trimmedItem.substring(dashIndex + 1).trim();
                
                return {
                    title,
                    description
                };
            }
            
            return {
                title: trimmedItem,
                description: ''
            };
        });
    };

    // Mouse move handler for blob effect
    useEffect(() => {
        const card = cardRef.current;
        const blob = blobRef.current;

        if (!card || !blob) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            blob.style.left = `${x}px`;
            blob.style.top = `${y}px`;
        };

        const handleMouseEnter = () => {
            blob.style.opacity = '1';
        };

        const handleMouseLeave = () => {
            blob.style.opacity = '0';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const descriptionItems = formatDescription(description || '');

    // Service-related icons based on service type
    const getServiceIcons = () => {
        const serviceType = titleLast?.toLowerCase() || '';
        
        if (serviceType.includes('solution') || serviceType.includes('app')) {
            return [
                'fas fa-code',
                'fas fa-mobile-alt', 
                'fas fa-laptop-code',
                'fas fa-server',
                'fab fa-react',
                'fab fa-node-js'
            ];
        } else if (serviceType.includes('marketing')) {
            return [
                'fas fa-chart-line',
                'fas fa-bullhorn',
                'fab fa-google',
                'fab fa-facebook',
                'fab fa-instagram',
                'fas fa-envelope'
            ];
        } else if (serviceType.includes('branding')) {
            return [
                'fas fa-palette',
                'fas fa-paint-brush',
                'fas fa-camera',
                'fas fa-video',
                'fas fa-magic',
                'fas fa-eye'
            ];
        } else if (serviceType.includes('growth') || serviceType.includes('reputation')) {
            return [
                'fas fa-star',
                'fas fa-trophy',
                'fas fa-thumbs-up',
                'fas fa-users',
                'fas fa-search',
                'fas fa-newspaper'
            ];
        } else if (serviceType.includes('ai') || serviceType.includes('powered')) {
            return [
                'fas fa-robot',
                'fas fa-brain',
                'fas fa-microphone',
                'fas fa-comments',
                'fas fa-cog',
                'fas fa-bolt'
            ];
        }
        
        // Default icons
        return [
            'fas fa-star',
            'fas fa-heart',
            'fas fa-rocket',
            'fas fa-gem',
            'fas fa-crown',
            'fas fa-fire'
        ];
    };

    return (
        <div 
            ref={cardRef}
            className={`travel-card glass-effect ${darkMode ? 'dark-mode' : 'light-mode'}`}
        >
            {/* Cursor blob effect */}
            <div ref={blobRef} className="cursor-blob"></div>
            
            <div className="travel-card-inner">
                {/* Background Image with Overlay */}
                <div className="travel-card-bg">
                    <img 
                        src={`/assets/img/services/${thumb}`} 
                        alt={`${titleFirst} ${titleLast}`}
                        loading="lazy"
                    />
                    <div className="travel-card-overlay"></div>
                </div>

                {/* Content Layout: Left Text + Right Circle */}
                <div className="travel-card-content">
                    {/* Left Content Section */}
                    <div className="travel-card-left">
                        <div className="travel-section-label">
                            <span>SERVICES</span>
                        </div>
                        
                        <h1 className="travel-card-title">
                            <Link to={`/project-details/${id}`}>
                                {titleFirst}<br />
                                <strong>{titleLast}</strong>
                            </Link>
                        </h1>
                        
                        <div className="travel-card-description">
                            {description && descriptionItems.length > 0 && (
                                <div className="description-content">
                                    {descriptionItems.map((item, index) => (
                                        <p key={index} className="service-item">
                                            <strong className="service-title">{item.title}</strong>
                                            {item.description && (
                                                <span className="service-description"> – {item.description}</span>
                                            )}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Circular Image */}
                    <div className="travel-card-right">
                        <div className="travel-card-circle">
                            <img 
                                src={`/assets/img/services/${thumb}`} 
                                alt={`${titleFirst} ${titleLast}`}
                            />
                            
                            {/* Floating Icons */}
                            <div className="floating-icons">
                                {getServiceIcons().map((iconClass, index) => (
                                    <div key={index} className={`floating-icon floating-icon-${index + 1}`}>
                                        <i className={iconClass}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePortfolioV3;