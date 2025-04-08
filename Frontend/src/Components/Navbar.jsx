import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/Logos/png/logo-no-background.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { remove } from "../Redux/Slices/authReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for mobile menu and modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);

  // Signout handler
  const handleSignout = () => {
    localStorage.clear();
    dispatch(remove());
    toast.success("SignOut Success");
    navigate("/signin");
  };

  // Option: hide the Navbar completely when modal is active.
  // Remove this conditional if you want the Navbar to remain visible underneath.
  if (modal) {
    return (
      <SignOutFullScreenModal 
        onConfirm={handleSignout} 
        onCancel={() => setModal(false)}
      />
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 mx-4 my-2 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md z-40 border border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                className="h-14 w-auto transition-transform hover:scale-105"
                src={logo}
                alt="Logo"
              />
              <div className="text-3xl mx-3 font-extrabold tracking-wider text-gray-700">
                <span className="text-green-500">Krishi</span>
                <span className="text-gray-600">Setu</span>
              </div>
            </div>

            {/* Desktop nav links */}
            <div className="hidden sm:block">
              <div className="space-x-4">
                <Link
                  to="/"
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Services
                </Link>
                <Link
                  to="/machines"
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Machines
                </Link>
                <Link
                  to="/dashboard"
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  to="/contact"
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Contact
                </Link>
                <Link
                  to="/addproduct"
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Add Product
                </Link>
                <button
                  onClick={() => setModal(true)}
                  className="text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-50/80 hover:shadow-md transition-all"
                >
                  Signout
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                className="text-green-700 p-2 rounded-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu links */}
          {isMobileMenuOpen && (
            <div className="sm:hidden space-y-2 px-2 pt-2 pb-4">
              <Link
                to="/"
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Services
              </Link>
              <Link
                to="/machines"
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Machines
              </Link>
              <Link
                to="/dashboard"
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Dashboard
              </Link>
              <Link
                to="/contact"
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Contact
              </Link>
              <Link
                to="/addproduct"
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Add Product
              </Link>
              <button
                onClick={() => setModal(true)}
                className="block text-green-700 px-4 py-2 rounded-md font-bold hover:bg-green-50 transition-all"
              >
                Signout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Toast notifications */}
      <ToastContainer />
    </>
  );
};

// Full-screen SignOut Modal using React Portal
const SignOutFullScreenModal = ({ onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Modal Header */}
      <h2 className="text-3xl font-extrabold text-gray-900">
        SignOut account
      </h2>
      {/* Modal Message */}
      <p className="mt-4 text-xl text-gray-600 text-center">
        Are you sure you want to SignOut your account?
      </p>
      {/* Modal Controls */}
      <div className="mt-8 flex space-x-6">
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-md font-semibold"
        >
          SignOut
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Navbar;
