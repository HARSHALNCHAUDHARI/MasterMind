import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface DataType {
  closeInfoBar?: () => void;
}

const MainMenuV2 = ({ closeInfoBar }: DataType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    if (closeInfoBar) {
      closeInfoBar();
    }
    setIsServicesOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: targetId } });
    } else {
      scrollToId(targetId);
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/" &&
      location.state &&
      (location.state as any).scrollToId
    ) {
      const { scrollToId: targetId } = location.state as { scrollToId: string };
      scrollToId(targetId);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <ul className="simple-menu-list" style={{ listStyleType: "none", paddingLeft: 0 }}>
      <li>
        <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>
          Home
        </a>
      </li>
      <li>
        <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>
          About
        </a>
      </li>

      <li
        style={{ position: "relative" }}
        onMouseEnter={() => setIsServicesOpen(true)}
        onMouseLeave={() => setIsServicesOpen(false)}
      >
        <a href="#services" onClick={(e) => handleSmoothScroll(e, "services")} style={{ cursor: "pointer" }}>
          Services
        </a>
        {isServicesOpen && (
          <ul
  style={{
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#666",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    backdropFilter: "blur(8px)",
    padding: "0.5rem 0",
    margin: 0,
    listStyleType: "none",
    minWidth: "320px",
    zIndex: 1000,
    borderRadius: "8px",
  }}
>
  <li>
    <Link
      to="/services/website-development-company-in-pune"
      onClick={closeInfoBar}
      style={{
        display: "block",
        padding: "0.5rem 1rem",
        whiteSpace: "nowrap",
        fontSize: "1rem"
      }}
    >
      Web & App Solutions
    </Link>
  </li>
  <li>
    <Link
      to="/services/seo-agency-in-pune"
      onClick={closeInfoBar}
      style={{
        display: "block",
        padding: "0.5rem 1rem",
        whiteSpace: "nowrap",
        fontSize: "1rem"
      }}
    >
      Digital Marketing
    </Link>
  </li>
  {/* <li>
    <a
      href="#service3"
      onClick={(e) => handleSmoothScroll(e, "service3")}
      style={{
        display: "block",
        padding: "0.5rem 1rem",
        whiteSpace: "nowrap",
        fontSize: "1rem"
      }}
    >
      Service 3
    </a>
  </li> */}
</ul>

        )}
      </li>

      <li>
        <a href="#whychooseus" onClick={(e) => handleSmoothScroll(e, "whychooseus")}>
          Why Choose Us
        </a>
      </li>
      <li>
        <a href="#ourportfolio" onClick={(e) => handleSmoothScroll(e, "ourportfolio")}>
          Our Portfolio
        </a>
      </li>
      <li>
        <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, "testimonials")}>
          Testimonials
        </a>
      </li>
      <li>
        <Link to="/blogs" onClick={closeInfoBar}>
          Blogs
        </Link>
      </li>
      <li>
        <a href="#contactform" onClick={(e) => handleSmoothScroll(e, "contactform")}>
          Contact
        </a>
      </li>
    </ul>
  );
};

export default MainMenuV2;
