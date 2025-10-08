// Blog3ColumnContent.tsx
import SingleBlog3Column from './SingleBlog3Column';
import Blogv2Data from "../../assets/jsonData/blog/BlogV2Data.json";
import { useEffect, useMemo, useState } from 'react';
import Pagination from 'react-paginate';
import { useNavigate, useLocation } from 'react-router-dom';

interface DataType { 
    sectionClass?: string 
}

const Blog3ColumnContent = ({ sectionClass }: DataType) => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const pageFromQuery = Number(searchParams.get('page')) || 1;

    const [currentPage, setCurrentPage] = useState(pageFromQuery);
    const itemsPerPage = 6;

    useEffect(() => {
        setCurrentPage(pageFromQuery);
    }, [pageFromQuery]);

    // Filter only published posts
    const publishedBlogs = Blogv2Data.filter(blog => blog.published);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(publishedBlogs.length / itemsPerPage);
    const currentBlogData = publishedBlogs.slice(startIndex, endIndex);

    const handlePageClick = (data: { selected: number }) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
        navigate(`/blogs?page=${selectedPage}`, { replace: false });
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 150);
    };

    return (
        <div 
            className={`blog-area blog-grid-colum ${sectionClass ? sectionClass : ""}`}
            style={{
                paddingTop: '160px', // Increased padding to push content well below navbar
                paddingBottom: '60px'
            }}
        >
            <div className="container">
                <div className="row">
                    {currentBlogData.map((blog: any) => (
                        <div className="col-lg-4 col-md-6 mb-50" key={blog.id}>
                            <SingleBlog3Column blog={blog} />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="row">
                        <div className="col-md-12 pagi-area text-center">
                            <Pagination
                                previousLabel={currentPage === 1 ? <i className='fas fa-ban' /> : <i className='fas fa-angle-double-left' />}
                                nextLabel={currentPage === totalPages ? <i className='fas fa-ban' /> : <i className='fas fa-angle-double-right' />}
                                breakLabel={'...'}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                forcePage={currentPage - 1}
                                containerClassName={'pagination text-center'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog3ColumnContent;
