// BlogSingleWithSidebarContent.tsx - Updated with smaller image
import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import team1Thumb from "/assets/img/team/9.jpg"

import handleSmoothScroll from '../utilities/handleSmoothScroll';
import SocialShareV3 from '../social/SocialShareV3';
import BlogV2Data from "../../assets/jsonData/blog/BlogV2Data.json";
import SearchWidget from '../widgets/SearchWidget';
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

// Enhanced FAQ Component with forced text colors
const FAQSection: React.FC<{ faq: Array<{ question: string; answer: string }> }> = ({ faq }) => {
    const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);

    return (
        <>
            {/* Global CSS injection for theme colors */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* Force light theme colors - BLACK text */
                    :root {
                        --text-color-primary: #222222;
                        --text-color-secondary: #444444;
                        --text-color-muted: #555555;
                        --bg-excerpt: rgba(255, 107, 107, 0.1);
                        --faq-bg: rgba(0, 0, 0, 0.03);
                        --faq-border: rgba(0, 0, 0, 0.08);
                        --faq-shadow: rgba(0, 0, 0, 0.08);
                    }

                    /* Dark theme detection and override */
                    @media (prefers-color-scheme: dark) {
                        :root {
                            --text-color-primary: #ffffff;
                            --text-color-secondary: rgba(255, 255, 255, 0.9);
                            --text-color-muted: rgba(255, 255, 255, 0.8);
                            --bg-excerpt: rgba(255, 107, 107, 0.15);
                            --faq-bg: rgba(255, 255, 255, 0.08);
                            --faq-border: rgba(255, 255, 255, 0.15);
                            --faq-shadow: rgba(255, 255, 255, 0.1);
                        }
                    }

                    /* Class-based dark mode detection */
                    .dark:root,
                    body.dark:root,
                    html.dark:root {
                        --text-color-primary: #ffffff;
                        --text-color-secondary: rgba(255, 255, 255, 0.9);
                        --text-color-muted: rgba(255, 255, 255, 0.8);
                        --bg-excerpt: rgba(255, 107, 107, 0.15);
                        --faq-bg: rgba(255, 255, 255, 0.08);
                        --faq-border: rgba(255, 255, 255, 0.15);
                        --faq-shadow: rgba(255, 255, 255, 0.1);
                    }

                    /* Apply colors to elements */
                    .blog-content h1,
                    .blog-content h2,
                    .blog-content h3,
                    .blog-content h4,
                    .blog-content h5,
                    .blog-content h6,
                    .faq-section .faq-title,
                    .faq-section .faq-question {
                        color: var(--text-color-primary) !important;
                    }

                    .blog-content p,
                    .blog-content li,
                    .faq-section .faq-description,
                    .faq-section .faq-answer {
                        color: var(--text-color-secondary) !important;
                    }

                    .blog-content .blog-excerpt,
                    .blog-content .excerpt {
                        background: var(--bg-excerpt) !important;
                        color: var(--text-color-secondary) !important;
                    }

                    .faq-section .faq-item {
                        background: var(--faq-bg) !important;
                        border-color: var(--faq-border) !important;
                        box-shadow: 0 4px 20px var(--faq-shadow) !important;
                    }

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
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 50%, #ff8e8e 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        🤔 Frequently Asked Questions
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
                                border: '1px solid var(--faq-border)'
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
    const { 
        id, 
        title, 
        content, 
        fullContent,
        excerpt,
        datePublished, 
        date, 
        dateIcon, 
        image,
        thumbFull,
        thumb,
        author,
        readTime,
        category,
        tags,
        keywords,
        url,

        poll
    } = blogInfo || {};

    // Handle author object
    const authorName = author?.name || 'MasterMind Team';
    const authorJobTitle = author?.jobTitle || 'Web Design Expert';
    const authorCompany = author?.company || 'MasterMind Web Developers';
    const authorBio = author?.bio || 'Experienced digital marketing professional with a proven track record of helping businesses achieve remarkable online growth through strategic web design and development.';
    
    // Enhanced image path handling for both old and new data structures
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
    const currentBlog = BlogV2Data.find(blog => blog.id === id);
    const currentPoll = poll || currentBlog?.poll;
    const pollOptions = currentPoll?.options.map((option, index) => ({
        id: `option-${index}`,
        text: option
    })) || [];

    // Debug logging for image path
    React.useEffect(() => {
        console.log('🖼️ IMAGE DEBUG INFO:');
        console.log('Blog ID:', id);
        console.log('image prop:', image);
        console.log('thumbFull prop:', thumbFull);
        console.log('thumb prop:', thumb);
        console.log('Final image path:', blogImage);
        console.log('Current blog from data:', currentBlog?.title);
    }, [id, image, thumbFull, thumb, blogImage, currentBlog]);

    // Blog-specific content renderer
    const renderBlogContent = () => {
        if (currentBlog && currentBlog.fullContent) {
            const paragraphs = currentBlog.fullContent.split('\n\n');
            
            return (
                <div className="blog-content">
                    <h1 style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 800, 
                        marginBottom: '1rem'
                    }}>
                        {currentBlog.title}
                    </h1>
                    
                    {currentBlog.excerpt && (
                        <div className="blog-excerpt" style={{
                            padding: '1.5rem',
                            borderLeft: '4px solid #ff6b6b',
                            marginBottom: '2rem',
                            fontStyle: 'italic',
                            fontSize: '1.1rem',
                            borderRadius: '8px'
                        }}>
                            {currentBlog.excerpt}
                        </div>
                    )}

                    {/* Show first 3 paragraphs */}
                    {paragraphs.slice(0, 3).map((paragraph, index) => {
                        if (paragraph.trim().startsWith('•')) {
                            const bullets = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
                            return (
                                <ul key={index} style={{ marginBottom: '1rem' }}>
                                    {bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>{bullet.replace('•', '').trim()}</li>
                                    ))}
                                </ul>
                            );
                        } else if (paragraph.includes(':') && paragraph.split(':')[0].length < 50) {
                            const [heading, ...content] = paragraph.split(':');
                            return (
                                <div key={index}>
                                    <h2 style={{ 
                                        fontSize: '2rem', 
                                        fontWeight: 700, 
                                        marginBottom: '1rem'
                                    }}>
                                        {heading.trim()}
                                    </h2>
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
                                <ul key={actualIndex} style={{ marginBottom: '1rem' }}>
                                    {bullets.map((bullet, bulletIndex) => (
                                        <li key={bulletIndex}>{bullet.replace('•', '').trim()}</li>
                                    ))}
                                </ul>
                            );
                        } else if (paragraph.includes(':') && paragraph.split(':')[0].length < 50) {
                            const [heading, ...content] = paragraph.split(':');
                            return (
                                <div key={actualIndex}>
                                    <h2 style={{ 
                                        fontSize: '2rem', 
                                        fontWeight: 700, 
                                        marginBottom: '1rem'
                                    }}>
                                        {heading.trim()}
                                    </h2>
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
                <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 800, 
                    marginBottom: '2rem', 
                    textAlign: 'center'
                }}>
                    {title || 'Blog Title'}
                </h1>

                {excerpt && (
                    <div className="excerpt" style={{ 
                        padding: '1rem', 
                        borderLeft: '4px solid #ff6b6b',
                        marginBottom: '2rem',
                        fontStyle: 'italic',
                        borderRadius: '8px'
                    }}>
                        <p style={{ margin: 0, fontSize: '1.1rem' }}>{excerpt}</p>
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
    const currentId = id ? parseInt(id.toString(), 10) : 1;
    const totalBlogsCount = totalBlogs || BlogV2Data.length;
    const previousId = currentId === 1 ? totalBlogsCount : currentId - 1;
    const nextId = currentId === totalBlogsCount ? 1 : currentId + 1;
    const previousBlog = BlogV2Data.find((blog) => blog.id === previousId);
    const nextBlog = BlogV2Data.find((blog) => blog.id === nextId);
    const getFirstTwoWords = (text?: string) => text?.split(' ').slice(0, 2).join(' ') || "No Title";

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{currentBlog?.seo?.metaTitle || currentBlog?.title || title || 'Blog Post'}</title>
                <meta name="description" content={currentBlog?.seo?.metaDescription || currentBlog?.excerpt || excerpt || ''} />
                <link rel="canonical" href={currentBlog?.seo?.canonicalUrl || currentBlog?.url || url || `https://www.mastermindweb.in/blog/post-${id}`} />
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
                        "@id": currentBlog?.url || url || `https://www.mastermindweb.in/blog/post-${id}`
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
                                                height: '600px', // Reduced from default large size
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
                                                    console.log('❌ Image failed to load:', blogImage);
                                                    if (blogImage.includes('/assets/blog/')) {
                                                        target.src = `/assets/img/blog/${image || thumbFull || thumb || 'placeholder.jpg'}`;
                                                    } else {
                                                        target.src = '/assets/img/blog/placeholder.jpg';
                                                    }
                                                }}
                                                onLoad={() => {
                                                    console.log('✅ Image loaded successfully:', blogImage);
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
                                        <Link to={`/blogs/${previousId}`}>
                                            <div className="icon"><i className="fas fa-angle-double-left"></i></div>
                                            <div className="nav-title"> Previous Post <h5>{getFirstTwoWords(previousBlog?.title)}</h5></div>
                                        </Link>
                                    </div>
                                    <div className="post-next">
                                        <Link to={`/blogs/${nextId}`}>
                                            <div className="nav-title">Next Post <h5>{getFirstTwoWords(nextBlog?.title)}</h5></div>
                                            <div className="icon"><i className="fas fa-angle-double-right"></i></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-50 mt-xs-50">
                                <aside>
                                    <SearchWidget />
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
