import React from 'react'
import DashboardSidebar from '../components/Dashboard.Sidebar';
import DashboardHeader from '../components/Dashboard.Header';


const VendorOrders = () => {
  return (
    <div className='flex'>

        <div className="hidden md:block"><DashboardSidebar active={3} /></div>
        
        <div className="flex-1">

          <DashboardHeader active={3} />

          orders
        </div>
      
    </div>
  )
}

export default VendorOrders;
