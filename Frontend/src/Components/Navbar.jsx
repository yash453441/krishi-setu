import React, { useState } from "react";
import logo from "../Images/Logos/png/logo-no-background.png";
import Modals from "./Modals.jsx";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../Redux/Slices/authReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modal, setmodal] = useState(false);

  const handleSignout = () => {
    localStorage.clear();
    dispatch(remove());
    toast.success("SignOut Success");
    navigate("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="sticky top-0 mx-4 my-2 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md z-40 border border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-14 w-auto transition-transform hover:scale-105" src={logo} alt="Logo" />
            <div className="text-3xl h-12 mx-3 flex text-gray-700 items-center justify-center font-extrabold tracking-wider">
              <span className="text-green-500">Krishi</span>
              <span className="text-gray-600">Setu</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden sm:block">
            <div className="mx-3 space-x-4">
              <Link
                to="/"
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
              >
                Services
              </Link>
              <Link
                to="/machines"
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
              >
                Machines
              </Link>
              <Link
                to="/dashboard"
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard"
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
              >
                Contact
              </Link>
              <Link
                to="/addproduct"
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
              >
                Add Product
              </Link>
              <Link
                className="text-green-700 font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/80 hover:shadow-md"
                onClick={() => setmodal(true)}
              >
                Signout
              </Link>
            </div>
          </div>

          {/* Hamburger icon for mobile */}
          <div className="flex sm:hidden">
            <button
              type="button"
              className="text-green-700   hover:border-xl px-2 py-2 rounded-md  font-medium"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
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

        {modal ? (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          SignOut account
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to SignOut your account?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleSignout}
                    >
                      SignOut
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setmodal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link
                to="/"
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
              >
                Services
              </Link>
              <Link
                to="/machines"
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
              >
                Machines
              </Link>
              <Link
                to="/dashboard"
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard"
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
              >
                Contact
              </Link>
              <Link
                to="/addproduct"
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
              >
                Add Product
              </Link>
              <Link
                className="text-green-700 hover:bg-green-50 block px-4 py-2 rounded-md text-base font-bold transition-all duration-300"
                onClick={() => setmodal(true)}
              >
                Signout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
