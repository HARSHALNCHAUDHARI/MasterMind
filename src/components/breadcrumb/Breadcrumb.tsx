import { Link } from "react-router-dom";

interface DataType {
    title?: string;
    breadCrumb?: string;
}

const Breadcrumb = ({ }: DataType) => {
    return (
        <>
            <div className={`breadcrumb-area text-center`}
                style={{ backgroundImage: `url(/assets/img/shape/10.jpg)` }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }} />

            </div>
        </>
    );
};

export default Breadcrumb;