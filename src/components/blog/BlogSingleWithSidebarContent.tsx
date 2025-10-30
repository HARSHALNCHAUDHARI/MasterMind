// BlogSingleWithSidebarContent.tsx - Light Theme = Black Text, Dark Theme Unchanged
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

// Optimized FAQ Component
const FAQSection: React.FC<{ faq: Array<{ question: string; answer: string }> }> = ({ faq }) => {
    const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        const checkDarkMode = () => {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const hasDarkClass = document.documentElement.classList.contains('dark') || 
                                 document.body.classList.contains('dark');
            setIsDarkMode(darkModeQuery.matches || hasDarkClass);
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

    const colors = {
        textPrimary: isDarkMode ? '#ffffff' : '#000000',
        textSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#000000',
        excerptBg: isDarkMode ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 107, 107, 0.1)',
        faqBg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)',
        faqBorder: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        faqShadow: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
    };

    return (
        <>
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

                    /* FAQ Icon - Headset */
                    .faq-icon-marker {
                        display: inline-flex !important;
                        width: 40px !important;
                        height: 40px !important;
                        background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%) !important;
                        border-radius: 50% !important;
                        align-items: center !important;
                        justify-content: center !important;
                        margin-right: 1rem !important;
                        flex-shrink: 0 !important;
                        box-shadow: 0 3px 10px rgba(255, 107, 107, 0.2) !important;
                    }

                    .faq-icon-marker i {
                        color: white !important;
                        font-size: 20px !important;
                    }

                    /* Toggle Button */
                    .faq-toggle-btn {
                        width: 44px !important;
                        height: 44px !important;
                        border-radius: 50% !important;
                        background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%) !important;
                        border: none !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        cursor: pointer !important;
                        transition: all 0.3s ease !important;
                        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25) !important;
                        flex-shrink: 0 !important;
                        padding: 0 !important;
                    }

                    .faq-toggle-btn:hover {
                        transform: translateY(-2px) !important;
                        box-shadow: 0 6px 16px rgba(255, 107, 107, 0.35) !important;
                    }

                    .faq-toggle-btn i {
                        font-size: 18px !important;
                        color: white !important;
                        transition: transform 0.3s ease !important;
                    }

                    .faq-toggle-btn.expanded i {
                        transform: rotate(180deg) !important;
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
                    maxWidth: '100%',
                    margin: '0 auto'
                }}>
                    {faq.map((item, index) => (
                        <div 
                            key={index} 
                            className="faq-item" 
                            style={{
                                marginBottom: '1.2rem',
                                overflow: 'hidden',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                background: colors.faqBg,
                                border: `1px solid ${colors.faqBorder}`,
                                boxShadow: `0 2px 8px ${colors.faqShadow}`
                            }}
                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        >
                            <div style={{ padding: '1.8rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        flex: 1
                                    }}>
                                        <span className="faq-icon-marker" style={{ marginTop: '4px' }}>
                                            <i className="fas fa-headset"></i>
                                        </span>
                                        <h4 className="faq-question" style={{ 
                                            marginBottom: 0,
                                            fontSize: '1.15rem',
                                            fontWeight: 600,
                                            lineHeight: '1.5',
                                            maxHeight: '4.8rem',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {item.question}
                                        </h4>
                                    </div>
                                    <button
                                        className={`faq-toggle-btn ${expandedFAQ === index ? 'expanded' : ''}`}
                                        style={{
                                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                                            marginTop: '4px'
                                        }}
                                    >
                                        <i className="fas fa-chevron-down"></i>
                                    </button>
                                </div>
                                
                                {expandedFAQ === index && (
                                    <div style={{
                                        animation: 'fadeInDown 0.3s ease',
                                        borderTop: '1px solid rgba(255, 107, 107, 0.2)',
                                        marginTop: '1.4rem',
                                        paddingTop: '1.4rem'
                                    }}>
                                        <p className="faq-answer" style={{ 
                                            marginBottom: 0,
                                            fontSize: '1rem',
                                            lineHeight: '1.8',
                                            color: colors.textSecondary
                                        }}>
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
    const { slug: urlSlug } = useParams<{ slug: string }>();
    const currentBlog = BlogV2Data.find(blog => blog.slug === urlSlug) as DataType | undefined;
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        const checkDarkMode = () => {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const hasDarkClass = document.documentElement.classList.contains('dark') || 
                                 document.body.classList.contains('dark');
            const newDarkMode = darkModeQuery.matches || hasDarkClass;
            setIsDarkMode(newDarkMode);
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

    // Light theme: Pure black text, Dark theme: unchanged
    const textColor = isDarkMode ? '#ffffff' : '#000000';
    const textSecondary = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : '#000000';
    const excerptBg = isDarkMode ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 107, 107, 0.1)';
    
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

    const date = blogData?.date;
    const dateIcon = blogData?.dateIcon;
    const poll = blogData?.poll;

    const authorName = author?.name || 'MasterMind Team';
    const authorJobTitle = author?.jobTitle || 'Web Design Expert';
    const authorCompany = author?.company || 'MasterMind Web Developers';
    const authorBio = author?.bio || 'Experienced digital marketing professional with a proven track record of helping businesses achieve remarkable online growth through strategic web design and development.';
    
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

                    {currentBlog.faq && currentBlog.faq.length > 0 && (
                        <FAQSection faq={currentBlog.faq} />
                    )}
                </div>
            );
        }

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

    const currentIndex = BlogV2Data.findIndex(blog => blog.slug === urlSlug);
    const totalBlogsCount = totalBlogs || BlogV2Data.length;
    
    const previousIndex = currentIndex === 0 ? totalBlogsCount - 1 : currentIndex - 1;
    const nextIndex = currentIndex === totalBlogsCount - 1 ? 0 : currentIndex + 1;
    
    const previousBlog = BlogV2Data[previousIndex];
    const nextBlog = BlogV2Data[nextIndex];
    
    const getFirstTwoWords = (text?: string) => text?.split(' ').slice(0, 2).join(' ') || "No Title";

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* Blog content text colors */
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
                        margin-top: 1.5rem !important;
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
                        font-size: 1rem !important;
                    }
                    
                    .blog-content ul,
                    .blog-content ol {
                        margin-bottom: 1.5rem !important;
                        margin-left: 1.5rem !important;
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

                    /* MOBILE RESPONSIVE IMAGE - DESKTOP */
                    .blog-item-box .thumb {
                        width: 100% !important;
                        height: 700px !important;
                        position: relative !important;
                        overflow: hidden !important;
                        border-radius: 16px !important;
                        margin-bottom: 2rem !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 107, 107, 0.05) 100%) !important;
                    }

                    .blog-item-box .thumb img {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                        object-position: center !important;
                        border-radius: 16px !important;
                        display: block !important;
                    }

                    /* TABLET BREAKPOINT: 992px and below */
                    @media (max-width: 992px) {
                        .blog-item-box .thumb {
                            height: 580px !important;
                            margin-bottom: 1.8rem !important;
                        }
                    }

                    /* TABLET BREAKPOINT: 768px and below */
                    @media (max-width: 768px) {
                        .blog-item-box .thumb {
                            height: 480px !important;
                            margin-bottom: 1.5rem !important;
                        }

                        .blog-content h1 {
                            font-size: 2rem !important;
                        }

                        .blog-content h2 {
                            font-size: 1.6rem !important;
                        }
                    }

                    /* MOBILE BREAKPOINT: 600px and below */
                    @media (max-width: 600px) {
                        .blog-item-box .thumb {
                            height: 380px !important;
                            margin-bottom: 1.2rem !important;
                            border-radius: 12px !important;
                        }

                        .blog-item-box .thumb img {
                            border-radius: 12px !important;
                        }

                        .blog-content h1 {
                            font-size: 1.8rem !important;
                            margin-bottom: 0.8rem !important;
                        }

                        .blog-content h2 {
                            font-size: 1.4rem !important;
                            margin-top: 1.2rem !important;
                            margin-bottom: 0.8rem !important;
                        }

                        .blog-content p,
                        .blog-content li {
                            font-size: 0.95rem !important;
                            line-height: 1.7 !important;
                        }
                    }

                    /* SMALL MOBILE: 480px and below */
                    @media (max-width: 480px) {
                        .blog-item-box .thumb {
                            height: 320px !important;
                            margin-bottom: 1rem !important;
                        }

                        .blog-content h1 {
                            font-size: 1.6rem !important;
                            margin-bottom: 0.7rem !important;
                        }

                        .blog-content h2 {
                            font-size: 1.2rem !important;
                            margin-top: 1rem !important;
                            margin-bottom: 0.7rem !important;
                        }

                        .blog-content p,
                        .blog-content li {
                            font-size: 0.9rem !important;
                        }

                        .blog-content ul,
                        .blog-content ol {
                            margin-left: 1rem !important;
                        }
                    }

                    /* EXTRA SMALL: 375px and below */
                    @media (max-width: 375px) {
                        .blog-item-box .thumb {
                            height: 280px !important;
                            margin-bottom: 0.8rem !important;
                            border-radius: 10px !important;
                        }

                        .blog-item-box .thumb img {
                            border-radius: 10px !important;
                        }

                        .blog-content h1 {
                            font-size: 1.4rem !important;
                            margin-bottom: 0.6rem !important;
                        }

                        .blog-content h2 {
                            font-size: 1.1rem !important;
                            margin-top: 0.9rem !important;
                            margin-bottom: 0.6rem !important;
                        }

                        .blog-content p,
                        .blog-content li {
                            font-size: 0.85rem !important;
                        }

                        .blog-content .blog-excerpt {
                            padding: 1rem !important;
                            font-size: 0.95rem !important;
                        }
                    }
                `
            }} />
            
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
                                        <div 
                                            className="thumb"
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '700px',
                                                overflow: 'hidden',
                                                borderRadius: '16px',
                                                marginBottom: '2rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: isDarkMode ? 'rgba(255, 107, 107, 0.08)' : 'rgba(255, 107, 107, 0.05)'
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
                                                    borderRadius: '16px',
                                                    display: 'block'
                                                }}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    if (blogImage.includes('/assets/blog/')) {
                                                        target.src = `/assets/img/blog/${image || thumbFull || thumb || 'placeholder.jpg'}`;
                                                    } else {
                                                        target.src = '/assets/img/blog/placeholder.jpg';
                                                    }
                                                }}
                                                loading="lazy"
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
