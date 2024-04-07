import React, { useEffect } from "react";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";
import { useState } from "react";
import { url } from "../api/api.url";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const VendorProducts = () => {
  const [vednorData, setVendorData] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [products, setProducts] = useState([]);

  const handleDeleteClick = () => {
    console.log("Delete button clicked for product:");
  };

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
          // console.log(data.user.id);
          // console.log(vednorData.id);
        }
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/products/${vednorData.id}`);
        const responseData = await response.json();
        // console.log(responseData);
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
    fetchData();
  }, [vednorData]);
  // const products = [
  //   {
  //     id: 1,
  //     name: "Basic Tee",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$35",
  //     color: "Black",
  //   },
  //   {
  //     id: 2,
  //     name: "Basic Tee",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$35",
  //     color: "Black",
  //   },
  //   {
  //     id: 3,
  //     name: "Basic Tee",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$35",
  //     color: "Black",
  //   },
  //   {
  //     id: 4,
  //     name: "Basic Tee",
  //     href: "#",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$35",
  //     color: "Black",
  //   },
  // ];
  // const [productDetails, setProductDetails] = useState({
  //   name: "",
  //   description: "",
  //   category: "",
  //   image: "",
  //   price: "",
  //   brand: "",
  // });
  // console.log(products)
  return (
    <div className="flex">
      <div className="hidden md:block">
        <DashboardSidebar active={2} />
      </div>

      <div className="flex-1">
        <DashboardHeader active={2} />
        <div className="header p-8 bg-white rounded shadow">
          <div className="font-bold sm:flex-row gap-5 flex-col flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Your Products
            </h1>
            <button
              onClick={() => console.log("ok")}
              className="bg-main py-2 px-6 font-semibold text-white"
            >
              Add Product
            </button>
          </div>
        </div>
        <hr />
        {products.length === 0 ? (
          <h1 className="p-4">
            No Products Yet, you want add some products . . .
          </h1>
        ) : (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className=" card mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        onClick={() => console.log("clicked")}
                        src={product.image}
                        alt="image"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.brand}
                        </p>
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-sm font-medium text-gray-900">
                          {product.price} $
                        </p>
                        <div className="flex gap-1">
                          <button className="text-main">Update</button>
                          <button
                            onClick={ handleDeleteClick}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;
