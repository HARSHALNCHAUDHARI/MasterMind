import twitter from "/assets/img/icon/twitter.png"
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest, FaLinkedinIn, FaLink, FaAt, FaEnvelope } from "react-icons/fa";

const FooterSocial = () => {
    return (
        <>
            <li>
                <a href="mailto:info@MastermindWeb.in">
                    <FaEnvelope />
                </a>
            </li>
            <li>
                <a href="https://www.facebook.com/mastermindwebdevelopers" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com/mastermindwebdevelopers/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </li>
            <li>
                <a href="https://www.youtube.com/@mastermindwebdevelopers" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                </a>
            </li>
            <li>
                <a href="https://in.pinterest.com/mastermindwebdevelopers/" target="_blank" rel="noopener noreferrer">
                    <FaPinterest />
                </a>
            </li>
             <li>
                <a href="https://www.threads.com/@mastermindwebdevelopers" target="_blank" rel="noopener noreferrer">
                    <FaAt />
                </a>
            </li>
            <li>
                <a href="https://linktr.ee/mastermindwebdevelopers" target="_blank" rel="noopener noreferrer">
                    <FaLink />
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                </a>
            </li>
            <li>
                <Link to="https://x.com/mastermindweb26" target='_blank'><img src={twitter} alt="Image Not Found" /></Link>
            </li>
        </>
    );
};

export default FooterSocial;
