import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Dashboard from "./client_folder/dashboard";
import Login from "./client_folder/login";
import Register from "./client_folder/register";
import MenuPage from "./client_folder/munepage";
import CartDrawer from "./client_folder/component/cartDrawer";
import CheckoutPage from "./client_folder/checkoutpage";
import ProfilePage from "./client_folder/profilepage";
import ForgotPasswordPage from "./client_folder/forget-password";
import Forget_gmail from "./client_folder/forget_gmail";
import ProtectedRoute  from "./client_folder/protectedRoute";
import PaymentSuccess  from './client_folder/component/PaymentSuccess'
import COD from "./client_folder/component/cod";
import ADMINDashboard from './admin_folder/admin_dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* admin ruoutes */}
        <Route path="/admin" element={<ADMINDashboard/>} />










      {/* user routes */}
         <Route path="/" element={<Dashboard/>} />
         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
         <Route element={<ProtectedRoute/>}>
         <Route path="/forgot-gmail" element={<Forget_gmail/>} />
        </Route>
        
       <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/cod" element={<COD />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/profile" element={<ProfilePage/>} />
       <Route path="/proceed" element={<CheckoutPage/>} />
        <Route path="/cart" element={<CartDrawer/>} />
         <Route path="/menu" element={<MenuPage/>} />
         </Route>

        
 

      </Routes>
    </BrowserRouter>
  );
}

export default App;