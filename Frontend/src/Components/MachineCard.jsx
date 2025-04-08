import React, { useState } from "react";
import mower from "../Images/mower.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useNavigate, Link } from "react-router-dom";

const MachineCard = (props) => {
  const navigate = useNavigate();
  const [isopen, setisopen] = useState(false);
  const [bidamount, setbidamount] = useState(props.item.rentamount);
  const [tenure, settenure] = useState("");
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleToggle = () => {
    setisopen(!isopen);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    // console.log(props.item._id,props.item.title,props.item.rentamount,props.item.status,tenure+"years",bidamount,user._id,user.firstname+" "+user.lastname);
    const token = localStorage.getItem("token");
    const data = {
      machineid: props.item._id,
      status: props.item.status,
      userid: user._id,
      username: user.firstname + " " + user.lastname,
      machinename: props.item.title,
      bidamount: bidamount,
      tenure: tenure + " " + "year",
      rentamount: props.item.rentamount,
      token: token,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI.replace(/\/+$/, '')}/api/requests/rentrequest`,
        data
      );
      if (!response) {
        setloading(false);
        setmodal(false);
        toast.error("Something Went Wrong");

        navigate("/");
      } else {
        setloading(false);
        setmodal(false);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setloading(false);
      setmodal(false);
      navigate("/");

      toast.error("Internal Server Error, Try Again");
    }
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"></div>

          {/* Modal panel */}
          <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
              <div className="bg-white p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Confirm Rental Request
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Please review your rental request details:
                      </p>
                      <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-medium text-gray-500">Machine</span>
                          <span className="text-sm font-semibold text-gray-900">{props.item.title}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-medium text-gray-500">Bid Amount</span>
                          <span className="text-sm font-semibold text-gray-900">₹{bidamount}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <span className="text-sm font-medium text-gray-500">Duration</span>
                          <span className="text-sm font-semibold text-gray-900">{tenure} year(s)</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-base font-medium text-gray-900">Total Amount</span>
                          <span className="text-lg font-bold text-green-600">₹{bidamount * tenure}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={handlesubmit}
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg px-8 py-3 bg-green-600 text-white text-base font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Request'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setmodal(false)}
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg px-8 py-3 bg-white text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" bg-gray-300 border-gray-900 border-1 min-h-[25vh] w-[28vw] flex-wrap shadow-md rounded-lg m-3 flex justify-between items-center max-xl:w-[30vw] max-lg:w-[50vw] max-md:w-[70vw] max-sm:w-[90vw] max-sm:min-h-[20vh]">
        <img
          src={`${process.env.REACT_APP_BACKEND_URI}/${props.item.image}`}
          className=" h-[25vh] max-w-1/2 rounded-l-md rounded-r-[50%] shadow-2xl max-sm:h-[20vh] max-sm:w-[45%]"
        />

        <div className="w-1/2 max-sm:w-1/2 ">
          <h1 className="text-xl font-bold my-1 py-2 max-sm:text-sm capitalize">
            {props.item.title}
          </h1>
          <div className="flex justify-between ">
            <h1 className="bg-gray-600 w-1/2 text-center capitalize rounded-xl py-1 text-sm text-white font-semibold max-sm:text-[10px]">
              {props.item.type}
            </h1>
            <h1
              className={
                props.item.status
                  ? "w-1/3 bg-gray-200 text-center rounded-xl text-green-600 text-sm py-1 mx-2 font-bold"
                  : "w-1/3 bg-gray-200 text-center rounded-xl text-red-600 mx-2 text-sm py-1 font-bold "
              }
            >
              {props.item.status ? "Active" : "Closed"}
            </h1>
          </div>
          <p className="text-gray-600  pr-2 py-1 capitalize  truncate h-8">
            {props.item.shortdescription}{" "}
          </p>
          <div className="flex justify-between items-center  w-full">
            <h1 className="w-1/2 text-left font-extrabold text-sm">
              RS. {props.item.rentamount}
            </h1>
            <div className="w-1/2">
              <button
                onClick={handleToggle}
                className="px-3 bg-green-500 py-1 rounded-lg shadow-md text-white font-bold hover:cursor-pointer hover:bg-green-600 max-sm:px-2"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      {isopen ? (
        <>
          <div className="w-[100vw] h-[100vh] absolute top-0 left-0 backdrop-blur-sm shadow-2xl  transition-all flex justify-center items-center  ">
            <div className="w-[40vw] h-[85vh] mt-10  bg-white shadow-md rounded-lg border border-gray-300 bg-opacity-100 transition-all ease-in-out ">
              <div className="flex justify-evenly items-start ">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URI}/${props.item.image}`}
                  className="h-[50vh] w-[50vh] rounded-tl-lg rounded-br-[50%]"
                />
                <div className="w-1/2 px-4 pt-4">
                  <h1 className="text-center text-3xl font-bold py-4 h-24 capitalize">
                    {props.item.title}
                  </h1>
                  <h1 className="text-center text-2xl font-bold py-2 capitalize text-white rounded-[50px] bg-stone-700">
                    {props.item.type}
                  </h1>
                  <h1 className="text-xl text-center py-3  font-semibold ">
                    Short Description
                  </h1>
                  <p className="h-[15vh]  py-1 text-center  text-gray-500 px-2">
                    {props.item.shortdescription}
                  </p>
                  <div className="flex justify-center items-center">
                    <p className="bg-green-200 p-2 text-center rounded-[40px] mx-2 w-1/2 text-md font-bold text-green-800">
                      {" "}
                      Year : {props.item.year}
                    </p>
                    <p
                      className={
                        props.item.status
                          ? "bg-green-800 w-1/3 p-2 text-center rounded-[40px] mx-2 text-md font-bold text-white"
                          : "bg-red-600 w-1/3 p-2 text-center rounded-[40px] mx-2 text-md font-bold text-white"
                      }
                    >
                      {props.item.status ? "Active" : "Closed"}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 my-3 w-full h-[16vh] p-3 px-4 ">
                <p className="text-sm  ">
                  <span className="text-lg font-bold">Description : </span>
                  {props.item.description}
                </p>
              </div>
              <div className="flex justify-around items-center h-[10vh] pt-3">
                <form
                  className="flex justify-around items-center w-full"
                  onSubmit={() => {
                    setmodal(true);
                    setisopen(false);
                  }}
                >
                  <div className="h-[6vh]  text-lg p-2 text-center rounded-lg bg-green-700 w-50 text-white font-bold">
                    RS.{props.item.rentamount} / Year
                  </div>
                  <div className="w-[8vw]">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="amount"
                    >
                      Bid Amount
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="amount"
                      required
                      type="number"
                      name="amount"
                      value={bidamount}
                      onChange={(e) => setbidamount(e.target.value)}
                      min="5000"
                      placeholder="(Mention the amount acc. to per year)"
                    />
                  </div>
                  <div className="w-[8vw]">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="amount"
                    >
                      Tenure (in Years)
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="amount"
                      required
                      max="5"
                      type="number"
                      name="amount"
                      value={tenure}
                      onChange={(e) => settenure(e.target.value)}
                      min="1"
                      placeholder="Years"
                    />
                  </div>
                  <div className="  flex flex-col mx-2">
                    {props.item.status ? (
                      <button
                        className="w-20 bg-green-600 my-2 py-2 rounded-lg text-white shadow-md hover:bg-green-700 hover:cursor-pointer"
                        type="submit"
                      >
                        Request
                      </button>
                    ) : (
                      <button
                        className="w-20 bg-red-600 my-2 py-2  rounded-lg text-[12px] text-white shadow-md "
                        disabled
                      >
                        Not Available
                      </button>
                    )}
                    <button
                      className="w-20 bg-white border border-gray-300 hover:bg-gray-100 shadow-md  my-0 py-2 rounded-lg"
                      onClick={() => setisopen(!isopen)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default MachineCard;
