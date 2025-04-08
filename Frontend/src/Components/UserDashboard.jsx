import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserMachineOwnerCard from "./UserMachineOwnerCard";
import UserMachineRenterCard from "./UserMachineRenterCard";
import { add, gettoken, remove } from "../Redux/Slices/authReducer";
import axios from "axios";

const UserDashboard = ({ usermachinedata, machinedata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [machines, setmachines] = useState("");
  const [loading, setloading] = useState(true);
  const [isUpdate, setisupdate] = useState(true);
  const [filterusermachines, setfilterusermachines] = useState("");
  const [filterrentmachines, setfilterrentmachines] = useState("");
  const ownedmachines = usermachinedata.owned;
  const rentedmachines = usermachinedata.rented;

  const tabs = [
    { label: "Owned Equipment", count: ownedmachines.length },
    { label: "Rented Equipment", count: rentedmachines.length }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setloading(true);
    const fetchdata = async () => {
      try {
        // Only check authentication if we have a token
        if (token) {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URI}/users/isAuthenticated`,
            { token }
          );
          
          if (response.data.others) {
            dispatch(add(response.data.others));
            dispatch(gettoken(token));
          }
        }

        // Get machines data regardless of authentication
        const machines = await axios.post(
          `${process.env.REACT_APP_BACKEND_URI}/machines/getmachines`,
          { token }
        );

        const a = machines.data.machines;
        setmachines(a);
        setloading(false);

        const data = machinedata.filter(
          (item) => item.sellerid === usermachinedata.userid
        );
        const rentusermachines = usermachinedata.rented;
        const rentdata = machinedata.filter((item) => {
          let flag = 0;
          Object.values(rentusermachines).map((item2) => {
            if (item2.machineid == item._id) {
              flag = 1;
              item.status = item2.requeststatus;
            }
          });
          if (flag) return item;
        });

        setfilterusermachines(data);
        setfilterrentmachines(rentdata);
      } catch (err) {
        console.error("Error fetching data:", err);
        setloading(false);
        if (err.response?.status === 401) {
          dispatch(remove());
          navigate("/signin");
        }
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-6 py-3 rounded-xl transition-all duration-200 ${
              activeTab === index
                ? "text-primary-600 bg-primary-500/10"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">{tab.label}</span>
            {tab.count > 0 && (
              <span className={`absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-xs rounded-full ${
                activeTab === index
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {tab.count}
              </span>
            )}
            {activeTab === index && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary-500/10"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="overflow-y-auto max-h-[600px] pr-4 space-y-4"
      >
        {activeTab === 0 ? (
          ownedmachines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Owned Equipment
              </h3>
              <p className="text-gray-500 mb-6">
                Start listing your equipment to earn passive income.
              </p>
              <Link
                to="/addproduct"
                className="btn-primary inline-flex items-center"
              >
                Add Equipment
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {Object.values(filterusermachines).map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <UserMachineOwnerCard
                    item={item}
                    ownedmachines={ownedmachines}
                  />
                </motion.div>
              ))}
            </div>
          )
        ) : (
          rentedmachines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Rented Equipment
              </h3>
              <p className="text-gray-500 mb-6">
                Browse available equipment to start renting.
              </p>
              <Link
                to="/machines"
                className="btn-primary inline-flex items-center"
              >
                Browse Equipment
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {Object.values(filterrentmachines).map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <UserMachineRenterCard item={item} />
                </motion.div>
              ))}
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default UserDashboard;
