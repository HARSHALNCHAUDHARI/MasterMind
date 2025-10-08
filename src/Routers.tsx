import { Route, Routes } from "react-router-dom";

//Home Dark
import Home9 from "./pages/homePages/Home9";
// Home Light
import Home9Light from "./pages/homePages/Home9Light";

// Service Pages
import WebsiteDevelopmentCompanyInPune from "./pages/servicesPages/website-development-company-in-pune";
import SeoAgencyInPune from "./pages/servicesPages/seo-agency-in-pune";

// Blog Pages - Add @ts-ignore to suppress TypeScript errors
// Blog Pages
import BlogStandardPage from "./pages/blogPages/BlogStandardPage";
import BlogWithSidebarPage from "./pages/blogPages/BlogWithSidebarPage";
import Blog2ColumnPage from "./pages/blogPages/Blog2ColumnPage";
import Blogs from "./pages/blogPages/Blogs";
import BlogSinglePage from "./pages/blogPages/BlogSinglePage";
import BlogSingleWithSidebarPage from "./pages/blogPages/BlogSingleWithSidebarPage";

// Blog Light
import BlogStandardLightPage from "./pages/blogPages/BlogStandardLightPage";
import BlogWithSidebarLightPage from "./pages/blogPages/BlogWithSidebarLightPage";
import Blog2ColumnLightPage from "./pages/blogPages/Blog2ColumnLightPage";
import Blog3ColumnLightPage from "./pages/blogPages/Blog3ColumnLightPage";
import BlogSingleLightPage from "./pages/blogPages/BlogSingleLightPage";
import BlogSingleWithSidebarLightPage from "./pages/blogPages/BlogSingleWithSidebarLightPage";

const Routers = () => {
    return (
        <>
            <Routes>
                {/* Fix: Only one home route */}
                <Route path='/' element={<Home9 />}></Route>
                <Route path='/home-light' element={<Home9Light />}></Route>

                {/* Service Pages */}
                <Route path='/services/website-development-company-in-pune' element={<WebsiteDevelopmentCompanyInPune />}></Route>
                <Route path='/services/seo-agency-in-pune' element={<SeoAgencyInPune />}></Route>

                {/* Blog Pages */}
                <Route path='/blog-standard' element={<BlogStandardPage />}></Route>
                <Route path='/blog-standard?:page?' element={<BlogStandardPage />}></Route>
                <Route path='/blog-with-sidebar' element={<BlogWithSidebarPage />}></Route>
                <Route path='/blog-with-sidebar?:page?' element={<BlogWithSidebarPage />}></Route>
                <Route path='/blog-2-column' element={<Blog2ColumnPage />}></Route>
                <Route path='/blog-2-column?:page?' element={<Blog2ColumnPage />}></Route>
                <Route path='/blogs' element={<Blogs />}></Route>
                <Route path='/blogs?:page?' element={<Blogs />}></Route>
                <Route path='/blog-single/:id' element={<BlogSinglePage />}></Route>
                <Route path='/blogs/:slug' element={<BlogSingleWithSidebarPage />}></Route>

                {/* Blog Light */}
                <Route path='/blog-standard-light' element={<BlogStandardLightPage />}></Route>
                <Route path='/blog-standard-light?:page?' element={<BlogStandardPage />}></Route>
                <Route path='/blog-with-sidebar-light' element={<BlogWithSidebarLightPage />}></Route>
                <Route path='/blog-with-sidebar-light?:page?' element={<BlogWithSidebarPage />}></Route>
                <Route path='/blog-2-column-light' element={<Blog2ColumnLightPage />}></Route>
                <Route path='/blog-2-column-light?:page?' element={<Blog2ColumnPage />}></Route>
                <Route path='/blogs-light' element={<Blog3ColumnLightPage />}></Route>
                <Route path='/blogs-light?:page?' element={<Blogs />}></Route>
                <Route path='/blog-single-light/:id' element={<BlogSingleLightPage />}></Route>
                <Route path='/blogs-light/:slug' element={<BlogSingleWithSidebarLightPage />}></Route>
            </Routes>
        </>
    );
};

export default Routers;
