import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { 
  TruckIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon,
  PhoneIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import axios from "axios";

import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading.jsx";
import harvester from "../Images/harvester-white-bg-clone.png";
import tractor from "../Images/tractor-bg3.png";
import tractor1 from "../Images/tractor-bg4.png";
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter } from "react-icons/fa";

import { add, gettoken, remove } from "../Redux/Slices/authReducer.js";

const features = [
  {
    title: "Equipment Rental",
    description: "Access modern farming equipment on demand",
    icon: TruckIcon,
  },
  {
    title: "Easy Scheduling",
    description: "Book equipment with flexible time slots",
    icon: CalendarDaysIcon,
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront costs with no hidden fees",
    icon: CurrencyDollarIcon,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance for your needs",
    icon: PhoneIcon,
  },
];

const Home = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    const fetchdata = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URI.replace(/\/+$/, '')}/api/users/isAuthenticated`,
          { token }
        );

        if (!response.data.others) {
          toast.error("Network Error");
          setloading(false);
          navigate("/signin");
        } else {
          const user = response.data.others;
          dispatch(add(user));
          dispatch(gettoken(token));
          setloading(false);
        }
      } catch (err) {
        dispatch(remove());
        console.log(err.response.data.message);
        setloading(false);
        navigate("/signin");
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="heading-1 mb-6">
                <span className="text-gradient">Harvest</span> Your Full Potential
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Revolutionize your farming experience with our modern equipment rental platform. Access cutting-edge machinery when you need it.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/services" className="btn-primary">
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/about" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-radial from-primary-100/30 to-transparent" />
              <img
                src={harvester}
                alt="Modern Harvester"
                className="relative z-10 w-full h-auto max-w-2xl mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="heading-2 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">
              Experience the future of farming with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 h-full hover:shadow-glow transition-all duration-300">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary-50 text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
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
            <h2 className="heading-2 mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of farmers who are already benefiting from our modern equipment rental platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="btn-primary">
                Get Started Now
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Designed with ❤️ by IIST Coder [UP]
          </p>
        </div>
      </footer>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Home;
