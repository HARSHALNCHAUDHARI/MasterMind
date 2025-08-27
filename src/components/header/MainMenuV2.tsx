/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

interface DataType {
    toggleSubMenu2?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    closeInfoBar?: () => void;
}

const MainMenuV2 = ({ toggleSubMenu2, closeInfoBar }: DataType) => {
    return (
        <>
            <ul className="simple-menu-list">
                <li>
                    <Link to="/" >Home </Link>
                </li>
                <li>
                    <Link to="#">Blog </Link>
                    <i className="fas fa-plus" onClick={toggleSubMenu2} />
                    <ul className="sub-menu">
                        <li><Link to="/blog-standard" onClick={closeInfoBar}>Blog Standard</Link></li>
                        <li><Link to="/blog-with-sidebar" onClick={closeInfoBar}>Blog With Sidebar</Link></li>
                        <li><Link to="/blog-2-column" onClick={closeInfoBar}>Blog Grid Two column</Link></li>
                        <li><Link to="/blog-3-column" onClick={closeInfoBar}>Blog Grid Three column</Link></li>
                        <li><Link to="/blog-single/1" onClick={closeInfoBar}>Blog Single</Link></li>
                        <li><Link to="/blog-single-with-sidebar/1" onClick={closeInfoBar}>Blog Single With Sidebar</Link></li>
                    </ul>
                </li>
                <li><Link to="/services" onClick={closeInfoBar}>Services </Link></li>
                <li><Link to="/about-us" onClick={closeInfoBar}>About</Link> </li>
                <li><Link to="/contact-us" onClick={closeInfoBar}>Contact</Link></li>
            </ul>
        </>
    );
};

export default MainMenuV2;