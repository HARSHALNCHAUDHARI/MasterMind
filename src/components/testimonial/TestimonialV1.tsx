import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { useState } from 'react';
import TestimonialV1Data from '../../assets/jsonData/testimonial/TestimonialV1Data.json';
import SingleTestimonialV1 from './SingleTestimonialV1';


const TestimonialV1 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);


    const handleSlideChange = (swiper: any) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(swiper.realIndex);
            setIsTransitioning(false);
        }, 150); // Half of the transition duration
    };


    return (
        <>
            <div id="testimonials" className="testimonial-style-one-area default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="testimonial-one-quote">
                                <h4 className="sub-title">Testimonials</h4>
                                <div className="testimonial-quote">
                                    <div className={`testimonial-image-container ${isTransitioning ? 'transitioning' : ''}`}>
                                        <img 
                                            src={`/assets/img/testimonials/${TestimonialV1Data[currentSlide]?.thumb}`} 
                                            alt={TestimonialV1Data[currentSlide]?.name || "Testimonial"} 
                                            className="testimonial-person-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <Swiper className="testimonial-style-one-carousel swiper"
                                direction="horizontal"
                                loop={true}
                                autoplay={false}
                                speed={1000}
                                pagination={{
                                    type: "bullets",
                                    clickable: true,
                                }}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                modules={[Navigation, Keyboard]}
                                onSlideChange={handleSlideChange}
                            >
                                <div className="swiper-wrapper">
                                    {TestimonialV1Data.map(testimonial =>
                                        <SwiperSlide key={testimonial.id} >
                                            <SingleTestimonialV1 testimonial={testimonial} />
                                        </SwiperSlide>
                                    )}
                                </div>


                                {/* Add Arrows */}
                                <div className="testimonial-one-navigation">
                                    <div className="swiper-button-prev" />
                                    <div className="swiper-button-next" />
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default TestimonialV1;