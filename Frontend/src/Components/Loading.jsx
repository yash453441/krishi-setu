import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center flex-wrap flex-column ">
    <div className="  absolute bottom-[15%] text-5xl font-bold h-20 grad   bg-gradient-to-tr from-green-500 to-gray-500 bg-clip-text text-transparent" >
    Loading
    </div>
      <div className="middle">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
        <div className="bar bar4"></div>
        <div className="bar bar5"></div>
        <div className="bar bar6"></div>
        <div className="bar bar7"></div>
        <div className="bar bar8"></div>
      </div>
     
    </div>
  );
};

export default Loading;
