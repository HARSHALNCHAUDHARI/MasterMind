import { useState, useEffect } from 'react';
import SplitText from "../animation/SplitText.jsx";

interface DataType {
  sectionClass?: string;
}

interface FaqItem {
  id: number;
  title: string;
  content: string;
}

const FaqV2 = ({ sectionClass }: DataType) => {
  // Keep same UX defaults as FaqV1 (two open by default for desktop look)
  const [activeItems, setActiveItems] = useState<number[]>([1, 4]);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Mobile detection on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleAccordion = (itemId: number) => {
    setActiveItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Column 1 FAQs (left)
  const faqData: FaqItem[] = [
    {
      id: 1,
      title: "What is SEO and how does it work?",
      content:
        "Search Engine Optimization (SEO) is the process of improving your website’s visibility on search engines like Google by enhancing content, technical structure, and authority (backlinks). This results in higher organic rankings and more traffic."
    },
    {
      id: 2,
      title: "How long does it take to see SEO results?",
      content:
        "While initial improvements in technical health can be fast, most businesses see noticeable, tangible results in organic traffic and keywords within 3 to 6 months, depending on the current competition and the strength of the tailored strategy."
    },
    {
      id: 3,
      title: "Is SEO better than paid ads?",
      content:
        "SEO offers long-term, compounding traffic and brand visibility without the constant, per-click investment that paid ads require. While ads provide immediate visibility, SEO builds a sustainable, appreciating asset for your business."
    }
  ];

  // Column 2 FAQs (right)
  const faqData2: FaqItem[] = [
    {
      id: 4,
      title: "Do you offer SEO for local businesses or startups?",
      content:
        "Yes, tailored Local SEO packages are available for businesses targeting customers in Pune and surrounding areas, along with scalable strategies for startups to build foundational authority."
    },
    {
      id: 5,
      title: "How can I hire SEO consultant services from Mastermind Web?",
      content:
        "Click the [Schedule a Strategy Call] button or fill out the contact form. A free consultation will be scheduled to align on goals and the roadmap."
    }
  ];

  // Combine for mobile pagination
  const allFaqs: FaqItem[] = [...faqData, ...faqData2];

  // Match FaqV1 display logic exactly
  const getFaqsToDisplay = () => {
    if (isMobile && !showAllFaqs) {
      return allFaqs.slice(0, 5);
    }
    if (isMobile && showAllFaqs) {
      return allFaqs;
    }
    return { col1: faqData, col2: faqData2 };
  };

  const displayFaqs = getFaqsToDisplay();

  return (
    <>
      <div className={`faq-area default-padding ${sectionClass ? sectionClass : ""}`}>
        <div className="container">
          <div className="site-heading text-center mb-5">
            <h4 className="sub-title faq-subtitle">FAQs</h4>
            <h2 className="title split-text faq-main-title">
              <SplitText
                delay={120}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              >
                Frequently Asked Questions
              </SplitText>
            </h2>
          </div>

          {/* Mobile: single column with Show More */}
          {isMobile ? (
            <div className="mobile-faq-layout">
              <div className="faq-style-one">
                {Array.isArray(displayFaqs) &&
                  displayFaqs.map((faq: FaqItem) => (
                    <div key={faq.id} className="faq-item mb-4">
                      <div
                        className="faq-header"
                        onClick={() => toggleAccordion(faq.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <h3 className="faq-title">
                          <span className="faq-icon">
                            {activeItems.includes(faq.id) ? "−" : "+"}
                          </span>
                          {faq.title}
                        </h3>
                      </div>
                      {activeItems.includes(faq.id) && (
                        <div className="faq-body">
                          <p>{faq.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {allFaqs.length > 5 && (
                <div className="text-center mt-4">
                  <button
                    className="show-more-btn"
                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                  >
                    {showAllFaqs
                      ? "Show Less"
                      : `Show More (${allFaqs.length - 5} more)`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Desktop: two columns, accordion items
            <div className="row gutter-xl">
              <div className="col-lg-6">
                <div className="faq-style-one">
                  {!Array.isArray(displayFaqs) &&
                    displayFaqs.col1.map((faq: FaqItem) => (
                      <div key={faq.id} className="faq-item mb-4">
                        <div
                          className="faq-header"
                          onClick={() => toggleAccordion(faq.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <h3 className="faq-title">
                            <span className="faq-icon">
                              {activeItems.includes(faq.id) ? "−" : "+"}
                            </span>
                            {faq.title}
                          </h3>
                        </div>
                        {activeItems.includes(faq.id) && (
                          <div className="faq-body">
                            <p>{faq.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="faq-style-one">
                  {!Array.isArray(displayFaqs) &&
                    displayFaqs.col2.map((faq: FaqItem) => (
                      <div key={faq.id} className="faq-item mb-4">
                        <div
                          className="faq-header"
                          onClick={() => toggleAccordion(faq.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <h3 className="faq-title">
                            <span className="faq-icon">
                              {activeItems.includes(faq.id) ? "−" : "+"}
                            </span>
                            {faq.title}
                          </h3>
                        </div>
                        {activeItems.includes(faq.id) && (
                          <div className="faq-body">
                            <p>{faq.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Copy-pasted styles from FaqV1 to preserve appearance */}
      <style>{`
        /* THEME-AWARE HEADING COLORS */
        body:not(.bg-dark) .faq-subtitle {
          color: #666666 !important;
          font-size: 1.1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        body:not(.bg-dark) .faq-main-title {
          color: #333333 !important;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .bg-dark .faq-subtitle {
          color: #fcfcfc !important;
          font-size: 1.1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .bg-dark .faq-main-title {
          color: #ffffff !important;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
        }

        /* LIGHT THEME FAQ STYLES */
        body:not(.bg-dark) .faq-item {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        body:not(.bg-dark) .faq-item:hover {
          background: rgba(0, 0, 0, 0.06);
          border-color: rgba(220, 38, 38, 0.3);
        }

        body:not(.bg-dark) .faq-header:hover {
          background: rgba(220, 38, 38, 0.1);
        }

        body:not(.bg-dark) .faq-title {
          color: #333333;
        }

        body:not(.bg-dark) .faq-body {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        body:not(.bg-dark) .faq-body p {
          color: #555555;
        }

        /* DARK THEME FAQ STYLES */
        .bg-dark .faq-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .bg-dark .faq-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(220, 38, 38, 0.3);
        }

        .bg-dark .faq-header:hover {
          background: rgba(220, 38, 38, 0.1);
        }

        .bg-dark .faq-title {
          color: #ffffff;
        }

        .bg-dark .faq-body {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bg-dark .faq-body p {
          color: #e0e0e0;
        }

        /* COMMON STYLES */
        .faq-header {
          padding: 1.25rem 1.5rem;
          transition: all 0.3s ease;
        }

        .faq-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          line-height: 1.4;
        }

        .faq-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #dc2626;
          color: #ffffff;
          border-radius: 50%;
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .faq-body {
          padding: 0 1.5rem 1.5rem 1.5rem;
          animation: fadeInDown 0.3s ease;
        }

        .faq-body p {
          line-height: 1.7;
          margin: 0;
          padding-top: 1rem;
          padding-left: 40px;
          font-size: 0.95rem;
        }

        /* THEME-AWARE SHOW MORE BUTTON */
        .show-more-btn {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: #ffffff;
          border: none;
          padding: 12px 32px;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .show-more-btn:hover {
          background: linear-gradient(135deg, #b91c1c, #991b1b);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
        }

        .show-more-btn:active {
          transform: translateY(0);
        }

        .mobile-faq-layout {
          max-width: 100%;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .faq-header { padding: 1rem 1.25rem; }
          .faq-body { padding: 0 1.25rem 1.25rem 1.25rem; }
          .faq-body p { padding-left: 35px; }
          .faq-title { font-size: 0.95rem; }
          .faq-body p { font-size: 0.9rem; }
          .show-more-btn { padding: 10px 24px; font-size: 0.9rem; }
          body:not(.bg-dark) .faq-main-title,
          .bg-dark .faq-main-title { font-size: 2rem; }
          body:not(.bg-dark) .faq-subtitle,
          .bg-dark .faq-subtitle { font-size: 1rem; }
        }
      `}</style>
    </>
  );
};

export default FaqV2;
