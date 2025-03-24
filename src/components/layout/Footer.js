import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Clock,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCcw
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-logo">
          <img src="/assets/images/logo-white.svg" alt="Alaska Marketplace" />
          <span>Alaska Marketplace</span>
        </div>

        <div className="site-footer-columns">
          <div className="site-footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Shop</Link></li>
              <li><Link to="/popular">Popular</Link></li>
              <li><Link to="/deals">Deals</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="site-footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
            </ul>
          </div>

          <div className="site-footer-column">
            <h4>About Us</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
            </ul>
          </div>

          <div className="site-footer-column">
            <h4>Contact Information</h4>
            <ul>
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} /> 123 Denali Street, Anchorage, AK 99501
                </a>
              </li>
              <li>
                <a href="tel:+19075551234">
                  <Phone size={16} /> (907) 555-1234
                </a>
              </li>
              <li>
                <a href="mailto:info@alaskamarketplace.com">
                  <Mail size={16} /> info@alaskamarketplace.com
                </a>
              </li>
              <li>
                <span>
                  <Clock size={16} /> Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-newsletter">
          <h4>Subscribe to Our Newsletter</h4>
          <p>Get the latest news, offers and special announcements.</p>
          <form>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Your email address" 
              required 
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>

        <div className="flex flex-wrap gap-6 my-8 justify-center">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary-300" />
            <span>Authentic Alaskan Products</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-primary-300" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-primary-300" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw size={20} className="text-primary-300" />
            <span>Easy Returns</span>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-legal">
            <p>&copy; {currentYear} Alaska Marketplace. All rights reserved.</p>
            <p>
              <Link to="/terms">Terms of Service</Link> &bull; 
              <Link to="/privacy"> Privacy Policy</Link> &bull;
              <Link to="/sitemap"> Sitemap</Link>
            </p>
          </div>

          <div className="site-footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
