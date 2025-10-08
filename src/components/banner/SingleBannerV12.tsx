import React from "react";

interface DataType {
  id: number;
  modal: string;
  thumb: string;
  titleFirst: string;
  titleLast: string;
  description: string | string[];
  tags: string[];
}

interface SingleBannerV12Props {
  banner: DataType;
  lightMode?: boolean;
}

const highlightKeywords = [
  "Website Design & Development",
  "App Development",
  "Website Hosting & Domain Services",
  "SEO (Search Engine Optimization)",
  "Google Ads (PPC Marketing)",
  "Social Media Marketing",
  "Content Marketing",
  "Email Marketing",
  "WhatsApp Marketing",
  "SMS Marketing",
  "Influencer Marketing",
  "Digital Marketing Consulting",
  "Graphics Designing",
  "Logo Design & Branding",
  "Photo & Video Shoot",
  "Video Editing & Marketing",
  "PR (Public Relations)",
  "ORM (Online Reputation Management)",
  "Google Business Profile Management",
  "AI Chatbot Development",
  "AI Voiceovers & Dubbing"
];

const highlightLine = (line: string, lightMode?: boolean) => {
  const keyword = highlightKeywords.find(k => line.includes(k));
  if (!keyword) {
    return line;
  }
  const color = lightMode ? "#eb5c23" : "#ff5622e5";
  const parts = line.split(keyword);
  return (
    <>
      • <strong style={{ color }}>{keyword}</strong>{parts[1]}
    </>
  );
};

const SingleBannerV12 = ({ banner, lightMode }: SingleBannerV12Props) => {
  const { titleFirst, titleLast, description, tags, thumb } = banner;
  const descriptionLines = typeof description === "string" ? description.split("\n") : [];

  // Define colors based on mode
  const titleColor = lightMode ? "#000000" : "#ffffff";
  const hoverColor = "#f31d1d";

  // Text stroke styles for light mode
  const titleStyles = lightMode ? {
    color: "#000000",
    WebkitTextStroke: "3px #000000",
    fontWeight: "bold" as const
  } : {
    color: "#ffffff",
    WebkitTextStroke: "2px rgba(0,0,0,0.7)"
  };

  // Fix: Update function signature to handle undefined
  const tagStyle = (lightMode?: boolean) => ({
    background: lightMode 
      ? "linear-gradient(135deg, #f0f0f2, #e8e8ea)" 
      : "rgba(255,255,255,0.15)",
    color: lightMode ? "#000000" : "#ffffff",
    padding: "8px 16px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "500",
    border: lightMode ? "3px solid #000000" : "3px solid rgba(255,255,255,0.2)",
    display: "inline-block",
    textShadow: lightMode ? "1px 1px 2px rgba(0,0,0,0.2)" : "none",
    WebkitTextFillColor: lightMode ? "#000000" : "#ffffff",
    '--tag-color': lightMode ? '#000000' : '#ffffff',
  } as React.CSSProperties & { [key: string]: any });

  return (
    <>
      <style>
        {`
          ${lightMode ? `
            .light-mode-tags span,
            .light-mode-tags span * {
              color: #000000 !important;
              -webkit-text-fill-color: #000000 !important;
            }
          ` : `
            .dark-mode-tags span,
            .dark-mode-tags span * {
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff !important;
            }
          `}
        `}
      </style>
      
      <div className="container">
        <div
          className="full-slider-two-item"
          style={{
            background: lightMode ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.1)",
            borderRadius: "16px",
            padding: "40px 30px",
            boxShadow: lightMode 
              ? "0 10px 30px rgba(0,0,0,0.1)" 
              : "0 10px 30px rgba(0,0,0,0.3)"
          }}
        >
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4">
              <div className="thumb">
                <img
                  src={`/assets/img/portfolio/${thumb}`}
                  alt="Portfolio Image"
                  style={{
                    border: lightMode ? "4px solid #000000" : "4px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    width: "100%",
                    height: "500px",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>
            <div className="col-lg-7 offset-lg-1 col-md-8">
              <div className="item-info">
                <div className="content">
                  <h2
                    style={{
                      ...titleStyles,
                      textShadow: lightMode ? "3px 3px 6px rgba(0,0,0,0.4)" : "none"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        WebkitTextStroke: lightMode ? "3px #000000" : "2px rgba(0,0,0,0.7)",
                        textShadow: lightMode ? "3px 3px 6px rgba(0,0,0,0.4)" : "none"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = hoverColor;
                        (e.currentTarget.style as any).webkitTextStroke = `3px ${hoverColor}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = titleColor;
                        (e.currentTarget.style as any).webkitTextStroke = lightMode ? "3px #000000" : "2px rgba(0,0,0,0.7)";
                      }}
                    >
                      {titleFirst}{' '}
                      <strong style={{ 
                        color: "inherit",
                        WebkitTextStroke: "inherit"
                      }}>
                        <img src="/assets/img/shape/16.png" alt="Image Not Found" /> {titleLast}
                      </strong>
                    </a>
                  </h2>

                  <div 
                    className="info"
                    style={{
                      color: lightMode ? "#24285b" : "#ffffff",
                      textShadow: lightMode ? "1px 1px 2px rgba(0,0,0,0.2)" : "none"
                    }}
                  >
                    {descriptionLines.length > 0 ? (
                      descriptionLines.map((line, i) => (
                        <p key={i} style={{ 
                          marginBottom: "0.8rem", 
                          fontSize: "1.1rem",
                          textShadow: lightMode ? "1px 1px 2px rgba(0,0,0,0.2)" : "none"
                        }}>
                          {highlightLine(line, lightMode)}
                        </p>
                      ))
                    ) : (
                      <p style={{ 
                        whiteSpace: "pre-line", 
                        fontSize: "1.1rem",
                        textShadow: lightMode ? "1px 1px 2px rgba(0,0,0,0.2)" : "none"
                      }}>
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
            className={`content-tags ${lightMode ? 'light-mode-tags' : 'dark-mode-tags'}`} 
            style={{ marginTop: "30px" }}
          >
            <ul style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "12px", 
              listStyle: "none", 
              padding: 0,
              margin: 0
            }}>
              {tags.map((tag, index) => (
                <li key={index}>
                  <span style={tagStyle(lightMode)}>
                    <span style={{ 
                      color: lightMode ? "#000000" : "#ffffff",
                      WebkitTextFillColor: lightMode ? "#000000" : "#ffffff"
                    }}>
                      {tag}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBannerV12;
