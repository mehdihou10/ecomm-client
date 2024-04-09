import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../api/api.url";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import email_image from "../images/email.png";
import { IoMdRefresh } from "react-icons/io";
import { useCookies } from "react-cookie";
import {isSigned} from '../store/slices/sign.slice';
import {useDispatch} from 'react-redux';
import {jwtDecode} from 'jwt-decode';


const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailPage, setShowEmailPage] = useState(false);
  const navigate = useNavigate("");

  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/all/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();


    if (json.status === "fail") {
      const errors = json.message;
      for (const error of errors) {
        toast.error(error.msg);
      }
    } else if (json.status === "success") {

      const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    setCookie("user", json.token,{expires: expirationDate,path: "/"});

      dispatch(isSigned())

      axios.post(`${url}/api/decode`,null,{
        headers: {
          Authorization: `Bearer ${json.token}`
        }
      }).then((res)=>{

        const data = res.data;

        if(data.status === "success"){

          const user = data.user;

          if(json.type === "client"){

            navigate("/")
          } else if(json.type === "vendor"){

            navigate(`/vendor_dashboard/${user.first_name}_${user.last_name}`)
           
          }

        }

      })

          
        }
      
  };

  const sendPasswordEmail = () => {
    axios.post(`${url}/api/all/verify_email`, { email }).then((res) => {
      const data = res.data;

      if (data.status === "fail") {
        const errors = data.message;

        for (const error of errors) {
          toast.error(error.msg);
        }
      } else if (data.status === "success") {
        axios.post(`${url}/api/all/send_email`, { email }).then((res) => {
          const data = res.data;

          if (data.status === "success") {
            setShowEmailPage(true);
          } else if (data.status === "fail") {
            toast.error(data.message);
          } else {
            toast.error("Something wrong happend");
          }
        });
      } else {
        toast.error("Something wrong happend");
      }
    });
  };
  return (
    <>
      <ToastContainer position="top-left" theme="colored" />

      {showEmailPage ? (
        <div className="px-[15px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full">
          <img src={email_image} className="w-[300px] max-w-full mx-auto" />
          <p className="font-semibold text-[18px] text-center my-[20px]">
            We Have sent a Link to Reset Your Password
          </p>

          <IoMdRefresh
            onClick={() => {
              setShowEmailPage(false);
              setEmail("");
            }}
            className="text-main text-[30px] mx-auto cursor-pointer"
          />
          <p className="text-center text-[14px]">
            (if you have set new password click here)
          </p>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <span
                      className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer select-none"
                      onClick={sendPasswordEmail}
                    >
                      Forgot password?
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleClick}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-main px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/auth/type"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
