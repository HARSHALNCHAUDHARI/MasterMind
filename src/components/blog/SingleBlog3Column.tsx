// SingleBlog3Column.tsx
import { Link } from "react-router-dom";
import React from "react";

interface AuthorObj {
    name: string;
    jobTitle?: string;
    company?: string;
    bio?: string;
}

interface DataType {
    slug?:string;
    image?: string;        
    thumb?: string;        
    thumbFull?: string;    
    title?: string;
    title2?: string;
    datePublished?: string; 
    date?: string;         
    author?: AuthorObj;    
    readTime?: string;
    excerpt?: string;      
    category?: string;     
}

const SingleBlog3Column = ({ blog }: { blog: DataType }) => {
    const { slug, image, thumb, thumbFull, title, title2, datePublished, date, author, readTime, excerpt, category } = blog;
    
    // Handle author object properly
    const authorName = author?.name || 'MasterMind Team';
    
    // Use title if available, fallback to title2
    const displayTitle = title || title2;
    
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

    const imageSrc = getBlogImagePath();
    const displayDate = datePublished || date;

    return (
        <div 
            className="home-blog-style-one"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                // Remove any margins/padding that might cause gaps
                margin: 0,
                padding: 0
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Image Container - Fixed to eliminate gaps */}
            <div 
                className="thumb" 
                style={{
                    position: 'relative',
                    height: '220px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    // Ensure no gaps by removing any default spacing
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    display: 'block'
                }}
            >
                <Link 
                    to={`/blogs/${slug}`}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        margin: 0,
                        padding: 0
                    }}
                >
                    <img 
                        src={imageSrc} 
                        alt={displayTitle || 'Blog Image'} 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transition: 'transform 0.3s ease',
                            display: 'block', // Remove inline spacing
                            margin: 0,
                            padding: 0,
                            border: 'none',
                            outline: 'none',
                            verticalAlign: 'top' // Prevent baseline gap
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            console.log('❌ SingleBlog3Column - Image failed to load:', imageSrc);
                            
                            const fallbackPaths = [
                                `/assets/img/blog/${image || thumbFull || thumb}`,
                                `/assets/blog/${image || thumbFull || thumb}`,
                                '/assets/img/blog/placeholder.jpg',
                                'https://via.placeholder.com/400x220/f0f0f0/666666?text=Blog+Image'
                            ];
                            
                            const currentSrc = target.src;
                            const nextFallback = fallbackPaths.find(path => 
                                path !== currentSrc && 
                                !path.includes('undefined') && 
                                !path.includes('null')
                            );
                            
                            if (nextFallback) {
                                target.src = nextFallback;
                            }
                        }}
                        onLoad={() => {
                            console.log('✅ SingleBlog3Column - Image loaded successfully:', imageSrc);
                        }}
                    />
                </Link>

                {/* Date Badge */}
                {displayDate && (
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(255, 107, 107, 0.95)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        zIndex: 2,
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}>
                        {displayDate}
                    </div>
                )}

                {/* Category Badge */}
                {category && (
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {category}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div 
                className="info" 
                style={{
                    padding: '1.5rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Meta Information */}
                <div className="meta">
                    <ul style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 1rem 0',
                        flexWrap: 'wrap'
                    }}>
                        <li>
                            <Link 
                                to="#" 
                                onClick={(e) => e.preventDefault()}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <i className="fas fa-user" style={{ fontSize: '0.8rem' }}></i>
                                {authorName}
                            </Link>
                        </li>
                        {readTime && (
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <i className="fas fa-clock" style={{ fontSize: '0.8rem' }}></i>
                                {readTime}
                            </li>
                        )}
                    </ul>
                </div>

                {/* Title */}
                <h2 
                    className="post-title"
                    style={{
                        fontSize: '1.3rem',
                        lineHeight: '1.4',
                        marginBottom: '1rem',
                        fontWeight: '700',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '3.6rem',
                        flex: 1
                    }}
                >
                    <Link 
                        to={`/blogs/${slug}`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#ff6b6b';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'inherit';
                        }}
                    >
                        {displayTitle}
                    </Link>
                </h2>

                {/* Excerpt */}
                {excerpt && (
                    <p style={{
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        opacity: 0.8,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {excerpt}
                    </p>
                )}

                {/* Continue Reading Button - Always at bottom */}
                <div style={{ marginTop: 'auto' }}>
                    <Link 
                        to={`/blogs/${slug}`} 
                        className="button-regular"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.7rem 1.5rem',
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '25px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                        }}
                    >
                        Continue Reading
                        <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog3Column;
