import service2data from "../../assets/jsonData/services/service2data.json";
import SingleServiceV6 from "./SingleServiceV6.js";
import SplitText from "../animation/SplitText.jsx";
import useItemMoveTopEffect from "../../hooks/useItemMoveTopEffect.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";

interface DataType {
  sectionClass?: string;
  hasTitle?: boolean;
}

const Services2 = ({ sectionClass, hasTitle }: DataType) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useItemMoveTopEffect();

  return (
    <>
      <div className={`services-style-six-area default-padding blurry-shape-left ${sectionClass ? sectionClass : ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="service-style-six-info">
                <h4 className="sub-title">Services We Offer</h4>
<h2 
  className="title3 split-text" 
  style={{ maxWidth: '500px' }}
>
  <SplitText
    delay={40}
    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
    easing="easeOutCubic"
    threshold={0.2}
    rootMargin="-50px"
  >
    Our Comprehensive SEO Services in Pune Include
  </SplitText>
</h2>

                <p className="split-text services-description">
  <SplitText
    delay={5}
    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
    easing="easeOutCubic"
    threshold={0.2}
    rootMargin="-50px"
  >
    At MasterMind Web Developers, comprehensive SEO services blend technical excellence, strategic keyword targeting, and authoritative link building to elevate rankings, increase qualified traffic, and drive measurable business growth in Pune and beyond.
  </SplitText>
</p>

              </div>
            </div>

            <div className="col-xl-6 offset-xl-1 col-lg-7">
              <div className="service-style-six-items item-move-top-items">
                {isMobile ? (
                  <Swiper
                    className="services-mobile-swiper"
                    slidesPerView={1}
                    spaceBetween={20}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[Pagination, Autoplay]}
                  >
                    {service2data.map((service) => (
                      <SwiperSlide key={service.id}>
                        <ul>
                          <SingleServiceV6 service={service} />
                        </ul>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <ul>
                    {service2data.map((service) => (
                      <SingleServiceV6 service={service} key={service.id} />
                    ))}
                  </ul>
                )}

                {/* Spacer used by the hook to exactly reserve the cumulative pin distance */}
                <div className="item-move-top-spacer" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style>{`
        .item-move-top-spacer { height: 0; pointer-events: none; }

        @media (max-width: 767px) {
          .services-style-six-area { padding-top: 120px !important; }
          .services-description { display: none !important; }
          .services-mobile-swiper { padding-bottom: 50px !important; }
          .services-mobile-swiper .swiper-pagination { bottom: 10px !important; }
          .services-mobile-swiper .swiper-pagination-bullet { background: #dc2626 !important; opacity: 0.5; }
          .services-mobile-swiper .swiper-pagination-bullet-active { opacity: 1 !important; background: #dc2626 !important; }
          .service-style-six-info { position: static !important; margin-bottom: 30px; }
          .service-style-six-items ul li { padding: 40px 30px !important; margin-bottom: 0 !important; }
          .service-style-six-items ul li .icon { margin-right: 30px !important; min-width: 50px !important; }
          .service-style-six-items ul li .icon img { width: 50px !important; height: 50px !important; }
          .service-style-six-items ul li .details > span { font-size: 60px !important; bottom: -35px !important; }
          .service-style-six-items ul li .item-title h3 { font-size: 1.3rem !important; line-height: 1.4 !important; }
          .service-style-six-items ul li .details p { font-size: 0.9rem !important; line-height: 1.5 !important; }
        }

        @media (max-width: 576px) {
          .services-style-six-area { padding-top: 100px !important; }
          .service-style-six-items ul li { padding: 30px 20px !important; }
          .service-style-six-items ul li .icon { margin-right: 20px !important; min-width: 40px !important; }
          .service-style-six-items ul li .icon img { width: 40px !important; height: 40px !important; }
          .service-style-six-items ul li .details > span { font-size: 50px !important; bottom: -30px !important; }
          .service-style-six-items ul li .item-title h3 { font-size: 1.2rem !important; }
          .service-style-six-items ul li .details p { font-size: 0.85rem !important; }
        }
      `}</style>
    </>
  );
};

export default Services2;
