import { Link } from "react-router-dom";
import handleSmoothScroll from '../utilities/handleSmoothScroll';
import Blogv2Data from '../../assets/jsonData/blog/Blogv2Data.json';

const TagsWidget = () => {
    // Extract unique tags from published blog posts
    const getAllTags = () => {
        const allTags = new Set<string>();
        
        Blogv2Data
            .filter(blog => blog.published) // Only include published posts
            .forEach(blog => {
                // Add tags from the tags array
                blog.tags.forEach(tag => {
                    allTags.add(tag.trim());
                });
            });
        
        // Convert Set to Array and sort alphabetically
        return Array.from(allTags).sort();
    };

    const tags = getAllTags();

    const handleTagClick = (tag: string) => {
        // You can implement tag filtering logic here
        console.log(`Filter by tag: ${tag}`);
    };

    return (
        <>
            <div className="sidebar-item tags">
                <h4 className="title">Tags</h4>
                <div className="sidebar-info">
                    <ul>
                        {tags.map(tag => (
                            <li key={tag}>
                                <Link 
                                    to="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTagClick(tag);
                                        handleSmoothScroll(e);
                                    }}
                                >
                                    {tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TagsWidget;
