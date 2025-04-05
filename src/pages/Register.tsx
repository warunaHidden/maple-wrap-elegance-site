
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      toast.error('You must agree to the Terms and Conditions');
      return;
    }
    
    setLoading(true);
    
    // This is a placeholder for actual registration logic
    // In a real application, you would integrate with your auth provider
    setTimeout(() => {
      setLoading(false);
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    }, 1500);
  };

  return (
    <Layout>
      <section className="relative py-20 min-h-screen flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gold-200 animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-maple-200 animate-pulse-gentle"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-lg mx-auto">
            <Card className="border-maple-200 shadow-xl bg-white/90 backdrop-blur-sm reveal active">
              <CardHeader className="pb-3">
                <h1 className="heading-md text-center text-maple-700">Create an Account</h1>
                <p className="text-center text-foreground/70 mt-2">Join Maple Wraps and transform your space</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground/90">First Name</Label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground/90">Last Name</Label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/90">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground/90">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground/90">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      placeholder="••••••••" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <label 
                      htmlFor="terms" 
                      className="text-sm text-foreground/70 cursor-pointer"
                    >
                      I agree to the <Link to="/terms" className="text-maple-600 hover:text-maple-700 underline underline-offset-2">Terms and Conditions</Link>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="text-center mt-2">
                  <span className="text-foreground/70">Already have an account?</span>{' '}
                  <Link to="/login" className="text-maple-600 hover:text-maple-700 font-medium underline underline-offset-2">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
