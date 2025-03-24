import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  to,
  isIcon,
  isFloating,
  disabled,
  loading,
  onClick,
  ...props
}) => {
  // Determine the base class based on the variant
  const getBaseClass = () => {
    let baseClass = 'btn';
    
    // Add variant class
    if (variant) {
      baseClass += ` btn-${variant}`;
    }
    
    // Add size class
    if (size) {
      baseClass += ` btn-${size}`;
    }
    
    // Add icon class if isIcon is true
    if (isIcon) {
      baseClass += ' btn-icon';
    }
    
    // Add floating class if isFloating is true
    if (isFloating) {
      baseClass += ' btn-floating';
    }
    
    // Add loading class if loading is true
    if (loading) {
      baseClass += ' btn-loading';
    }
    
    // Add any additional custom classes
    if (className) {
      baseClass += ` ${className}`;
    }
    
    return baseClass;
  };

  // Render the button content
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="loader-spinner-sm mr-2"></span>
          {children}
        </>
      );
    }
    return children;
  };

  // If this is a Link component (for react-router)
  if (to) {
    return (
      <Link to={to} className={getBaseClass()} {...props}>
        {renderContent()}
      </Link>
    );
  }

  // If this is an anchor tag (for external links)
  if (href) {
    return (
      <a href={href} className={getBaseClass()} {...props}>
        {renderContent()}
      </a>
    );
  }

  // Default to button element
  return (
    <button 
      className={getBaseClass()} 
      disabled={disabled || loading} 
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'glass']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  isIcon: PropTypes.bool,
  isFloating: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
