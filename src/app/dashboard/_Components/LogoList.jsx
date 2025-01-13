"use client"
import React, { useEffect, useState } from 'react'
import { Context } from '@/app/_Context/Context'
import { useContext } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../../../firebase.config'
import Image from 'next/image'
function LogoList() {
    let cont=useContext(Context)
    let [list,setList]=useState([])
    const getUserLogo=async ()=>{
        setList([])
   let quesrySnapshot=await getDocs(collection(db,"users",cont.userDetail?.email,"logos"))
   quesrySnapshot.forEach((doc)=>{//console.log(doc.data())
   setList((prev)=>{return [...prev,doc.data()]})    
})
    }
    useEffect(()=>{
        if(cont.userDetail)
        {
    getUserLogo()
        }
    },[cont.userDetail])
    const viewLogo=(image)=>{
    const imageWindow=window.open()
    imageWindow.document.write(`<img src="${image}" alt="base64image" />`)
    }
  return (
    <div className='mt-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {list.length>0?list.map((logo,i)=>{
             return    <div key={`logo-dashboard-${i}`} onClick={()=>{viewLogo(logo?.image)}}>
                <Image src={logo.image} alt='' width={400} height={200} className="w-full rounded-xl hover:scale-105 transition-all cursor-pointer" 
                />
                <h2 className='text-center text-lg font-medium mt-2 '>{logo?.title}</h2>
                <p className='text-center text-sm text-gray-500'>{logo?.desc}</p>
             </div>
            }):  [1,2,3,4,5,6].map((item,index)=>
            <div key={`logo-dashboard-${index}`} className='bg-slate-200 animate-pulse rounded-xl w-full h-[200px]' ></div>
            )}
        </div>
    </div>
  )
}

export default LogoList