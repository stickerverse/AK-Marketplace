import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  ...props
}) => {
  const getCardClass = () => {
    let baseClass = 'card';

    // Add variant-specific classes
    switch (variant) {
      case 'shadow':
        baseClass += ' card-shadow';
        break;
      case 'float':
        baseClass += ' card-float';
        break;
      case 'pop':
        baseClass += ' card-pop';
        break;
      case 'glass':
        baseClass += ' card-glass';
        break;
      case 'dark-glass':
        baseClass += ' card-dark-glass';
        break;
      default:
        // Default card has no extra classes
        break;
    }

    // Add hover effect if needed
    if (hover && !['float', 'pop'].includes(variant)) {
      baseClass += ' transform transition-transform duration-300 hover:-translate-y-2';
    }

    // Add any custom classes
    if (className) {
      baseClass += ` ${className}`;
    }

    return baseClass;
  };

  return (
    <div className={getCardClass()} {...props}>
      {children}
    </div>
  );
};

// Props for the Card component
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'shadow', 'float', 'pop', 'glass', 'dark-glass']),
  hover: PropTypes.bool
};

// Header component for the Card
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Body component for the Card
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Footer component for the Card
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 border-t border-neutral-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Image component for the Card
const CardImage = ({ src, alt, className = '', ...props }) => {
  return (
    <div className="card-image">
      <img 
        src={src} 
        alt={alt} 
        className={className}
        {...props}
      />
    </div>
  );
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

// Title component for the Card
const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-xl font-semibold mb-2 ${className}`} {...props}>
      {children}
    </h3>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Export all card components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Title = CardTitle;

export default Card;
