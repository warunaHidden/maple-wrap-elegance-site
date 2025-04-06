
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';

const ServiceCard = ({ 
  title, 
  description, 
  features, 
  image, 
  index 
}: { 
  title: string; 
  description: string; 
  features: string[]; 
  image: string;
  index: number;
}) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center ${
      index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
    }`}>
      <div className="lg:w-1/2">
        <img 
          src={image} 
          alt={title} 
          className="rounded-xl shadow-xl reveal"
        />
      </div>
      <div className="lg:w-1/2">
        <h3 className="heading-md mb-4 reveal">{title}</h3>
        <p className="paragraph mb-6 reveal animation-delay-300">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start reveal animation-delay-500">
              <ChevronRight className="h-5 w-5 text-maple-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <Button asChild className="btn-primary reveal animation-delay-700">
            <Link to="/contact">Request Quote</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary reveal animation-delay-700">
            <Link to="/pricing-calculator">Calculate Price</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxLayers, setParallaxLayers] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Enhanced mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        
        // Calculate movement based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        setParallaxLayers({ x: moveX * 0.4, y: moveY * 0.4 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout>
      {/* Hero Section with Parallax Effect */}
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-b from-maple-50 to-white relative overflow-hidden">
        {/* Parallax background layer */}
        <div 
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${parallaxLayers.x}px, ${parallaxLayers.y}px)`,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(212, 175, 130, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`,
          }}
        >
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 animate-fade-in">Our Services</h1>
            <p className="paragraph max-w-2xl mx-auto animate-fade-in animation-delay-300">
              Discover our range of floor wrap solutions that combine elegance, quality, and affordability.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="space-y-24">
            <ServiceCard 
              title="Pre-Designed Floor Wraps"
              description="Our signature offering features a curated collection of elegant designs that transform any space instantly. Choose from marble looks, geometric patterns, wood finishes, and more."
              features={[
                "High-quality, durable materials that look like the real thing",
                "Quick and clean installation with minimal disruption",
                "Available in various sizes to fit any space",
                "Can be used for both temporary events and long-term installations",
                "Fraction of the cost of traditional flooring replacements"
              ]}
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              index={0}
            />
            
            <ServiceCard 
              title="Setup & Installation"
              description="Our professional installation team ensures your floor wrap is applied perfectly every time. We handle the entire process from preparation to finishing touches."
              features={[
                "Professional measurement and space assessment",
                "Surface preparation to ensure perfect adhesion",
                "Expert application by our trained technicians",
                "Edge finishing for a seamless look",
                "Quality inspection to ensure perfect results"
              ]}
              image="https://images.unsplash.com/photo-1600580599455-66d45b3738c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              index={1}
            />
            
            <ServiceCard 
              title="Event Packages"
              description="Create a stunning atmosphere for your special event with our custom event packages. Perfect for weddings, galas, corporate events, and more."
              features={[
                "Consultation to match your event theme and color scheme",
                "Temporary installation designed for quick removal post-event",
                "On-site coordination with your event planner",
                "Emergency support during your event",
                "Complete removal and cleanup after your event"
              ]}
              image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              index={2}
            />
            
            <ServiceCard 
              title="Custom Consultation"
              description="While we specialize in pre-designed wraps to keep costs low, we do offer limited custom consultations for special projects or larger spaces."
              features={[
                "One-on-one meeting with our design team",
                "Space analysis and recommendations",
                "Selection assistance from our design catalog",
                "Budget-friendly alternatives to fully custom designs",
                "Timeline and installation planning"
              ]}
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <SectionHeading 
            title="Our Simple Process" 
            subtitle="How we transform your space in just a few easy steps"
            centered
          />
          
          <div className="relative">
            {/* Process line (desktop) */}
            <div className="hidden lg:block absolute top-24 left-1/2 h-0.5 bg-maple-300 w-[calc(100%-200px)] -translate-x-1/2"></div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Consultation",
                  description: "We discuss your needs, space, and timeline to find the perfect floor wrap solution."
                },
                {
                  number: "02",
                  title: "Selection",
                  description: "Choose from our collection of pre-designed wraps that match your style and budget."
                },
                {
                  number: "03",
                  title: "Installation",
                  description: "Our professional team handles the entire installation process with minimal disruption."
                },
                {
                  number: "04",
                  title: "Enjoy",
                  description: "Transform your space instantly and enjoy your beautiful new floors."
                }
              ].map((step, index) => (
                <div key={index} className={`text-center relative reveal ${
                  index === 0 ? 'animation-delay-300' : 
                  index === 1 ? 'animation-delay-500' : 
                  index === 2 ? 'animation-delay-700' : 'animation-delay-900'
                }`}>
                  <div className="w-16 h-16 mx-auto bg-maple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="heading-sm mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Get answers to common questions about our floor wraps"
            centered
          />
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long do floor wraps last?",
                answer: "Our floor wraps are designed to last 3-5 years in residential settings with normal foot traffic. Commercial settings may see 1-3 years depending on traffic volume. Event installations are typically temporary and removed after the event."
              },
              {
                question: "Are floor wraps difficult to maintain?",
                answer: "Not at all! Our floor wraps can be cleaned with regular floor cleaners. Simply sweep regularly and mop with a mild cleaner when needed. Avoid harsh chemicals and abrasive tools that could damage the surface."
              },
              {
                question: "Can floor wraps be installed over any surface?",
                answer: "Our wraps can be installed over most clean, dry, and level surfaces including concrete, wood, vinyl, and tile. We'll assess your specific flooring during consultation to ensure compatibility."
              },
              {
                question: "How much does installation cost?",
                answer: "Installation costs are based on square footage and complexity of the space. We provide a detailed quote after consultation that includes all materials and labor. Our pre-designed options are significantly more affordable than custom designs."
              },
              {
                question: "Can floor wraps be removed without damaging the floor?",
                answer: "Yes, our professional removal process ensures your original flooring remains undamaged. This makes our wraps perfect for rentals or temporary transformations."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`border-b border-border py-6 reveal ${
                  index === 0 ? 'animation-delay-300' : 
                  index === 1 ? 'animation-delay-400' : 
                  index === 2 ? 'animation-delay-500' :
                  index === 3 ? 'animation-delay-600' : 'animation-delay-700'
                }`}
              >
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-foreground/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
};

export default Services;
