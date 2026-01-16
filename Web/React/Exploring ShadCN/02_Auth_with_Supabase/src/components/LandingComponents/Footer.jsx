import React from 'react';

const Footer = () => {
  return (
    <footer className="p-6 text-center text-gray-500 text-sm bg-gray-50">
      © {new Date().getFullYear()} Mittr App. All rights reserved.
    </footer>
  );
};

export default Footer;