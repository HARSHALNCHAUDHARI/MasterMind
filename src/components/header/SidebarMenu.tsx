import { Link } from "react-router-dom";
import logoLight from "/assets/img/logo1.png"
import MainMenuV2 from './MainMenuV2';
import SocialShareV3 from '../social/SocialShareV3';
import useSubMenuToggleV2 from "../../hooks/useSubMenuToggleV2";

interface DataType {
    openMenu?: () => void;
    isInfoOpen?: boolean;
    openInfoBar?: () => void;
    closeInfoBar?: () => void;
}

interface DataType {
    
    closeInfoBar?: () => void;
}

const SidebarMenu = ({ isInfoOpen, closeInfoBar, openInfoBar }: DataType) => {

    const toggleSubMenu2 = useSubMenuToggleV2();

    return (
        <>
            <div className="attr-right">
                <div className="attr-nav flex">
                    <ul>
                        <li className="side-menu">
                            <Link to="#" onClick={openInfoBar}>
                                <strong>MENU </strong>
                                <div className="line">
                                    <span className="bar-1" />
                                    <span className="bar-2" />
                                    <span className="bar-3" />
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-2">
                    <div className={`side ${isInfoOpen ? "on" : ""}`}>
                        <Link to="#" className="close-side" onClick={closeInfoBar} style={{color:"red"}}>Close <i className="fas fa-times" /></Link>
                        <div className="widget">
                            <div className="logo">
                                <Link to="/home-2" >
                                    <img src={logoLight} alt="Logo"  style={{marginTop:"30px", marginBottom:"-10px"}}/>
                                </Link>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-7 col-lg-7">
                                    <div className="side-navbar-inner">
                                        <div className="simple-menu">
                                            <MainMenuV2 toggleSubMenu2={toggleSubMenu2} closeInfoBar={closeInfoBar} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 offset-xl-1 col-lg-4 offset-lg-1">
                                    <div className="side-widgets">
                                        <div className="widget address">
                                            <div>
                                                <ul>
                                                    <li>
                                                        <div className="content">
                                                            <p>Address</p>
                                                            <strong>Ayush Business Square, A-213, Varale, Talegaon Dabhade, Maharashtra 410507.</strong>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="content">
                                                            <p>Email</p>
                                                            <a href="mailto:info@MastermindWeb.in" style={{ fontWeight: 'normal' }}>
                                                                info@MastermindWeb.in
                                                            </a>
                                                        </div>

                                                    </li>
                                                    <li>
                                                        <div className="content">
                                                            <p>Contact</p>
                                                            <a href="tel:+917385855808" style={{ fontWeight: 'normal' }}>
                                                                +91 73858 55808
                                                            </a>
                                                            <br />
                                                            <a href="tel:+919175830994" style={{ fontWeight: 'normal' }}>
                                                                +91 91758 30994
                                                            </a>
                                                        </div>

                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="widget social">
                                            <p style={{ fontSize: "18px", marginBottom: "10px", fontWeight:"bold" }}>Follow Us</p>
                                            <ul className="link">
                                                <SocialShareV3 />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;