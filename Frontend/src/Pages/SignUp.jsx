import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { add, gettoken } from "../Redux/Slices/authReducer";
import Logo from "../Images/Logos/png/logo-color.png";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [submitLoader, setSubmitLoader] = useState(false);

  const validateForm = () => {
    const { username, password } = formData;
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(username)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const passwordRegex = {
      minLength: /.{8,}/,
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      specialChar: /[!@#$%^&*]/
    };

    if (!passwordRegex.minLength.test(password)) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    
    if (!passwordRegex.uppercase.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    
    if (!passwordRegex.lowercase.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return false;
    }
    
    if (!passwordRegex.number.test(password)) {
      toast.error("Password must contain at least one number");
      return false;
    }
    
    if (!passwordRegex.specialChar.test(password)) {
      toast.error("Password must contain at least one special character (!@#$%^&*)");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitLoader(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI.replace(/\/+$/, '')}/api/users/signup`,
        formData
      );

      if (response.data.status === "false") {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        dispatch(add(response.data.others));
        dispatch(gettoken(response.data.token));
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred during signup");
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-gray-100 text-white">
        <img src={Logo} className="h-full w-full" alt="Logo" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-[#41bb47] shadow-2xl shadow-green-700">
        <h2 className="text-3xl mb-4 text-white font-bold">Sign Up</h2>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Email Address
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 shadow-md shadow-green-800 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="email"
              placeholder="Enter your email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 shadow-md shadow-green-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="text-sm text-white font-medium mt-2">
              Password requirements:
              <ul className="list-disc pl-5 mt-1">
                <li>At least 8 characters long</li>
                <li>At least one uppercase letter (A-Z)</li>
                <li>At least one lowercase letter (a-z)</li>
                <li>At least one number (0-9)</li>
                <li>At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`w-full bg-green-700 hover:bg-green-600 text-white font-bold shadow-md shadow-green-900 py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                submitLoader ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={submitLoader}
            >
              {submitLoader ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        <h2 className="text-sm pt-4 text-gray-200">
          Already have an account?{" "}
          <Link to="/signin" className="font-bold text-green-900 hover:underline">
            Sign In
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default SignUp;
