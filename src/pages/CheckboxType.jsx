import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { LuHeading1 } from "react-icons/lu";
import ProcessSign from "../components/Process.Sign";
import Footer from "../components/Footer";

const CheckboxType = () => {
  const [type, setType] = useState("");

  const changeType = (type) => {
    setType(type);
  };

  return (
    <>
      <ProcessSign active1={true} />

      <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8 relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Choose what you want to be
          </h2>
        </div>
        <div className="mt-10 flex justify-center flex-wrap gap-10">
          {type === "client" ? (
            <div
              onClick={() => changeType("client")}
              className="container w-64 h-64 flex flex-col flex-grow items-center hover:cursor-pointer  py-2 rounded-xl hover:shadow-lg bg-main"
            >
              <p className="font-semibold text-white text-xl ">Client</p>
              <FaCartPlus className="text-9xl text-white mt-8"></FaCartPlus>
            </div>
          ) : (
            <div
              onClick={() => changeType("client")}
              className="container w-64 h-64 flex flex-col flex-grow items-center hover:cursor-pointer   py-2 rounded-xl hover:shadow-lg bg-white"
            >
              <p className="font-semibold text-xl">Client</p>
              <FaCartPlus className="text-9xl text-main mt-8"></FaCartPlus>
            </div>
          )}

          {type === "vendor" ? (
            <div
              onClick={() => changeType("vendor")}
              className="container w-64 h-64 rounded-xl flex flex-grow hover:cursor-pointer  items-center flex-col py-2  hover:shadow-lg bg-main"
            >
              <p className="font-semibold text-xl text-white">Vendor</p>
              <Link to="/auth/signup">
                <FaStore className="text-9xl text-white mt-8"></FaStore>
              </Link>
            </div>
          ) : (
            <div
              onClick={() => changeType("vendor")}
              className="container w-64 h-64 rounded-xl flex hover:cursor-pointer  flex-grow items-center flex-col py-2  hover:shadow-lg bg-white"
            >
              <p className="font-semibold text-lg">Vendor</p>
              <FaStore className="text-9xl text-main mt-8"></FaStore>
            </div>
          )}
        </div>

        <div className="mt-4 absolute bottom-2 right-10 ">
          {type === "client" || type === "vendor" ? (
            <Link to="/auth/signup">
              <button onClick={()=> localStorage.setItem("type",type)} className="bg-main py-2 px-6 font-semibold text-white">
                Next
              </button>
            </Link>
          ) : (
            <button className="bg-indigo-400 py-2 px-6 cursor-default font-semibold text-white">
              Next
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckboxType;
