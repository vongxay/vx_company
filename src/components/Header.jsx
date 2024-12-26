import React, { useState } from 'react'
import '../style/Header.css'
import '../style/style.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = React.useMemo(() => () => {
    setIsMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : 'unset';
      return !prev;
    });
  }, []);

  const changeLanguage = React.useCallback((lang) => {
    console.log(`Changing language to ${lang}`);
  }, []);

  const handleScroll = React.useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${isMenuOpen ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div 
        id="menu-bars" 
        className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
        onClick={toggleMenu}
      ></div>
      
      <div className="logo">
        <a href="#home"><img src="images/company-logo.png" alt="Company Logo" /></a>
      </div>

      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/#about">About Us</a>
        <a href="/#services">Services</a>
        <a href="/#portfolio">Projects</a>
        <a href="/#blogs">Blogs</a>
        <a href="/#contact">Contact</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/teams">Teams</a>
      </nav>

      <div className="language-selector">
        <button onClick={() => changeLanguage('en')} className="lang-btn">EN</button>
        <button onClick={() => changeLanguage('lo')} className="lang-btn">ລາວ</button>
      </div>
    </header>
  )
}

export default Header
