import { Link } from "react-router-dom";

interface Blog {
    id: number;
    thumb: string;
    title: string;
    datePublished: string; // Changed from 'date' to 'datePublished'
    published: boolean;
}

interface SingleRecentPostProps {
    blog: Blog;
}

const SingleRecentPost: React.FC<SingleRecentPostProps> = ({ blog }) => {
    const { id, thumb, title, datePublished } = blog;

    const truncateString = (str: string): string => {
        if (str.length <= 47) {
            return str;
        }
        return `${str.slice(0, 47)} ...`;
    };

    const truncatedTitle = truncateString(title);

    // Format the date for display
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <li>
            <div className="thumb">
                <Link to={`/blogs/${id}`}>
                    <img 
                        src={`/assets/img/blog/${thumb}`} 
                        width={500} 
                        height={500} 
                        alt="Blog thumbnail" 
                    />
                </Link>
            </div>
            <div className="info">
                <div className="meta-title">
                    <span className="post-date">{formatDate(datePublished)}</span>
                </div>
                <Link to={`/blogs/${id}`}>
                    {truncatedTitle}
                </Link>
            </div>
        </li>
    );
};

export default SingleRecentPost;
