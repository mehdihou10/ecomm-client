import React from 'react'
import DashboardSidebar from '../components/Dashboard.Sidebar';
import DashboardHeader from '../components/Dashboard.Header';


const VendorHistory = () => {
  return (
    <div className='flex'>

        <div className="hidden md:block"><DashboardSidebar active={4} /></div>
        
        <div className="flex-1">
          <DashboardHeader active={4} />
        </div>
      
    </div>
  )
}

export default VendorHistory;
