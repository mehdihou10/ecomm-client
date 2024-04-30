import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../../api/api.url';
import {toast,ToastContainer} from 'react-toastify';
import Header from '../../components/Header';

const UserUpdateProfile = () => {

    const navigate = useNavigate();

    const [cookies,setCookie,removeCookie] = useCookies(['user']);

    const [userData,setUserData] = useState({});
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
    
      axios.post(`${url}/api/decode`,null,{
        headers: {
          Authorization: `Bearer ${cookies.user}`
        }
      }).then((res)=>{
  
        const data = res.data;
  
        if(data.status === "success"){
            setUserData(data.user);
            setFirstName(data.user.first_name);
            setLastName(data.user.last_name);
            setSelectedImage(data.user.image);
        }
      })
  
            
          
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`${url}/api/users/update/${userData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: userData.email,
            image: selectedImage,
          }),
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
    
          navigate(
            `/user_dashboard/${userData.first_name}_${userData.last_name}/profile`
          );
        } else {
          toast.error("Something wrong happend");
        }
      };


  return (
    <div>
    <ToastContainer theme='colored' position="top-left" />
    <Header />
      
      
    <div className="flex gap-[20px]">


<div className="flex-1">
  
<div className="py-20 px-[20px] bg-white">
  <div className="space-y-12">
    <div className="border-b border-gray-900/10">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Update Profile
      </h2>

      <div className="relative w-fit">

        <img src={selectedImage} className="w-[100px] h-[100px] object-cover rounded-full" />

      </div>

      <p className="mt-1 text-sm leading-6 text-gray-600">
        This information will be displayed publicly so be careful what you
        share.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            
           
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-main focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            
          </div>
        </div> */}
      </div>
    </div>

    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md  px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

       

       


      </div>
    </div>
  </div>


  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button
      onClick={() =>
        navigate(
          `/user_dashboard/${userData.first_name}_${userData.last_name}/profile`
        )
      }
      type="button"
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      Cancel
    </button>
    <button
      onClick={handleSubmit}
      type="submit"
      className="rounded-md bg-main px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
  </div>
</div>

</div>
</div>



    </div>
  )
}

export default UserUpdateProfile;
