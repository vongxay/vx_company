import './App.css'
import './i18n'
import { useEffect } from 'react';
import { checkSupabaseConnection } from './lib/supabase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AdminLogin from './app/AdminLogin/AdminLogin';
import AdminLogout from './app/AdminLogin/AdminLogout';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import ProjectDetail1 from './components/ProjectDetail1';
import BlogDetail1 from './components/BlogDetail1';
import BlogDetail2 from './components/BlogDetail2';
import BlogDetail3 from './components/BlogDetail3';
import Teams from './components/Teams';
import { Helmet } from 'react-helmet';

function App() {
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.error('ไม่สามารถเชื่อมต่อกับ Supabase ได้');
      }
    };
    
    checkConnection();
  }, []);
  
  return (
    <Router>
      <Helmet>
        <title>VX Tech</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Services />
            <Projects />
            <section className="parallax-section">
              {/* ... parallax content ... */}
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
        <Route path="/blog/web-development-trends-2024" element={<BlogDetail1 />} />

        <Route path="/services/software-development" element={<Services />} />
        <Route path="/services/digital-marketing" element={<Services />} />

        <Route path="/teams" element={<Teams />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
