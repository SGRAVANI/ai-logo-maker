import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription';
import lookup from '@/app/_Components/_data/lookup';

import { prompt } from '@/app/_Components/_data/prompt';
import { Loader2Icon } from 'lucide-react';
import { SignIn, SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import Link from 'next/link';
function LogoIdea({handleChange,field,formData}) {
  const [ideas,setIdeas]=useState()
  const [loading,setIsLoading]=useState(false)
  const [selectedOption,setSelectedOption]=useState(formData?.idea)
  let user=useUser()
  useEffect(()=>{
      if(formData?.title && typeof window!='undefined')
      {
          localStorage.setItem('formData',JSON.stringify(formData))
      }
      },[formData])
 // console.log(user)
  async function generateLogoDesignIdeas()
  {
  setIsLoading(true)
  const PROMPT=prompt.DESIGN_IDEA_PROMPT.replace('{logoType}',formData?.design?.title)
  .replace('{logoTitle}',formData?.title)
  .replace('{logoDesc}',formData?.description)
  .replace('{logoPrompt}',formData?.design.prompt)
  console.log(PROMPT)
  const response=await fetch('http://localhost:3000/api/ai-ideas',{
    method:"POST",
    body:JSON.stringify({prompt:PROMPT}),
    headers:{
      "Content-Type":"application/json"
    }

  })
  let data=await response.json()
 //  console.log(data)
   setIdeas([...data.ideas,'Let AI Select the best idea'])
   
   setIsLoading(false)
  }
  useEffect(()=>{
  if(formData?.title)
  {
  generateLogoDesignIdeas()
  }
  },[formData])

  return (
    <div className='my-10'>
    <HeadingDescription title={lookup.createLogoIdeaTitle} decsription={lookup.createLogoIdeaDescription}/>
    <div className='flex items-center justify-center'>
      {loading && <Loader2Icon className='animate-spin my-10'/>}
      <div className='flex flex-wrap gap-3 mt-6'>
      {ideas?.map((ele)=>{return <h2  onClick={()=>{formData[field]=ele;
        setSelectedOption(ele);
       // console.log(formData)
      }} key={ele } className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${selectedOption==ele?'border-primary':''}`}>{ele}</h2>})}
      </div>
       
    </div>
    {ideas &&<div className=' mt-8 text-center'>

      {user.isSignedIn ?
                     <Link key="link-generate-logo" href="/generate-logo">
                     <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500  text-lg py-4 " >Generate Logo</Button>
                     </Link>
                     :<SignInButton mode="modal" forceRedirectUrl="/generate-logo">
                     <Button  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500  text-lg py-4 " >Generate Logo</Button>
                        </SignInButton>}

    
    </div>}
</div>
  )
}

export default LogoIdea