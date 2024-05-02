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

const Clients = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [clients, setClients] = useState([]);

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
      const response = await fetch(`${url}/api/admin/accounts/clients`, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      const responseData = await response.json();

      if (responseData.status === "fail") {
        const errors = responseData.message;
        console.log(errors);
        for (const error of errors) {
          toast.error(error.msg);
        }
      } else if (responseData.status === "success") {
        // console.log(responseData)
        
        setClients(responseData.clients);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const deleteClient = (clientId) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`${url}/api/admin/accounts/clients/${clientId}`)
          .then((response) => {
            const data = response.data;
            console.log(data);
            console.log(data.status);

            if (data.status === "success") {
              fetchData();
            } else {
              toast.error("Something wrong happened");
            }
          });
      }
    });
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-left" />
      <div className="sm:flex">
        <div className="hidden md:block">
          <AdminSidebar active={5} />
        </div>

        <div className="flex-1">
          <AdminHeader active={5} />
          <div className="header p-8 bg-white rounded shadow">
            <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Clients 
              </h1>
            </div>
          </div>
          <hr />
          {clients.length === 0 ? (
            <h1 className="p-4">No clients yet ...</h1>
          ) : (
            <div className="">
              <div className="bg-white rounded-lg  overflow-y-auto shadow mt-4">
                <table className="sm:w-full table-auto ">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                        Email
                      </th>
                      <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                        First_Name
                      </th>
                      <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                        Last_Name
                      </th>
                      <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {clients.map((client) => (
                      <tr
                        className="border-b-2 h-16 border-gray-200"
                        key={client.id}
                      >
                        <td className="p-3 text-sm text-gray-700">
                          {client.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {client.first_name}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {client.last_name}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          <button>
                            <AiOutlineCloseCircle
                              onClick={() => deleteClient(client.id)}
                              className="ml-4 size-8 text-red-500"
                            ></AiOutlineCloseCircle>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Clients;
