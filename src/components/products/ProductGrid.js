import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductGrid = ({
  products,
  title,
  description,
  columns = {
    default: 2,
    md: 3,
    lg: 4
  },
  loading = false,
  emptyMessage = 'No products found',
  onAddToWishlist,
  cardVariant = 'default'
}) => {
  // Function to render product cards based on loading state
  const renderProducts = () => {
    if (loading) {
      // If loading, display skeleton cards
      return Array(8).fill(0).map((_, index) => (
        <div key={`skeleton-${index}`} className="w-full">
          <div className="skeleton skeleton-card mb-4"></div>
          <div className="skeleton skeleton-text mb-2"></div>
          <div className="skeleton skeleton-text w-3/4"></div>
        </div>
      ));
    }

    if (!products || products.length === 0) {
      // If no products, display empty message
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-neutral-500">{emptyMessage}</p>
        </div>
      );
    }

    // Otherwise, display product cards
    return products.map(product => (
      <ProductCard 
        key={product.id} 
        product={product} 
        variant={cardVariant}
        onAddToWishlist={onAddToWishlist}
      />
    ));
  };

  // Determine the grid columns class based on the provided columns object
  const getGridColumnsClass = () => {
    let className = `grid gap-6 grid-cols-${columns.default || 1}`;
    
    if (columns.sm) {
      className += ` sm:grid-cols-${columns.sm}`;
    }
    
    if (columns.md) {
      className += ` md:grid-cols-${columns.md}`;
    }
    
    if (columns.lg) {
      className += ` lg:grid-cols-${columns.lg}`;
    }
    
    if (columns.xl) {
      className += ` xl:grid-cols-${columns.xl}`;
    }
    
    return className;
  };

  return (
    <div className="product-grid">
      {/* Section Header */}
      {(title || description) && (
        <div className="product-grid-header mb-8">
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-neutral-600">{description}</p>}
        </div>
      )}
      
      {/* Product Grid */}
      <div className={getGridColumnsClass()}>
        {renderProducts()}
      </div>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),
  title: PropTypes.string,
  description: PropTypes.string,
  columns: PropTypes.shape({
    default: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onAddToWishlist: PropTypes.func,
  cardVariant: PropTypes.string
};

export default ProductGrid;
