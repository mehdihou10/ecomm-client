import Profile from "../../components/Profile";
import DashboardHeader from "../../components/Dashboard.Header";
import AdminHeader from "../../components/Admin.Header";

const { default: AdminSidebar } = require("../../components/Admin.Sidebar");

const AdminProfile = () => {
  return (
    <div className="flex">
    <div className="hidden md:block"><AdminSidebar active={2} /></div>

     <div className="flex-1">
       <AdminHeader active={2} />
     <Profile type="admin" />

     </div>
   </div>
  );
};

export default AdminProfile;
