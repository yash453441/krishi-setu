import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TruckIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ClockIcon,
  ListBulletIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../Components/Navbar";

const services = [
  {
    title: "Equipment Rental",
    description: "Access our wide range of modern farming equipment for rent. From tractors to harvesters, we've got you covered.",
    icon: TruckIcon,
    color: "from-primary-500/20 to-primary-500/5",
  },
  {
    title: "Equipment Listing",
    description: "List your farming equipment for rent and earn passive income while helping fellow farmers.",
    icon: ListBulletIcon,
    color: "from-success-500/20 to-success-500/5",
  },
  {
    title: "Farming Consultation",
    description: "Get expert advice from our experienced agricultural consultants to optimize your farming operations.",
    icon: ChatBubbleBottomCenterTextIcon,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Equipment Maintenance",
    description: "Professional maintenance services to keep your farming equipment in top condition.",
    icon: WrenchScrewdriverIcon,
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "Training Programs",
    description: "Comprehensive training programs on modern farming techniques and equipment operation.",
    icon: UserGroupIcon,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you with any queries or concerns.",
    icon: ClockIcon,
    color: "from-pink-500/20 to-pink-500/5",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
        
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="heading-1 mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600">
              Empowering farmers with modern solutions and equipment to enhance agricultural productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-8 h-full hover:shadow-glow transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-300"
                  >
                    Learn more
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-success-500/10" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.05]" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card max-w-4xl mx-auto text-center p-12 rounded-2xl"
          >
            <h2 className="heading-2 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our platform today and experience the future of farming
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="btn-primary">
                Sign Up Now
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 