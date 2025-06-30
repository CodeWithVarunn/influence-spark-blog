
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <img 
                  src="/lovable-uploads/2a70df12-ad0c-4e56-9c0d-b5974e5fd46e.png" 
                  alt="LinkedUp Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                LinkedUp Content
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              AI-powered LinkedIn content creation platform that helps professionals create engaging, 
              high-quality posts that drive real engagement and grow their network.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Content Generator</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Post Scheduler</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Analytics Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Content Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2025 LinkedUp Content. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for LinkedIn creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
