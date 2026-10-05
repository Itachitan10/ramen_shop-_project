

import React from 'react'
import { useEffect } from 'react';
import { sileo, Toaster } from "sileo";
function Toggle({identify}){
  
console.log(identify);

  useEffect(()=>{ 
    if(identify === null || identify === undefined || Object.keys(identify).length === 0) return;{ 
      
    }
    if(identify == false){
      sileo.error(identify.title, identify.description, { duration: 5000 });
    } 
    sileo.action({
  title: identify.title,
  description: identify.description,
  button: {
    title: identify.status ? "Login Now" : "Close",
    onClick: () => window.location.href = identify.distanation,
  },
});
  },[identify])

 
  return (
    <div>

    <Toaster position="top-center" />
    </div>
  )
}


export default Toggle ;





