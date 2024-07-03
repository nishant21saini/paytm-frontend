import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-blue-600">PayTM</Link>
            {/* Navigation */}
            <nav>
              <ul className="flex space-x-6">
                <li><Link to="/signin" className="text-gray-700 hover:text-blue-600">Sign In</Link></li>
                <li><Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to PayTM</h1>
          <p className="text-lg text-gray-700 mb-8">India's leading digital payments platform</p>
          <div className="flex justify-center">
            <Link to="/signup" className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Sign Up</Link>
            <Link to="/signin" className="bg-transparent border border-blue-600 text-blue-600 py-2 px-6 ml-4 rounded-lg shadow-md hover:bg-blue-50 transition duration-300">Sign In</Link>
          </div>
        </section>
        
        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mobile Recharges</h2>
            <p className="text-gray-700">Recharge your mobile phone hassle-free with PayTM's easy and secure mobile recharge service.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bill Payments</h2>
            <p className="text-gray-700">Pay your bills quickly and conveniently using PayTM's bill payment service. Electricity, water, gas, and more.</p>
          </div>
          {/* Add more feature cards here */}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; {new Date().getFullYear()} PayTM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
