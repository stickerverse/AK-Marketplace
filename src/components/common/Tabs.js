import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({
  items,
  defaultActiveIndex = 0,
  variant = 'default',
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  // Get tab list class based on variant
  const getTabListClass = () => {
    let baseClass = 'tabs-list';
    
    if (variant === 'pills') {
      baseClass += ' tabs-pills';
    } else if (variant === 'vertical') {
      baseClass += ' tabs-vertical';
    }
    
    return baseClass;
  };

  return (
    <div className={`tabs ${variant === 'vertical' ? 'tabs-vertical' : ''} ${className}`}>
      <div className={getTabListClass()} role="tablist">
        {items.map((item, index) => (
          <button
            key={index}
            className={`tabs-item ${activeIndex === index ? 'active' : ''}`}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        {items.map((item, index) => (
          <div
            key={index}
            className={activeIndex === index ? 'active' : ''}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            id={`tab-panel-${index}`}
            hidden={activeIndex !== index}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired
    })
  ).isRequired,
  defaultActiveIndex: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'pills', 'vertical']),
  className: PropTypes.string
};

export default Tabs;
