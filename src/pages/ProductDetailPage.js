import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { Star, Heart, Share2, ShoppingCart, Truck, RefreshCw, Shield, MapPin } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Tabs from '../components/common/Tabs';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Simulate fetching product data
  useEffect(() => {
    const fetchProduct = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock product data
      const mockProduct = {
        id: Number(id),
        title: 'Authentic Hand-Carved Alaskan Cedar Totem',
        description: 'This authentic Alaskan cedar totem is hand-carved by master craftsman James Williams, a third-generation Tlingit carver from Sitka. Each piece is unique and tells a traditional story through intricate detail and symbolic figures. The totem stands 12 inches tall and is made from sustainably harvested Alaskan yellow cedar, known for its durability and distinctive fragrance.',
        price: 189.99,
        originalPrice: 229.99,
        discount: 17,
        stock: 8,
        rating: 4.8,
        reviewCount: 42,
        seller: {
          name: 'Northern Traditions',
          location: 'Sitka, Alaska',
          rating: 4.9,
          id: 'northern-traditions'
        },
        category: 'Art & Crafts',
        subcategory: 'Woodcarving',
        tags: ['handmade', 'native art', 'totem', 'cedar', 'Tlingit'],
        images: [
          '/assets/images/products/totem1.jpg',
          '/assets/images/products/totem2.jpg',
          '/assets/images/products/totem3.jpg',
          '/assets/images/products/totem4.jpg',
        ],
        specifications: [
          { name: 'Material', value: 'Alaskan Yellow Cedar' },
          { name: 'Height', value: '12 inches (30.5 cm)' },
          { name: 'Width', value: '3 inches (7.6 cm)' },
          { name: 'Weight', value: '1.2 lbs (0.54 kg)' },
          { name: 'Finish', value: 'Natural oil finish' },
          { name: 'Artist', value: 'James Williams' }
        ],
        shipping: {
          free: true,
          estimatedDelivery: '5-7 business days'
        },
        returns: 'Returns accepted within 30 days of delivery'
      };
      
      setProduct(mockProduct);
      
      // Mock related products
      const mockRelatedProducts = [
        {
          id: 101,
          title: 'Alaskan Native Dream Catcher',
          price: 49.99,
          imageUrl: '/assets/images/products/dreamcatcher.jpg',
          location: 'Juneau',
          rating: 4.6,
          reviewCount: 28,
          isNew: true
        },
        {
          id: 102,
          title: 'Hand-Painted Spirit Mask',
          price: 159.99,
          imageUrl: '/assets/images/products/mask.jpg',
          location: 'Ketchikan',
          rating: 4.9,
          reviewCount: 36
        },
        {
          id: 103,
          title: 'Traditional Ulu Knife',
          price: 79.99,
          originalPrice: 99.99,
          discount: 20,
          imageUrl: '/assets/images/products/ulu.jpg',
          location: 'Anchorage',
          rating: 4.7,
          reviewCount: 54
        },
        {
          id: 104,
          title: 'Handwoven Cedar Basket',
          price: 129.99,
          imageUrl: '/assets/images/products/basket.jpg',
          location: 'Sitka',
          rating: 4.8,
          reviewCount: 21,
          isNew: true
        }
      ];
      
      setRelatedProducts(mockRelatedProducts);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  // Toggle wishlist status
  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${id} to cart`);
    // In a real app, this would dispatch to a cart context or API
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="skeleton skeleton-card h-96"></div>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="skeleton w-20 h-20"></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="skeleton skeleton-text h-8 w-3/4 mb-4"></div>
              <div className="skeleton skeleton-text h-6 w-1/4 mb-6"></div>
              <div className="skeleton skeleton-text h-4 w-full mb-2"></div>
              <div className="skeleton skeleton-text h-4 w-full mb-2"></div>
              <div className="skeleton skeleton-text h-4 w-3/4 mb-6"></div>
              <div className="skeleton skeleton-text h-10 w-1/2 mb-4"></div>
              <div className="skeleton skeleton-text h-12 w-full mb-4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If product not found
  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button to="/products" variant="primary">Browse Products</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', to: '/' },
            { label: 'Products', to: '/products' },
            { label: product.category, to: `/category/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
            { label: product.title, current: true }
          ]}
          className="mb-6"
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.title} 
                className="w-full h-96 object-contain"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden w-20 h-20 ${
                    index === activeImageIndex ? 'border-primary-500' : 'border-neutral-200'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            
            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    color="#f59e0b"
                  />
                ))}
              </div>
              <span className="text-neutral-600">
                ({product.rating}) {product.reviewCount} reviews
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-neutral-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="badge badge-error text-white">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="text-sm text-neutral-600 mt-1">
                In stock: {product.stock} available
              </div>
            </div>
            
            {/* Description */}
            <p className="text-neutral-700 mb-6">
              {product.description}
            </p>
            
            {/* Seller Info */}
            <div className="flex items-center mb-6">
              <MapPin size={18} className="text-neutral-500 mr-2" />
              <span>
                Sold by <Link to={`/seller/${product.seller.id}`} className="text-primary-600 font-medium">
                  {product.seller.name}
                </Link> from {product.seller.location}
              </span>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="quantity-selector">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  min="1" 
                  max={product.stock}
                />
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                variant="primary" 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} className="mr-2" /> 
                Add to Cart
              </Button>
              
              <Button 
                variant={inWishlist ? 'secondary' : 'outline'} 
                size="lg"
                onClick={toggleWishlist}
                className="flex items-center justify-center"
              >
                <Heart size={20} fill={inWishlist ? "currentColor" : "none"} /> 
                <span className="ml-2">{inWishlist ? 'Saved' : 'Save'}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="flex items-center justify-center"
              >
                <Share2 size={20} /> 
                <span className="ml-2 hidden sm:inline">Share</span>
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="bg-neutral-50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3 mb-3">
                <Truck size={20} className="text-primary-600 mt-1" />
                <div>
                  <h4 className="font-medium">Shipping</h4>
                  <p className="text-sm text-neutral-600">
                    {product.shipping.free ? 'Free shipping' : 'Standard shipping rates apply'} • 
                    Estimated delivery: {product.shipping.estimatedDelivery}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <RefreshCw size={20} className="text-primary-600 mt-1" />
                <div>
                  <h4 className="font-medium">Returns</h4>
                  <p className="text-sm text-neutral-600">{product.returns}</p>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs 
            items={[
              { 
                label: 'Specifications', 
                content: (
                  <div className="p-6 bg-white rounded-lg">
                    <table className="w-full">
                      <tbody>
                        {product.specifications.map((spec, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50' : ''}>
                            <td className="py-3 px-4 font-medium">{spec.name}</td>
                            <td className="py-3 px-4">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              },
              { 
                label: 'Shipping & Returns', 
                content: (
                  <div className="p-6 bg-white rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                    <p className="mb-4">
                      All items are shipped from our warehouse in Anchorage, Alaska. Orders are processed
                      within 1-2 business days, and shipping times depend on your location.
                    </p>
                    <ul className="list-disc pl-5 mb-6">
                      <li className="mb-2">Standard Shipping: {product.shipping.estimatedDelivery}</li>
                      <li className="mb-2">Express Shipping (Additional $15): 2-3 business days</li>
                      <li className="mb-2">Free shipping on orders over $100</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4">Return Policy</h3>
                    <p className="mb-4">
                      We want you to be completely satisfied with your purchase. If for any reason you're
                      not happy with your order, we accept returns within 30 days of delivery.
                    </p>
                    <ul className="list-disc pl-5">
                      <li className="mb-2">Items must be in original condition with tags attached</li>
                      <li className="mb-2">Return shipping costs are the responsibility of the customer</li>
                      <li className="mb-2">Refunds are processed within 5-7 business days after we receive the returned item</li>
                    </ul>
                  </div>
                )
              },
              { 
                label: 'Reviews', 
                content: (
                  <div className="p-6 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold">Customer Reviews</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={20} 
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                                color="currentColor"
                              />
                            ))}
                          </div>
                          <span className="ml-2">
                            Based on {product.reviewCount} reviews
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">Write a Review</Button>
                    </div>
                    
                    <div className="border-t border-neutral-200 pt-6">
                      <p className="text-center text-neutral-500">
                        Reviews will be displayed here. This is a demo version without actual review data.
                      </p>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
        
        {/* Related Products */}
        <section className="mt-16">
          <ProductGrid
            products={relatedProducts}
            title="You May Also Like"
            description="Similar products you might enjoy"
            columns={{ default: 1, sm: 2, lg: 4 }}
            onAddToWishlist={id => console.log(`Added product ${id} to wishlist`)}
          />
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
