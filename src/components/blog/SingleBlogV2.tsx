// SingleBlogV2.tsx
import { Link } from 'react-router-dom';

interface AuthorObj {
  name: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
}

interface DataType {
  slug?: string;
  image?: string;
  thumb?: string;
  thumbFull?: string;
  author?: AuthorObj;
  comment?: number;
  title?: string;
  datePublished?: string;
  date?: string;
  month?: string;
  readTime?: string;
}

const SingleBlogV2 = ({ blog }: { blog: DataType }) => {
  const { slug, image, thumb, thumbFull, author, comment, title, datePublished, date, month, readTime } = blog;

  // Handle author object properly
  const authorLabel = author?.name || '';
  const commentLabel = typeof comment === 'number' ? `${comment} Comments` : undefined;

  // Enhanced image path handling for both old and new data structures
  const getBlogImagePath = () => {
    // Priority order: image > thumbFull > thumb
    const imageName = image || thumbFull || thumb;
    
    if (!imageName) {
      return '/assets/img/blog/placeholder.jpg';
    }
    
    // If it's already a full path starting with /, use as-is
    if (imageName.startsWith('/')) {
      return imageName;
    }
    
    // Try different possible paths based on the data structure
    // First try the new path structure
    if (image || thumbFull) {
      return `/assets/blog/${imageName}`;
    }
    
    // For old data structure with thumb property, use the old path
    if (thumb) {
      return `/assets/img/blog/${imageName}`;
    }
    
    // Default fallback
    return `/assets/blog/${imageName}`;
  };

  const imageSrc = getBlogImagePath();
  
  // Use datePublished if available, fallback to date
  const displayDate = datePublished || date;

  return (
    <div 
      className="home-blog-two"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Make cards fill container height
        minHeight: '550px' // Ensure consistent minimum height
      }}
    >
      <div 
        className="thumb" 
        style={{
          position: 'relative',
          height: '300px', // Fixed height for consistency
          overflow: 'hidden',
          borderRadius: '12px',
          backgroundColor: '#1a1a1a', // Dark background to match your theme
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Link to={`/blogs/${slug ?? ''}`}>
          <img
            src={imageSrc}
            alt={title ?? 'Image Not Found'}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Changed to contain to show full image
              objectPosition: 'center',
              transition: 'transform 0.3s ease',
              borderRadius: '12px',
              display: 'block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'; // Very subtle zoom
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.log('❌ SingleBlogV2 - Image failed to load:', imageSrc);
              
              // Try multiple fallback paths
              const fallbackPaths = [
                `/assets/img/blog/${image || thumbFull || thumb}`,
                `/assets/blog/${image || thumbFull || thumb}`,
                '/assets/img/blog/placeholder.jpg',
                'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Blog+Image'
              ];
              
              const currentSrc = target.src;
              const nextFallback = fallbackPaths.find(path => path !== currentSrc && path !== 'undefined');
              
              if (nextFallback) {
                target.src = nextFallback;
              }
            }}
            onLoad={() => {
              console.log('✅ SingleBlogV2 - Image loaded successfully:', imageSrc);
            }}
          />
        </Link>

        {/* Date badge - positioned at top-right corner */}
        {(displayDate || month) && (
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
      </div>

      <div 
        className="info" 
        style={{
          padding: '1.5rem 0',
          flex: 1, // Take remaining space
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div 
          className="content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div className="meta" style={{
            marginBottom: '1rem'
          }}>
            <ul style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              fontSize: '0.9rem',
              opacity: 0.7,
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {authorLabel && (
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
                    {authorLabel}
                  </Link>
                </li>
              )}
              {readTime && (
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
                    <i className="fas fa-clock" style={{ fontSize: '0.8rem' }}></i>
                    {readTime}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {title && (
            <h3 
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
                minHeight: '3.6rem', // Fixed height for 2 lines
                flex: 1
              }}
            >
              <Link 
                to={`/blogs/${slug ?? ''}`}
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
                {title}
              </Link>
            </h3>
          )}

          <div style={{ marginTop: 'auto' }}> {/* Push button to bottom */}
            <Link 
              to={`/blogs/${slug ?? ''}`} 
              className="button-regular"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.8rem',
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
    </div>
  );
};

export default SingleBlogV2;
