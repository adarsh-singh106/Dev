import React from 'react';
import Navbar from '../components/LandingComponents/Navbar';
import Hero from '../components/LandingComponents/Hero';
import Features from '../components/LandingComponents/Features';
import DemoSection from '../components/LandingComponents/DemoSection';
import Footer from '../components/LandingComponents/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      
      <main className="grow">
        <Hero />
        <Features />
        <DemoSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;