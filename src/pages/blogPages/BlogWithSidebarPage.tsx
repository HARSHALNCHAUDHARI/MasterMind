import { useParams } from 'react-router-dom';
import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogSingleWithSidebarContent from '../../components/blog/BlogSingleWithSidebarContent';
import DarkClass from '../../components/classes/DarkClass';
import { Helmet } from 'react-helmet-async';
import BlogV2Data from '../../assets/jsonData/blog/BlogV2Data.json';

const BlogWithSidebarPage = () => {
    const { id } = useParams<{ id: string }>();
    const blogId = id ? parseInt(id, 10) : 1;
    
    // Find the specific blog
    const currentBlog = BlogV2Data.find(blog => blog.id === blogId);
    
    if (!currentBlog) {
        return (
            <LayoutV1>
                <Breadcrumb title='Blog Not Found' breadCrumb='blog-not-found' />
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <h2>Blog Post Not Found</h2>
                    <p>The blog post you're looking for doesn't exist.</p>
                </div>
                <DarkClass />
            </LayoutV1>
        );
    }

    return (
        <>
            <Helmet>
                <title>{currentBlog.seo?.metaTitle || currentBlog.title || 'Blog Post'} - MasterMind</title>
                <meta name="description" content={currentBlog.seo?.metaDescription || currentBlog.excerpt || ''} />
            </Helmet>

            <LayoutV1>
                <Breadcrumb title={currentBlog.title || 'Blog Post'} breadCrumb='blog-post' />
                <BlogSingleWithSidebarContent 
                    blogInfo={currentBlog} 
                    totalBlogs={BlogV2Data.length}
                    sectionClass="default-padding-bottom" 
                />
                <DarkClass />
            </LayoutV1>
        </>
    );
};

export default BlogWithSidebarPage;
