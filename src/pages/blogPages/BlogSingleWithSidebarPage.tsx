// pages/blogPages/BlogSingleWithSidebarPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogSingleWithSidebarContent from '../../components/blog/BlogSingleWithSidebarContent';
import DarkClass from '../../components/classes/DarkClass';
import { Helmet } from 'react-helmet-async';
import ThemeDark from '../../components/switcher/ThemeDark';
import Blogv2Data from '../../assets/jsonData/blog/BlogV2Data.json';

const BlogSingleWithSidebarPage = () => {
    const { id } = useParams<{ id: string }>();
    
    // Convert string to number
    const blogId = id ? parseInt(id, 10) : 1;
    
    // Find the specific blog
    const currentBlog = Blogv2Data.find(blog => blog.id === blogId);
    
    // Manually inject meta tags for better SEO
    useEffect(() => {
        if (currentBlog) {
            // Update document title
            document.title = `${currentBlog.title} - MasterMind`;
            
            // Create or update meta tags
            const updateMetaTag = (name: string, content: string, property?: boolean) => {
                const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
                let metaTag = document.querySelector(selector) as HTMLMetaElement;
                
                if (!metaTag) {
                    metaTag = document.createElement('meta');
                    if (property) {
                        metaTag.setAttribute('property', name);
                    } else {
                        metaTag.setAttribute('name', name);
                    }
                    document.head.appendChild(metaTag);
                }
                metaTag.setAttribute('content', content);
            };
            
            // Update canonical URL
            let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!canonicalLink) {
                canonicalLink = document.createElement('link');
                canonicalLink.setAttribute('rel', 'canonical');
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.setAttribute('href', currentBlog.url || '');
            
            // Update meta tags
            updateMetaTag('description', currentBlog.excerpt || '');
            updateMetaTag('keywords', currentBlog.keywords?.join(', ') || '');
            
            // Open Graph tags
            updateMetaTag('og:title', currentBlog.title || '', true);
            updateMetaTag('og:description', currentBlog.excerpt || '', true);
            updateMetaTag('og:url', currentBlog.url || '', true);
            updateMetaTag('og:type', 'article', true);
            updateMetaTag('og:image', currentBlog.image || '', true);
            
            // Twitter Card tags
            updateMetaTag('twitter:card', 'summary_large_image');
            updateMetaTag('twitter:title', currentBlog.title || '');
            updateMetaTag('twitter:description', currentBlog.excerpt || '');
            updateMetaTag('twitter:image', currentBlog.image || '');
            
            // Article tags
            updateMetaTag('article:published_time', currentBlog.datePublished || '', true);
            updateMetaTag('article:author', currentBlog.author?.name || 'MasterMind Team', true);
            
            // Update schema markup
            let schemaScript = document.querySelector('#blog-schema') as HTMLScriptElement;
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.id = 'blog-schema';
                schemaScript.type = 'application/ld+json';
                document.head.appendChild(schemaScript);
            }
            
            const schemaData = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": currentBlog.url || `https://www.mastermindweb.in/blog/post-${currentBlog.id}`
                },
                "headline": currentBlog.title,
                "description": currentBlog.excerpt,
                "image": {
                    "@type": "ImageObject",
                    "url": currentBlog.image || "",
                    "width": 1200,
                    "height": 675
                },
                "datePublished": currentBlog.datePublished || "2025-09-25",
                "dateModified": currentBlog.datePublished || "2025-09-25",
                "author": {
                    "@type": "Person",
                    "name": currentBlog.author?.name || "MasterMind Team",
                    "jobTitle": currentBlog.author?.jobTitle || "Web Design Expert",
                    "worksFor": {
                        "@type": "Organization",
                        "name": currentBlog.author?.company || "MasterMind Web Developers"
                    }
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "MasterMind Web Developers",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.mastermindweb.in/assets/img/logo1.png",
                        "width": 600,
                        "height": 60
                    }
                },
                "keywords": currentBlog.keywords || []
            };
            
            schemaScript.innerHTML = JSON.stringify(schemaData, null, 2);
            
            console.log('✅ SEO tags injected successfully for:', currentBlog.title);
        }
        
        // Cleanup function
        return () => {
            // Remove injected meta tags when component unmounts
            const injectedElements = document.querySelectorAll('[data-injected="true"]');
            injectedElements.forEach(el => el.remove());
        };
    }, [currentBlog]);
    
    if (!currentBlog) {
        return (
            <>
                <Helmet>
                    <title>Blog Not Found - MasterMind</title>
                    <meta name="robots" content="noindex,nofollow" />
                </Helmet>
                <LayoutV1>
                    <Breadcrumb title='Blog Not Found' breadCrumb='blog-not-found' />
                    <div className="container" style={{ 
                        padding: '100px 20px', 
                        textAlign: 'center',
                        color: '#ffffff'
                    }}>
                        <h2>Blog Post Not Found</h2>
                        <p><strong>Requested ID:</strong> {blogId}</p>
                        <p><strong>Available IDs:</strong> {Blogv2Data.map(blog => blog.id).join(', ')}</p>
                    </div>
                    <DarkClass />
                    <ThemeDark />
                </LayoutV1>
            </>
        );
    }

    return (
        <>
            <Helmet>
                {/* Primary SEO Tags */}
                <title>{currentBlog.seo?.metaTitle || currentBlog.title} - MasterMind</title>
                <meta name="description" content={currentBlog.seo?.metaDescription || currentBlog.excerpt || ''} />
                <link rel="canonical" href={currentBlog.url} />
                <meta name="keywords" content={currentBlog.keywords?.join(', ') || ''} />
                <meta name="author" content={currentBlog.author?.name || 'MasterMind Team'} />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={currentBlog.title} />
                <meta property="og:description" content={currentBlog.excerpt || ''} />
                <meta property="og:image" content={currentBlog.image || ''} />
                <meta property="og:url" content={currentBlog.url} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="MasterMind Web Developers" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={currentBlog.title} />
                <meta name="twitter:description" content={currentBlog.excerpt || ''} />
                <meta name="twitter:image" content={currentBlog.image || ''} />
                
                {/* Article Meta Tags */}
                <meta property="article:published_time" content={currentBlog.datePublished} />
                <meta property="article:author" content={currentBlog.author?.name || 'MasterMind Team'} />
                {currentBlog.tags?.map((tag, index) => (
                    <meta key={index} property="article:tag" content={tag} />
                ))}
                
                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": currentBlog.url
                    },
                    "headline": currentBlog.title,
                    "description": currentBlog.excerpt,
                    "image": {
                        "@type": "ImageObject",
                        "url": currentBlog.image || "",
                        "width": 1200,
                        "height": 675
                    },
                    "datePublished": currentBlog.datePublished || "2025-09-25",
                    "dateModified": currentBlog.datePublished || "2025-09-25",
                    "author": {
                        "@type": "Person",
                        "name": currentBlog.author?.name || "MasterMind Team",
                        "jobTitle": currentBlog.author?.jobTitle || "Web Design Expert",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "MasterMind Web Developers"
                        }
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "MasterMind Web Developers",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.mastermindweb.in/assets/img/logo1.png",
                            "width": 600,
                            "height": 60
                        }
                    },
                    "keywords": currentBlog.keywords || []
                }, null, 2)}
                </script>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title={currentBlog.title || 'Blog Post'} breadCrumb='blog-post' />
                <BlogSingleWithSidebarContent 
                    blogInfo={currentBlog} 
                    totalBlogs={Blogv2Data.length}
                    sectionClass="default-padding-bottom" 
                />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogSingleWithSidebarPage;
