import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../api/api.url";
import { useCookies } from "react-cookie";
import moment from "moment";

const Contact = ({ type }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const response = await fetch(`${url}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.user}`,
      },

      body: JSON.stringify({ message, date }),
    });
    const json = await response.json();


    if (json.status === "fail") {
      const errors = json.message;
      for (const error of errors) {
        toast.error(error.msg);
      }
    } else if(json.status === "success") {
      setMessage("");
      toast.success("Message sent successfully");
    }
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${url}/api/contact/messages`, {
  //       headers: {
  //         Authorization: `Bearer ${cookies.user}`,
  //       },
  //     });
  //     const json = await response.json();
      
  //     if (json.status === "fail") {
  //       const errors = json.message;
  //       for (const error of errors) {
  //         toast.error(error.msg);
  //       }
  //     } else {
  //       setSentMessages(json.messages);
  //     }
  //   } catch (error) {
  //     console.error("error:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <ToastContainer theme="colored" position="top-left" />
      <div className=" h-full">
        <div className="header p-8 bg-white rounded shadow">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Contact Support
          </h1>

          <span className="text-main text-[13px]"> admins will reply in 24 hours</span>
        </div>
        <form className="w-[600px] max-w-full mx-auto">
          <div className="sm:col-span-2 mr-2 ml-2 pt-6">
            <label htmlFor="message" className="block text-center text-lg font-semibold mb-2">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                required
                value={message}
                name="message"
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="block w-full resize-none h-[250px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                onClick={handleSubmit}
                className="block mx-auto rounded-md bg-main px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Message
              </button>
            </div>
            {/* <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Messages Sent:</h2>
              <p>{sentMessages.length} messages</p>
              <div>
                {sentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="pt-4 
                     rounded-lg mb-2"
                  >
                    <div className="flex items-center text-black pt-2 rounded-lg">
                      <p className="flex-grow ">{message.message}</p>
                      <p className="text-sm">
                        {moment(message.date).fromNow()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
