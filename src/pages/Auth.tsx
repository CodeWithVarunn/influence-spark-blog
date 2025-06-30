
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Zap, Users, Sparkles, Brain, Rocket } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password, fullName);
        if (!result.error) {
          toast({
            title: "Welcome to LinkedUp Content!",
            description: "Your account has been created successfully. You can now access your dashboard.",
            duration: 3000,
          });
        }
      } else {
        result = await signIn(email, password);
        if (!result.error) {
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          toast({
            title: "Welcome Back!",
            description: "Successfully signed in. Redirecting to dashboard...",
            duration: 3000,
          });
        }
      }
      
      if (result.error) {
        toast({
          title: "Authentication Error",
          description: result.error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl relative z-10 overflow-hidden">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg opacity-20 animate-pulse"></div>
        
        <div className="relative p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/lovable-uploads/2a70df12-ad0c-4e56-9c0d-b5974e5fd46e.png" 
                alt="LinkedUp Logo" 
                className="w-16 h-16 object-contain filter drop-shadow-2xl"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              {isSignUp ? "Join LinkedUp Content" : "Welcome Back"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isSignUp 
                ? "Transform your LinkedIn presence with AI-powered content"
                : "Sign in to get started"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required={isSignUp}
                  className="transition-all focus:ring-2 focus:ring-blue-500 border-gray-200 dark:border-gray-700 rounded-xl h-12 bg-white/80 dark:bg-gray-800/80"
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="transition-all focus:ring-2 focus:ring-blue-500 border-gray-200 dark:border-gray-700 rounded-xl h-12 bg-white/80 dark:bg-gray-800/80"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={8}
                  className="pr-12 transition-all focus:ring-2 focus:ring-blue-500 border-gray-200 dark:border-gray-700 rounded-xl h-12 bg-white/80 dark:bg-gray-800/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {!isSignUp && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 h-12 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Features highlight for signup */}
          {isSignUp && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center">
                  <Brain className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI-Powered</span>
                </div>
                <div className="flex flex-col items-center">
                  <Rocket className="w-5 h-5 text-green-600 mb-1" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Lightning Fast</span>
                </div>
                <div className="flex flex-col items-center">
                  <Sparkles className="w-5 h-5 text-purple-600 mb-1" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Engaging</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
