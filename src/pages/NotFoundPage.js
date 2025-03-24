import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container py-20 text-center">
        <img 
          src="/assets/images/404-moose.svg" 
          alt="404 Moose" 
          className="max-w-xs mx-auto mb-8"
        />
        
        <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
        
        <p className="text-xl text-neutral-600 max-w-xl mx-auto mb-8">
          Looks like you've wandered off the trail. The page you're looking for 
          doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button to="/" variant="primary" size="lg">
            <Home size={20} className="mr-2" /> Go Home
          </Button>
          
          <Button to="/products" variant="outline" size="lg">
            <Search size={20} className="mr-2" /> Browse Products
          </Button>
        </div>
        
        <div className="mt-12 text-neutral-500">
          <p>
            If you believe this is an error, please <Link to="/contact" className="text-primary-600 hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
