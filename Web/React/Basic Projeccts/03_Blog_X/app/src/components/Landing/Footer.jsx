import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
             {/* Simple Logo Placeholder */}
             <div className="w-8 h-8 rounded-full bg-linear-to-tr from-orange-400 to-pink-500"></div>
             <span className="text-2xl font-bold text-white">blog-X</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Blog-X. All rights reserved.</p>
        </div>

        <div className="flex gap-8 text-gray-400">
          <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-orange-400 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;