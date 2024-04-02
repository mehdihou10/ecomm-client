import {
  Home,
  Products,
  ProductDetails,
  Shop,
  Checkout,
  WishList,
  UserDashboard,
  VendorDashboard,
  AdminDashboard,
  Contact,
  Signup,
  Login,
  CheckboxType,
  ResetPassword,
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
          path="vendor_dashboard/:username"
          element={<VendorDashboard />}
        />       <Route path="admin_dashboard/:username" element={<AdminDashboard />} />

        <Route path="Contact" element={<Contact />} />
        <Route path="reset_password/:userToken" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
