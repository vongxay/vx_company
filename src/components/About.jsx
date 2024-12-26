import '../style/About.css';

const About = () => {
  return (
    <section className="about" id="about">

    <h1 className="heading">About<span>Company</span></h1>

    <div className="row">

        <div className="image">
            <iframe className="tilt map-frame" 
                title="VX Tech Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.3487267095444!2d102.6227013!3d17.9757533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzMyLjciTiAxMDLCsDM3JzIxLjciRQ!5e0!3m2!1sth!2sla!4v1234567890"
                width="100%" 
                height="450" 
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>

        <div className="content">
            <h3>We are <span>expert in technology</span></h3>
            <p className="info">
                Our company was founded in 2020 by a team of experts in software development
                Committed to creating innovative technological solutions that meet the needs of modern businesses
            </p>

            <div className="box-container">
                <div className="box">
                    <p><span>Experience:</span> More than 5 years</p>
                    <p><span>Completed Projects:</span> 100+</p>
                    <p><span>Customers:</span> 50+ companies</p>
                    <p><span>Team:</span> 20+ people</p>
                </div>
                <div className="box">
                    <p><span>Main Services:</span> Software Development</p>
                    <p><span>Location:</span> Vientiane, Laos</p>
                    <p><span>Working Hours:</span> 9:00-17:00</p>
                    <p><span>Consultation:</span> 24 hours a day</p>
                </div>
            </div>

            <div className="highlights">
                <h4>Our Highlights</h4>
                <ul>
                    <li>✓ Professional team with high experience</li>
                    <li>✓ Use modern technology</li>
                    <li>✓ Quality assurance</li>
                    <li>✓ After-sales support</li>
                </ul>
            </div>

            <div className="cta-buttons">
                <a href="/services" className="btn">View our services</a>
                <a href="/contact" className="btn">Free consultation</a>
            </div>
        </div>

    </div>

</section>
  )
}

export default About