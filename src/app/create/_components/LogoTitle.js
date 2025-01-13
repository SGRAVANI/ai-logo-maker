"use client"
import React,{useState} from 'react'
import HeadingDescription from './HeadingDescription'
import lookup from '@/app/_Components/_data/lookup'
import { useSearchParams } from 'next/navigation'

function LogoTitle({handleChange,field,formData}) {
    const searchParam=useSearchParams()
    let [logoTitle,setLogoTitle]=useState(searchParam.get('title')?searchParam.get('title'):formData?[field]?formData[field]:'':'')
   // let title=searchParam?.get('title')
   if(!formData?.[field])
   {
    if(searchParam.get('title'))
    {
      formData[field]=searchParam.get('title')
    }
   }
  return (
    <div className='my-10 '>
        <HeadingDescription title={lookup.logoTitle} decsription={lookup.logoDescription}/>
        <input placeholder={lookup.inputTitlePlaceHolder} type='text'
        className='p-4 border rounded-lg mt-5 w-full' value={logoTitle}
       onChange={(e)=>{handleChange(field,e.target.value);
        setLogoTitle(e.target.value)} }  />
    </div>
  )
}

export default LogoTitle