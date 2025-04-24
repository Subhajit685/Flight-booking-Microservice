import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-xl font-bold">SkyBooking</h1>
        <p className="text-xs sm:text-sm text-center sm:text-left">
          © 2025 <span className="font-semibold">SkyBooking</span>. All rights
          reserved.
        </p>
        <div className="mt-2 sm:mt-0 flex space-x-4 text-sm">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
