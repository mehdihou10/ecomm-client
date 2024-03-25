import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProcessSign from "../components/Process.Sign";
import { useNavigate } from "react-router-dom";
import { url } from "../api/api.url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: "images/user.png",
    phone_number: null,
  });

  const userType = localStorage.getItem("type");

  useEffect(() => {
    if (!userType || !["client", "vendor"].includes(userType)) {
      navigate("/auth/type");
    }
  }, []);

  const registerUser = (e) => {
    e.preventDefault();

    if (userType === "client") {
      addClient();
    } else {
      addVendor();
    }
  };

  //add client
  const addClient = () => {
    const sendedData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
    };

    axios.post(`${url}/api/users/register`, sendedData).then((res) => {
      const data = res.data;

      if (data.status === "success") {
        navigate("/");
      } else {
        const errors = data.message;
        if (errors.msg === "no such user") {
          toast.error(errors.msg);
        } else {
          for (const error of errors) {
            toast.error(error.msg);
          }
        }

        console.log(data);
        console.log(errors);
      }
    });
  };

  //add vendor
  const addVendor = () => {
    axios
      .post(`${url}/api/vendors/register`, {
        ...userData,
        is_email_verification: true,
      })
      .then((res) => {
        const data = res.data;

        console.log(data);

        if (data.status === "success") {
          navigate("/");
        } else {
          const errors = data.message;

          for (const error of errors) {
            toast.error(error.msg);
          }
          // console.log(errors);
          console.log(data);
        }
      });
  };

  return (
    <>
      <ProcessSign active2={true} />

      <ToastContainer position="top-left" theme="colored" />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
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
                      setUserData({ ...userData, phone_number: e.target.value })
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
  );
};

export default Signup;
