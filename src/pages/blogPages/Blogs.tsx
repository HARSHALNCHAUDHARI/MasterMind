import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Blog3ColumnContent from "../../components/blog/Blog3ColumnContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeDark from "../../components/switcher/ThemeDark";

const Blogs = () => {
    const { search } = useLocation();
    const canonical = `https://www.mastermindweb.in/blogs${search || '?page=1'}`;
    
    return (
        <>
            <Helmet>
                <title>Latest Blog Posts - Web Design & Development Insights | MasterMind</title>
                <meta name="description" content="Explore our latest blog posts on web design, development, and digital marketing. Get expert insights and tips to grow your online presence." />
                <meta name="keywords" content="web design blog, development tips, digital marketing, website optimization, MasterMind blog" />
                <link rel="canonical" href={canonical} />
                
                {/* Open Graph */}
                <meta property="og:title" content="Latest Blog Posts | MasterMind Web Developers" />
                <meta property="og:description" content="Explore our latest blog posts on web design, development, and digital marketing insights." />
                <meta property="og:url" content={canonical} />
                <meta property="og:type" content="website" />
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Grid' breadCrumb='blogs' />
                <Blog3ColumnContent sectionClass='default-padding-bottom' />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default Blogs;
