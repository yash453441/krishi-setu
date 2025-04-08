import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TruckIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { add, gettoken, remove } from "../Redux/Slices/authReducer";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import MachineCard from "../Components/MachineCard";

// Dummy data for machines
const dummyMachines = [
  {
    _id: "1",
    title: "John Deere 5310",
    type: "tractor",
    shortdescription: "Powerful 55 HP tractor with advanced features",
    description: "Perfect for small to medium farms, this tractor offers excellent fuel efficiency and versatility.",
    year: "2023",
    rentamount: 5000,
    image: "machines/tractor1.jpg",
    status: true,
    sellerid: "dummy1"
  },
  {
    _id: "2",
    title: "Mahindra 575 DI",
    type: "tractor",
    shortdescription: "Reliable 47 HP tractor for various applications",
    description: "Ideal for agricultural operations with modern comfort features.",
    year: "2024",
    rentamount: 4500,
    image: "machines/tractor2.jpg",
    status: true,
    sellerid: "dummy2"
  },
  {
    _id: "3",
    title: "New Holland TC5.30",
    type: "harvester",
    shortdescription: "High-capacity grain harvester",
    description: "Advanced harvesting technology with minimal grain loss.",
    year: "2023",
    rentamount: 8000,
    image: "machines/harvester1.jpg",
    status: true,
    sellerid: "dummy3"
  },
  {
    _id: "4",
    title: "Claas Crop Tiger 30",
    type: "harvester",
    shortdescription: "Compact and efficient harvester",
    description: "Perfect for small to medium farms with various crop types.",
    year: "2024",
    rentamount: 7500,
    image: "machines/harvester2.jpg",
    status: true,
    sellerid: "dummy4"
  },
  {
    _id: "5",
    title: "Kubota Cultivator",
    type: "cultivater",
    shortdescription: "Advanced soil preparation implement",
    description: "Efficient cultivation with adjustable working depth.",
    year: "2023",
    rentamount: 3000,
    image: "machines/cultivator1.jpg",
    status: true,
    sellerid: "dummy5"
  },
  {
    _id: "6",
    title: "Sonalika Rotavator",
    type: "cultivater",
    shortdescription: "Heavy-duty rotavator for perfect soil preparation",
    description: "Ideal for intensive cultivation and residue management.",
    year: "2024",
    rentamount: 3500,
    image: "machines/cultivator2.jpg",
    status: true,
    sellerid: "dummy6"
  },
  {
    _id: "7",
    title: "John Deere Seeder",
    type: "seeder",
    shortdescription: "Precision seed drill for multiple crops",
    description: "Advanced seeding technology for optimal plant spacing.",
    year: "2023",
    rentamount: 4000,
    image: "machines/seeder1.jpg",
    status: true,
    sellerid: "dummy7"
  },
  {
    _id: "8",
    title: "Mahindra Seed Drill",
    type: "seeder",
    shortdescription: "Versatile seeder for various crop types",
    description: "Efficient seed placement with depth control.",
    year: "2024",
    rentamount: 3800,
    image: "machines/seeder2.jpg",
    status: true,
    sellerid: "dummy8"
  },
  {
    _id: "9",
    title: "Swaraj 855",
    type: "tractor",
    shortdescription: "Powerful 52 HP tractor with 4WD",
    description: "Excellent performance in tough farming conditions.",
    year: "2023",
    rentamount: 5200,
    image: "machines/tractor3.jpg",
    status: true,
    sellerid: "dummy9"
  },
  {
    _id: "10",
    title: "VST Shakti MT 171",
    type: "tractor",
    shortdescription: "Compact tractor for specialized farming",
    description: "Perfect for orchards and narrow row crops.",
    year: "2024",
    rentamount: 4000,
    image: "machines/tractor4.jpg",
    status: true,
    sellerid: "dummy10"
  }
];

const Machine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [machines, setmachines] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isUpdate, setisupdate] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [yearFilter, setYearFilter] = useState("all");

  const tabs = [
    { label: "Tractor", icon: TruckIcon },
    { label: "Harvester", icon: TruckIcon },
    { label: "Cultivator", icon: TruckIcon },
    { label: "Seeder", icon: TruckIcon },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    const fetchdata = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URI.replace(/\/+$/, '')}/api/users/isAuthenticated`,
          { token }
        );
        const user = response.data.others;
        setisupdate(user.isUpdate);
        
        // Use dummy data instead of API call
        const filteredMachines = dummyMachines.filter(
          (item) => item.sellerid !== user._id
        );
        setmachines(filteredMachines);

        if (!response.data.others) {
          toast.error("Network Error");
          setloading(false);
          navigate("/signin");
        } else {
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

  const filteredMachines = machines ? Object.values(machines).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.shortdescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.rentamount >= priceRange[0] && item.rentamount <= priceRange[1];
    const matchesYear = yearFilter === "all" || item.year === yearFilter;
    return matchesSearch && matchesPrice && matchesYear;
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          {isUpdate ? (
            <div className="container mx-auto px-4 py-12 rounded-3xl bg-white/40 backdrop-blur-sm shadow-lg mt-4 mb-4 border border-white/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-3xl p-8 mb-12 bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl"
              >
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Available Equipment
                </h1>
                <p className="text-xl text-gray-600">
                  Browse and rent from our wide selection of farming equipment
                </p>
              </motion.div>

              {/* Search and Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card rounded-2xl p-6 mb-8"
              >
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search equipment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    >
                      <option value="all">All Years</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                    <button
                      className="btn-outline inline-flex items-center"
                      onClick={() => {
                        setSearchTerm("");
                        setYearFilter("all");
                        setPriceRange([0, 10000]);
                      }}
                    >
                      <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                      Reset Filters
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex space-x-4 mb-8 overflow-x-auto pb-2"
              >
                {tabs.map((tab, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-6 py-3 rounded-xl transition-all duration-200 min-w-[120px] ${
                      activeTab === index
                        ? "text-primary-600 bg-primary-500/10"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <tab.icon className="w-5 h-5 mr-2" />
                      {tab.label}
                    </span>
                    {activeTab === index && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-primary-500/10"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Equipment Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredMachines.map((item, index) => {
                  if (
                    (activeTab === 0 && item.type === "tractor") ||
                    (activeTab === 1 && item.type === "harvester") ||
                    (activeTab === 2 && item.type === "cultivater") ||
                    (activeTab === 3 && item.type === "seeder")
                  ) {
                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <MachineCard item={item} />
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 py-12 text-center"
            >
              <div className="glass-card max-w-2xl mx-auto p-8 rounded-2xl">
                <UserCircleIcon className="w-16 h-16 mx-auto text-primary-500 mb-6" />
                <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
                <p className="text-gray-600 mb-8">
                  Please complete your profile to access equipment listings.
                </p>
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Machine;
