"use client"
import React from 'react'
import { Context } from '@/app/_Context/Context'
import { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
function Info() {
    let cont=useContext(Context)
    let router=useRouter()
  return (
    <>
    <div className='flex justify-between'>
    <h2 className='font-bold text-3xl text-primary'>Hello, {cont.userDetail?.name}</h2>
    
   

    </div>
    <div className='flex justify-between items-center'>
    <h2 className='font-bold text-2xl mt-6'>Dashboard</h2>
    <Button  onClick={()=>{
        router.push("/create")
    }}>+ Create New Logo</Button>
    </div>
    </>
  )
}

export default Info