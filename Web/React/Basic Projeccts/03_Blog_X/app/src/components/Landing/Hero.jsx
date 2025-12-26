import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center text-center bg-black px-4 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <span className="text-orange-400 font-semibold tracking-wider uppercase text-sm">
          Welcome to the future of storytelling
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          Share your ideas, <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-400 via-pink-500 to-purple-500">
            inspire the world.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Blog-X is the creative hub for writers, thinkers, and creators. 
          Start your journey today and join a community of voices.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <button className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(249,115,22,0.5)]">
            Start Writing
          </button>
          <button className="px-8 py-3 rounded-full border border-gray-700 text-white font-semibold hover:bg-gray-900 transition-all">
            Read Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;