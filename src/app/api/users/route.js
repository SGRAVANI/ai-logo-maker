import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../../../firebase.config"
import { NextResponse } from "next/server"

export async function  POST(request,content) {
    const {userEmail,userName}=await request.json()
    try{
    //if user already exists
    const docRef=doc(db,"users",userEmail)
    const docSnap=await getDoc(docRef)
    if(docSnap.exists())
    {
        return NextResponse.json(docSnap.data())
    }
    else{
        const data={
            name:userName,
            email:userEmail,
            credits:10
        }
        await setDoc(doc(db,"users",userEmail),{
            ...data
        })
        return NextResponse.json({data,success:true},{status:201})
    }
    }
    catch(error)
    {

    }
}