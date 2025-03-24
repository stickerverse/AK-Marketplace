import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Trash2, ArrowLeft, CreditCard, Shield } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Simulate fetching cart data
  useEffect(() => {
    const fetchCart = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock cart data
      const mockCartItems = [
        {
          id: 1,
          productId: 123,
          title: 'Authentic Alaskan Salmon',
          price: 39.99,
          quantity: 2,
          imageUrl: '/assets/images/products/salmon.jpg',
          options: 'Wild-Caught, 1lb Package'
        },
        {
          id: 2,
          productId: 456,
          title: 'Handcrafted Inuit Sculpture',
          price: 299.99,
          quantity: 1,
          imageUrl: '/assets/images/products/sculpture.jpg',
          options: 'Small Size, Traditional Style'
        },
        {
          id: 3,
          productId: 789,
          title: 'Northern Lights Photography Print',
          price: 79.99,
          quantity: 1,
          imageUrl: '/assets/images/products/northern-lights.jpg',
          options: '12x16 inches, Canvas Print'
        }
      ];
      
      // Mock suggested products
      const mockSuggestedProducts = [
        {
          id: 101,
          title: 'Alaska Wild Berry Preserves',
          price: 24.99,
          imageUrl: '/assets/images/products/preserves.jpg',
          location: 'Anchorage',
          rating: 4.7,
          reviewCount: 38
        },
        {
          id: 102,
          title: 'Glacier Ice Bath Salts',
          price: 18.99,
          imageUrl: '/assets/images/products/bath-salts.jpg',
          location: 'Juneau',
          rating: 4.5,
          reviewCount: 52,
          isNew: true
        },
        {
          id: 103,
          title: 'Alaskan Cedar Coasters (Set of 4)',
          price: 29.99,
          imageUrl: '/assets/images/products/coasters.jpg',
          location: 'Sitka',
          rating: 4.8,
          reviewCount: 26
        },
        {
          id: 104,
          title: 'Native Bead Necklace',
          price: 45.99,
          imageUrl: '/assets/images/products/necklace.jpg',
          location: 'Fairbanks',
          rating: 4.9,
          reviewCount: 19,
          isNew: true
        }
      ];
      
      setCartItems(mockCartItems);
      setSuggestedProducts(mockSuggestedProducts);
      setLoading(false);
    };

    fetchCart();
  }, []);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate tax (e.g., 7% sales tax)
  const calculateTax = () => {
    return calculateSubtotal() * 0.07;
  };

  // Calculate shipping cost (free over $100, otherwise $12.99)
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 100 ? 0 : 12.99;
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  // Handle item quantity change
  const handleQuantityChange = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        // Ensure quantity is at least 1
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle promo code application
  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    // In a real app, you would validate the promo code against an API
    console.log(`Applied promo code: ${promoCode}`);
    // Show a success message or update the cart totals
  };

  // Empty cart state
  if (!loading && cartItems.length === 0) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="cart-empty">
            <ShoppingBag size={64} />
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Browse our products to find something you'll love!
            </p>
            <Button to="/products" variant="primary" size="lg">
              Start Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="cart-container">
          <div className="cart-header">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <span className="text-neutral-500">
              {loading ? 'Loading...' : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          {loading ? (
            // Loading state
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 mb-6 p-4 bg-white rounded-lg">
                    <div className="skeleton w-20 h-20"></div>
                    <div className="flex-1">
                      <div className="skeleton skeleton-text h-5 w-3/4 mb-2"></div>
                      <div className="skeleton skeleton-text h-4 w-1/2 mb-2"></div>
                      <div className="skeleton skeleton-text h-4 w-1/4"></div>
                    </div>
                    <div className="skeleton w-20 h-10"></div>
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-1/3">
                <div className="bg-white p-6 rounded-lg">
                  <div className="skeleton skeleton-text h-6 w-1/2 mb-6"></div>
                  <div className="skeleton skeleton-text h-4 w-full mb-2"></div>
                  <div className="skeleton skeleton-text h-4 w-full mb-2"></div>
                  <div className="skeleton skeleton-text h-4 w-full mb-4"></div>
                  <div className="skeleton h-12 w-full mb-4"></div>
                  <div className="skeleton h-10 w-full"></div>
                </div>
              </div>
            </div>
          ) : (
            // Cart content
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3">
                <div className="cart-items bg-white rounded-lg overflow-hidden">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <Link to={`/product/${item.productId}`}>
                          <img src={item.imageUrl} alt={item.title} />
                        </Link>
                      </div>
                      <div className="cart-item-content">
                        <Link to={`/product/${item.productId}`}>
                          <h3>{item.title}</h3>
                        </Link>
                        <div className="options">{item.options}</div>
                        <div className="price">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-selector">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity} 
                            readOnly 
                            min="1"
                          />
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="remove"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 size={16} className="inline-block mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link to="/products" className="text-primary-600 flex items-center hover:underline">
                    <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                <div className="cart-summary">
                  <h3>Order Summary</h3>
                  
                  <div className="cart-summary-item">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-summary-item">
                    <span>Shipping</span>
                    <span>
                      {calculateShipping() === 0 
                        ? 'Free' 
                        : `$${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="cart-summary-item">
                    <span>Estimated Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-summary-total">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    to="/checkout" 
                    variant="primary" 
                    size="lg" 
                    className="w-full mt-6"
                  >
                    <CreditCard size={20} className="mr-2" /> Proceed to Checkout
                  </Button>
                  
                  <div className="flex justify-center items-center text-sm text-neutral-500 gap-2 mt-4">
                    <Shield size={16} /> Secure checkout
                  </div>
                  
                  <div className="cart-summary-promo">
                    <h4>Promo Code</h4>
                    <form onSubmit={handleApplyPromoCode} className="flex">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="form-control"
                        placeholder="Enter promo code"
                      />
                      <Button 
                        type="submit" 
                        variant="outline"
                        disabled={!promoCode.trim()}
                      >
                        Apply
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Suggested Products */}
        {!loading && (
          <div className="cart-suggestions">
            <ProductGrid
              products={suggestedProducts}
              title="You Might Also Like"
              description="Based on your cart items"
              columns={{ default: 2, md: 4 }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
