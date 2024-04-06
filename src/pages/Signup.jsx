import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProcessSign from "../components/Process.Sign";
import { useNavigate } from "react-router-dom";
import { url } from "../api/api.url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import email_image from "../images/email.png";
import InfoPassword from "../components/Info.Password";
import { useCookies } from "react-cookie";
import {isSigned} from '../store/slices/sign.slice';
import {useDispatch} from 'react-redux';
import {appUrl} from '../api/app.url';


const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cookie,setCookie] = useCookies(["user"]);

  const [showVerificationPage, setShowVerificationPage] = useState(false);
  const [code, setCode] = useState("");

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: `${appUrl}/images/user.png`,
    phone_number: null,
    email_verification: Date.now(),
  });

  const userType = localStorage.getItem("type");

  useEffect(() => {
    if (!userType || !["client", "vendor"].includes(userType)) {
      navigate("/auth/type");
    }
  }, []);

  const verifyUser = (e) => {
    e.preventDefault();

    if (userType === "client") {
      verifyClient();
    } else {
      verifyVendor();
    }
  };

  //verify client
  const verifyClient = () => {
    const sendedData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      email_verification: userData.email_verification,
    };

    apiVerify("users", sendedData);
  };

  //verify vendor
  const verifyVendor = () => {
    apiVerify("vendors", userData);
  };

  const addUser = () => {
    if (+code === +userData.email_verification) {
      const sendedData = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        image: userData.image,
        email_verification: false,
      };

      if (userType === "vendor") {
        apiAdd("vendors", {
          ...sendedData,
          phone_number: userData.phone_number,
        });
      } else if (userType === "client") {
        apiAdd("users", sendedData);
      }
    } else {
      toast.error("incorrect code");
    }
  };

  //api functions
  const apiVerify = (type, dt) => {
    axios.post(`${url}/api/${type}/register`, dt).then((res) => {
      const data = res.data;

      if (data.status === "success") {
        setShowVerificationPage(true);
      } else if (data.status === "fail") {
        const errors = data.message;

        for (const error of errors) {
          toast.error(error.msg);
        }
      } else {
        toast.error("Something wrong happend");
      }
    });
  };

  const apiAdd = (type, dt) => {
    axios.post(`${url}/api/${type}/register`, dt).then((res) => {
      const data = res.data;

      if (data.status === "success") {
        
        if(type === "users"){

          const expirationDate = new Date();
         expirationDate.setMonth(expirationDate.getMonth() + 1);
         setCookie("user", data.token,{expires: expirationDate});

          dispatch(isSigned())
          navigate("/");

        } else if(type === "vendors"){
          navigate('/auth/login')
        }
        
      } else if (data.status === "fail") {
        const errors = data.message;

        for (const error of errors) {
          toast.error(error.msg);
        }
      } else {
        toast.error("Something wrong happend");
      }
    });
  };

  return (
    <>
      <ToastContainer position="top-left" theme="colored" />

      {showVerificationPage ? (
        <div className="px-[15px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full">
          <img src={email_image} className="w-[300px] max-w-full mx-auto" />
          <p className="font-semibold text-[18px] text-center my-[20px]">
            We Have sent a Verification code to Your Email
          </p>
          <input
            onChange={(e) => setCode(e.target.value)}
            type="text"
            placeholder="Enter Your Code"
            className="block w-full border-2 outline-none py-[10px] px-[15px] rounded-[10px]"
          />

          <button
            onClick={addUser}
            className="grid place-items-center w-[150px] h-[40px] bg-main text-white mx-auto mt-[20px]"
          >
            Verify Code
          </button>
        </div>
      ) : (
        <>
          <ProcessSign active2={true} />

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register Your Account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={verifyUser}>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    first name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setUserData({ ...userData, first_name: e.target.value })
                      }
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="first_name"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    last name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setUserData({ ...userData, last_name: e.target.value })
                      }
                      id="last_name"
                      name="last_name"
                      type="text"
                      autoComplete="text"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {localStorage.getItem("type") === "vendor" && (
                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      phone number
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            phone_number: e.target.value,
                          })
                        }
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        autoComplete="phone_number"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:main-600 sm:text-sm sm:leading-6"
                    />

                    <InfoPassword />
                  </div>
                </div>

                {/* <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Upload
                </button>
              </div>
            </div> */}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-main px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-main-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                You have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold leading-6 text-main hover:text-main-500"
                >
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
