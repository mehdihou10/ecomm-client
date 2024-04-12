import React, { useState, useEffect } from "react";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";
import { Link } from "react-router-dom";
import { url } from "../api/api.url";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/products/orders/show`);
        const json = await response.json();
        if (json.status === "fail") {
          const errors = json.message;
          for (const error of errors) {
            toast.error(error.msg);
          }
        }
        setOrders(json.data);
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetchData();
  }, [orders]);

  const handelDelete = async (id, userId) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        try {
          fetch(`${url}/api/products/orders/show/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          })
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="sm:flex">
      <div className="hidden md:block">
        <DashboardSidebar active={3} />
      </div>

      <div className="flex-1">
        <DashboardHeader active={3} />
        <div className="header p-8 bg-white rounded shadow">
          <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Your Orders
            </h1>
          </div>
        </div>
        <hr />
        {orders.length === 0 ? (
          <h1 className="p-4">
            No Orders Yet...
          </h1>
        ) : (
          <div className="">
            <div className="bg-white rounded-lg  overflow-y-auto shadow mt-4">
              <table className="sm:w-full table-auto ">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Product
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Name
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Username
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Qte
                    </th>
                    <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {orders.map((order) => (
                    <tr
                      className="border-b-2 h-16 border-gray-200"
                      key={order.id}
                    >
                      <td className="p-3 text-sm text-gray-700">
                        {" "}
                        <img
                          src={order.image}
                          className="w-10 h-10 sm:w-16 object-cover"
                        />{" "}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {order.name}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {order.first_name} {order.last_name}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        {order.qte}
                      </td>
                      <td className=" p-3 text-sm text-gray-700">
                        <button>
                          <AiOutlineCheckCircle className="size-8 text-green-500"></AiOutlineCheckCircle>
                        </button>
                        <button>
                          <AiOutlineCloseCircle
                            onClick={() =>
                              handelDelete(order.product_id, order.user_id)
                            }
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
  );
};

export default VendorOrders;
