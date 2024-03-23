import React from 'react'

const ProcessSign = (props) => {
  return (
      
      <div className='flex flex-wrap gap-[15px] p-4 md:gap-[40px] pb-[15px] border-b border-gray-300 mb-3'>

<div className="flex items-center gap-[10px]">
    <span className={`w-[40px] h-[40px] ${props.active1 ? 'bg-main' : 'bg-gray-200'}
     text-white rounded-lg grid place-items-center font-semibold`}>1</span>

    <span className='text-[15px] font-semibold'>Checkbox</span>
</div>

<div className="flex items-center gap-[10px]">
    <span className={`w-[40px] h-[40px] ${props.active2 ? 'bg-main' : 'bg-gray-200'}
     text-white rounded-lg grid place-items-center font-semibold`}>2</span>

    <span className='text-[15px] font-semibold'>Sign Up</span>
</div>

</div>

    
  )
}

export default ProcessSign
