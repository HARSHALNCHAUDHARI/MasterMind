import twitterDark from '/assets/img/icon/twitter-dark.png';
import { Link } from "react-router-dom";

const SocialShareV2 = () => {
    return (
       <>
    <li>
        <Link className="facebook" to="https://www.facebook.com/mastermindwebdevelopers" target="_blank">
            <i className="fab fa-facebook-f" />
        </Link>
    </li>
    <li>
        <Link className="twitter" to="https://x.com/mastermindweb26" target="_blank">
            <img src={twitterDark} alt="Image Not Found" />
        </Link>
    </li>
    <li>
        <Link className="instagram" to="https://www.instagram.com/mastermindwebdevelopers/" target="_blank">
            <i className="fab fa-instagram" />
        </Link>
    </li>
    
    <li>
        <Link className="youtube" to="https://www.youtube.com/@mastermindwebdevelopers" target="_blank">
            <i className="fab fa-youtube" />
        </Link>
    </li>
    <li>
        <Link className="pinterest" to="https://in.pinterest.com/mastermindwebdevelopers/" target="_blank">
            <i className="fab fa-pinterest" />
        </Link>
    </li>
    <li>
        <Link className="threads" to="https://www.threads.com/@mastermindwebdevelopers" target="_blank">
            <i className="fas fa-at" />
        </Link>
    </li>
    <li>
        <Link className="linktree" to="https://linktr.ee/mastermindwebdevelopers" target="_blank">
            <i className="fas fa-link" />
        </Link>
    </li>
    <li>
        <Link className="linkedin" to="https://www.linkedin.com/" target="_blank">
            <i className="fab fa-linkedin-in" />
        </Link>
    </li>
</>

    );
};

export default SocialShareV2;