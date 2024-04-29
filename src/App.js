import {
  Home,
  Products,
  ProductDetails,
  Shop,
  Checkout,
  WishList,
  UserDashboard,
  UserProfile,
  UserContact,
  UserOrders,
  VendorDashboard,
  VendorProducts,
  VendorProductDeatils,
  VendorAddProduct,
  VendorEditProduct,
  VendorOrders,
  VendorHistory,
  VendorProfile,
  VendorUpdate,
  AdminDashboard,
  Signup,
  Login,
  CheckboxType,
  ResetPassword,
  VendorContact,
  AdminProfile,
  Clients,
  AcceptedVendors,
  PendingVendors,
  AdminUpdate,
  ClientMessages,
  VendorMessages,
} from "./pages";

import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isSigned } from "./store/slices/sign.slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isSigned());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/type" element={<CheckboxType />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<Shop />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="user_dashboard/:username" element={<UserDashboard />} />

        <Route
          path="user_dashboard/:username/profile"
          element={<UserProfile />}
        />

        <Route
          path="user_dashboard/:username/contact"
          element={<UserContact />}
        />

        <Route
          path="user_dashboard/:username/orders"
          element={<UserOrders />}
        />

        <Route
          path="vendor_dashboard/:username"
          element={<VendorDashboard />}
        />
        <Route
          path="vendor_dashboard/:username/products"
          element={<VendorProducts />}
        />

        <Route
          path="vendor_dashboard/:username/products/add"
          element={<VendorAddProduct />}
        />

        <Route
          path="vendor_dashboard/:username/products/:productId/edit"
          element={<VendorEditProduct />}
        />
        <Route
          path="vendor_dashboard/:username/products/:productId"
          element={<VendorProductDeatils></VendorProductDeatils>}
        />

        <Route
          path="vendor_dashboard/:username/orders"
          element={<VendorOrders />}
        />
        <Route
          path="vendor_dashboard/:username/profile"
          element={<VendorProfile />}
        />
        <Route
          path="vendor_dashboard/:username/history"
          element={<VendorHistory />}
        />
        <Route
          path="vendor_dashboard/:username/profile/update"
          element={<VendorUpdate />}
        />
        <Route
          path="vendor_dashboard/:username/contact"
          element={<VendorContact />}
        />

        <Route path="admin_dashboard/:username" element={<AdminDashboard />} />
        <Route
          path="admin_dashboard/:username/pendingvendors"
          element={<PendingVendors />}
        />
        <Route
          path="admin_dashboard/:username/acceptedvednors"
          element={<AcceptedVendors />}
        />
        <Route path="admin_dashboard/:username/clients" element={<Clients />} />
        <Route
          path="admin_dashboard/:username/clientmessages"
          element={<ClientMessages />}
        />
        <Route
          path="admin_dashboard/:username/vendormessages"
          element={<VendorMessages />}
        />
        <Route
          path="admin_dashboard/:username/profile"
          element={<AdminProfile></AdminProfile>}
        ></Route>
        <Route
          path="admin_dashboard/:username/profile/update"
          element={<AdminUpdate></AdminUpdate>}
        ></Route>
        <Route path="reset_password/:userToken" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
