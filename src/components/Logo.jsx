import React from 'react'

const Logo = ({size}) => {
  return (
    <div className={`${size ? `text-[${size}]` : 'text-[20px] sm:text-[25px]'}  font-bold`}>
      <span>Tech</span><span className='text-main font-rubik'>Empire</span>
    </div>
  )
}

export default Logo
