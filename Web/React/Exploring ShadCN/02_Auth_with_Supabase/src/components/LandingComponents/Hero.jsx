import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Import Shadcn Button
import { Navigate, useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate()
  return (
    <header className="px-4 py-12 text-center md:py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
        Manage your <span className="text-blue-600">Mittrs</span> (Friends) simply.
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        The easiest way to keep track of your contacts, birthdays, and important details without the clutter.
      </p>
      
      {/* Shadcn Button with size="lg" for emphasis */}
      <Button 
      onClick={()=>navigate('/dashboard')}
        size="lg" 
        className="gap-2 bg-pink-600 hover:bg-pink-700 text-lg py-6 px-8 shadow-lg"
      >
        Start Adding Now <ChevronRight className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default Hero;