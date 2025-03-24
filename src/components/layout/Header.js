import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="site-header">
      <div className={`site-header-glass ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container site-header-container">
          <Link to="/" className="site-header-logo">
            <img src="/assets/images/logo.svg" alt="Alaska Marketplace" />
            <span>Alaska Marketplace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-header-nav hidden md:flex">
            <Link to="/" className={isNavLinkActive('/') ? 'active' : ''}>
              Home
            </Link>
            <Link to="/categories" className={isNavLinkActive('/categories') ? 'active' : ''}>
              Categories
            </Link>
            <Link to="/popular" className={isNavLinkActive('/popular') ? 'active' : ''}>
              Popular
            </Link>
            <Link to="/deals" className={isNavLinkActive('/deals') ? 'active' : ''}>
              Deals
            </Link>
            <Link to="/about" className={isNavLinkActive('/about') ? 'active' : ''}>
              About Us
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="site-header-actions">
            <button className="btn btn-ghost btn-icon hidden md:flex">
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="btn btn-ghost btn-icon hidden md:flex">
              <Heart size={20} />
            </Link>
            
            <Link to="/cart" className="btn btn-ghost btn-icon relative">
              <ShoppingCart size={20} />
              <span className="badge badge-primary absolute -top-1 -right-1">3</span>
            </Link>
            
            {/* User dropdown */}
            <div className="dropdown hidden md:block">
              <button 
                className={`dropdown-toggle ${userMenuOpen ? 'active' : ''}`}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User size={20} />
              </button>
              <div className={`dropdown-menu ${userMenuOpen ? 'active' : ''}`}>
                <Link to="/account">My Account</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/settings">Settings</Link>
                <hr />
                <Link to="/logout">Logout</Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className={`hamburger md:hidden ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="site-header-logo">
            <img src="/assets/images/logo.svg" alt="Alaska Marketplace" />
            <span>Alaska Marketplace</span>
          </div>
          <button 
            className="close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <Link to="/" className={isNavLinkActive('/') ? 'active' : ''}>
            Home
          </Link>
          <Link to="/categories" className={isNavLinkActive('/categories') ? 'active' : ''}>
            Categories
          </Link>
          <Link to="/popular" className={isNavLinkActive('/popular') ? 'active' : ''}>
            Popular
          </Link>
          <Link to="/deals" className={isNavLinkActive('/deals') ? 'active' : ''}>
            Deals
          </Link>
          <Link to="/about" className={isNavLinkActive('/about') ? 'active' : ''}>
            About Us
          </Link>
          <Link to="/account" className={isNavLinkActive('/account') ? 'active' : ''}>
            My Account
          </Link>
          <Link to="/wishlist" className={isNavLinkActive('/wishlist') ? 'active' : ''}>
            Wishlist
          </Link>
          <Link to="/cart" className={isNavLinkActive('/cart') ? 'active' : ''}>
            Cart
          </Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </header>
  );
};

export default Header;
