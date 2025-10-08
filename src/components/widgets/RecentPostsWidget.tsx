import Blogv2Data from '../../assets/jsonData/blog/BlogV2Data.json';
import SingleRecentPost from './SingleRecentPost';

const RecentPostsWidget = () => {
    // Sort blogs by datePublished in descending order (most recent first)
    const sortedBlogs = [...Blogv2Data] // Changed from Blog2Data to Blogv2Data
        .filter(blog => blog.published) // Only include published posts
        .sort((a, b) => {
            const dateA = new Date(a.datePublished);
            const dateB = new Date(b.datePublished);
            return dateB.getTime() - dateA.getTime(); // Descending order
        });

    return (
        <>
            <div className="sidebar-item recent-post">
                <h4 className="title">Recent Posts</h4>
                <ul>
                    {sortedBlogs.slice(0, 3).map(blog =>
                        <SingleRecentPost blog={blog} key={blog.id} />
                    )}
                </ul>
            </div>
        </>
    );
};

export default RecentPostsWidget;
