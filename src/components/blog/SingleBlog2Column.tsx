import { Link } from "react-router-dom";

interface DataType {
    slug?:string;

    thumb?: string;
    title?: string;
    author?: string;
    date?: string;
}

const SingleBlog2Column = ({ blog }: { blog: DataType }) => {
    const {  thumb, author, title, date , slug} = blog

    return (
        <>
            <div className="home-blog-style-one">
                <div className="thumb">
                    <Link to={`/blogs/${slug}`}>
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
                            <Link to={`/blogs/${slug}`}>{title}</Link>
                        </h2>
                        <Link to={`/blogs/${slug}`} className="button-regular">
                            Continue Reading
                            <i className="fas fa-long-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog2Column;