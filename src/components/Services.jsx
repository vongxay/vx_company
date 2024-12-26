

import '../style/Services.css'
function Services() {
  return (
    <section className="services" id="services">

    <h1 className="heading">Our <span>Services</span></h1>

    <div className="box-container">

        <div className="box tilt">
            <i className="fas fa-code"></i>
            <h3>Software Development</h3>
            <p>Develop systems that meet the needs of your business using modern technology</p>
        </div>

        <div className="box tilt">
            <i className="fas fa-language"></i>
            <h3>Language Services</h3>
            <p>Translation services for documents, websites, and applications, supporting multiple languages, with a team of professional translators specialized in various fields</p>
        </div>

        <div className="box tilt">
            <i className="fas fa-bullhorn"></i>
            <h3>Online Marketing</h3>
            <p>Plan and execute SEO strategies to increase your business&apos;s visibility on the internet</p>
        </div>

        <div className="box tilt">
            <i className="fas fa-passport"></i>
            <h3>Document Services</h3>
            <p>Comprehensive services for important documents such as passports, visas, work permits, and other official documents, with consultation available</p>
        </div>

        <div className="box tilt">
            <i className="fas fa-laptop-code"></i>
            <h3>Technology Consulting</h3>
            <p>Provide advice and recommendations for using technology that is suitable for your business, with effective digital system development strategies</p>
        </div>

        <div className="box tilt">
            <i className="fab fa-wordpress"></i>
            <h3>Wordpress</h3>
            <p>Customize and maintain WordPress websites to meet your business needs</p>
        </div>

    </div>

</section>
  )
}

export default Services