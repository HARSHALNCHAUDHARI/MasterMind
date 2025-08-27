import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BannerV1 from "../../components/banner/BannerV1";
import BlogV2 from "../../components/blog/BlogV2";
import BrandV1 from "../../components/brand/BrandV1";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV2 from "../../components/header/HeaderV2";
import MultiSection from "../../components/multi/MultiSection";
import PriceV2 from "../../components/price/PriceV2";

import TeamV2 from "../../components/team/TeamV2";
import TestimonialV1 from "../../components/testimonial/TestimonialV1";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import BannerV12 from "../../components/banner/BannerV12";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV3 from "../../components/banner/BannerV3";


const Home9 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 9</title>
            </Helmet>

            <div id="home" className="smooth-scroll-container">
                <HeaderV2 />
                <BannerV1 />
                <AboutV1 />
                <BrandV1 />
                <BannerV12 />
                <BannerV3 />
                <CursorEffect />
                <PriceV2 />
                <TestimonialV1 />
                <TeamV2  />
                <MultiSection />
                <BlogV2 sectionClass='bg-gray' />
                <FooterV3 />
                <DarkClass />
                <ThemeDark />

            </div>
        </>
    );
};

export default Home9;