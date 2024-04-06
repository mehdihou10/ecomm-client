import React from 'react'
import DashboardSidebar from '../components/Dashboard.Sidebar';
import DashboardHeader from '../components/Dashboard.Header';

const VendorProducts = () => {
  return (
    <div className='flex'>
        <div className="hidden md:block"><DashboardSidebar active={2} /></div>
        
        <div className="flex-1">
          <DashboardHeader active={2} />
          Products
        </div>
      
    </div>
  )
}

export default VendorProducts;
