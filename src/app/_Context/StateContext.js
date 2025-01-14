"use client"
import { Context } from "./Context";
import React, { useState,useEffect } from 'react'
import { useUser } from "@clerk/nextjs";

function StateContext({children}) {
    let [userDetail,setUserDetail]=useState()
    let {user}=useUser()
     useEffect(()=>{
         if(user)
         {
         checkUserAuth()
         } 
       },[user])
       const checkUserAuth=async ()=>{
         //save user to database
          let body={userName:user?.fullName,
           userEmail:user?.primaryEmailAddress?.emailAddress
         }
         let response = await fetch("/api/users",{method:"POST",
           body:JSON.stringify(body),
           headers:{"Content-Type":"application/json"}
         }) 
         let data=await response.json()
         //console.log(data,"FROM Context")
        setUserDetail(data)
       }
  return (
    <Context.Provider value={{userDetail,setUserDetail}} >
        {children}
    </Context.Provider>
  )
}

export default StateContext