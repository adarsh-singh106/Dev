import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-20 pb-12">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          We are storytellers, <span className="text-blue-600">coders</span>, and creators.
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          Welcome to the blog. This is a space dedicated to open ideas, technical deep dives, 
          and the occasional random thought about the future of AI.
        </p>
      </div>

      {/* Content Section with Image */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          
          {/* Image Side */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
             {/* Replace src with a real image of you or your workspace */}
            <img 
              src="/ws.png" 
              alt="Workspace" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              We believe that knowledge should be shared freely. Whether it's a complex 
              React tutorial or a simple lifestyle tip, our goal is to provide value 
              through clear, concise writing.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Started in 2025, this blog has grown from a simple text file on a local 
              machine to a community of like-minded developers and thinkers.
            </p>
            
            <div className="flex gap-8 border-t border-gray-100 pt-8">
              <div>
                <span className="block text-3xl font-bold text-blue-600">50+</span>
                <span className="text-sm text-gray-500 font-medium">Articles</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-blue-600">10k</span>
                <span className="text-sm text-gray-500 font-medium">Readers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* "Team" or "Author" Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Meet the Author</h2>
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                    <img src="/ash.png" alt="Author" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Adarsh Singh</h3>
                <p className="text-blue-600 font-medium mb-4">Lead Developer & Writer</p>
                <p className="text-gray-500 max-w-lg">
                    "I write code, break things, and then write about how I fixed them. 
                    Obsessed with React, Coffee, and Clean UI."
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default About;