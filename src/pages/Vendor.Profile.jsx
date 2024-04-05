import React, { useState, useEffect } from "react";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';


const VendorProfile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
   
    const data = jwtDecode(window.localStorage.getItem('user'));

    setUserData(data);
    
  }, []);
  return (
    <div className="flex">
      <DashboardSidebar active={5} />
      <div className="py-20 bg-white px-[20px] flex-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h3>
          <img src={userData.image} className="w-[80px]" />
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                First Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.first_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Last Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.last_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.email}
              </dd>
            </div>
            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Password
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.password}
              </dd>
            </div> */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.phone_number}
              </dd>
            </div>
            <Link to={`/vendor_dashboard/${userData.first_name}_${userData.last_name}/profile/update`}>
              <button
                className="bg-main py-2 px-6 font-semibold text-white"
              >
                Update
              </button>
            </Link>
          </dl>
        </div>
      </div>
    </div>

  );
};

export default VendorProfile;
