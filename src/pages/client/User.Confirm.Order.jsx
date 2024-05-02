import {useState,useEffect} from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom';
import Header from '../../components/Header';
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { url } from '../../api/api.url';
import { useCookies } from 'react-cookie';
import { toast,ToastContainer } from 'react-toastify';



const UserConfirmOrder = () => {

    const {orderId} = useParams();

    const navigate = useNavigate();
    
    const [cookies,setCookie,removeCookie] = useCookies(['user']);

    const [userData,setUserData] = useState({});
    const [starsArray,setStarsArray] = useState([
      {id: 1, colored: false},
      {id: 2, colored: false},
      {id: 3, colored: false},
      {id: 4, colored: false},
      {id: 5, colored: false}
    ])
    const [stars,setStars] = useState(null);
    const [value,setValue] = useState('');
    const [status,setStatus] = useState('add');

    useEffect(()=>{

      axios.post(`${url}/api/decode`,null,{
        headers: {
          Authorization: `Bearer ${cookies.user}`
        }
      }).then((res)=>{

        const data = res.data;

        if(data.status === "success"){
          setUserData(data.user)
        } else{
          toast.error('Something went Wrong')
        }
      })

    },[])

    useEffect(()=>{

      axios.get(`${url}/api/users/order/${orderId}/feedback`,{
        headers: {
          Authorization: `Bearer ${cookies.user}`
        }
      }).then((res)=>{

        const data = res.data;


        if(data.status === "success"){

          if(data.comment.length !== 0){
            setValue(data.comment[0].value);
            setStars(data.comment[0].rating);
            colorStars(data.comment[0].rating);
            setStatus('update');
          }

        } else{
          toast.error('Something went Wrong');
        }
      })

    },[])

    

    function changeStars(id){

      setStars(id);

      colorStars(id);

    }

    function colorStars(id){

      for(let i = 1; i <= starsArray.length; i++){

        let newArray = [];
        newArray = starsArray;

        if(i <= id){

          newArray[i - 1].colored = true
          
        } else{

          newArray[i - 1].colored = false
          
        }
        setStarsArray(newArray)
      }
    }


    function addFeedback(){

      const body = {
        rating: stars,
        value
      }

      axios[`${status === "add" ? "post" : "patch"}`](`${url}/api/users/order/${orderId}/feedback`,body,{
        headers: {
          Authorization: `Bearer ${cookies.user}`
        }
      }).then((res)=>{

        const status = res.data.status;

        if(status === "success"){
          toast.success('Feedback Published!')
          setTimeout(()=>navigate(`/user_dashboard/${userData.first_name}_${userData.last_name}/orders`),1000);
        } else if(status === "fail"){

          const errors = res.data.message;

          for(let error of errors){
            toast.error(error.msg);

          }

        } else{
          toast.error('Something went Wrong')
        }
      })
    }

  return (
    <div>
      <ToastContainer theme='colored' position='top-left' />
      <Header />
      
      <div className="text-center w-[500px] max-w-full px-[15px] mx-auto mt-[50px] pb-[20px]">

        <p className='font-semibold text-[22px]'>Thank You For Confirming Your Order!</p>

        <h3 className='mt-[20px] mb-[10px] text-gray-500 italic'>Feedback:</h3>

        <div className="stars flex justify-center gap-[3px] mb-[20px]">

        {
          starsArray.map(star=>(
            <FaStar onClick={()=>changeStars(star.id)} key={star.id} className={`cursor-pointer text-[18px]
             ${star.colored ? 'text-yellow-500': 'text-gray-500'}`} />
          ))
        }

        </div>

        <textarea defaultValue={value} onChange={(e)=>setValue(e.target.value)} className='p-2 w-full h-[200px] resize-none border'></textarea>

        <div className="btns flex justify-center flex-wrap items-center gap-[10px] mt-[20px]">

          <button onClick={addFeedback} className='px-[15px] py-[10px] bg-main text-white'>Publish Feedback</button>
          <Link to={`/user_dashboard/${userData.first_name}_${userData.last_name}/orders`} className='text-blue-500 underline'>Skip</Link>
        </div>

      </div>

    </div>
  )
}

export default UserConfirmOrder;
