import SplitText from "../animation/SplitText.jsx"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
// Lucide React Icons
import { 
    Home, 
    GraduationCap, 
    Stethoscope, 
    Camera, 
    Scale,
    PawPrint,
    Package,
    Dumbbell,
    UtensilsCrossed,
    Hotel,
    Palette,
    Recycle,
    Car,
    Scissors
} from 'lucide-react';
// React Icons
import { 
    FaTooth, 
    FaBroom, 
    FaBug,
    FaRing,
    FaChalkboardTeacher,
    FaBuilding,
    FaEye
} from 'react-icons/fa';

// Updated industries data with proper icons
const industriesData = [
    {
        "id": 1,
        "name": "Dentists",
        "icon": <FaTooth />
    },
    {
        "id": 2,
        "name": "Real Estate",
        "icon": <Home />
    },
    {
        "id": 3,
        "name": "Housekeeping Services",
        "icon": <FaBroom />
    },
    {
        "id": 4,
        "name": "Car Repair & Services",
        "icon": <Car />
    },
    {
        "id": 5,
        "name": "Photographers",
        "icon": <Camera />
    },
    {
        "id": 6,
        "name": "Pest Control Services",
        "icon": <FaBug />
    },
    {
        "id": 7,
        "name": "Education",
        "icon": <GraduationCap />
    },
    {
        "id": 8,
        "name": "Beauty Spa",
        "icon": <Scissors />
    },
    {
        "id": 9,
        "name": "Wedding Planning",
        "icon": <FaRing />
    },
    {
        "id": 10,
        "name": "Astrologers",
        "icon": <FaEye />
    },
    {
        "id": 11,
        "name": "Lawyers",
        "icon": <Scale />
    },
    {
        "id": 12,
        "name": "Hospitals",
        "icon": <Stethoscope />
    },
    {
        "id": 13,
        "name": "Pet Shops",
        "icon": <PawPrint />
    },
    {
        "id": 14,
        "name": "Packers & Movers",
        "icon": <Package />
    },
    {
        "id": 15,
        "name": "Gym",
        "icon": <Dumbbell />
    },
    {
        "id": 16,
        "name": "Restaurants",
        "icon": <UtensilsCrossed />
    },
    {
        "id": 17,
        "name": "Hotels",
        "icon": <Hotel />
    },
    {
        "id": 18,
        "name": "Interior Designers",
        "icon": <Palette />
    },
    {
        "id": 19,
        "name": "Scrap Buyers & Dealers",
        "icon": <Recycle />
    },
    {
        "id": 20,
        "name": "Coaching",
        "icon": <FaChalkboardTeacher />
    },
    {
        "id": 21,
        "name": "Training Institutes",
        "icon": <FaBuilding />
    }
];

const BrandV2 = () => {
    return (
        <>
            <div className="barnd-style-two-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="site-heading">
                                <h4 className="sub-title" style={{margin:"50px"}}>Industries</h4>
                                <h2 className="title split-text">
                                    <SplitText
                                        delay={120}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Industries We Serve & Tailored Solutions
                                    </SplitText>
                                </h2>
                            </div>
                            <div className="swiper-container-wrapper">
                                <Swiper className="brand-carousel swiper"
                                    loop={true}
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        el: '.swiper-pagination',
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        576: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 20
                                        },
                                        992: {
                                            slidesPerView: 4,
                                            spaceBetween: 25
                                        },
                                        1200: {
                                            slidesPerView: 5,
                                            spaceBetween: 30
                                        },
                                        1400: {
                                            slidesPerView: 6,
                                            spaceBetween: 40
                                        },
                                    }}
                                    modules={[Pagination, Keyboard, Autoplay]}
                                >
                                    <div className="swiper-wrapper">
                                        {industriesData.map(industry =>
                                            <SwiperSlide className="swiper-slide" key={industry.id}>
                                                <div className="industry-card">
                                                    <div className="industry-content">
                                                        <div className="industry-icon">
                                                            {industry.icon}
                                                        </div>
                                                        <div className="industry-name">
                                                            <h6>{industry.name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add custom CSS for industry cards with theme support */}
            <style>{`
                .barnd-style-two-area {
                    padding: 60px 0;
                    overflow-x: hidden;
                }
                
                .swiper-container-wrapper {
                    padding: 15px 0 30px 0;
                    overflow: visible;
                }
                
                .brand-carousel {
                    overflow: visible !important;
                    padding: 0;
                }
                
                .brand-carousel .swiper-wrapper {
                    align-items: stretch;
                }
                
                .brand-carousel .swiper-slide {
                    height: auto;
                    padding: 10px 0;
                    box-sizing: border-box;
                }
                
                /* THEME-AWARE INDUSTRY CARDS */
                .industry-card {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    height: 140px;
                    width: 100%;
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                }
                
                /* LIGHT THEME STYLES */
                body:not(.bg-dark) .industry-card {
                    background: rgba(0, 0, 0, 0.03);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    backdrop-filter: blur(10px);
                }
                
                body:not(.bg-dark) .industry-card:hover {
                    background: rgba(0, 0, 0, 0.06);
                    border-color: rgba(0, 0, 0, 0.12);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                }
                
                /* DARK THEME STYLES */
                .bg-dark .industry-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .bg-dark .industry-card:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.2);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                }
                
                .industry-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                }
                
                .industry-card:hover {
                    transform: translateY(-8px);
                    z-index: 10;
                }
                
                .industry-icon {
                    color: #ed2415;
                    transition: all 0.3s ease;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .industry-icon svg {
                    width: 40px;
                    height: 40px;
                }
                
                /* THEME-AWARE ICON HOVER COLORS */
                body:not(.bg-dark) .industry-card:hover .industry-icon {
                    transform: scale(1.1);
                    color: #000000; /* Black for light theme hover */
                }
                
                .bg-dark .industry-card:hover .industry-icon {
                    transform: scale(1.1);
                    color: #ffffff; /* White for dark theme hover */
                }
                
                .industry-name {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                
                /* THEME-AWARE TEXT COLORS */
                .industry-name h6 {
                    font-size: 0.95rem;
                    line-height: 1.3;
                    margin: 0;
                    font-weight: 500;
                    text-align: center;
                    max-width: 100%;
                }
                
                /* Light theme text color */
                body:not(.bg-dark) .industry-name h6 {
                    color: #333333; /* Dark text for light theme */
                }
                
                /* Dark theme text color */
                .bg-dark .industry-name h6 {
                    color: #ffffff; /* White text for dark theme */
                }
                
                @media (max-width: 768px) {
                    .barnd-style-two-area {
                        padding: 40px 0 20px 0;
                        overflow-x: hidden;
                    }
                    
                    .swiper-container-wrapper {
                        padding: 10px 0 15px 0;
                    }
                    
                    .brand-carousel .swiper-slide {
                        padding: 8px 0;
                    }
                    
                    .industry-card {
                        height: 130px;
                    }
                    
                    .industry-content {
                        padding: 12px;
                    }
                    
                    .industry-card:hover {
                        transform: translateY(-6px);
                    }
                    
                    .industry-icon {
                        margin-bottom: 10px;
                    }
                    
                    .industry-icon svg {
                        width: 36px;
                        height: 36px;
                    }
                    
                    .industry-name h6 {
                        font-size: 0.9rem;
                        line-height: 1.2;
                    }
                }
                
                @media (max-width: 576px) {
                    .barnd-style-two-area {
                        padding: 30px 0 10px 0;
                        overflow-x: hidden;
                    }
                    
                    .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                    
                    .swiper-container-wrapper {
                        padding: 8px 0 10px 0;
                        margin: 0;
                    }
                    
                    .brand-carousel {
                        margin: 0;
                        padding: 0 5px;
                    }
                    
                    .brand-carousel .swiper-slide {
                        padding: 6px 0;
                        width: calc(50% - 7.5px) !important;
                    }
                    
                    .industry-card {
                        height: 120px;
                        width: 100%;
                        margin: 0;
                    }
                    
                    .industry-content {
                        padding: 10px 8px;
                    }
                    
                    .industry-card:hover {
                        transform: translateY(-4px);
                    }
                    
                    .industry-icon {
                        margin-bottom: 8px;
                    }
                    
                    .industry-icon svg {
                        width: 32px;
                        height: 32px;
                    }
                    
                    .industry-name h6 {
                        font-size: 0.85rem;
                        line-height: 1.1;
                    }
                }
                
                @media (max-width: 400px) {
                    .brand-carousel .swiper-slide {
                        width: calc(50% - 5px) !important;
                    }
                    
                    .industry-content {
                        padding: 8px 6px;
                    }
                    
                    .industry-name h6 {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </>
    );
};

export default BrandV2;
