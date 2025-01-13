"use client"
import React, { useEffect } from 'react'
import HeadingDescription from './HeadingDescription';
import lookup from '@/app/_Components/_data/lookup';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { SignIn, SignInButton } from '@clerk/clerk-react';
import Link from 'next/link';
//    pricngOptions:[
function PricingModel({field,formData,handleChange}) {
    const {user}=useUser()
    console.log(user)
    console.log("inside pricing model")
    useEffect(()=>{
    if(formData?.title && typeof window!='undefined')
    {
        localStorage.setItem('formData',JSON.stringify(formData))
    }
    },[formData])
  return (
    <div>
        <HeadingDescription title={lookup.pricingTitle} decsription={lookup.pricingDescription}/>
        {/* <input placeholder={lookup.inputTitlePlaceHolder} type='text'
        className='p-4 border rounded-lg mt-5 w-full' value={logoTitle}
       onChange={(e)=>{handleChange(field,e.target.value);
        setLogoTitle(e.target.value)} } /> */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
            {lookup.pricngOptions.map((model)=>{ 
                return <div className='flex flex-col items-center justify-start p-5 border rounded-xl' key={`container-${model.title}`}>
                    <Image src={model.icon} width={60} height={60} alt={model.title}  key={`image-${model.title}`}/>
                   <h2 key={`${model.title}`} className='font-medium text-2xl'>{model.title}</h2>
                   <div key={`subcontainer-${model.title}`}>
                     {model.features.map((featureText)=>{return <h1 key={`feature-${featureText}`}
                     className='text-lg mt-3'
                     >{featureText}</h1>})}
                     </div>
                     {user ?
                     <Link key={`link-${model.title}`} href={`/generate-logo?type=${model.title}`}>
                     <Button className="mt-5">{model.button}</Button>
                     </Link>
                     :<SignInButton mode="modal" forceRedirectUrl={`/generate-logo?type=${model.title}`}>
                     <Button className="mt-5">{model.button}</Button>
                        </SignInButton>}
                </div>
            })}
        </div>
    </div>
  )
}

export default PricingModel