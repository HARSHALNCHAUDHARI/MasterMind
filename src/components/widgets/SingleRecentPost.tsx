import { Link } from "react-router-dom";

interface Blog {
    slug: string;
    image: string;
    title: string;
    datePublished: string;
    published: boolean;
}

interface SingleRecentPostProps {
    blog: Blog;
}

const SingleRecentPost: React.FC<SingleRecentPostProps> = ({ blog }) => {
    const { slug, image, title, datePublished } = blog;

    const truncateString = (str: string): string => {
        if (str.length <= 47) {
            return str;
        }
        return `${str.slice(0, 47)} ...`;
    };

    const truncatedTitle = truncateString(title);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getBlogImagePath = () => {
        if (!image) {
            return '/assets/img/blog/placeholder.jpg';
        }
        
        if (image.startsWith('/')) {
            return image;
        }
        
        return `/assets/blog/${image}`;
    };

    const imageSrc = getBlogImagePath();

    return (
        <li>
            <div className="thumb">
                <Link to={`/blogs/${slug}`}>
                    <img 
                        src={imageSrc}
                        width={500} 
                        height={500} 
                        alt={title}
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const fallbackPaths = [
                                `/assets/img/blog/${image}`,
                                `/assets/blog/${image}`,
                                'https://via.placeholder.com/500x500/1a1a1a/ffffff?text=Blog'
                            ];
                            
                            const currentSrc = target.src;
                            const nextFallback = fallbackPaths.find(path => !currentSrc.includes(path));
                            
                            if (nextFallback) {
                                target.src = nextFallback;
                            }
                        }}
                    />
                </Link>
            </div>
            <div className="info">
                <div className="meta-title">
                    <span className="post-date">{formatDate(datePublished)}</span>
                </div>
                <Link to={`/blogs/${slug}`}>
                    {truncatedTitle}
                </Link>
            </div>
        </li>
    );
};

export default SingleRecentPost;
