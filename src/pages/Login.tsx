
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This is a placeholder for actual authentication
    // In a real application, you would integrate with your auth provider
    setTimeout(() => {
      setLoading(false);
      toast.success('Successfully logged in!');
      navigate('/');
    }, 1000);
  };

  return (
    <Layout>
      <section className="relative py-20 min-h-screen flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-maple-200 animate-pulse-gentle"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gold-200 animate-float"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="border-maple-200 shadow-xl bg-white/90 backdrop-blur-sm reveal active">
              <CardHeader className="pb-3">
                <h1 className="heading-md text-center text-maple-700">Welcome Back</h1>
                <p className="text-center text-foreground/70 mt-2">Sign in to your Maple Wraps account</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
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
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-foreground/90">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-maple-600 hover:text-maple-700 underline underline-offset-2">
                        Forgot password?
                      </Link>
                    </div>
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
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label 
                      htmlFor="remember-me" 
                      className="text-sm text-foreground/70 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="text-center mt-2">
                  <span className="text-foreground/70">Don't have an account?</span>{' '}
                  <Link to="/register" className="text-maple-600 hover:text-maple-700 font-medium underline underline-offset-2">
                    Register now
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

export default Login;
