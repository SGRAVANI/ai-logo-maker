"use client"
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import { logoDesigns } from '@/app/_Components/_data/logodesign'
import lookup from '@/app/_Components/_data/lookup'
import Image from 'next/image'
function LogoDesigns({handleChange,field,formData}) {
    let [selectedDeign,setSelecetdDesign]=useState(formData[field]?formData[field].title:'')
  return (
    <div className='my-10'>
    <HeadingDescription title={lookup.createLogoDesignTitle} decsription={lookup.createLogoDesignDesciption}/>
     <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
        {
            logoDesigns.map((theme)=>{
                return <div key={theme.title} onClick={()=>{
                    setSelecetdDesign(theme.title)
                    handleChange(field,theme)
                }} className={`p-1 cursor-pointer ${selectedDeign==theme.title?"border-2 border-primary rounded-xl":""}`}>
                    <Image src={theme.image} alt={theme.title} width={300} height={200} className='w-full rounded-xl h-[150px] object-cover' />
                    <h4 className='font-bold text-lg text-center mt-5'>{theme.title}</h4>
                     
                </div>
            })
        }
     </div>
   </div>
  )
}

export default LogoDesigns