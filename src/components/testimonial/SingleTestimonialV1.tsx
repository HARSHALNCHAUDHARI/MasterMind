interface DataType {
    id?: number;
    review?: string;
    name?: string;
    designation?: string;
    thumb?: string;
}

const SingleTestimonialV1 = ({ testimonial }: { testimonial: DataType }) => {
    const { review, name, designation } = testimonial;

    return (
        <div className="swiper-slide-container">
            <p>{review}</p>
            <div className="tm-provider">
                <div className="content">
                    <h4>{name}</h4>
                    <span>{designation}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleTestimonialV1;
