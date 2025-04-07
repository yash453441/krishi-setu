import React from "react";
import Navbar from "../Components/Navbar";

const Services = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf9]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-7xl max-md:text-4xl font-extrabold px-2 text-gray-300 text-center md:text-left mb-12">
          Our Services
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Equipment Rental Service */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Equipment Rental</h2>
            <p className="text-gray-600">
              Rent modern farming equipment for your agricultural needs. Wide range of machinery available including tractors, harvesters, and cultivators.
            </p>
          </div>

          {/* Equipment Listing Service */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Equipment Listing</h2>
            <p className="text-gray-600">
              List your farming equipment for rent. Earn additional income by renting out your machinery when not in use.
            </p>
          </div>

          {/* Farming Consultation */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Farming Consultation</h2>
            <p className="text-gray-600">
              Get expert advice on modern farming techniques and equipment usage to maximize your agricultural productivity.
            </p>
          </div>

          {/* Equipment Maintenance */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Equipment Maintenance</h2>
            <p className="text-gray-600">
              Regular maintenance and repair services for all types of farming equipment to ensure optimal performance.
            </p>
          </div>

          {/* Training Programs */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Training Programs</h2>
            <p className="text-gray-600">
              Comprehensive training programs on equipment operation and modern farming techniques for farmers.
            </p>
          </div>

          {/* Support Services */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">24/7 Support</h2>
            <p className="text-gray-600">
              Round-the-clock customer support for all your equipment rental and farming needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 