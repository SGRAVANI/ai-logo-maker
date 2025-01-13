"use client"
import React, { useEffect, useState } from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoDesc from './_components/LogoDesc'
import LogoColorPallete from './_components/LogoColorPallete'
import LogoIdea from './_components/LogoIdea'
import LogoDesigns from './_components/LogoDesigns'
//import PricingModel from './_components/PricingModel'
import { Suspense } from 'react'
function CreateLogo() {
 //   let data=React.use(params)
   // console.log(data)
   
   let [formData,setFomData]=useState({})
   const [step,setStep]=useState(1)
   //console.log(step)
   function handleChange(field,value)
   {
    setFomData((prev)=>{return {...prev,[field]:value}})
    
   }
   useEffect(()=>{
//   console.log(formData)
   },[formData])
  return (
    <div className='mt-28 p-10   border-2 rounded-xl 2xl:mx-30'
    //  style={{
    //   border: "5px solid transparent",
    //   borderRadius: "20px",
    //   borderImage: "linear-gradient(to right, #ec4899, #9333ea, #3b82f6) 1",
    //   padding: "10px",  // Optional: Adjust padding for inner content
    
    // }}
    >
       {step==1&& (
  <Suspense fallback={<div>loading...</div>}>
    <LogoTitle handleChange={handleChange} field="title" formData={formData} />
  </Suspense>
)}
       {step==2 && <LogoDesc handleChange={handleChange} field="description" formData={formData}  /> }
       {step==3 && <LogoColorPallete handleChange={handleChange} field="palette" formData={formData} />}
       {step==4 && <LogoDesigns handleChange={handleChange} field="design" formData={formData}/>}
       {step==5 && <LogoIdea handleChange={handleChange} field='idea' formData={formData}/>}
        {/* {step==6 && <PricingModel handleChange={handleChange} field='pricing' formData={formData}/>}  */}
        <div className='flex items-center justify-between mt-10' >
           {step!=1 &&<Button variant="outline" onClick={()=>{
            setStep(step-1)
           }}><ArrowLeft/> Previous</Button> }
            {step!=5&&<Button onClick={()=>{setStep(step+1)}}><ArrowRight/> Continue</Button>}
        </div>
    </div>
  )
}

export default CreateLogo