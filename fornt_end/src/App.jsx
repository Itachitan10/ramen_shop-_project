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
function App() {
  return (
    <BrowserRouter>
      <Routes>

        
       

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route element={<ProtectedRoute/>}>
         <Route path="/forgot-gmail" element={<Forget_gmail/>} />
        </Route>

        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute/>}>
         <Route path="/dashboard" element={<Dashboard/>} />
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