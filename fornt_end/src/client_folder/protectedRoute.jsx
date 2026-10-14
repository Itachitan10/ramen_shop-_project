import React from 'react'
import { Outlet ,Navigate } from 'react-router-dom'
const params = new URLSearchParams(window.location.search);
const TokenForUrl = params.get("token");
function ProtectedRoute() {
 
    const  token = JSON.parse(localStorage.getItem('token'))
    
    return token || TokenForUrl? <Outlet/> : <Navigate to= "/" />

}

export default ProtectedRoute  