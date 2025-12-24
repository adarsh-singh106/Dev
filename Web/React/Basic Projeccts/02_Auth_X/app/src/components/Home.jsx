import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-5xl font-extrabold text-blue-600">Auth-X</h1>
        <p className="text-gray-600 text-lg">
          The most secure and seamless authentication system for your React applications.
        </p>
        
        <div className="flex justify-center gap-4 mt-5">
          <Link to="/login">
            <button className="cursor-pointer px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md  hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="cursor-pointer px-6 py-3 bg-white text-blue-500 border border-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;