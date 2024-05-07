import React, { useEffect } from "react";
import { useState } from "react";
import { url } from "../../api/api.url";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import moment from "moment";

import AdminHeader from "../../components/Admin.Header";
import AdminSidebar from "../../components/Admin.Sidebar";

const VendorMessages = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .post(`${url}/api/decode`, null, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      })
      .then((res) => {
        const data = res.data;
        // console.log(data)

        if (data.status === "success") {
          fetchData();
        }
      });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${url}/api/admin/accounts/vendor/messages`,
        {
          headers: {
            Authorization: `Bearer ${cookies.user}`,
          },
        }
      );
      const responseData = await response.json();

      if (responseData.status === "fail") {
        const errors = responseData.message;
        console.log(errors);
        for (const error of errors) {
          toast.error(error.msg);
        }
      } else if (responseData.status === "success") {
        // console.log(responseData)

        setMessages(responseData.messages);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-left" />
      <div className="sm:flex">
        <div className="hidden md:block">
          <AdminSidebar active={7} />
        </div>

        <div className="flex-1">
          <AdminHeader active={7} />
          <div className="header p-8 bg-white rounded shadow">
            <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Vendors_Messages
              </h1>
            </div>
          </div>
          <hr />
          <ul role="list" className="divide-y p-4 divide-gray-300">
            {messages.map((message) => (
              <li
                key={message.id}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex  min-w-0 w-full gap-x-4">
                  <div className="min-w-0 flex-auto ">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {message.email}
                    </p>
                    <p className="mt-1 text-gray-600 truncate text-sm w-auto text-wrap leading-5 mb-4 ">
                      {message.message}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex  sm:flex-col sm:items-end">
                  <p className="text-sm leading-6  text-gray-900">
                    {message.first_name} {message.last_name}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-900">
                    <span className="mr-1">
                      sent
                    </span>
                      <time >
                        {moment(message.date).fromNow()}
                      </time>
                    </p>
                  {/* {message.lastSeen ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Last seen{" "}
                      <time dateTime={message.lastSeenDateTime}>
                        {message.lastSeen}
                      </time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  )} */}
                </div>
              
              </li>
          
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default VendorMessages;
