"use client"
import React, { useEffect } from 'react'
import Header from './_Components/Header'

import { useUser } from '@clerk/nextjs'
import { useContext } from 'react'
import { Context } from './_Context/Context'
import StateContext from './_Context/StateContext'
function Provider({children}) {
  //save user data
  //let {user}=useUser()
 
  //  let cont=useContext(Context)
  //  console.log(cont,"data from  context")
  //  console.log(user)
  //  //console.log(cont.userDetail)
  // useEffect(()=>{
  //   if(user)
  //   {
  //   checkUserAuth()
  //   } 
  // },[user])
  // const checkUserAuth=async ()=>{
  //   //save user to database
  //    let body={userName:user?.fullName,
  //     userEmail:user?.primaryEmailAddress?.emailAddress
  //   }
  //   let response = await fetch("http://localhost:3000/api/users",{method:"POST",
  //     body:JSON.stringify(body),
  //     headers:{"Content-Type":"application/json"}
  //   }) 
  //   let data=await response.json()
  //   console.log(data,"FROM PROVIDER")
  //  cont.setUserDetail(data)
  // }
  return (
    <div >
        <StateContext>
        <Header/>
        <div  className="px-10 lg:px-32 xl:px-48 2xl:px-56 py-4">
        {children }
        </div>
        </StateContext>
        </div>
  )
}

export default Provider