import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/products/ProductGrid';
import Card from '../components/common/Card';
import { ArrowRight, Compass, Package, Heart, Truck, StarIcon, Award } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching products from API
  useEffect(() => {
    // This would normally be an API call
    const fetchProducts = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample product data
      const sampleProducts = [
        {
          id: 1,
          title: 'Authentic Alaskan Salmon',
          price: 39.99,
          originalPrice: 49.99,
          discount: 20,
          imageUrl: '/assets/images/products/salmon.jpg',
          location: 'Anchorage',
          rating: 4.8,
          reviewCount: 124,
          isNew: false,
          isFeatured: true
        },
        {
          id: 2,
          title: 'Handcrafted Inuit Sculpture',
          price: 299.99,
          imageUrl: '/assets/images/products/sculpture.jpg',
          location: 'Fairbanks',
          rating: 4.9,
          reviewCount: 38,
          isNew: false,
          isFeatured: true
        },
        {
          id: 3,
          title: 'Northern Lights Photography Print',
          price: 79.99,
          originalPrice: 99.99,
          discount: 20,
          imageUrl: '/assets/images/products/northern-lights.jpg',
          location: 'Juneau',
          rating: 4.7,
          reviewCount: 85,
          isNew: true,
          isFeatured: true
        },
        {
          id: 4,
          title: 'Alaskan Wild Berry Jam Set',
          price: 24.99,
          imageUrl: '/assets/images/products/berry-jam.jpg',
          location: 'Sitka',
          rating: 4.6,
          reviewCount: 56,
          isNew: true,
          isFeatured: false
        },
        {
          id: 5,
          title: 'Handwoven Native Alaskan Basket',
          price: 149.99,
          imageUrl: '/assets/images/products/basket.jpg',
          location: 'Nome',
          rating: 4.9,
          reviewCount: 29,
          isNew: true,
          isFeatured: false
        },
        {
          id: 6,
          title: 'Pure Alaskan Honey',
          price: 18.99,
          imageUrl: '/assets/images/products/honey.jpg',
          location: 'Ketchikan',
          rating: 4.7,
          reviewCount: 103,
          isNew: true,
          isFeatured: false
        },
        {
          id: 7,
          title: 'Glacial Mineral Bath Salts',
          price: 22.99,
          originalPrice: 29.99,
          discount: 23,
          imageUrl: '/assets/images/products/bath-salts.jpg',
          location: 'Seward',
          rating: 4.5,
          reviewCount: 67,
          isNew: true,
          isFeatured: false
        },
        {
          id: 8,
          title: 'Alaskan Cedar Wood Carving',
          price: 189.99,
          imageUrl: '/assets/images/products/wood-carving.jpg',
          location: 'Homer',
          rating: 4.8,
          reviewCount: 42,
          isNew: false,
          isFeatured: true
        }
      ];
      
      // Filter products for featured and new sections
      setFeaturedProducts(sampleProducts.filter(product => product.isFeatured));
      setNewArrivals(sampleProducts.filter(product => product.isNew));
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Handle add to wishlist functionality
  const handleAddToWishlist = (productId) => {
    console.log(`Added product ${productId} to wishlist`);
    // In a real app, this would update state or call an API
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Hero
        title="Discover Authentic Alaskan Treasures"
        subtitle="Shop handcrafted goods, fresh seafood, and unique souvenirs from the Last Frontier"
        backgroundImage="/assets/images/hero-alaska.jpg"
        primaryButtonText="Browse Categories"
        primaryButtonLink="/categories"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        size="large"
      />
      
      {/* Categories Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.id} variant="float" hover className="text-center p-6">
                <div className="flex flex-col items-center">
                  {category.icon}
                  <h3 className="font-semibold mt-4 mb-2">{category.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{category.productCount} products</p>
                  <Button to={`/category/${category.id}`} variant="ghost" size="sm">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container">
          <ProductGrid
            products={featuredProducts}
            title="Featured Products"
            description="Curated selection of Alaska's finest offerings"
            loading={loading}
            onAddToWishlist={handleAddToWishlist}
            columns={{ default: 1, sm: 2, md: 2, lg: 4 }}
          />
          
          <div className="text-center mt-8">
            <Button to="/products" variant="outline">View All Products</Button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-primary-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="feature-icon mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container">
          <ProductGrid
            products={newArrivals}
            title="New Arrivals"
            description="Just landed in our marketplace"
            loading={loading}
            onAddToWishlist={handleAddToWishlist}
            columns={{ default: 1, sm: 2, md: 2, lg: 4 }}
          />
          
          <div className="text-center mt-8">
            <Button to="/new-arrivals" variant="outline">View All New Arrivals</Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Alaska Marketplace Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Sign up today to receive special offers, product updates, and a 10% discount on your first purchase.</p>
          <Button to="/register" variant="secondary" size="lg">Create an Account</Button>
        </div>
      </section>
    </Layout>
  );
};

// Sample categories data with icons
const categories = [
  { id: 'seafood', name: 'Seafood', productCount: 48, icon: <Package size={32} /> },
  { id: 'crafts', name: 'Crafts', productCount: 124, icon: <Heart size={32} /> },
  { id: 'souvenirs', name: 'Souvenirs', productCount: 86, icon: <Compass size={32} /> },
  { id: 'clothing', name: 'Clothing', productCount: 62, icon: <Package size={32} /> },
  { id: 'art', name: 'Art & Prints', productCount: 73, icon: <Heart size={32} /> },
  { id: 'food', name: 'Gourmet Food', productCount: 54, icon: <Compass size={32} /> }
];

// Sample benefits data with icons
const benefits = [
  {
    title: 'Authentic Products',
    description: 'Every item on our marketplace is sourced directly from Alaskan artisans and businesses.',
    icon: <Award size={32} />
  },
  {
    title: 'Support Local Businesses',
    description: 'Your purchase directly supports Alaska\'s local economy and small business owners.',
    icon: <Heart size={32} />
  },
  {
    title: 'Fast, Reliable Shipping',
    description: 'We ensure your items are carefully packaged and delivered on time.',
    icon: <Truck size={32} />
  },
  {
    title: 'Customer Satisfaction',
    description: 'Join thousands of happy customers who love our products and service.',
    icon: <StarIcon size={32} />
  }
];

export default HomePage;
