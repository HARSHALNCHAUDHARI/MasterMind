import twitter from "/assets/img/icon/twitter.png"
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram ,FaYoutube } from "react-icons/fa";

const FooterSocial = () => {
    return (
        <>
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
                <Link to="https://www.x.com/" target='_blank'><img src={twitter} alt="Image Not Found" /></Link>
            </li>
        </>
    );
};

export default FooterSocial;


