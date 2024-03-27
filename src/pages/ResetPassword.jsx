import axios from 'axios';
import {useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { url } from '../api/api.url';
import InfoPassword from '../components/Info.Password';
import {ToastContainer,toast} from 'react-toastify';


const ResetPassword = () => {

    const {userToken} = useParams();

    const navigate = useNavigate();

    const [user,setUser] = useState({});
    const [newPassword,setNewPassword] = useState('');
    const [showConfirmation,setShowConfirmation] = useState(false);

    useEffect(()=>{

      axios.post(`${url}/api/decode`,null,{
        headers:{
          Authorization: `Bearer ${userToken}`
        } 
      })
      .then((res)=>{
        const data = res.data;

        if(data.status === "success" && data.user){
          setUser(data.user);

        } else{

          navigate("/auth/login")

        }

      })

    },[])


    const updatePassword = ()=>{

      const sendedData = {
        id: user.id,
        email: user.email,
        new_password: newPassword,
        type: user.type
      }

      axios.post(`${url}/api/all/reset_password`,sendedData)
      .then((res)=>{

        const data = res.data;

        if(data.status === "success"){
          setShowConfirmation(true);
        }

        else if(data.status === "fail"){

          const errors = data.message;

          for(const error of errors){

            toast.error(error.msg);
          }
        }

        else{

          toast.error('Something wrong happend')

        }
      })
    }


  return (

    <div className="px-[15px]">

      <ToastContainer position='top-left' theme='colored' />

      {
        showConfirmation ?

        <p className="bg-white p-[20px] w-[500px] max-w-full mx-auto mt-[30px] text-center font-semibold">
          You can Close This Page
        </p>

        :
    <div className='bg-white p-[20px] w-[500px] max-w-full mx-auto mt-[30px]'>
      <h3 className='font-semibold text-[18px]'>Reset Your Password</h3>

      <p className='my-[30px]'>For <span className='font-semibold'>{user.email}</span></p>

      <input onChange={(e)=>setNewPassword(e.target.value)} type="password" className='block w-full px-[5px] py-[10px] border-b outline-none mb-[7px]' placeholder='New Password' />
      
      <InfoPassword />

      <button onClick={updatePassword} className='grid place-items-center w-full h-[40px] bg-main text-white mt-[20px]'>Save</button>
    </div>

      }


    </div>
  )
}

export default ResetPassword
