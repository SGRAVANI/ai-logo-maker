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
import { db } from '../../../firebase.config'
import { setDoc,doc } from 'firebase/firestore'
//import { useUser } from '@clerk/nextjs'
function GenerateLogoPage() {
  let cont=useContext(Context)
  const [formData,setFormData]=useState()
  const [loading,setLoading]=useState()
  const [logoImage,setLogoImage]=useState()
  const [f,setF]=useState(false)
  const [logoPrompt,setLogoPrompt]=useState()
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
//   async function query(data) {
//      const response = await fetch(
//          "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
//          {
//              headers: {
//                  Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//                  "Content-Type": "application/json",
//              },
//              method: "POST",
//              body: JSON.stringify(data),
             
//          }
//      );
//      const result = await response.arrayBuffer();
//      console.log("received")
//      //console.log(result)
//      return result;
//  }
async function query(data) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 400000); // 200 seconds

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
        signal: controller.signal, // Attach the AbortController
      }
    );
    clearTimeout(timeout); // Clear the timeout if the request succeeds
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.arrayBuffer();
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("The request timed out.");
    } else {
      console.error("Fetch error:", err);
    }
    throw err;
  }
}

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
 // console.log(PROMPT)
  //generate logo prompt from ai
   let res=await fetch("/api/ai-logo",{
    //let res=await fetch("http://localhost:3000/api/ai-logo-model/premium",{  
  method:"POST",
    headers:{
      "Content-Type":"applocation/json"
    },
    body:JSON.stringify({prompt:PROMPT,title:formData?.title,description:formData?.description,email:cont.userDetail?.email})
  })
  let data=await res.json()
 // console.log("prompt of logo is",data.prompt)
  
      let img=await query(data.prompt)
       //convert to base 64
      const buffer=Buffer.from(img,"binary")
         //console.log(result)
        //generate logo from ai model
      const base64Image=buffer.toString('base64')
       const base64ImageWithMime=`data:image/png;base64,${base64Image}`
//       console.log({image:base64ImageWithMime})
     
    try{
      let email=cont.userDetail?.email
      const docRef = doc(db, "users", email, "logos", Date.now().toString());
      await setDoc(docRef, {
        image: base64ImageWithMime,
        title: formData?.title,
        desc: formData?.description?formData.description:formData?.title,
      });
       setLogoImage(base64ImageWithMime)
        setLoading(false)
        setF(true)

    }
    catch(e)
    {
   console.log(e)
    }
     
 }

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
        <h2 className='font-medium text-xl text-gray-500 mt-[-30px]'>Do Not Refresh Page, Your Logo is being created It will take 2 to 2.30 minutes...</h2>
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