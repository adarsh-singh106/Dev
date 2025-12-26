import React from 'react';
import Hero from '../../components/Landing/Hero';
import FeaturedPosts from '../../components/Landing/FeaturedPosts';
import Features from '../../components/Landing/Features';
import Footer from '../../components/Landing/Footer';

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen p-10 text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Assuming Navbar is rendered in your Layout or App.js 
         If not, place <Navbar /> here 
      */}
      
      <main>
        <Hero />
        <FeaturedPosts />
        <Features />
      </main>
      

    </div>
  );
};

export default LandingPage;