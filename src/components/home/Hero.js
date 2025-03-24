import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import Button from '../common/Button';

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  showSearch = true,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  size = 'default',
  glassmorphism = true
}) => {
  const getHeroClass = () => {
    let className = 'hero';
    
    // Add size classes
    if (size === 'small') {
      className += ' hero-sm';
    } else if (size === 'large') {
      className += ' hero-lg';
    }
    
    // Add glassmorphism effect
    if (glassmorphism) {
      className += ' hero-glass';
    }
    
    return className;
  };

  return (
    <section className={getHeroClass()}>
      {/* Background Image */}
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Overlay for better text readability */}
      <div className="hero-overlay"></div>
      
      <div className="container relative z-10">
        <div className="hero-content">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          
          {/* Action Buttons */}
          {(primaryButtonText || secondaryButtonText) && (
            <div className="btn-group">
              {primaryButtonText && (
                <Button
                  to={primaryButtonLink}
                  variant="primary"
                  size="lg"
                >
                  {primaryButtonText}
                </Button>
              )}
              
              {secondaryButtonText && (
                <Button
                  to={secondaryButtonLink}
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-primary-600"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          )}
          
          {/* Search Form */}
          {showSearch && (
            <div className="hero-search mt-8">
              <form className="search-form search-form-glass">
                <div className="search-icon">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  className="form-control form-control-glass" 
                  placeholder="Search for products, brands, or categories..." 
                />
                <button type="submit" className="btn-search">Search</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string.isRequired,
  showSearch: PropTypes.bool,
  primaryButtonText: PropTypes.string,
  primaryButtonLink: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonLink: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  glassmorphism: PropTypes.bool
};

export default Hero;
