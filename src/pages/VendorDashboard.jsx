import SideBar from "../components/vendor.sidebar";
import DashboardSidebar from "../components/Dashboard.Sidebar";
import {Routes,Route} from 'react-router-dom';
import {Home,Contact} from '../pages';

const VendorDashboard = () => {

  return (
    // <SideBar></SideBar>
    <div className="flex">
      <DashboardSidebar />

      {/* <Routes>
        <Route path="/vendor_dashboard/:username/home" element={<Contact />} />
        <Route path="/vendor_dashboard/:username/contact" element={<Home />} />

      </Routes> */}
    </div>
  );
};

export default VendorDashboard;
