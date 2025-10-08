import { Link } from "react-router-dom";

interface DataType {
    slug?: string;
    thumb?: string;
    title2?: string;
    date?: string;
    author?: string;
}

const SingleBlog3ColumnLight = ({ blog }: { blog: DataType }) => {
    const { slug, thumb, title2, date, author } = blog

    return (
        <>
            <div className="home-blog-style-one">
                <div className="thumb">
                    <Link to={`/blogs-light/${slug}`}>
                        <img src={`/assets/img/blog/${thumb}`} width={800} height={600} alt="Thumb" />
                    </Link>
                    <div className="info">
                        <div className="meta">
                            <ul>
                                <li>
                                    <Link to="#">{author}</Link>
                                </li>
                                <li>{date}</li>
                            </ul>
                        </div>
                        <h2 className="post-title">
                            <Link to={`/blogs-light/${slug}`}>{title2}</Link>
                        </h2>
                        <Link to={`/blogs-light/${slug}`} className="button-regular">
                            Continue Reading
                            <i className="fas fa-long-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog3ColumnLight;