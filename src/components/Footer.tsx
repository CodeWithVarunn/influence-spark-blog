
import { Mail, Heart, Code, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-16 mt-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/2a70df12-ad0c-4e56-9c0d-b5974e5fd46e.png" 
                  alt="LinkedUp Logo" 
                  className="w-10 h-10 object-contain filter brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  LinkedUp Content
                </h3>
                <p className="text-blue-200 text-sm">Your all-in-one platform for brilliant LinkedIn posts</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Transform your LinkedIn presence with AI-powered content generation, scheduling, and analytics. 
              Create engaging posts that drive meaningful professional connections.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/30 transition-colors">
                <Linkedin className="w-5 h-5 text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/30 transition-colors">
                <Twitter className="w-5 h-5 text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/30 transition-colors">
                <Github className="w-5 h-5 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-200">Features</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">AI Content Generation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Smart Scheduling</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Performance Analytics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Profile Optimization</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-200">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a 
                  href="mailto:varungill19046@gmail.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  varungill19046@gmail.com
                </a>
              </div>
              <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
                <p className="text-sm text-blue-200 mb-2">Need Help?</p>
                <p className="text-xs text-gray-300">
                  Reach out for support, feature requests, or partnership opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 md:mb-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>and</span>
              <Code className="w-4 h-4 text-blue-400" />
              <span>for LinkedIn creators</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 LinkedUp Content. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
