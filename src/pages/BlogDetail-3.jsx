import { useEffect } from 'react';
import '../style/BlogDetail-3.css';

const BlogDetail3 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const SEOvsSEMComparison = () => {
        return (
            <div className="comparison-container">
                <div className="comparison-header">
                    <h2>SEO vs SEM: Comparison of Strengths</h2>
                </div>
                <div className="comparison-grid">
                    <div className="comparison-column">
                        <h3 style={{textAlign: 'center', marginBottom: '2rem', fontSize: '2.4rem'}}>SEO</h3>
                        <div className="comparison-item">
                            <div className="comparison-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <div className="comparison-content">
                                <h3>Sustained Value</h3>
                                <p>Sustained Value: Long-term results that build organic growth and reduce long-term costs</p>
                            </div>
                        </div>
                        <div className="comparison-item">
                            <div className="comparison-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="comparison-content">
                                <h3>Trustworthiness</h3>
                                <p>Builds brand trust, with users often trusting organic search results more than ads</p>
                            </div>
                        </div>
                        <div className="comparison-item">
                            <div className="comparison-icon">
                                <i className="fas fa-coins"></i>
                            </div>
                            <div className="comparison-content">
                                <h3>Cost</h3>
                                <p>Long-term cost savings, no per-click costs, but requires investment in time and content quality</p>
                            </div>
                        </div>
                    </div>
                    <div className="comparison-column">
                        <h3 style={{textAlign: 'center', marginBottom: '2rem', fontSize: '2.4rem'}}>SEM</h3>
                        <div className="comparison-item">
                            <div className="comparison-icon">
                                <i className="fas fa-rocket"></i>
                            </div>
                            <div className="comparison-content">
                                <h3>Quick Results</h3>
                                <p>Quick Results: Fast results that can start immediately, suitable for short-term campaigns and new product launches</p>
                            </div>
                        </div>
                        <div className="comparison-item">
                            <div className="comparison-icon">
                                <i className="fas fa-chart-pie"></i>
                            </div>
                            <div className="comparison-content">
                                <h3>Better Data</h3>
                                <p>Access deeper data: More detailed data, allowing for accurate ROI measurement and quick campaign adjustments</p>
                            </div>
                        </div>
                        <div className="comparison-item">
                            <div className="comparison-icon">
                                <i className="fas fa-flask"></i>
                            </div>
                            <div className="comparison-content">
                                <h3>Test-able Experiences</h3>
                                <p>Testable Experiences: Easy to test and adjust, allowing for A/B testing to find the most effective approach</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ปรับปรุงส่วน blog header
    const BlogHeader = () => (
        <div className="blog-header glass-effect">
            <h1 className="gradient-text">SEO & SEM: Increasing Efficiency and Marketing on Search Engines</h1>
            <div className="blog-meta glass-effect">
                <span className="meta-item"><i className="far fa-calendar"></i> 15 March 2024</span>
                <span className="meta-item"><i className="far fa-clock"></i> 10 Minutes</span>
                <span className="meta-item"><i className="far fa-user"></i> By VX Tech Team</span>
            </div>
        </div>
    );

    // ปรับปรุงส่วน CTA
    const CTASection = () => (
        <div className="cta-section glass-morphism">
            <h2 className="gradient-text">Need Advice on SEO & SEM?</h2>
            <p>Our expert team is ready to help you develop digital marketing strategies</p>
            <a href="#contact" className="cta-button pulse-effect">Contact Us</a>
        </div>
    );

    // ปรับปรุงส่วน Share
    const ShareSection = () => (
        <div className="share-section glass-effect">
            <h3 className="gradient-text">Share This Article</h3>
            <div className="social-buttons">
                <button className="share-btn facebook hover-float"><i className="fab fa-facebook-f"></i></button>
                <button className="share-btn whatsapp hover-float"><i className="fab fa-whatsapp"></i></button>
                <button className="share-btn tiktok hover-float"><i className="fab fa-tiktok"></i></button>
                <button className="share-btn line hover-float"><i className="fab fa-line"></i></button>
            </div>
        </div>
    );

    return (
        <div className="blog-detail-container">
            <BlogHeader />
            <img src="/images/blog-img-3.jpeg" alt="SEO & SEM" className="featured-image hover-shadow" />

            <div className="content-section">
                <h2>What is SEO?</h2>
                <p>Search Engine Optimization (SEO) is the process of adjusting your website to appear higher in search results on Google and other search engines without having to pay for it. Good SEO will help your website have a chance to appear in the top results of search engines.</p>
            </div>

            <div className="seo-techniques-grid">
                <div className="technique-card">
                    <h3>On-Page SEO</h3>
                    <ul>
                        <li>Adjusting Title Tags and Meta Descriptions</li>
                        <li>Cleaning up URL structures that are SEO-friendly</li>
                        <li>Using Header Tags (H1-H6) appropriately</li>
                        <li>Improving image performance with Alt Tags</li>
                    </ul>
                </div>

                <div className="technique-card">
                    <h3>Off-Page SEO</h3>
                    <ul>
                        <li>Creating high-quality Backlinks</li>
                        <li>Social Media Marketing</li>
                        <li>Creating shareable content</li>
                        <li>Participating in online communities</li>
                    </ul>
                </div>

                <div className="technique-card">
                    <h3>Technical SEO</h3>
                    <ul>
                        <li>Improving website speed</li>
                        <li>Making the website mobile-friendly</li>
                        <li>Managing XML Sitemaps</li>
                        <li>Fixing Crawl Errors</li>
                    </ul>
                </div>
            </div>

            <div className="content-section">
                <h2>What is SEM?</h2>
                <p>Search Engine Marketing (SEM) is the process of marketing on search engines by using paid ads, such as Google Ads, to make your website appear in the top ads section of search results.</p>
            </div>

            <div className="sem-comparison">
                <div className="comparison-card">
                    <h3>Advantages of SEM</h3>
                    <ul>
                        <li>Quick results, can start immediately</li>
                        <li>Control budget</li>
                        <li>Accurate results</li>
                        <li>Target the right audience</li>
                    </ul>
                </div>

                <div className="comparison-card">
                    <h3>Limitations of SEM</h3>
                    <ul>
                        <li>Continuous costs</li>
                        <li>High competition</li>
                        <li>Need to know how to manage campaigns</li>
                        <li>Results stop immediately when you stop paying</li>
                    </ul>
                </div>
            </div>

            <div className="analytics-section">
                <h2>Analytics and Metrics</h2>
                <div className="metrics-grid">
                    <div className="metric-card">
                        <i className="fas fa-chart-line"></i>
                        <h3>Organic Traffic</h3>
                        <p>Track the number of visitors from organic search</p>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-percentage"></i>
                        <h3>Conversion Rate</h3>
                        <p>Track the conversion rate from visitors to customers</p>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-clock"></i>
                        <h3>Time on Site</h3>
                        <p>Track the time visitors spend on your website</p>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-undo"></i>
                        <h3>Bounce Rate</h3>
                        <p>Track the bounce rate of your website</p>
                    </div>
                </div>
            </div>

            <CTASection />
            <SEOvsSEMComparison />
            <ShareSection />
        </div>
    );
};

export default BlogDetail3;