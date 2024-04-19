import DashboardSidebar from "../components/Dashboard.Sidebar";
import DashboardHeader from "../components/Dashboard.Header";
import Contact from '../components/Contact';

const VendorContact = () => {
  return (
    <div className="flex">
      <div className="hidden md:block"><DashboardSidebar active={6} /></div>

      <div className="flex-1">
        <DashboardHeader active={1} />

        <Contact type="vendor" />
      </div>

      
    </div>
  )
}

export default VendorContact;
