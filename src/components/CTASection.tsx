
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-maple-500 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-white rounded-full"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="heading-lg mb-6 reveal">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 opacity-90 reveal animation-delay-300">
            Contact us today for a free quote or use our pricing calculator to get an instant estimate for your project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 reveal animation-delay-500">
            <Button asChild className="bg-white hover:bg-gray-100 text-maple-700 hover:text-maple-800 transform hover:scale-105 transition-all text-lg">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild className="bg-gold-400 hover:bg-gold-500 text-maple-900 transform hover:scale-105 transition-all text-lg">
              <Link to="/pricing-calculator">Try Our Pricing Calculator</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
