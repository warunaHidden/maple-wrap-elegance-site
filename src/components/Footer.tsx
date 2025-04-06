
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="reveal">
            <h3 className="font-dmsans text-2xl font-bold text-maple-800 mb-4">Maple Wraps</h3>
            <p className="text-foreground/70 mb-4">
              Transforming spaces with elegant, high-quality floor wraps that won't break the bank.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-maple-500 social-icon">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-maple-500 social-icon">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-maple-500 social-icon">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="reveal animation-delay-300">
            <h4 className="font-dmsans text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="reveal animation-delay-500">
            <h4 className="font-dmsans text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">
                  Pre-Designed Floor Wraps
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">
                  Setup Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">
                  Event Packages
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">
                  Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="reveal animation-delay-700">
            <h4 className="font-dmsans text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <Phone size={18} className="text-maple-500 mt-1 mr-2 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-foreground/70">(555) 123-4567</span>
              </li>
              <li className="flex items-start group">
                <Mail size={18} className="text-maple-500 mt-1 mr-2 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-foreground/70">info@maplewraps.com</span>
              </li>
              <li className="text-foreground/70">
                <div className="font-medium">Business Hours:</div>
                <div>Monday - Friday: 9AM - 6PM</div>
                <div>Saturday: 10AM - 4PM</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm mb-4 md:mb-0">
              © {currentYear} Maple Wraps. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-foreground/60">
              <Link to="/privacy" className="hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-maple-500 transition-colors duration-300 animated-underline inline-block">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
