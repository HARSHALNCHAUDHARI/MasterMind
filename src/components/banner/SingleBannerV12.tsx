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

// List of specific phrases to highlight in bold inside description
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

const highlightLine = (line: string) => {
  // Find the first matching keyword in the line
  const keyword = highlightKeywords.find(k => line.includes(k));

  if (!keyword) {
    return line; // No highlight needed
  }

  // Split line into parts around the keyword
  const parts = line.split(keyword);

  return (
    <>
      • <strong style={{ color: "#ff5622e5" }}>{keyword}</strong>{parts[1]}
    </>
  );
};

const SingleBannerV12 = ({ banner }: { banner: DataType }) => {
  const { titleFirst, titleLast, description, tags, modal, thumb } = banner;

  // Split description by newline into array of lines, if it's a string
  const descriptionLines = typeof description === "string" ? description.split("\n") : [];

  return (
    <>
      <div className="container">
        <div className="full-slider-two-item">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4">
              <div className="thumb">
                <img src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" />
              </div>
            </div>
            <div className="col-lg-7 offset-lg-1 col-md-8">
              <div className="item-info">
                <div className="content">
                  <h2>
                    <a href="#" data-bs-toggle="modal" data-bs-target={`#${modal}`}>
                      {titleFirst}{" "}
                      <strong>
                        <img src="/assets/img/shape/16.png" alt="Image Not Found" /> {titleLast}
                      </strong>
                    </a>
                  </h2>
                  <div className="info">
                    {descriptionLines.length > 0 ? (
                      descriptionLines.map((line, i) => (
                        <p key={i} style={{ marginBottom: "0.5rem" }}>
                          {highlightLine(line)}
                        </p>
                      ))
                    ) : (
                      <p style={{ whiteSpace: "pre-line" }}>{description}</p>
                    )}

                    <a
                      className="btn-animation mt-10"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target={`#${modal}`}
                    >
                      <i className="fas fa-arrow-right" />
                      <span>Know More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-tags">
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <a href="#">{tag}</a>
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
