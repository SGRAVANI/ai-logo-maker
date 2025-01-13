"use client"
import React, { useState } from 'react'
import lookup from '@/app/_Components/_data/lookup'
import HeadingDescription from './HeadingDescription'
// createLogoDescriptionTitle:'Describe Your Logo Vision',
//     createLogoDescriptionText:"Share your ideas, themes, or inspirations to create a logo that perfectly represents your brand or project.",
//     createLogoDescriptionInputPlaceHolder:'Describe Your Logo Vision


function LogoDesc({handleChange,field,formData}) {
  console.log(formData)
  let [logoDesc,setLogoDesc]=useState(formData?.[field]?formData[field]:'')
  return (
    <div className='my-10'>
    <HeadingDescription title={lookup.createLogoDescriptionTitle} decsription={lookup.createLogoDescriptionText}/>
    <input placeholder={lookup.createLogoDescriptionInputPlaceHolder} type='text'
    className='p-4 border rounded-lg mt-5 w-full' 
   onChange={(e)=>{handleChange(field,e.target.value)
    setLogoDesc(e.target.value)

   }} value={logoDesc}   />
</div>
  )
}

export default LogoDesc