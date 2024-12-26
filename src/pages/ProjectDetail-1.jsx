import { useEffect } from 'react';
import '../style/ProjectDetail-1.css';
import Contact from '../components/Contact';
const ProjectDetail1 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="project-detail">
            <div className="project-hero" style={{
                backgroundImage: "url('/images/ai-hero-bg.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="!text-bold">AI for Work in the New Era</h1>
                    <h2 className="!text-white">Increase your work efficiency with AI</h2>
                </div>
            </div>

            <div className="project-container">
                <div className="project-overview">
                    <h2>Project Overview</h2>
                    <div className="overview-grid">
                        <div className="overview-item">
                            <h3>Client</h3>
                            <p>Enterprise Solutions Co., Ltd</p>
                        </div>
                        <div className="overview-item">
                            <h3>Duration</h3>
                            <p>6 months</p>
                        </div>
                        <div className="overview-item">
                            <h3>Industry</h3>
                            <p>AI Technology</p>
                        </div>
                    </div>
                    <p className="overview-description">
                        We provide consulting and training on how to use AI in work, 
                        covering document translation, image creation, video editing, 
                        and increasing work efficiency with modern AI technology. 
                        Suitable for organizations and individuals who want to keep up with technology
                    </p>
                </div>

                <div className="project-challenge-solution">
                    <div className="challenge card-effect">
                        <div className="icon-wrapper">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <h2>The Challenge</h2>
                        <div className="challenge-list">
                            <div className="challenge-item">
                                <i className="fas fa-check-circle"></i>
                                <p>Organizations want to increase work efficiency but have staff limitations</p>
                            </div>
                            <div className="challenge-item">
                                <i className="fas fa-check-circle"></i>
                                <p>Want to reduce costs and time for repetitive work</p>
                            </div>
                            <div className="challenge-item">
                                <i className="fas fa-check-circle"></i>
                                <p>Want to use AI but don&apos;t know how to start</p>
                            </div>
                        </div>
                    </div>
                    <div className="solution card-effect">
                        <div className="icon-wrapper">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <h2>Our Solution</h2>
                        <div className="solution-list">
                            <div className="solution-item">
                                <i className="fas fa-arrow-right"></i>
                                <p>Analyze and design AI systems suitable for the organization</p>
                            </div>
                            <div className="solution-item">
                                <i className="fas fa-arrow-right"></i>
                                <p>Install and train the team to use AI effectively</p>
                            </div>
                            <div className="solution-item">
                                <i className="fas fa-arrow-right"></i>
                                <p>Provide consultation and ongoing support</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-results">
                    <h2>Key Results</h2>
                    <div className="results-grid">
                        <div className="result-item">
                            <div className="result-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3>70%</h3>
                            <p>Increase Work Efficiency</p>
                        </div>
                        <div className="result-item">
                            <div className="result-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <h3>50%</h3>
                            <p>Reduce Work Time</p>
                        </div>
                        <div className="result-item">
                            <div className="result-icon">
                                <i className="fas fa-coins"></i>
                            </div>
                            <h3>40%</h3>
                            <p>Save Cost</p>
                        </div>
                    </div>
                </div>

                <div className="project-features">
                    <h2>Our Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-language"></i>
                            <h3>AI Translation</h3>
                            <p>Translate documents automatically with AI, supporting multiple languages, high accuracy</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-image"></i>
                            <h3>AI Image Creation</h3>
                            <p>Create images with AI, such as Midjourney, DALL-E, Stable Diffusion</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-video"></i>
                            <h3>AI Video Editing</h3>
                            <p>Auto-cut videos with AI, beautiful effects</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-robot"></i>
                            <h3>AI Chat Assistant</h3>
                            <p>Smart assistant in work, answer questions, analyze data</p>
                        </div>
                    </div>
                </div>

                <div className="project-gallery">
                    <h2>Our Work Examples</h2>
                    <div className="gallery-grid">
                        <img src="/images/ai-translation.jpeg" alt="AI Translation" />
                        <img src="/images/ai-image.jpeg" alt="AI Image Generation" />
                        <img src="/images/ai-video.jpeg" alt="AI Video Editing" />
                        <img src="/images/ai-chat.jpeg" alt="AI Chat Assistant" />
                    </div>
                </div>

                <div className="project-tech">
                    <h2>AI Technology We Use</h2>
                    <div className="tech-stack">
                        <span>ChatGPT</span>
                        <span>Midjourney</span>
                        <span>DALL-E</span>
                        <span>Stable Diffusion</span>
                        <span>RunwayML</span>
                        <span>Claude</span>
                    </div>
                </div>

                <div className="project-testimonial">
                    <h2>Testimonials from Users</h2>
                    <div className="testimonial-card">
                        <img src="/images/client-1.jpg" alt="Client" />
                        <blockquote>
                            &ldquo;Using AI to work helps save time, especially for document translation and image creation, 
                            which makes work much faster&rdquo;
                        </blockquote>
                        <p className="client-name">Mr Vongxay</p>
                        <p className="client-position">Marketing Manager</p>
                    </div>
                </div>

                <div className="project-benefits">
                    <h2>Benefits You Will Get</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item hover-effect">
                            <div className="benefit-icon">
                                <i className="fas fa-clock pulse-animation"></i>
                            </div>
                            <div className="benefit-content">
                                <h3>Save Time</h3>
                                <p>Save up to 70% of work time</p>
                                <div className="benefit-details">
                                    <ul>
                                        <li>Work faster 3-5 times</li>
                                        <li>Reduce repetitive steps</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="benefit-item hover-effect">
                            <div className="benefit-icon">
                                <i className="fas fa-chart-line bounce-animation"></i>
                            </div>
                            <div className="benefit-content">
                                <h3>Increase Efficiency</h3>
                                <p>Increase work efficiency without increasing time</p>
                                <div className="benefit-details">
                                    <ul>
                                        <li>Increase productivity 2 times</li>
                                        <li>Reduce errors in work</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="benefit-item hover-effect">
                            <div className="benefit-icon">
                                <i className="fas fa-coins rotate-animation"></i>
                            </div>
                            <div className="benefit-content">
                                <h3>Save Cost</h3>
                                <p>Reduce hiring costs</p>
                                <div className="benefit-details">
                                    <ul>
                                        <li>Save up to 40% of budget</li>
                                        <li>Recover costs within 3 months</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="project-cta">
                    <h2>Interested in using AI in work?</h2>
                    <p>Consult with us to start using AI effectively</p>
                    <div className="cta-buttons">
                        <a href="#contact" className="btn primary">Free Consultation</a>
                        <a href="#demo" className="btn secondary">See Demo</a>
                    </div>
                </div>

                <div className="project-workflow">
                    <h2>Our Workflow</h2>
                    <div className="workflow-steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Analyze Needs</h3>
                            <p>Evaluate and analyze the needs of the organization to choose the appropriate AI</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Plan Usage</h3>
                            <p>Define the usage plan and training suitable for the team</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Install and Train</h3>
                            <p>Install and train the system and team</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Support and Follow-up</h3>
                            <p>Provide ongoing support and follow-up</p>
                        </div>
                    </div>
                </div>

                <div className="project-pricing">
                    <h2>Service Packages</h2>
                    <div className="pricing-grid">
                        <div className="pricing-card starter">
                            <h3>Starter</h3>
                            <div className="price">฿9,999/month</div>
                            <ul>
                                <li>Basic AI Translation</li>
                                <li>AI Image Generation 100 images/month</li>
                                <li>AI Chat Assistant 1,000 messages</li>
                                <li>Basic Training 2 hours</li>
                            </ul>
                            <button className="btn primary">Start Using</button>
                        </div>
                        <div className="pricing-card professional">
                            <h3>Professional</h3>
                            <div className="price">฿19,999/month</div>
                            <ul>
                                <li>All features from Starter</li>
                                <li>AI Image Generation Unlimited</li>
                                <li>AI Video Editing 10 hours</li>
                                <li>Deep Training 5 hours</li>
                            </ul>
                            <button className="btn primary">Start Using</button>
                        </div>
                    </div>
                </div>

                <div className="project-faq">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h3>Is our AI safe for data?</h3>
                            <p>We have high-level security systems and are certified internationally</p>
                        </div>
                        <div className="faq-item">
                            <h3>How long does it take to start using?</h3>
                            <p>Generally, it takes 1-2 days to install and start using</p>
                        </div>
                    </div>
                </div>
                <Contact />
            </div>
        </div>
    );
};

export default ProjectDetail1;
