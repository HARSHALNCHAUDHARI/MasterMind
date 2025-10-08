// BlogV2.tsx
import { Link } from 'react-router-dom';
import Blogv2Data from '../../assets/jsonData/blog/BlogV2Data.json'; // Fixed casing
import SingleBlogV2 from './SingleBlogV2';
import SplitText from '../animation/SplitText';

const BlogV2 = ({ sectionClass }: { sectionClass?: string }) => {
  // Filter published posts and get the first 2 for home page
  const publishedPosts = Blogv2Data.filter(blog => blog.published);
  const homePosts = publishedPosts.slice(0, 2);

  return (
    <div id="blog" className={`blog-area home-blog blog-style-two-area default-padding bottom-less ${sectionClass ? sectionClass : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">News & Events</h4>
              <h2 className="title">
                <SplitText
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                >
                  Latest Blog Posts
                </SplitText>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {homePosts.map((blog: any) => (
            <div className="col-lg-6 col-md-6 mb-30" key={blog.id}>
              <SingleBlogV2 blog={blog} />
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 text-center mt-20">
            <Link to="/blogs" className="button-regular">
              View More <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogV2;
