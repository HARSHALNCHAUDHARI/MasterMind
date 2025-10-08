import FooterV3 from "../../components/footer/FooterV3";
import HeaderV2 from "../../components/header/HeaderV2";
interface LayoutProps {
    children?: React.ReactNode;
}

const LayoutV1 = ({ children }: LayoutProps) => {
    return (
        <>
            <div className="smooth-scroll-container">
                <HeaderV2 />
                {children}
                <FooterV3  />
            </div>
        </>
    );
};

export default LayoutV1;