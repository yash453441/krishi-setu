import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  UserCircleIcon,
  CogIcon,
  TruckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import UserDashboard from "../Components/UserDashboard";
import { add, gettoken } from "../Redux/Slices/authReducer";

const dummyUserDetails = {
  _id: "dummy123",
  username: "john.farmer",
  firstname: "John",
  lastname: "Smith",
  address: "123 Farm Avenue, Agricultural District",
  pincode: "560001",
  phonenumber: "9876543210",
  isUpdate: true
};

const dummyMachines = [
  {
    _id: "m1",
    title: "John Deere Tractor",
    type: "tractor",
    description: "Modern farming tractor with advanced features",
    shortdescription: "High-performance tractor",
    year: "2023",
    rentamount: "15000",
    image: "https://example.com/tractor.jpg",
    sellerid: "dummy123",
    status: "available"
  },
  {
    _id: "m2",
    title: "Harvester Pro X1",
    type: "harvester",
    description: "Efficient harvesting machine for multiple crops",
    shortdescription: "Multi-crop harvester",
    year: "2022",
    rentamount: "20000",
    image: "https://example.com/harvester.jpg",
    sellerid: "dummy123",
    status: "rented"
  }
];

const dummyUserMachineData = {
  userid: "dummy123",
  owned: [
    {
      machineid: "m1",
      requeststatus: "available"
    },
    {
      machineid: "m2",
      requeststatus: "rented"
    }
  ],
  rented: [
    {
      machineid: "m3",
      requeststatus: "approved"
    }
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [userDetails, setuserDetails] = useState(dummyUserDetails);
  const [isUpdate, setisUpdate] = useState(true);
  const [firstname, setfirstname] = useState(dummyUserDetails.firstname);
  const [lastname, setlastname] = useState(dummyUserDetails.lastname);
  const [address, setaddress] = useState(dummyUserDetails.address);
  const [pincode, setpincode] = useState(dummyUserDetails.pincode);
  const [phonenumber, setphonenumber] = useState(dummyUserDetails.phonenumber);
  const [userProfile, setuserProfile] = useState(true);
  const [allmachines, setallmachines] = useState(dummyMachines);
  const [usermachinedata, setusermachinedata] = useState(dummyUserMachineData);
  const [usermachinedatalength, setusermachinedatalength] = useState(dummyUserMachineData.owned.length + dummyUserMachineData.rented.length);
  const _id = userDetails._id;
  const username = userDetails.username;

  useEffect(() => {
    dispatch(add(dummyUserDetails));
    dispatch(gettoken("dummy-token"));
  }, []);

  const handlesubmit = async (e) => {
    const token = localStorage.getItem("token");

    if (!firstname || !lastname || !address || !pincode || !phonenumber) {
      toast.error("Fill all necessary Details");
      return;
    }

    // Validate name format
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      toast.error("Please enter valid first and last names (letters only, 2-30 characters)");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate pincode
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setloading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI.replace(/\/+$/, '')}/api/users/updateUser`,
        {
          token,
          _id,
          firstname,
          lastname,
          address,
          pincode: Number(pincode),
          phonenumber: Number(phonenumber),
          username,
        }
      );
      setloading(false);
      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while updating profile");
      console.log(err);
      setloading(false);
    }
  };

  const handlethrow = () => {
    toast.error("You dont have any owned or rented machines record");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="heading-1 mb-4">
                Your <span className="text-gradient">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-600">
                Manage your profile and equipment all in one place
              </p>
            </motion.div>

            {userDetails?.isUpdate ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Sidebar */}
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <div className="glass-card rounded-2xl p-6 sticky top-24">
                    <h2 className="text-2xl font-semibold mb-6 text-gradient text-center">
                      Navigation
                    </h2>
                    <div className="space-y-2">
                      <button
                        onClick={() => setuserProfile(true)}
                        className={`w-full p-3 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                          userProfile
                            ? "bg-primary-500/10 text-primary-600"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        <UserCircleIcon className="w-6 h-6" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => setuserProfile(false)}
                        className={`w-full p-3 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                          !userProfile
                            ? "bg-primary-500/10 text-primary-600"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        <TruckIcon className="w-6 h-6" />
                        <span>Equipment</span>
                      </button>
                    </div>
                  </div>
                </motion.aside>

                {/* Main Content */}
                <motion.main
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="lg:col-span-4"
                >
                  <div className="glass-card rounded-2xl p-8">
                    {userProfile ? (
                      <div className="space-y-8">
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-semibold">Profile Details</h2>
                          <button
                            onClick={() => navigate("/profile/edit")}
                            className="btn-outline inline-flex items-center"
                          >
                            <CogIcon className="w-5 h-5 mr-2" />
                            Edit Profile
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-6">
                            <div className="glass-card-inner p-4 rounded-xl">
                              <p className="text-sm text-gray-500 mb-1">First Name</p>
                              <p className="text-lg font-medium capitalize">{userDetails.firstname}</p>
                            </div>
                            <div className="glass-card-inner p-4 rounded-xl">
                              <p className="text-sm text-gray-500 mb-1">Last Name</p>
                              <p className="text-lg font-medium capitalize">{userDetails.lastname}</p>
                            </div>
                            <div className="glass-card-inner p-4 rounded-xl">
                              <p className="text-sm text-gray-500 mb-1">Username</p>
                              <p className="text-lg font-medium">{userDetails.username}</p>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div className="glass-card-inner p-4 rounded-xl">
                              <p className="text-sm text-gray-500 mb-1">Address</p>
                              <p className="text-lg font-medium capitalize">{userDetails.address}</p>
                            </div>
                            <div className="glass-card-inner p-4 rounded-xl">
                              <p className="text-sm text-gray-500 mb-1">Pincode</p>
                              <p className="text-lg font-medium">{userDetails.pincode}</p>
                            </div>
                            <div className="glass-card-inner p-4 rounded-xl">
                              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                              <p className="text-lg font-medium">{userDetails.phonenumber}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : usermachinedatalength == 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <TruckIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          No Equipment Found
                        </h3>
                        <p className="text-gray-500 mb-6">
                          You haven't added or rented any equipment yet.
                        </p>
                        <Link to="/addproduct" className="btn-primary inline-flex items-center">
                          <ArrowRightIcon className="w-5 h-5 mr-2" />
                          Add Equipment
                        </Link>
                      </motion.div>
                    ) : (
                      <UserDashboard
                        usermachinedata={usermachinedata}
                        machinedata={allmachines}
                      />
                    )}
                  </div>
                </motion.main>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="glass-card rounded-2xl p-8 text-center">
                  <UserCircleIcon className="w-16 h-16 mx-auto text-primary-500 mb-6" />
                  <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
                  <p className="text-gray-600 mb-8">
                    Please complete your profile to access all features.
                  </p>
                  <form onSubmit={handlesubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstname}
                          onChange={(e) => setfirstname(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastname}
                          onChange={(e) => setlastname(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          rows="3"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setpincode(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter pincode"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={phonenumber}
                          onChange={(e) => setphonenumber(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Complete Profile
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;
