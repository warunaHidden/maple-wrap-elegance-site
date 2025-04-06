
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Layout from '@/components/Layout';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactInfo = ({ 
  icon, 
  title, 
  children 
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className="flex">
      <div className="text-maple-500 mr-4 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <div className="text-foreground/70">{children}</div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

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

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', data);
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you shortly!",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

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
            <h1 className="heading-xl mb-6 animate-fade-in">Contact Us</h1>
            <p className="paragraph max-w-2xl mx-auto animate-fade-in animation-delay-300">
              Ready to transform your space? Get in touch with us today for a free quote or to answer any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg p-8 reveal">
                <h2 className="heading-md mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                className="hover:border-maple-300 focus:ring-maple-300 transition-all transform hover:-translate-y-1"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email" 
                                {...field} 
                                className="hover:border-maple-300 focus:ring-maple-300 transition-all transform hover:-translate-y-1"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your phone number" 
                                {...field} 
                                className="hover:border-maple-300 focus:ring-maple-300 transition-all transform hover:-translate-y-1"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interested In</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="hover:border-maple-300 focus:ring-maple-300 transition-all transform hover:-translate-y-1">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-50">
                                <SelectItem value="floor-wraps">Pre-Designed Floor Wraps</SelectItem>
                                <SelectItem value="installation">Setup & Installation</SelectItem>
                                <SelectItem value="event-package">Event Package</SelectItem>
                                <SelectItem value="consultation">Consultation</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or question" 
                              className="min-h-32 hover:border-maple-300 focus:ring-maple-300 transition-all transform hover:-translate-y-1" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="btn-primary w-full animate-pulse-gentle" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 reveal animation-delay-300">
                <h2 className="heading-md mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <ContactInfo icon={<Phone size={24} />} title="Phone">
                    <p>(555) 123-4567</p>
                  </ContactInfo>
                  
                  <ContactInfo icon={<Mail size={24} />} title="Email">
                    <p>info@maplewraps.com</p>
                    <p>support@maplewraps.com</p>
                  </ContactInfo>
                  
                  <ContactInfo icon={<MapPin size={24} />} title="Address">
                    <p>123 Luxury Lane</p>
                    <p>Suite 456</p>
                    <p>San Francisco, CA 94103</p>
                  </ContactInfo>
                  
                  <ContactInfo icon={<Clock size={24} />} title="Business Hours">
                    <p>Monday - Friday: 9AM - 6PM</p>
                    <p>Saturday: 10AM - 4PM</p>
                    <p>Sunday: Closed</p>
                  </ContactInfo>
                </div>
              </div>
              
              <div className="bg-maple-50 rounded-xl p-8 reveal animation-delay-500">
                <h3 className="heading-sm mb-4">Ready for a Quote?</h3>
                <p className="mb-4 text-foreground/70">
                  Need a quick quote for your project? Call us directly or fill out the form and we'll get back to you within 24 hours.
                </p>
                <Button asChild className="btn-primary w-full">
                  <a href="tel:5551234567">(555) 123-4567</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="rounded-xl overflow-hidden shadow-lg h-96 reveal">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50475.69344029163!2d-122.43760791141339!3d37.75781499725275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1649791633085!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Maple Wraps Location"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
