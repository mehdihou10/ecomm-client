import SideBar from "../components/vendor.sidebar";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";


const VendorDashboard = () => {

  return (

<div className="flex">
      <div className="hidden md:block"><DashboardSidebar active={1} /></div>

      <div className="flex-1">
        <DashboardHeader active={1} />

        Dashboard
      </div>

      
    </div>
  );
};

export default VendorDashboard;
