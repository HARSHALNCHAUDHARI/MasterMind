import { Link } from "react-router-dom";
import handleSmoothScroll from '../utilities/handleSmoothScroll';
import Blogv2Data from '../../assets/jsonData/blog/BlogV2Data.json';

const CategoryWidget = () => {
    // Extract and count categories from published blog posts
    const getCategoryCounts = () => {
        const categoryCount: { [key: string]: number } = {};
        
        Blogv2Data
            .filter(blog => blog.published) // Only count published posts
            .forEach(blog => {
                const category = blog.category.toLowerCase();
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            });
        
        // Sort categories by count (descending)
        return Object.entries(categoryCount)
            .sort(([,a], [,b]) => b - a)
            .map(([category, count]) => ({ category, count }));
    };

    const categories = getCategoryCounts();

    return (
        <>
            <div className="sidebar-item category">
                <h4 className="title">Category List</h4>
                <div className="sidebar-info">
                    <ul>
                        {categories.map(({ category, count }) => (
                            <li key={category}>
                                <Link 
                                    to={`/blog/category/${category.toLowerCase()}`} 
                                    onClick={handleSmoothScroll}
                                >
                                    {category} <span>{count}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CategoryWidget;
