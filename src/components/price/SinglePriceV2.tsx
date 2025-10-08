import { Link } from "react-router-dom";

interface DataType {
    id: number;
    title: string;
    description: string;
    features: string[];
    priceOriginal: number | null;
    priceDiscounted: number;
    currency: string;
    timeline: string;
    hosting: string;
    note?: string;
}

const SinglePriceV2 = ({ plan }: { plan: DataType }) => {
    const { id, title, description, features, priceOriginal, priceDiscounted, currency, timeline, hosting, note } = plan;

    const formatPrice = (price: number) => {
        if (currency === "INR") {
            return `₹${price.toLocaleString('en-IN')}`;
        }
        return `$${price}`;
    };



    return (
        <>
            <div className="pricing-style-two">
                <div className="pricing-header">
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                        {title}
                    </h4>
                    <span style={{ fontSize: '16px' }}>{description}</span>
                </div>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>
                            {index < 2 ? <strong>{feature}</strong> : feature}
                        </li>
                    ))}
                </ul>
                <div className="price">
                    <h2>
                        {note && <span style={{ fontSize: '14px', display: 'block' }}>{note}</span>}
                        {priceOriginal && <del>{formatPrice(priceOriginal)}</del>} 
                        {formatPrice(priceDiscounted)}
                        <sub> / {timeline}</sub>
                    </h2>
                    <div className="hosting-info" style={{ fontSize: '18px', marginTop: '10px', color: '#adacac' }}>
                        <strong>Hosting:</strong> {hosting}
                    </div>
                </div>
                <Link className="btn mt-25 btn-sm circle btn-border dark effect" to="/contact-us">Get Started</Link>
            </div>
        </>
    );
};

export default SinglePriceV2;
