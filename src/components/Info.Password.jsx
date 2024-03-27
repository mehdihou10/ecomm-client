import { GoInfo } from "react-icons/go";


const InfoPassword = () => {
  return (
    <div className="info">
     <p className="flex items-center gap-[5px] text-[14px] mt-[5px] mb-[7px]"><GoInfo /> Set up a Strong Password With Atleast:</p>

     <ul className="text-[12px] font-semibold">
      <li>. 8 caracteres</li>
      <li>. 1 Special Char (#,~*)</li>
      <li>. 1 Number</li>
      <li>. 1 Uppercase Letter</li>
     </ul>
                
    </div>
  )
}

export default InfoPassword;
