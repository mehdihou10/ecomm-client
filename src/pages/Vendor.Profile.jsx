import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";
import Profile from "../components/Profile";


const VendorProfile = () => {

  return (
    <div className="flex">
     <div className="hidden md:block"><DashboardSidebar active={5} /></div>

      <div className="flex-1">
        <DashboardHeader active={5} />
      <Profile />

      </div>
    </div>

  );
};

export default VendorProfile;
