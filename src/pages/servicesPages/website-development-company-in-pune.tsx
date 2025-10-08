// src/pages/servicePages/WebsiteDevelopmentCompanyInPune.tsx
import { Helmet } from "react-helmet-async";
import CursorEffect from "../../components/animation/CursorEffect";

//components 
import HeaderV2 from "../../components/header/HeaderV2";
import BannerV10 from "../../components/banner/BannerV10";
import BrandV2 from "../../components/brand/BrandV2"; 
import PartnerV2 from "../../components/partner/PartnerV2";
import ServicesV6 from "../../components/services/ServicesV6";
import ServicesV2 from "../../components/services/ServicesV2"; //why choose us
import ServicesV4 from "../../components/services/ServicesV4";  //Technologies we use
import ServiceProcess1 from "../../components/services/service1process"; //process
import BannerV3 from "../../components/banner/BannerV3"; //webiste carousel
import TestimonialV1 from "../../components/testimonial/TestimonialV1";
import PriceV2 from "../../components/price/PriceV2";
import QuickContact from "../../components/contact/QuickContact";
import FaqV1 from "../../components/faq/FaqV1";
import FooterV3 from "../../components/footer/FooterV3";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";

const WebsiteDevelopmentCompanyInPune = () => {
    return (
        <>
            <Helmet>
                <title>Website Design & Development Company in Pune | MasterMind</title>
                <meta name="description" content="Mastermind is a top web designing & development company in Pune, building SEO-friendly, responsive websites that align with your business goals." />
                <meta name="keywords" content="website development company pune, web design pune, website design company pune, responsive website development, SEO-friendly websites pune, mastermind web development" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://mastermindweb.in/services/website-development-company-in-pune" />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content="Website Design & Development Company in Pune | MasterMind" />
                <meta property="og:description" content="Mastermind is a top web designing & development company in Pune, building SEO-friendly, responsive websites that align with your business goals." />
                <meta property="og:url" content="https://mastermindweb.in/services/website-development-company-in-pune" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://mastermindweb.in/assets/img/mastermind-web-development-pune.jpg" />
                <meta property="og:site_name" content="MasterMind Web Developers" />
                
                {/* Local Business Schema */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "MasterMind Web Developers",
                    "image": "https://mastermindweb.in/assets/img/logo1.png",
                    "description": "Top web designing & development company in Pune, building SEO-friendly, responsive websites that align with your business goals.",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Pune",
                        "addressRegion": "Maharashtra",
                        "addressCountry": "IN"
                    },
                    "url": "https://mastermindweb.in",
                    "telephone": "+91-XXXXXXXXXX",
                    "priceRange": "$$",
                    "openingHours": "Mo-Sa 09:00-18:00",
                    "service": {
                        "@type": "Service",
                        "name": "Website Development Services",
                        "description": "Professional website design and development services in Pune",
                        "provider": {
                            "@type": "Organization",
                            "name": "MasterMind Web Developers"
                        },
                        "areaServed": {
                            "@type": "Place",
                            "name": "Pune, Maharashtra, India"
                        }
                    }
                })}
                </script>
                
                {/* Additional SEO Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="MasterMind Web Developers" />
                <meta name="geo.region" content="IN-MH" />
                <meta name="geo.placename" content="Pune" />
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV2 />
                <BannerV10 />
                <BrandV2 />
                <PartnerV2 />
                <ServicesV6 />
                <ServicesV2 />{/* why choose us */}
                <ServicesV4 />{/* Technologies we use */}
                <ServiceProcess1 /> {/* Process */}
                <BannerV3 /> {/* Website Carousel */}
                <TestimonialV1 />
                <PriceV2 />
                <QuickContact title='Need' titleBold='Help?' />
                <FaqV1  />
                <CursorEffect />
                <FooterV3 />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default WebsiteDevelopmentCompanyInPune;
