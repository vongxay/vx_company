import '../style/Projects.css';

const Projects = () => {
    return (
        <section className="portfolio" id="portfolio">

    <h1 className="heading">Pro<span>jects</span> </h1>

    <div className="box-container">

        <div className="box tilt">
            <img src="images/img-1.jpeg" alt="การอบรมพัฒนาซอฟต์แวร์โดย VX Tech" loading="lazy" />
            <div className="content">
                <a href="/project-detail-1" className="btn">View details</a>
            </div>
        </div>

        <div className="box tilt">
            <img src="images/img-2.jpeg" alt="SEO & SEM" />
            <div className="content">
                <a href="/project-detail-2" className="btn">View details</a>
            </div>
        </div>

        <div className="box tilt">
            <img src="images/img-3.jpeg" alt="Digital Marketing" />
            <div className="content">
                <a href="/project-detail-3" className="btn">View details</a>
            </div>
        </div>

        <div className="box tilt">
            <img src="images/img-5.jpeg" alt="Translation Services" />
            <div className="content">
                <a href="/project-detail-5" className="btn">View details</a>
            </div>
        </div>

    </div>
    
</section>
    );
};

export default Projects;