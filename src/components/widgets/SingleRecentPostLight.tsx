import { Link } from "react-router-dom";

interface Blog {
    slug?: string;  // Make it optional
    id: number;
    date: string;
    dateIcon?: string;
    author?: string;
    authorIcon?: string;
    tag?: string;
    title: string;
    text?: string;
    btnText?: string;
    btnIcon?: string;
    thumbFull?: string;
    thumb: string;
    animationDelay?: string;
}

interface SingleRecentPostProps {
    blog: Blog;
}

const SingleRecentPostLight: React.FC<SingleRecentPostProps> = ({ blog }) => {
    const { thumb, title, date, slug } = blog;
    
    // Generate slug from title if not present (same logic as SingleBlogV2)
    const blogSlug = slug ?? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    
    const truncateString = (str: string): string => {
        if (str.length <= 47) {
            return str;
        }
        return `${str.slice(0, 47)} ...`;
    };

    const truncatedTitle = truncateString(title);

    return (
        <li>
            <div className="thumb">
                <Link to={`/blogs-light/${blogSlug}`}>
                    <img src={`/assets/img/blog/${thumb}`} width={500} height={500} alt="Thumb" />
                </Link>
            </div>
            <div className="info">
                <div className="meta-title">
                    <span className="post-date">{date}</span>
                </div>
                <Link to={`/blogs-light/${blogSlug}`}>{truncatedTitle}</Link>
            </div>
        </li>
    );
};

export default SingleRecentPostLight;
