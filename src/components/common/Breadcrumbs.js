import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items, className = '' }) => {
  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {/* If this is the current page, render as a span */}
            {isLast || item.current ? (
              <span className="current">{item.label}</span>
            ) : (
              // Otherwise, render as a link
              <Link to={item.to}>{item.label}</Link>
            )}
            
            {/* Add separator if not the last item */}
            {!isLast && <span className="separator"><ChevronRight size={16} /></span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
      current: PropTypes.bool
    })
  ).isRequired,
  className: PropTypes.string
};

export default Breadcrumbs;
