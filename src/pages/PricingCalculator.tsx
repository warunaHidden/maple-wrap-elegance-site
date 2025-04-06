
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';

const PricingCalculator = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [parallaxLayers, setParallaxLayers] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Stage wrap form state
  const [hasStage, setHasStage] = useState<string>("yes");
  const [stageWidth, setStageWidth] = useState<string>("");
  const [stageLength, setStageLength] = useState<string>("");
  const [stageHeight, setStageHeight] = useState<string>("");
  const [stageWrap, setStageWrap] = useState<string>("");

  // Floor wrap form state
  const [floorWidth, setFloorWidth] = useState<string>("");
  const [floorLength, setFloorLength] = useState<string>("");
  const [isMatteBlack, setIsMatteBlack] = useState<string>("no");
  const [designType, setDesignType] = useState<string>("");
  const [borderType, setBorderType] = useState<string>("none");
  const [borderWidth, setBorderWidth] = useState<string>("4in");

  // Pricing calculation state
  const [price, setPrice] = useState<number | null>(null);
  const [vendorPrice, setVendorPrice] = useState<number | null>(null);

  // Enhanced mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Calculate movement for different layers based on mouse position
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

  // Animate text appearing when page loads
  useEffect(() => {
    const animateText = document.querySelector('.typewriter');
    if (animateText) {
      animateText.classList.add('animate-typewriter');
    }
  }, []);

  // Calculate price based on inputs
  const calculatePrice = () => {
    let totalPrice = 0;

    // Stage wrap calculations
    if (hasStage === "yes" && stageWidth && stageLength) {
      const stageArea = parseFloat(stageWidth) * parseFloat(stageLength);
      const baseStagePrice = stageArea * 5; // Base price per square foot

      // Adjust based on wrap type
      const wrapMultiplier = stageWrap === "fullPrint" ? 1.5 :
        stageWrap === "mettleBlack" ? 1.3 : 1;

      // Adjust based on height
      const heightMultiplier = stageHeight === "3ft" ? 1 :
        stageHeight === "4ft" ? 1.2 :
          stageHeight === "5ft" ? 1.4 : 1.6;

      totalPrice += baseStagePrice * wrapMultiplier * heightMultiplier;
    }

    // Floor wrap calculations
    if (floorWidth && floorLength) {
      const floorArea = parseFloat(floorWidth) * parseFloat(floorLength);
      let baseFloorPrice = floorArea * 4; // Base price per square foot

      // Adjust based on matte black
      if (isMatteBlack === "yes") {
        baseFloorPrice *= 1.2;
      }

      // Adjust based on design type
      if (designType.includes('print')) {
        baseFloorPrice *= designType === 'fullPrint' ? 1.5 : 1.3;
      } else if (designType.includes('chrome')) {
        baseFloorPrice *= 1.4;
      }

      // Add border costs
      if (borderType !== "none") {
        const borderMultiplier = borderType === "chromeGold" ? 1.5 :
          borderType === "chromeSilver" ? 1.4 : 1.3;
        const borderSizeFactor = borderWidth === "6in" ? 1.2 : 1;

        const perimeter = 2 * (parseFloat(floorWidth) + parseFloat(floorLength));
        totalPrice += perimeter * borderMultiplier * borderSizeFactor * 3;
      }

      totalPrice += baseFloorPrice;
    }

    setPrice(Math.round(totalPrice));
    // Calculate vendor price (80% of market price)
    setVendorPrice(Math.round(totalPrice * 0.8));
  };

  return (
    <Layout>
      {/* Hero Section with Parallax Effect */}
      <section ref={sectionRef} className="pt-32 pb-16 relative overflow-hidden">
        {/* Parallax background layer */}
        <div
          className="absolute inset-0 parallax-layer"
          style={{
            transform: `translate(${parallaxLayers.x}px, ${parallaxLayers.y}px)`,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(212, 175, 130, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gold-50 to-white"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-lg mb-6 animate-fade-in">
              <span className="typewriter inline-block overflow-hidden whitespace-nowrap border-r-4 border-maple-500 pr-1 animate-typing">
                Pricing Calculator
              </span>
            </h1>
            <p className="paragraph max-w-2xl mx-auto animate-fade-in animation-delay-300">
              Get an instant estimate for your floor wrap project by filling out the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Stage Wrap Section */}
            <div className="mb-12 bg-muted p-8 rounded-xl shadow-sm reveal">
              <SectionHeading
                title="Stage Wrap Options"
                subtitle="Let us know if you need a stage wrap for your event"
                className="text-2xl"
              />

              <div className="space-y-6">
                <div className="form-group reveal animation-delay-300">
                  <div className="mb-3">
                    <Label className="text-lg font-medium">Does your event have a stage?</Label>
                  </div>
                  <RadioGroup
                    value={hasStage}
                    onValueChange={setHasStage}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="stage-yes" />
                      <Label htmlFor="stage-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="stage-no" />
                      <Label htmlFor="stage-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {hasStage === "yes" && (
                  <div className="grid md:grid-cols-2 gap-6 animation-delay-500">
                    <div className="form-group">
                      <Label htmlFor="stage-width" className="form-label">Stage Width (ft)</Label>
                      <Input
                        id="stage-width"
                        type="number"
                        min="1"
                        placeholder="Enter width"
                        value={stageWidth}
                        onChange={(e) => setStageWidth(e.target.value)}
                        className="form-input hover:shadow-md transition-all"
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="stage-length" className="form-label">Stage Length (ft)</Label>
                      <Input
                        id="stage-length"
                        type="number"
                        min="1"
                        placeholder="Enter length"
                        value={stageLength}
                        onChange={(e) => setStageLength(e.target.value)}
                        className="form-input hover:shadow-md transition-all"
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="stage-height" className="form-label">Stage Height</Label>
                      <Select value={stageHeight} onValueChange={setStageHeight}>
                        <SelectTrigger className="form-input hover:shadow-md transition-all">
                          <SelectValue placeholder="Select height" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3ft">3 feet</SelectItem>
                          <SelectItem value="4ft">4 feet</SelectItem>
                          <SelectItem value="5ft">5 feet</SelectItem>
                          <SelectItem value="6ft">6 feet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-group">
                      <Label htmlFor="stage-wrap" className="form-label">Select Wrap</Label>
                      <Select value={stageWrap} onValueChange={setStageWrap}>
                        <SelectTrigger className="form-input hover:shadow-md transition-all">
                          <SelectValue placeholder="Select wrap type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="mettleBlack">Mettle Black</SelectItem>
                          <SelectItem value="fullPrint">Full Print</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Floor Wrap Section */}
            <div className="mb-12 bg-muted p-8 rounded-xl shadow-sm reveal">
              <SectionHeading
                title="Floor Wrap Options"
                subtitle="Customize your floor wrap based on your needs"
                className="text-2xl"
              />

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 reveal animation-delay-300">
                  <div className="form-group">
                    <Label htmlFor="floor-width" className="form-label">Floor Width (ft)</Label>
                    <Input
                      id="floor-width"
                      type="number"
                      min="1"
                      placeholder="Enter width"
                      value={floorWidth}
                      onChange={(e) => setFloorWidth(e.target.value)}
                      className="form-input hover:shadow-md transition-all"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="floor-length" className="form-label">Floor Length (ft)</Label>
                    <Input
                      id="floor-length"
                      type="number"
                      min="1"
                      placeholder="Enter length"
                      value={floorLength}
                      onChange={(e) => setFloorLength(e.target.value)}
                      className="form-input hover:shadow-md transition-all"
                    />
                  </div>
                </div>

                <div className="form-group reveal animation-delay-500">
                  <div className="mb-3">
                    <Label className="text-lg font-medium">Is the floor wrap matte black?</Label>
                  </div>
                  <RadioGroup
                    value={isMatteBlack}
                    onValueChange={setIsMatteBlack}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="matte-yes" />
                      <Label htmlFor="matte-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="matte-no" />
                      <Label htmlFor="matte-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="form-group reveal animation-delay-700">
                  <Label className="text-lg font-medium mb-4 block">Design Selection</Label>
                  <div className="grid md:grid-cols-2 gap-6 bg-white p-5 rounded-lg shadow-sm">
                    <div className="space-y-3">
                      <h4 className="font-medium text-maple-800">Printed Designs</h4>
                      <RadioGroup value={designType} onValueChange={setDesignType}>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="print10x10" id="print-10x10" />
                          <Label htmlFor="print-10x10" className="cursor-pointer">10x10 Pattern</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="print12x12" id="print-12x12" />
                          <Label htmlFor="print-12x12" className="cursor-pointer">12x12 Pattern</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="print15x15" id="print-15x15" />
                          <Label htmlFor="print-15x15" className="cursor-pointer">15x15 Pattern</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="fullPrint" id="full-print" />
                          <Label htmlFor="full-print" className="cursor-pointer">Full Print</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="noDesign" id="no-design" />
                          <Label htmlFor="no-design" className="cursor-pointer">No Design</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-maple-800">Chrome Designs</h4>
                      <RadioGroup value={designType} onValueChange={setDesignType}>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="chrome10x10" id="chrome-10x10" />
                          <Label htmlFor="chrome-10x10" className="cursor-pointer">10x10 Chrome</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="chrome12x12" id="chrome-12x12" />
                          <Label htmlFor="chrome-12x12" className="cursor-pointer">12x12 Chrome</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors">
                          <RadioGroupItem value="chrome15x15" id="chrome-15x15" />
                          <Label htmlFor="chrome-15x15" className="cursor-pointer">15x15 Chrome</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="form-group reveal animation-delay-700">
                  <Label htmlFor="border-type" className="form-label">Border</Label>
                  <Select value={borderType} onValueChange={setBorderType}>
                    <SelectTrigger className="form-input hover:shadow-md transition-all">
                      <SelectValue placeholder="Select border type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Border</SelectItem>
                      <SelectItem value="chromeGold">Chrome Gold</SelectItem>
                      <SelectItem value="chromeSilver">Chrome Silver</SelectItem>
                      <SelectItem value="glossBlack">Gloss Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {borderType !== "none" && (
                  <div className="form-group animation-delay-900">
                    <Label htmlFor="border-width" className="form-label">Border Width</Label>
                    <Select value={borderWidth} onValueChange={setBorderWidth}>
                      <SelectTrigger className="form-input hover:shadow-md transition-all">
                        <SelectValue placeholder="Select border width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4in">4 inches</SelectItem>
                        <SelectItem value="6in">6 inches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center reveal">
              <Button
                onClick={calculatePrice}
                className="btn-primary text-lg px-8 py-4 animate-pulse-gentle"
              >
                Calculate Price
              </Button>

              {price !== null && (
                <div className="mt-8 p-6 bg-gold-50 rounded-xl shadow-md animate-zoom-in">
                  <h3 className="heading-md text-maple-700 mb-4">Estimated Pricing</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-lg font-medium text-maple-600 mb-2">Market Price</p>
                      <p className="text-3xl font-bold text-maple-800">${price}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-lg font-medium text-maple-600 mb-2">Vendor Price</p>
                      <p className="text-3xl font-bold text-gold-600">${vendorPrice}</p>
                    </div>
                  </div>
                  <p className="text-sm text-maple-600 mt-4">This is an estimate only. Contact us for an exact quote.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingCalculator;
