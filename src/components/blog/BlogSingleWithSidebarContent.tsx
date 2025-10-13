// BlogSingleWithSidebarContent.tsx - Force text colors with !important
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import team1Thumb from "/assets/img/team/9.jpg"

import handleSmoothScroll from '../utilities/handleSmoothScroll';
import SocialShareV3 from '../social/SocialShareV3';
import BlogV2Data from "../../assets/jsonData/blog/BlogV2Data.json";
import RecentPostsWidget from '../widgets/RecentPostsWidget';
import CategoryWidget from '../widgets/CategoryWidget';
import FollowWidget from '../widgets/FollowWidget';
import TagsWidget from '../widgets/TagsWidget';
import InteractivePoll from '../layouts/InteractivePoll';

interface AuthorObj {
    name: string;
    jobTitle?: string;
    company?: string;
    bio?: string;
}

interface DataType {
    slug?: string;
    id?: number;
    title?: string;
    content?: string;
    fullContent?: string;
    excerpt?: string;
    datePublished?: string;
    date?: string;
    dateIcon?: string;
    image?: string;
    thumbFull?: string;
    thumb?: string;
    author?: AuthorObj;
    readTime?: string;
    category?: string;
    tags?: string[];
    keywords?: string[];
    url?: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        canonicalUrl?: string;
    };
    poll?: {
        question: string;
        options: string[];
    };
    faq?: Array<{
        question: string;
        answer: string;
    }>;
}

interface BlogSingleProps {
    blogInfo?: DataType;
    totalBlogs?: number;
    sectionClass?: string;
}

// Enhanced FAQ Component with PROPER light/dark theme colors
const FAQSection: React.FC<{ faq: Array<{ question: string; answer: string }> }> = ({ faq }) => {
    const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);
    
    // Detect if dark mode is active
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        // Check for dark mode on mount
        const checkDarkMode = () => {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const hasDarkClass = document.documentElement.classList.contains('dark') || 
                                 document.body.classList.contains('dark');
            setIsDarkMode(darkModeQuery.matches || hasDarkClass);
        };

        checkDarkMode();

        // Listen for theme changes
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', checkDarkMode);

        // Listen for class changes on body/html
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            darkModeQuery.removeEventListener('change', checkDarkMode);
            observer.disconnect();
        };
    }, []);

    // Dynamic colors based on theme
    const colors = {
        textPrimary: isDarkMode ? '#ffffff' : '#222222',
        textSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#444444',
        excerptBg: isDarkMode ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 107, 107, 0.1)',
        faqBg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)',
        faqBorder: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        faqShadow: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
    };

    return (
        <>
            {/* Global CSS injection for FORCING colors */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    /* Force blog content colors based on theme */
                    .blog-content h1,
                    .blog-content h2,
                    .blog-content h3,
                    .blog-content h4,
                    .blog-content h5,
                    .blog-content h6 {
                        color: ${colors.textPrimary} !important;
                    }
                    
                    .blog-content p,
                    .blog-content li {
                        color: ${colors.textSecondary} !important;
                    }
                    
                    .blog-content .blog-excerpt,
                    .blog-content .excerpt {
                        background: ${colors.excerptBg} !important;
                        color: ${colors.textSecondary} !important;
                    }
                    
                    .faq-section .faq-title {
                        background: linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 50%, #ff8e8e 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    .faq-section .faq-description,
                    .faq-section .faq-question,
                    .faq-section .faq-answer {
                        color: ${colors.textPrimary} !important;
                    }
                `
            }} />
        
            <div className="faq-section" style={{ marginTop: '4rem' }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                }}>
                    <h2 className="faq-title" style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        marginBottom: '1rem'
                    }}>
                     Frequently Asked Questions
                    </h2>
                    <p className="faq-description" style={{
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Got questions? We've got answers! Here are the most common questions we receive.
                    </p>
                </div>

                <div className="faq-list" style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    {faq.map((item, index) => (
                        <div 
                            key={index} 
                            className="faq-item" 
                            style={{
                                marginBottom: '1.5rem',
                                overflow: 'hidden',
                                borderRadius: '16px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                background: colors.faqBg,
                                border: `1px solid ${colors.faqBorder}`,
                                boxShadow: `0 4px 20px ${colors.faqShadow}`
                            }}
                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        >
                            <div style={{ padding: '2rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: expandedFAQ === index ? '1.5rem' : '0'
                                }}>
                                    <h4 className="faq-question" style={{ 
                                        marginBottom: 0,
                                        fontSize: '1.3rem',
                                        fontWeight: 700,
                                        flex: 1,
                                        paddingRight: '1rem',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '30px',
                                            height: '20px',
                                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 50%, #ff8e8e 100%)',
                                            marginRight: '1rem',
                                            borderRadius: '4px',
                                            flexShrink: 0
                                        }}></span>
                                        {item.question}
                                    </h4>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #ff4757 0%, #ff6b6b 50%, #ff7675 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        transition: 'transform 0.3s ease',
                                        transform: expandedFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                                        boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)'
                                    }}>
                                        +
                                    </div>
                                </div>
                                
                                {expandedFAQ === index && (
                                    <div style={{
                                        animation: 'fadeInDown 0.3s ease',
                                        borderTop: '2px solid rgba(255, 107, 107, 0.3)',
                                        paddingTop: '1.5rem'
                                    }}>
                                        <p className="faq-answer" style={{ 
                                            marginBottom: 0,
                                            fontSize: '1.1rem',
                                            lineHeight: 1.6,
                                            fontWeight: 500
                                        }}>
                                            <span style={{
                                                background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 50%, #ff8e8e 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                marginRight: '0.5rem',
                                                fontWeight: 700
                                            }}>A:</span>
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const BlogSingleWithSidebarContent: React.FC<BlogSingleProps> = ({ blogInfo, totalBlogs, sectionClass }) => {
    // GET SLUG FROM URL USING useParams
    const { slug: urlSlug } = useParams<{ slug: string }>();
    
    // FIND THE BLOG BY SLUG FROM JSON DATA
    const currentBlog = BlogV2Data.find(blog => blog.slug === urlSlug) as DataType | undefined;
    
    // Detect dark mode
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        const checkDarkMode = () => {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const hasDarkClass = document.documentElement.classList.contains('dark') || 
                                 document.body.classList.contains('dark');
            const newDarkMode = darkModeQuery.matches || hasDarkClass;
            setIsDarkMode(newDarkMode);
            console.log('🎨 Dark mode detected:', newDarkMode);
        };

        checkDarkMode();

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', checkDarkMode);

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            darkModeQuery.removeEventListener('change', checkDarkMode);
            observer.disconnect();
        };
    }, []);

    // Theme colors
    const textColor = isDarkMode ? '#ffffff' : '#222222';
    const textSecondary = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#444444';
    const excerptBg = isDarkMode ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 107, 107, 0.1)';
    
    // Use currentBlog data or fallback to blogInfo prop
    const blogData = currentBlog || blogInfo;
    
    const { 
        id, 
        title, 
        content, 
        fullContent,
        excerpt,
        datePublished, 
        image,
        thumbFull,
        thumb,
        author,
        readTime,
        category,
        tags,
        keywords,
        url
    } = blogData || {};

    // Access potentially missing properties safely
    const date = blogData?.date;
    const dateIcon = blogData?.dateIcon;
    const poll = blogData?.poll;

    // Handle author object
    const authorName = author?.name || 'MasterMind Team';
    const authorJobTitle = author?.jobTitle || 'Web Design Expert';
    const authorCompany = author?.company || 'MasterMind Web Developers';
    const authorBio = author?.bio || 'Experienced digital marketing professional with a proven track record of helping businesses achieve remarkable online growth through strategic web design and development.';
    
    // Enhanced image path handling
    const getBlogImagePath = () => {
        const imageName = image || thumbFull || thumb;
        
        if (!imageName) {
            return '/assets/img/blog/placeholder.jpg';
        }
        
        if (imageName.startsWith('/')) {
            return imageName;
        }
        
        if (image || thumbFull) {
            return `/assets/blog/${imageName}`;
        }
        
        if (thumb) {
            return `/assets/img/blog/${imageName}`;
        }
        
        return `/assets/blog/${imageName}`;
    };

    const blogImage = getBlogImagePath();
    const displayDate = datePublished || date || '2025-09-25';
    const currentPoll = poll || currentBlog?.poll;
    const pollOptions = currentPoll?.options.map((option, index) => ({
        id: `option-${index}`,
        text: option
    })) || [];

    // Blog-specific content renderer
    const renderBlogContent = () => {
        if (currentBlog && currentBlog.fullContent) {
            const paragraphs = currentBlog.fullContent.split('\n\n');
            
            return (
                <div className="blog-content">
                    <h1>{currentBlog.title}</h1>
                    
                    {currentBlog.excerpt && (
                        <div className="blog-excerpt">
                            {currentBlog.excerpt}
                        </div>
                    )}

                    {/* Show first 3 paragraphs */}
                    {paragraphs.slice(0, 3).map((paragraph, index) => {
                        if (paragraph.trim().startsWith('•')) {
                            const bullets = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
                            return (
                                <ul key={index}>
                                    {bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>{bullet.replace('•', '').trim()}</li>
                                    ))}
                                </ul>
                            );
                        } else if (paragraph.includes(':') && paragraph.split(':')[0].length < 50) {
                            const [heading, ...content] = paragraph.split(':');
                            return (
                                <div key={index}>
                                    <h2>{heading.trim()}</h2>
                                    {content.length > 0 && <p>{content.join(':').trim()}</p>}
                                </div>
                            );
                        } else {
                            return <p key={index}>{paragraph}</p>;
                        }
                    })}

                    {/* Interactive Poll */}
                    {currentPoll && pollOptions.length > 0 && (
                        <div style={{ 
                            margin: '4rem 0', 
                            width: '100%'
                        }}>
                            <InteractivePoll 
                                question={currentPoll.question}
                                options={pollOptions}
                            />
                        </div>
                    )}

                    {/* Continue with remaining paragraphs */}
                    {paragraphs.slice(3).map((paragraph, index) => {
                        const actualIndex = index + 3;
                        
                        if (paragraph.trim().startsWith('•')) {
                            const bullets = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
                            return (
                                <ul key={actualIndex}>
                                    {bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>{bullet.replace('•', '').trim()}</li>
                                    ))}
                                </ul>
                            );
                        } else if (paragraph.includes(':') && paragraph.split(':')[0].length < 50) {
                            const [heading, ...content] = paragraph.split(':');
                            return (
                                <div key={actualIndex}>
                                    <h2>{heading.trim()}</h2>
                                    {content.length > 0 && <p>{content.join(':').trim()}</p>}
                                </div>
                            );
                        } else {
                            return <p key={actualIndex}>{paragraph}</p>;
                        }
                    })}

                    {/* FAQ Section */}
                    {currentBlog.faq && currentBlog.faq.length > 0 && (
                        <FAQSection faq={currentBlog.faq} />
                    )}
                </div>
            );
        }

        // Fallback for blogs without full content
        return (
            <div className="blog-content">
                <h1>{title || 'Blog Title'}</h1>

                {excerpt && (
                    <div className="excerpt">
                        <p>{excerpt}</p>
                    </div>
                )}
                
                {currentPoll && pollOptions.length > 0 && (
                    <div style={{ margin: '3rem 0' }}>
                        <InteractivePoll 
                            question={currentPoll.question}
                            options={pollOptions}
                        />
                    </div>
                )}
                
                <div dangerouslySetInnerHTML={{ 
                    __html: (fullContent || content || excerpt || 'Content coming soon...').replace(/\n/g, '<br/>') 
                }} />
            </div>
        );
    };

    // Blogs Navigation
    const currentIndex = BlogV2Data.findIndex(blog => blog.slug === urlSlug);
    const totalBlogsCount = totalBlogs || BlogV2Data.length;
    
    const previousIndex = currentIndex === 0 ? totalBlogsCount - 1 : currentIndex - 1;
    const nextIndex = currentIndex === totalBlogsCount - 1 ? 0 : currentIndex + 1;
    
    const previousBlog = BlogV2Data[previousIndex];
    const nextBlog = BlogV2Data[nextIndex];
    
    const getFirstTwoWords = (text?: string) => text?.split(' ').slice(0, 2).join(' ') || "No Title";

    return (
        <>
            {/* INJECT GLOBAL CSS WITH !IMPORTANT FOR THEME COLORS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* Force blog content text colors */
                    .blog-content h1 {
                        font-size: 2.5rem !important;
                        font-weight: 800 !important;
                        margin-bottom: 1rem !important;
                        color: ${textColor} !important;
                    }
                    
                    .blog-content h2 {
                        font-size: 2rem !important;
                        font-weight: 700 !important;
                        margin-bottom: 1rem !important;
                        color: ${textColor} !important;
                    }
                    
                    .blog-content h3,
                    .blog-content h4,
                    .blog-content h5,
                    .blog-content h6 {
                        color: ${textColor} !important;
                    }
                    
                    .blog-content p,
                    .blog-content li {
                        color: ${textSecondary} !important;
                        line-height: 1.8 !important;
                        margin-bottom: 1rem !important;
                    }
                    
                    .blog-content ul {
                        margin-bottom: 1rem !important;
                    }
                    
                    .blog-content .blog-excerpt {
                        padding: 1.5rem !important;
                        background: ${excerptBg} !important;
                        border-left: 4px solid #ff6b6b !important;
                        margin-bottom: 2rem !important;
                        font-style: italic !important;
                        font-size: 1.1rem !important;
                        border-radius: 8px !important;
                        color: ${textSecondary} !important;
                    }
                    
                    .blog-content .excerpt {
                        padding: 1rem !important;
                        background: ${excerptBg} !important;
                        border-left: 4px solid #ff6b6b !important;
                        margin-bottom: 2rem !important;
                        font-style: italic !important;
                        border-radius: 8px !important;
                    }
                    
                    .blog-content .excerpt p {
                        margin: 0 !important;
                        font-size: 1.1rem !important;
                        color: ${textSecondary} !important;
                    }
                `
            }} />
            
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{currentBlog?.seo?.metaTitle || currentBlog?.title || title || 'Blog Post'}</title>
                <meta name="description" content={currentBlog?.seo?.metaDescription || currentBlog?.excerpt || excerpt || ''} />
                <link rel="canonical" href={currentBlog?.seo?.canonicalUrl || currentBlog?.url || url || `https://www.mastermindweb.in/blog/${urlSlug}`} />
                <meta name="keywords" content={currentBlog?.keywords?.join(', ') || keywords?.join(', ') || ''} />
                
                <meta property="og:title" content={currentBlog?.title || title || 'Blog Post'} />
                <meta property="og:description" content={currentBlog?.excerpt || excerpt || ''} />
                <meta property="og:image" content={blogImage} />
                <meta property="og:url" content={currentBlog?.url || url || ''} />
                <meta property="og:type" content="article" />
                
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": currentBlog?.url || url || `https://www.mastermindweb.in/blog/${urlSlug}`
                    },
                    "headline": currentBlog?.title || title || 'Blog Post',
                    "description": currentBlog?.excerpt || excerpt || '',
                    "image": blogImage,
                    "datePublished": displayDate,
                    "author": {
                        "@type": "Person",
                        "name": authorName,
                        "jobTitle": authorJobTitle,
                        "worksFor": { "@type": "Organization", "name": authorCompany }
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "MasterMind Web Developers",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.mastermindweb.in/assets/img/logo1.png"
                        }
                    },
                    "keywords": currentBlog?.keywords || keywords || []
                })}
                </script>
            </Helmet>

            <div className={`blog-area single full-blog right-sidebar full-blog ${sectionClass ? sectionClass : ""}`}
                style={{
                    marginTop: '120px',
                    paddingTop: '40px'
                }}
            >
                <div className="container">
                    <div className="blog-items">
                        <div className="row">
                            <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
                                <div className="blog-style-one item">
                                    <div className="blog-item-box">
                                        {/* Reduced Image Container */}
                                        <div 
                                            className="thumb"
                                            style={{
                                                position: 'relative',
                                                height: '600px',
                                                overflow: 'hidden',
                                                borderRadius: '16px',
                                                marginBottom: '2rem',
                                            }}
                                        >
                                            <img 
                                                src={blogImage} 
                                                alt={title || 'Blog Image'} 
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    borderRadius: '16px'
                                                }}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    if (blogImage.includes('/assets/blog/')) {
                                                        target.src = `/assets/img/blog/${image || thumbFull || thumb || 'placeholder.jpg'}`;
                                                    } else {
                                                        target.src = '/assets/img/blog/placeholder.jpg';
                                                    }
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="info">
                                            <div className="meta">
                                                <ul>
                                                    <li>
                                                        <Link to="#"><i className="fas fa-user-circle" /> {authorName}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#"><i className={dateIcon || "far fa-calendar-alt"}></i> {displayDate}</Link>
                                                    </li>
                                                    {readTime && (
                                                        <li>
                                                            <Link to="#"><i className="far fa-clock"></i> {readTime}</Link>
                                                        </li>
                                                    )}
                                                    {category && (
                                                        <li>
                                                            <Link to="#"><i className="fas fa-folder"></i> {category}</Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                            
                                            {renderBlogContent()}
                                        </div>
                                    </div>
                                </div>

                                <div className="post-author">
                                    <div className="thumb">
                                        <img src={team1Thumb} alt="Author" />
                                    </div>
                                    <div className="info">
                                        <h4><Link to="#" onClick={handleSmoothScroll}>{authorName}</Link></h4>
                                        {authorJobTitle && <p className="job-title"><strong>{authorJobTitle}</strong></p>}
                                        {authorCompany && <p className="company">at {authorCompany}</p>}
                                        <p>{authorBio}</p>
                                    </div>
                                </div>

                                <div className="post-tags share">
                                    <div className="tags">
                                        <h4>Tags: </h4>
                                        {(currentBlog?.tags || tags)?.slice(0, 5).map((tag, index) => (
                                            <Link key={index} to="#" onClick={handleSmoothScroll}>{tag}</Link>
                                        ))}
                                    </div>
                                    <div className="social">
                                        <h4>Share:</h4>
                                        <ul>
                                            <SocialShareV3 />
                                        </ul>
                                    </div>
                                </div>

                                <div className="post-pagi-area">
                                    <div className="post-previous">
                                        <Link to={`/blogs/${previousBlog?.slug}`}>
                                            <div className="icon"><i className="fas fa-angle-double-left"></i></div>
                                            <div className="nav-title"> Previous Post <h5>{getFirstTwoWords(previousBlog?.title)}</h5></div>
                                        </Link>
                                    </div>
                                    <div className="post-next">
                                        <Link to={`/blogs/${nextBlog?.slug}`}>
                                            <div className="nav-title">Next Post <h5>{getFirstTwoWords(nextBlog?.title)}</h5></div>
                                            <div className="icon"><i className="fas fa-angle-double-right"></i></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-50 mt-xs-50">
                                <aside>
                                    <RecentPostsWidget />
                                    <CategoryWidget />
                                    <FollowWidget />
                                    <TagsWidget />
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogSingleWithSidebarContent;
