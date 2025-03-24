import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';

const ProductCard = ({
  product,
  variant = 'default',
  onAddToWishlist
}) => {
  const {
    id,
    title,
    price,
    originalPrice,
    discount,
    imageUrl,
    location,
    rating,
    reviewCount,
    isNew,
    isFeatured,
    isInWishlist = false
  } = product;

  const getCardClass = () => {
    let className = 'product-card';
    
    if (variant === 'glass') {
      className += ' product-card-glass';
    }
    
    return className;
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className={getCardClass()}>
      <div className="product-card-image">
        <img src={imageUrl} alt={title} />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="badge badge-primary">New</span>
          )}
          {discount > 0 && (
            <span className="badge badge-error">{discount}% OFF</span>
          )}
          {isFeatured && (
            <span className="badge badge-secondary">Featured</span>
          )}
        </div>
        
        {/* Wishlist button */}
        <button 
          className={`wishlist-btn absolute top-2 right-2 bg-white ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="product-card-content">
        <h3 className="product-card-title">{title}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star size={16} fill="currentColor" color="#f59e0b" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-neutral-500">({reviewCount} reviews)</span>
        </div>
        
        <div className="product-card-price">
          ${price.toFixed(2)}
          {originalPrice && originalPrice > price && (
            <span className="ml-2 text-neutral-500 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="product-card-location">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        
        <div className="product-card-footer">
          <button className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
    location: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    isNew: PropTypes.bool,
    isFeatured: PropTypes.bool,
    isInWishlist: PropTypes.bool
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'glass']),
  onAddToWishlist: PropTypes.func
};

export default ProductCard;
