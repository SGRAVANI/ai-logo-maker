import { NextResponse } from "next/server";
import { doc,setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase.config.js";


  //run();
 export async function POST(request) {
    try{
    let {base64ImageWithMime,email,title,description}= await request.json()
     
       
   //     console.log(base64ImageWithMime)
        //save to firebase database
       
       
        const docRef = doc(db, "users", email, "logos", Date.now().toString());
await setDoc(docRef, {
  image: base64ImageWithMime,
  title: title,
  desc: description,
});
       return NextResponse.json({msg:"created"},{status:201});
      
    }
    catch(e)
    {
        return NextResponse.json({error:e},{status:500});
    }
  }