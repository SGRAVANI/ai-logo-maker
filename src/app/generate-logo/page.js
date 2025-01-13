"use client"
import { prompt } from '../_Components/_data/prompt'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../_Context/Context'
import { DownloadIcon,LayoutDashboard,LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button.jsx"; 
import HeadingDescription from '../create/_components/HeadingDescription'
import Image from 'next/image'
import Link from 'next/link'

//import { useUser } from '@clerk/nextjs'
function GenerateLogoPage() {
  let cont=useContext(Context)
  const [formData,setFormData]=useState()
  const [loading,setLoading]=useState()
  const [logoImage,setLogoImage]=useState()
  const [f,setF]=useState(false)
  //let user=useUser()
 useEffect(()=>{
if(typeof window!="undefined" && cont.userDetail?.email)
{
let storage=localStorage.getItem('formData')
if(storage)
{
  storage=JSON.parse(storage)
  setFormData(storage)
  //console.log(storage,"from generate logo")
}
}
 },[cont.userDetail])

 useEffect(()=>{
if(formData)
{
  generateAiLogo()
}
 },[formData])
 async function generateAiLogo()
 {
  setLoading(true)
  const PROMPT=prompt.LOGO_PROMPT
  .replace('{logoTitle}',formData?.title)
  .replace('{logoDesc}',formData?.description)
  .replace('{logoColor}',formData?.palette)
  .replace('{logoDesign}',formData?.design?.title)
  .replace('{logoPrompt}',formData?.design?.prompt)
  .replace('{logoIdea}',formData?.idea)
  console.log(PROMPT)
  //generate logo prompt from ai
   let res=await fetch("/api/ai-logo-model",{
    //let res=await fetch("http://localhost:3000/api/ai-logo-model/premium",{  
  method:"POST",
    headers:{
      "Content-Type":"applocation/json"
    },
    body:JSON.stringify({prompt:PROMPT,title:formData?.title,description:formData?.description,email:cont.userDetail?.email})
  })
  let data=await res.json()
  await setLogoImage(data.image)
  //console.log(data)
  setLoading(false)
 setF(true)
  //generate logo image
 }
//  useEffect(()=>{
//   if(logoImage)
//   {
//   //console.log(logoImage)
//   }
//  },[logoImage])
 const handleDownload = () => {
  if (logoImage) {
    const link = document.createElement("a");
    link.href = logoImage; // Ensure this URL is in base64 or a valid image URL
    link.setAttribute("download", "logo.png"); // Filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
  return (
    <div className='my-10'>
      {loading &&<div>
        <h2 className='font-medium text-xl text-gray-500 mt-[-30px]'>Do Not Refresh Page, Your Logo is being created</h2>
        <Image src="/loading.gif" width={200} height={200} alt="loading icon" />
       
      </div>}
        
     
      {f && <div>
        <HeadingDescription title="Your logo is being created" />

        <Image src={logoImage} alt="logo" width={300} height={300} className='rounded-xl' />
       <div className='flex items-center  gap-5 mt-4'>
        <Button onClick={handleDownload}  > <DownloadIcon/> Download</Button>
        <Link href="/dashboard"><Button variant="outline" > <LayoutDashboard/> Dashboard</Button></Link>
       </div></div>}
    </div>
  )
}

export default GenerateLogoPage