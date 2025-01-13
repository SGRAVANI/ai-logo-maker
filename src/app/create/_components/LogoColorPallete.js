"use client"
import React, { useState } from 'react'
import lookup from '@/app/_Components/_data/lookup'
import HeadingDescription from './HeadingDescription'
import colorPalette from '../../_Components/_data/colors'
function LogoColorPallete({handleChange,field,formData}) {
    let [selectedOption,setSelectedOption]=useState(formData[field]?formData[field]:'')
  return (
    <div className='my-10'>
    <HeadingDescription title={lookup.createPaletteTitle} decsription={lookup.createPaletteDesciption}/>
    {/* <input placeholder={lookup.createLogoDescriptionInputPlaceHolder} type='text'
    className='p-4 border rounded-lg mt-5 w-full' 
   onChange={(e)=>handleChange(field,e.target.value)}    /> */}
   <div className='grid grid-cols-2 gap-5 md:grid-cols-3 mt-5'>
    {colorPalette.map((palette,ind)=>{
    return<div key={palette.name}  className={`p-1 flex cursor-pointer ${selectedOption==palette.name?'border-2 border-primary rounded-md':''}`}>
        {palette.colors.map((color,index)=>{
            return <div key={`${palette}-${color}`} className={` w-full h-24`} style={{backgroundColor:color}} onClick={()=>{
                setSelectedOption(palette.name);
                handleChange(field,palette.name)
            }}></div>
        })}
    </div>
    })}
    </div>
</div>

  )
}

export default LogoColorPallete