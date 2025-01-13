"use client"
import React, { useEffect, useState } from 'react'
import lookup from './_data/lookup'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { logoData } from './heroLogoData'
import Image from 'next/image'
//import { useState } from 'react'
function Hero() {
    let [logoTitle,setLogoTitle]=useState('')
    let [list,setList]=useState([])
    let [error,setError]=useState(false)
    let router=useRouter()
    useEffect(()=>{
    setList(logoData)
    },[])
  return (
    <div className='flex items-center mt-24 flex-col gap-5'>
        <h1 className='text-primary text-5xl text-center font-bold'>{lookup.HeroHeading}</h1>
         <h4 className='text-5xl text-center font-bold'>{lookup.HeroSubHeading}</h4>
         <p className='text-lg text-gray-500 text-center'>{lookup.HeroDesc}</p>
         <div className='flex gap-6 w-full max-w-2xl mt-10'>
            
           <div className='w-[65%] sm:w-[75%]'>
           <input placeholder={lookup.inputTitlePlaceHolder} className=' p-3 border rounded-md w-full shadow-md   '  onChange={(e)=>{
                setLogoTitle(e.target.value)
            }} value={logoTitle}  />
            
          {error && <p className='text-red-700 text-sm text-left'>Logo Title is required*</p>}
            </div> 
            <div className='w-[35%] sm:w-[25%]'>
            <Button className="w-full p-6" onClick={()=>{
              if(logoTitle)
              {
             router.push(`/create?title=${logoTitle}`)
              }
              else{
                setError(true)
              }

            }}>Get Started</Button>
           </div>
         </div>
        
         <div className='mt-5'>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                     {list.length>0?list.map((logo,i)=>{
                      return    <div key={`logo-${i}`} >
                         <Image src={logo.image} alt='' width={400} height={200} className="w-full rounded-xl hover:scale-105 transition-all cursor-pointer" 
                         />
                         <h2 className='text-center text-lg font-medium mt-2 '>{logo?.title}</h2>
                         <p className='text-center text-sm text-gray-500'>{logo?.desc}</p>
                      </div>
                     }):  [1,2,3,4,5,6].map((item,index)=>
                     <div key={`logo-${index}`} className='bg-slate-200 animate-pulse rounded-xl w-full h-[200px]' ></div>
                     )}
                 </div>
             </div>
    </div>
  )
}

export default Hero