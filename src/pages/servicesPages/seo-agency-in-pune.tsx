// src/pages/servicePages/SeoAgencyInPune.tsx
import { Helmet } from "react-helmet-async";
import CursorEffect from "../../components/animation/CursorEffect";

//components 
import HeaderV2 from "../../components/header/HeaderV2";
import ServiceBanner2 from "../../components/banner/ServiceBanner2";
import BrandV2 from "../../components/brand/BrandV2"; 
import PartnerV2 from "../../components/about/serviceabout2"
import Services2 from "../../components/services/services2file";
import ServicesV2 from "../../components/services/whychooseus"; //why choose us
// import ServicesV4 from "../../components/services/ServicesV4";  //Technologies we use
import ServiceProcess2 from "../../components/services/service2process";
// import BannerV3 from "../../components/banner/BannerV3"; //webiste carousel
import TestimonialV1 from "../../components/testimonial/TestimonialV1";
import PriceV2 from "../../components/price/servicespricing";
import QuickContact2 from "../../components/contact/Quick Contact2";
import FaqV2 from "../../components/faq/Faqv2";
import FooterV3 from "../../components/footer/FooterV3";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";

const SeoAgencyInPune = () => {
    return (
        <>
            <Helmet>
                <title>Best SEO Company in Pune | SEO Services in Pune</title>
                <meta name="description" content="Mastermind Web is a leading SEO agency in Pune offering expert SEO services to enhance online visibility and drive business growth. Hire SEO experts today." />
                <meta name="keywords" content="seo agency in pune, seo company in pune, seo services in pune, best seo agency in pune, best seo services in pune, hire seo expert, seo expert in pune, hire seo specialist, seo pune, search engine optimization pune, hire seo consultant" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://mastermindweb.in/services/seo-agency-in-pune" />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content="Best SEO Company in Pune | SEO Services in Pune" />
                <meta property="og:description" content="Mastermind Web is a leading SEO agency in Pune offering expert SEO services to enhance online visibility and drive business growth. Hire SEO experts today." />
                <meta property="og:url" content="https://mastermindweb.in/services/seo-agency-in-pune" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://mastermindweb.in/assets/img/mastermind-seo-pune.jpg" />
                <meta property="og:site_name" content="MasterMind Web Developers" />
                
                {/* Local Business Schema */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "MasterMind Web Developers",
                    "image": "https://mastermindweb.in/assets/img/logo1.png",
                    "description": "Leading SEO agency in Pune offering expert SEO services to enhance online visibility and drive business growth.",
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
                        "name": "SEO Services",
                        "description": "Professional Search Engine Optimization (SEO) services in Pune",
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
                <ServiceBanner2 />
                <BrandV2 />
                <PartnerV2 />
                <Services2 />
                <ServicesV2 />{/* why choose us */}
                {/* <ServicesV4 />Technologies we use */}
                <ServiceProcess2/>
                {/* <BannerV3 /> Website Carousel */}
                <TestimonialV1 />
                <PriceV2 />
                <QuickContact2 title='Need' titleBold='Help?' />
                <FaqV2  />
                <CursorEffect />
                <FooterV3 />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default SeoAgencyInPune;
