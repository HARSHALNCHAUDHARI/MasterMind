import BlogV2Data from "../../assets/jsonData/blog/BlogV2Data.json";
import SingleRecentPostLight from './SingleRecentPostLight';

const RecentPostsWidgetLight = () => {
    return (
        <>
            <div className="sidebar-item recent-post">
                <h4 className="title">Recent Post</h4>
                <ul>
                    {BlogV2Data.slice(0, 3).map(blog =>
                        <SingleRecentPostLight blog={blog} key={blog.id} />
                    )}
                </ul>
            </div>
        </>
    );
};

export default RecentPostsWidgetLight;
