import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay } from 'swiper/modules';
import TeamV2Data from '../../assets/jsonData/team/TeamV2Data.json';
import SingleTeamV2 from './SingleTeamV2.js';
import SplitText from "../animation/SplitText.jsx"

const TeamV2 = () => {
    return (
        <>
            <div id="team" className="team-style-two-area bg-gray default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Team member</h4>
                                <h2 className="title split-text">
                                    <SplitText
                                        delay={120}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Meet our experts
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper className="team-carousel swiper"
                                direction="horizontal"
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 50
                                    },
                                }}
                                modules={[Keyboard, Autoplay]}
                            >
                                <div className="swiper-wrapper">
                                    {TeamV2Data.map(team =>
                                        <SwiperSlide key={team.id}>
                                            <SingleTeamV2 team={team} />
                                        </SwiperSlide>
                                    )}
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamV2;
