import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PhotoIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import { add, gettoken, remove } from "../Redux/Slices/authReducer";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUpdate, setisUpdate] = useState({});
  const [loading, setloading] = useState(true);
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [shortdescription, setshortdescription] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [year, setyear] = useState("");
  const [rentamount, setrentamount] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("shortdescription", shortdescription);
    formData.append("year", year);
    formData.append("rentamount", rentamount);
    formData.append("image", image);
    formData.append("_id", user._id);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI.replace(/\/+$/, '')}/api/machines/addMachine`,
        formData
      );
      setloading(false);
      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      setloading(false);
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

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
          setisUpdate(user.isUpdate);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {isUpdate ? (
            <div className="container mx-auto px-4 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h1 className="heading-1 mb-4">
                    Add Your <span className="text-gradient">Equipment</span>
                  </h1>
                  <p className="text-xl text-gray-600">
                    List your farming equipment and help fellow farmers access modern machinery
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card rounded-2xl p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Equipment Title
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter equipment name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Equipment Type
                        </label>
                        <select
                          required
                          value={type}
                          onChange={(e) => settype(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        >
                          <option value="">Select Type</option>
                          <option value="tractor">Tractor</option>
                          <option value="harvester">Harvester</option>
                          <option value="cultivater">Cultivator</option>
                          <option value="seeder">Seeder</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Short Description
                        </label>
                        <input
                          type="text"
                          required
                          value={shortdescription}
                          onChange={(e) => setshortdescription(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Brief overview of your equipment"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Detailed Description
                        </label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                          rows="4"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Provide detailed information about your equipment..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Manufacturing Year
                        </label>
                        <input
                          type="number"
                          required
                          value={year}
                          onChange={(e) => setyear(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="YYYY"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rent Amount (per day)
                        </label>
                        <input
                          type="number"
                          required
                          value={rentamount}
                          onChange={(e) => setrentamount(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter amount in INR"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Equipment Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition-colors duration-200">
                          <div className="space-y-1 text-center">
                            {imagePreview ? (
                              <div className="relative">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="mx-auto h-32 w-auto rounded-lg"
                                />
                                <CheckCircleIcon className="h-8 w-8 text-green-500 absolute -top-2 -right-2" />
                              </div>
                            ) : (
                              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            )}
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                <span>Upload a file</span>
                                <input
                                  type="file"
                                  required
                                  onChange={handleImageChange}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Link
                        to="/"
                        className="btn-outline"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        className="btn-primary inline-flex items-center"
                      >
                        <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                        List Equipment
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card max-w-2xl mx-auto p-8 rounded-2xl"
              >
                <h2 className="heading-2 mb-4">Account Not Verified</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Please verify your account to list equipment.
                </p>
                <Link to="/profile" className="btn-primary">
                  Go to Profile
                </Link>
              </motion.div>
            </div>
          )}
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AddProduct;
