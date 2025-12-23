import React from 'react';
// 1. Import your custom hook (adjust the path based on your folder structure)
import { useBlog } from '../context/BlogContext'; 

const LandingPage = () => {
  // 2. Access your global state
  const { state } = useBlog();
  const { posts } = state;

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 tracking-wide uppercase">
            My Personal Blog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Discover stories, thinking, <br className="hidden sm:block" /> and expertise.
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-10">
             A collection of my thoughts, funny moments, and AI experiments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              Start Reading
            </button>
            <button className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Latest Updates</h2>
            <button className="hidden sm:block text-sm font-semibold text-blue-600 hover:text-blue-500">
              View all posts &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 3. Map over the posts from your Context */}
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col group cursor-pointer">
                
                {/* Image Container */}
                <div className="h-64 w-full bg-gray-100 rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                   {/* Using the image from your dummy data */}
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex items-center gap-3 text-sm mb-3">
                  {/* Since dummy data doesn't have category/date, we add static placeholders or logic */}
                  <span className="font-semibold text-blue-600">Lifestyle</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">Just now</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {post.content}
                </p>

                <a href={`/post/${post.id}`} className="mt-auto inline-flex items-center text-sm font-semibold text-gray-900 hover:text-blue-600">
                  Read Article
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-16 text-center border border-gray-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Join the community
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Get the latest updates delivered right to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
              <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;