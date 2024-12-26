import React from 'react';
import '../style/BlogDetail-1.css'

const BlogDetail1 = () => {
    const [activeSection, setActiveSection] = React.useState('');

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = ['ai-ml', 'pwa', 'vui', 'motion-ui', 'sustainable'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="blog-detail">
            <div className="blog-header">
                <h1>Latest Trends in Website Development in 2024</h1>
                <div className="meta">
                    <span><i className="far fa-calendar"></i> 15 March 2024</span>
                    <span><i className="far fa-user"></i> By VX Tech Team</span>
                    <span><i className="far fa-folder"></i> Technology</span>
                    <span><i className="far fa-clock"></i> Read Time 7 Minutes</span>
                </div>
            </div>


            <img 
                src="/images/blog-img-1.jpeg" 
                alt="เทรนด์การพัฒนาเว็บไซต์" 
                className="featured-image"
            />

            <div className="content">
                <div className={`reading-progress-bar ${activeSection}`}></div>

                <div className="reading-time">
                    <i className="far fa-clock"></i>
                    <span>Estimated reading time: 7 minutes</span>
                </div>

                <section id="ai-ml">
                    <h2>1. AI and Machine Learning in Website Development</h2>
                    <p>
                        Artificial Intelligence and Machine Learning are not just trendy terms; 
                        but they have become essential tools that developers must apply 
                        to create the best user experiences.
                    </p>
                    <ul>
                        <li>Creating personalized content for each user (Personalized Content)</li>
                        <li>Intelligent product and service recommendation systems</li>
                        <li>Real-time user behavior analysis</li>
                        <li>AI chatbots that respond naturally</li>
                        <li>Intelligent search systems that understand user needs</li>
                    </ul>

                    <div className="info-box">
                        <h4>💡 Did you know?</h4>
                        <p>
                            73% of leading companies around the world are investing in AI 
                            to improve user experiences on their websites
                        </p>
                    </div>

                    <div className="code-example">
                        <h4>Example Implementation:</h4>
                        <pre>
                            <code className="language-javascript">
                                {`
// AI-powered personalization example
const personalizeContent = async (userId) => {
    const userPreferences = await AI.analyzeUserBehavior(userId);
    return recommendContent(userPreferences);
};
                                `}
                            </code>
                        </pre>
                    </div>

                    <div className="related-articles">
                        <h3>Related Articles</h3>
                        <div className="article-cards">
                            <div className="article-card">
                                <img src="/images/blog-img-2.jpeg" alt="Related Article 1" />
                                <h4>AI working</h4>
                                <a href="/#BlogDetail-2" className="btn">Read More</a>
                            </div>
                            <div className="article-card">
                                <img src="/images/blog-img-3.jpeg" alt="Related Article 2" />
                                <h4>SEO vs SEM</h4>
                                <a href="/#BlogDetail-3" className="btn">Read More</a>
                            </div>
                        </div>
                    </div>

                    <div className="interactive-poll">
                        <h3>What&apos;s your favorite web development trend?</h3>
                        <div className="poll-options">
                            <button className="poll-option">AI & ML</button>
                            <button className="poll-option">PWAs</button>
                            <button className="poll-option">Voice UI</button>
                            <button className="poll-option">Motion UI</button>
                        </div>
                    </div>
                </section>

                <h2>2. Progressive Web Apps (PWAs) - The Future of Web Apps</h2>
                <p>
                    PWAs are a combination of the best features of websites and apps, 
                    providing users with the best experience from both worlds.
                </p>
                <ul>
                    <li>Offline functionality</li>
                    <li>Fast loading with Service Workers</li>
                    <li>Installable on the main screen like a normal app</li>
                    <li>Automatic updates without downloading again</li>
                    <li>Save storage space on devices</li>
                </ul>

                <h2>3. Voice User Interface (VUI) - Voice Control</h2>
                <p>
                    With the growth of Smart Speakers and Voice Assistants, 
                    designing websites that support voice control is unavoidable.
                </p>
                <ul>
                    <li>Voice Search Optimization</li>
                    <li>Voice Navigation</li>
                    <li>Text-to-Speech</li>
                    <li>Voice Transactions</li>
                </ul>

                <h2>4. Motion UI and Micro-interactions - Small Movements and Interactions on Websites</h2>
                <p>
                    Motion UI and Micro-interactions are small movements and interactions on websites 
                    that help create engaging and dynamic experiences.
                </p>
                <ul>
                    <li>Smooth Page Transitions</li>
                    <li>Responsive to Hover and Click</li>
                    <li>Progressive Loading of Data</li>
                    <li>Animations that help navigate</li>
                </ul>

                <div className="info-box warning">
                    <h4>⚠️ Warning</h4>
                    <p>
                        Excessive use of Motion UI can negatively impact user experience and 
                        website performance. It should be used moderately and with clear objectives.
                    </p>
                </div>

                <h2>5. Sustainable Web Design - Design that Conserves Resources</h2>
                <p>
                    The new trend gaining momentum is designing websites that are energy-efficient 
                    and environmentally friendly.
                </p>
                <ul>
                    <li>Efficient Image and Video Compression</li>
                    <li>Use Green Hosting Providers</li>
                    <li>Design that Conserves Energy</li>
                    <li>Use Dark Mode to Save Screen Energy</li>
                </ul>

                <div className="conclusion">
                    <h2>Conclusion</h2>
                    <p>
                        Website development in 2024 is not just about creating beautiful websites, 
                        but also considering user experience, efficiency, and sustainability. 
                        Staying updated with new trends will help us create websites that truly meet 
                        the needs of users in today&apos;s era.
                    </p>
                </div>

                <div className="share-section">
                    <h3>Share this article</h3>
                    <div className="share-buttons">
                        <a href="#" title="Share on Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" title="Share on Whatsapp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" title="Share on Tiktok">
                            <i className="fab fa-tiktok"></i>
                        </a>
                        <a href="#" title="Share on Line">
                            <i className="fab fa-line"></i>
                        </a>
                    </div>
                </div>

                <div className="author-section">
                    <img src="/images/home-pic.png" alt="Author" className="author-image" />
                    <div className="author-info">
                        <h3>About the Author</h3>
                        <h4>VX Tech Team</h4>
                        <p>
                            A team of experts in website development and digital technology 
                            with over 10 years of experience developing digital solutions 
                            for leading companies nationwide
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail1
