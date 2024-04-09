import React, { useEffect } from "react";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";
import { useState } from "react";
import { url } from "../api/api.url";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from 'sweetalert2';


const VendorProducts = () => {
  const [vednorData, setVendorData] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [products, setProducts] = useState([]);

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
          setVendorData(data.user);

          fetchData(data.user.id);
        }
      });
  }, []);

  const fetchData = async (vendorId) => {
    try {
      const response = await fetch(`${url}/api/products/${vendorId}`);
      const responseData = await response.json();

      if (responseData.status === "fail") {
        const errors = responseData.message;
        for (const error of errors) {
          toast.error(error.msg);
        }
      } else if (responseData.status === "success") {
        // console.log(responseData)

        setProducts(responseData.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

 

  const deleteProduct = (productId)=>{

    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      showCancelButton: true
    }).then((res)=>{

      if(res.isConfirmed){

        axios.delete(`${url}/api/products/${productId}`)
        .then((response)=>{

          const data = response.data;

          if(data.status === "success"){

            fetchData(vednorData.id);

          } else{
            toast.error('Something wrong happened')
          }
        })
      }
    })
    
  }


  return (
    <>
    <ToastContainer theme="colored" position="top-left" />
    <div className="sm:flex">
      <div className="hidden md:block">
        <DashboardSidebar active={2} />
      </div>

      <div className="flex-1">
        <DashboardHeader active={2} />
        <div className="header p-8 bg-white rounded shadow">
          <div className="sm:flex-row gap-5 flex-col flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Your Products
            </h1>
            <Link
              to={`/vendor_dashboard/${vednorData.first_name}_${vednorData.last_name}/products/add`}
              className="bg-main py-2 px-6 font-semibold text-white"
            >
              Add Product
            </Link>
          </div>
        </div>
        <hr />
        {products.length === 0 ? (
          <h1 className="p-4">
            No Products Yet, you want add some products . . .
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
                    Price
                  </th>
                  <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                    Category
                  </th>
                  <th className="p-3 w-32 sm:w-auto text-sm font-semibold tracking-wide text-left">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="">
              {products.map((product) => (
                
                  <tr
                    className="border-b-2 h-16 border-gray-200"
                    key={product.id}
                  >
                    <td className="p-3 text-sm text-gray-700">
                      {" "}
                      <img src={product.image}  className="w-10 h-10 sm:w-16 object-cover"/>{" "}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {product.name}
                    </td>
                    <td className=" p-3 text-sm text-gray-700">
                      {product.price}
                    </td>
                    <td className=" p-3 text-sm text-gray-700">
                      {product.cat_name}
                    </td>
                    <td className=" p-3 text-sm text-gray-700">
                      <button>
                        <RiDeleteBin6Line onClick={()=>deleteProduct(product.id)} className="text-red-500 size-5"></RiDeleteBin6Line>
                      </button>
                      <button>
                      <Link to={`/vendor_dashboard/${vednorData.first_name}_${vednorData.last_name}/products/${product.id}/edit`}>
                        <AiOutlineEdit className="text-main size-5 ml-2"></AiOutlineEdit>
                      </Link>
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

export default VendorProducts;

