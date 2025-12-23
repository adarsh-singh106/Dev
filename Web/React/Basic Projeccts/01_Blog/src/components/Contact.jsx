import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left Side: Contact Info */}
        <div className="bg-blue-600 p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-blue-100 text-lg mb-12">
              Have a question, a project proposal, or just want to say hi? Fill
              out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mt-1 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Chat with us</h3>
                  <p className="text-blue-200">a1d0arsh6@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mt-1 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-blue-200">
                    Muth Gali ,Factory-ClockTower Road ,FF India
                    <br />
                    Tech City, TC 698869
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            {/* Social Icons Placeholder */}

            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 cursor-pointer transition">
              <FaXTwitter className="text-4xl" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 cursor-pointer transition">
              <SiDiscord className="text-4xl" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 cursor-pointer transition">
              <IoLogoGithub className="text-9xl" />
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="p-10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Ash"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Momu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Ash@exp.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="Tell us what you're thinking..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
