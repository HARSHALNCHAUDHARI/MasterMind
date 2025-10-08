import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';

import BannerV12Data from '../../assets/jsonData/banner/BannerV12Data.json';
import SingleBannerV12 from "./SingleBannerV12";

interface BannerV12Props {
  lightMode?: boolean;
}

const BannerV12 = ({ lightMode }: BannerV12Props) => {
  return (
    <>
     <div
  className={`full-slider-two-area overflow-hidden ${
    lightMode ? "text-dark" : "text-light"
  }`}
  style={{
    backgroundColor: lightMode ? "#ffffff !important" : "#121212 !important",
    backgroundImage: "none !important", // Explicitly remove any background images
    minHeight: "100vh",
  }}
>


        <Swiper
          className="full-screen-portfolio-two"
          loop={false}
          grabCursor={true}
          mousewheel={{ releaseOnEdges: true }}
          speed={1000}
          navigation={{
            nextEl: ".full-slider-two-next",
            prevEl: ".full-slider-two-prev",
          }}
          pagination={{
            el: ".full-slider-two-pagination",
            type: "fraction",
            clickable: true,
          }}
          modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
          onReachEnd={() => {
            if (!lightMode) {
              document
                .getElementById("nextSectionId")
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <div className="swiper-wrapper">
            {BannerV12Data.map((banner) => (
              <SwiperSlide key={banner.id}>
                <SingleBannerV12 banner={banner} lightMode={lightMode} />
              </SwiperSlide>
            ))}
          </div>

          <div className="full-slider-two-nav">
            <div className="full-slider-two-pagination" />
            <div
              className={`full-slider-two-prev ${
                lightMode ? "text-dark" : "text-light"
              }`}
            >
              <i className="fas fa-angle-left" /> Prev{" "}
            </div>
            <div
              className={`full-slider-two-next ${
                lightMode ? "text-dark" : "text-light"
              }`}
            >
              Next <i className="fas fa-angle-right" />
            </div>
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default BannerV12;
