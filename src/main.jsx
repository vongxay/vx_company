import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Blogs from './components/Blogs.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './components/Dashboard.jsx'
import { Routes, Route } from 'react-router-dom'
import ProjectDetail1 from './pages/ProjectDetail-1.jsx'
import BlogDetail1 from './pages/BlogDetail-1.jsx'
import BlogDetail2 from './pages/BlogDetail-2.jsx'
import BlogDetail3 from './pages/BlogDetail-3.jsx'
import { Helmet } from 'react-helmet'
import { setupVisitorTracking, trackScroll } from './utils/visitorTracking';
import Teams from './components/Teams.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './app/AdminLogin/AdminLogin.jsx';
import AdminLogout from './app/AdminLogin/AdminLogout.jsx';

export function App() {
  useEffect(() => {
    setupVisitorTracking();
    window.addEventListener('scroll', trackScroll);
    return () => window.removeEventListener('scroll', trackScroll);
  }, []);

  const isDashboardRoute = window.location.pathname === '/dashboard';

  return (
    <BrowserRouter>
      <Helmet>
        <title>VX Tech</title>
      </Helmet>
      {!isDashboardRoute && <Header />}
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Services />
            <Projects />
            <section 
              className="parallax-section" 
              style={{
                backgroundImage: "url('/images/main-bg.jpeg')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                textAlign: "center",
                position: "relative",
                minHeight: "300px",
                height: "300px"
              }}
            >
              <div 
                className="parallax-content"
                style={{
                  position: "relative",
                  color: "#fff",
                  maxWidth: "800px",
                  margin: "0 auto",
                  paddingTop: "90px",
                  zIndex: 1
                }}
              >
                <h2>Looking for the right technology solution for your business?</h2>
                <p>We have a team of experts ready to provide free consultation</p>
                <a href="#contact" className="btn">Contact us</a>
              </div>
            </section>
            <Blogs />
            <Contact />
          </>
        } />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-logout" element={<AdminLogout />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/project-detail-1" element={<ProjectDetail1 />} />
        <Route path="/blog-detail-1" element={<BlogDetail1 />} />
        <Route path="/blog-detail-2" element={<BlogDetail2 />} />
        <Route path="/blog-detail-3" element={<BlogDetail3 />} />
        <Route path="/services/software-development" element={<Services />} />
        <Route path="/services/digital-marketing" element={<Services />} />
        <Route path="/blog/web-development-trends-2024" element={<BlogDetail1 />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
