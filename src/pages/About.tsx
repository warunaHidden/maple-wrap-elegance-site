
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';

const About = () => {
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
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-b from-gold-50 to-white relative overflow-hidden">
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
            <h1 className="heading-lg mb-6 animate-fade-in">
              <span className="typewriter inline-block overflow-hidden whitespace-nowrap border-r-4 border-maple-500 pr-1 animate-typing">
                About Maple Wraps
              </span>
            </h1>
            <p className="paragraph max-w-2xl mx-auto animate-fade-in animation-delay-300">
              We're on a mission to bring luxury flooring within reach for everyone through our innovative, high-quality floor wraps.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="heading-lg mb-6 reveal">Our Story</h2>
              <p className="paragraph mb-4 reveal animation-delay-300">
                Maple Wraps was founded in 2018 by a team of interior designers and flooring specialists who saw a gap in the market. We understood that traditional luxury flooring options were out of reach for many people and events due to high costs and complex installation.
              </p>
              <p className="paragraph mb-4 reveal animation-delay-500">
                We set out to create a solution that would provide the elegance and impact of high-end flooring without the premium price tag. After extensive research and development, we launched our first collection of pre-designed floor wraps.
              </p>
              <p className="paragraph reveal animation-delay-700">
                Since then, we've helped transform thousands of spaces for weddings, corporate events, retail stores, restaurants, and residential projects. Our commitment to quality and affordability remains at the heart of everything we do.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600607687644-a6c8bcf9f3f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="The Maple Wraps team"
                className="rounded-xl shadow-xl reveal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <SectionHeading
            title="Our Mission & Values"
            subtitle="What drives us every day"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Affordable Luxury",
                description: "We believe everyone deserves a touch of luxury in their space without breaking the bank."
              },
              {
                title: "Quality First",
                description: "We never compromise on the quality of our materials or installation process."
              },
              {
                title: "Customer Satisfaction",
                description: "Your happiness with the final result is our ultimate measure of success."
              },
              {
                title: "Innovation",
                description: "We're constantly exploring new designs and installation techniques to stay ahead."
              },
              {
                title: "Sustainability",
                description: "Our floor wraps offer a more sustainable alternative to replacing entire floors."
              },
              {
                title: "Transparency",
                description: "We believe in clear, honest pricing with no hidden fees or surprises."
              }
            ].map((value, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-md reveal ${index % 3 === 0 ? 'animation-delay-300' :
                  index % 3 === 1 ? 'animation-delay-500' : 'animation-delay-700'
                  }`}
              >
                <h3 className="heading-sm mb-3 text-maple-700">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Meet Our Team"
            subtitle="The talented individuals behind Maple Wraps"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alexandra Johnson",
                role: "Founder & Creative Director",
                bio: "With over 15 years in interior design, Alexandra leads our creative vision and design process."
              },
              {
                name: "David Chen",
                role: "Operations Manager",
                bio: "David ensures our installation process runs smoothly and efficiently for every client."
              },
              {
                name: "Michelle Rodriguez",
                role: "Customer Experience Lead",
                bio: "Michelle is dedicated to making sure every client has an exceptional experience with us."
              }
            ].map((member, index) => (
              <div
                key={index}
                className={`bg-white border border-border p-8 rounded-xl shadow-sm card-effect reveal ${index === 0 ? 'animation-delay-300' :
                  index === 1 ? 'animation-delay-500' : 'animation-delay-700'
                  }`}
              >
                <div className="w-20 h-20 rounded-full bg-maple-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-maple-600">{member.name.charAt(0)}</span>
                </div>
                <h3 className="heading-sm mb-2 text-center">{member.name}</h3>
                <p className="text-sm text-maple-600 mb-4 text-center">{member.role}</p>
                <p className="text-foreground/70 text-center">{member.bio}</p>
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

export default About;
