
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import FeatureCard from '@/components/FeatureCard';
import CTASection from '@/components/CTASection';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxLayers, setParallaxLayers] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);

  // Enhanced mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        
        // Calculate movement for different layers based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;
        
        setParallaxLayers([
          { x: moveX * 0.2, y: moveY * 0.2 },  // Very subtle movement
          { x: moveX * 0.4, y: moveY * 0.4 },  // Subtle movement
          { x: moveX * 0.6, y: moveY * 0.6 },  // Medium movement
          { x: moveX * 0.8, y: moveY * 0.8 },  // Stronger movement
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout>
      {/* Hero Section with enhanced parallax effect */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax background layers */}
        <div 
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${parallaxLayers[0].x}px, ${parallaxLayers[0].y}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1559310278-18a9192d909f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        </div>
        
        {/* Decorative elements that move with cursor */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-maple-200/30 parallax-layer"
          style={{
            transform: `translate(${parallaxLayers[1].x * 2}px, ${parallaxLayers[1].y * 2}px)`,
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gold-200/30 parallax-layer"
          style={{
            transform: `translate(${parallaxLayers[2].x * 2}px, ${parallaxLayers[2].y * 2}px)`,
          }}
        ></div>
        
        {/* Additional floating elements for enhanced visual effect */}
        <div 
          className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-maple-100/20 parallax-layer animate-float"
          style={{
            transform: `translate(${parallaxLayers[3].x * 3}px, ${parallaxLayers[3].y * 3}px)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-gold-100/20 parallax-layer animate-float"
          style={{
            transform: `translate(${parallaxLayers[3].x * 2.5}px, ${parallaxLayers[3].y * 2.5}px)`,
            animationDelay: '2s'
          }}
        ></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-4 animate-fade-in">
              Transform Your Floors into Masterpieces
            </h1>
            <p className="text-xl sm:text-2xl font-dmsans text-gold-600 mb-6 animate-fade-in animation-delay-300">
              Luxury on a Budget
            </p>
            <p className="paragraph mb-8 max-w-2xl animate-fade-in animation-delay-500">
              High-Quality, Pre-Designed Floor Wraps That Won't Break the Bank
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-700">
              <Button asChild className="btn-primary text-lg">
                <Link to="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary text-lg">
                <Link to="/login" className="flex items-center">
                  Login <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Brand Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="image-card overflow-hidden rounded-xl shadow-xl reveal transform transition-all duration-500 hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Elegant floor wrap in modern home"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="heading-lg mb-6 reveal">About Maple Wraps</h2>
              <p className="paragraph mb-6 reveal animation-delay-300">
                At Maple Wraps, we specialize in offering stunning floor wraps at prices that fit any budget. Our pre-designed options bring elegance and luxury to your space without the premium price tag.
              </p>
              <p className="paragraph mb-8 reveal animation-delay-500">
                Whether you're planning a wedding, corporate event, or looking to elevate your home or business space, our floor wraps create an instant transformation that will leave a lasting impression.
              </p>
              <Button asChild className="btn-secondary reveal animation-delay-700 hover:scale-105 transition-transform">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <SectionHeading 
            title="What We Offer" 
            subtitle="Our comprehensive services provide everything you need for stunning floor transformations"
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Pre-Designed Floor Wraps"
              description="Choose from our collection of stylish designs and transform your space in just 3 easy steps."
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                  <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth="1.5"/>
                  <path d="M2 8H22" strokeWidth="1.5"/>
                  <path d="M8 8V22" strokeWidth="1.5"/>
                </svg>
              }
              className="animation-delay-300"
            />
            
            <FeatureCard 
              title="Combined Services"
              description="From initial setup to finishing touches, we handle all aspects of installation so you don't have to worry."
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                  <path d="M17 20H7C5.89543 20 5 19.1046 5 18V9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V18C19 19.1046 18.1046 20 17 20Z" strokeWidth="1.5"/>
                  <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" strokeWidth="1.5"/>
                  <path d="M12 12V15" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                </svg>
              }
              className="animation-delay-500"
            />
            
            <FeatureCard 
              title="Pass the Savings"
              description="By offering pre-designed options with minimal customization, we can provide high-quality wraps at affordable prices."
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                  <path d="M12 6V18" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M15 9.5C15 8.12 13.657 7 12 7C10.343 7 9 8.12 9 9.5C9 10.88 10.343 12 12 12C13.657 12 15 13.12 15 14.5C15 15.88 13.657 17 12 17C10.343 17 9 15.88 9 14.5" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
                </svg>
              }
              className="animation-delay-700"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="btn-primary reveal hover:scale-105 transition-transform">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section with enhanced animations */}
      <section className="py-20">
        <div className="container-custom">
          <SectionHeading 
            title="Our Floor Wrap Gallery" 
            subtitle="Take a look at some of our stunning installations"
            centered
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            ].map((img, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl shadow-md reveal ${
                  index % 3 === 0 ? 'animation-delay-300' : 
                  index % 3 === 1 ? 'animation-delay-500' : 'animation-delay-700'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Floor wrap installation ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium">Installation {index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-muted">
        <div className="container-custom">
          <SectionHeading 
            title="What Our Clients Say" 
            subtitle="Don't just take our word for it - see what our satisfied customers have to say"
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Event Planner",
                quote: "The floor wraps completely transformed our venue. Everyone was asking about them! Exceptional quality at a price that fit our budget."
              },
              {
                name: "Michael Chen",
                role: "Restaurant Owner",
                quote: "We updated our restaurant's look without the cost of new flooring. The team at Maple Wraps was professional and efficient."
              },
              {
                name: "Jessica Williams",
                role: "Interior Designer",
                quote: "I recommend Maple Wraps to all my clients looking for affordable luxury. Their pre-designed options are stunning and installation is flawless."
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-xl shadow-md reveal hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  index === 0 ? 'animation-delay-300' : 
                  index === 1 ? 'animation-delay-500' : 'animation-delay-700'
                }`}
              >
                <div className="mb-4 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <blockquote className="italic mb-6 text-foreground/80">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-maple-200 flex items-center justify-center text-maple-700 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
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

export default Index;
