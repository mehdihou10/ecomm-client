import axios from "axios";
import { url } from "../api/api.url";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";
import { PaperClipIcon } from '@heroicons/react/20/solid'
const VendorProductDeatils = () => {
  const { productId } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category_id: "",
    vendor_id: "",
    image: "",
  });
  useEffect(() => {
    axios
      .get(`${url}/api/products/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      })
      .then((res) => {
        const data = res.data;

        if (data.status === "success") {
          const product = data.product;

          setProductData({
            name: product.name,
            brand: product.brand,
            price: product.price,
            description: product.description,
            category_id: product.category_id,
            vendor_id: product.vendor_id,
            image: product.image,
          });
        } else {
          toast.error("Something wrong happend");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/api/categories/${productData.category_id}`)
      .then((res) => {
        const data = res.data;
        const category = data.category;
        if (data && productData.category_id) {
          if (data.status === "success") {
            setCategory(category[0].name);
          }
        }
      });
  }, [productData.category_id]);

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
              Product Deatils - {productData.name}
            </h1>
          </div>
        </div>
        <hr />
        <div className=" bg-white p-4 mt-4 rounded-lg shadow-lg">
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Category</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{category}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Brand</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.brand}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Price</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{productData.price} Dz</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {productData.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="image text-sm font-medium leading-6 text-gray-900">Image</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <img src={productData.image} alt="" className="sm:w-96 sm:h-96 w-auto object-cover" />
            </dd>
          </div>
        </dl>
      </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default VendorProductDeatils;
