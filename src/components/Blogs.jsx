import '../style/Blogs.css';

const Blogs = () => {
    const blogTopics = [
        {
          title: "Software Development in Laos: Trends and Opportunities 2024",
          keywords: ["software development", "Laos", "technology trends"],
          type: "industry-insight"
        },
        {
          title: "Comparing Popular Frameworks for Web Development",
          keywords: ["React", "Vue", "Angular", "web development"],
          type: "technical-guide"
        },
        {
          title: "SEO & SEM: Increasing Efficiency and Marketing on Search Engines",
          keywords: ["SEO", "SEM", "digital marketing", "search engine"],
          type: "marketing"
        }
    ];
    
    return (
        <section className="blogs" id="blogs">
            <h1 className="heading"> <span> my </span> blogs </h1>
            <div className="box-container">
                {blogTopics.map((blog, index) => (
                    <div className="box tilt" key={index}>
                        <img src={`images/blog-img-${index + 1}.jpeg`} alt={blog.title} />
                        <h3>{blog.title}</h3>
                        <p>{blog.keywords.join(', ')}</p>
                        <a href={`/blog-detail-${index + 1}`} className="btn">Read more</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;