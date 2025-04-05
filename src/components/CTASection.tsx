
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-maple-100 to-gold-100 py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-6 reveal">Ready to Transform Your Space?</h2>
          <p className="paragraph mb-8 max-w-2xl mx-auto reveal animation-delay-300">
            Contact us today for a free quote and see how our floor wraps can completely transform your environment at a fraction of the cost.
          </p>
          <Button asChild className="btn-primary text-lg px-8 py-6 reveal animation-delay-500">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
