import { NextResponse } from "next/server";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import axios from "axios";
import { doc,setDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config.js";

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  async function run(prompt) {
    const AILogoGeneratorPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: " Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with description: Hotel with color combination of let us selecet and include Custom Luxury Logo Designs design idea Elegant Letter 'S' Swirl and Referring to this logo Prompt :Create a set of luxurious, elegant, and professional logos with a gold metallic finish on a dark background. Include a variety of themes, such as animals, letters, symbols, and nature-inspired designs. Each logo should convey sophistication, premium quality, and modern aesthetics, suitable for any brand or industry. Give me result in portal with prompt field only in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a set of luxurious, elegant, and professional logos with a gold metallic finish on a dark background. Include a variety of themes, such as animals, letters, symbols, and nature-inspired designs. Each logo should convey sophistication, premium quality, and modern aesthetics, suitable for any brand or industry. Specifically, include a logo for the brand \\\"Indian Spice\\\" a Hotel, focusing on an elegant letter 'S' swirl design. The color combination should be gold metallic on a dark background. Consider custom luxury logo design ideas for the 'S' swirl, ensuring it embodies sophistication.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
    const result = await AILogoGeneratorPrompt.sendMessage(prompt);
    //console.log(result.response.text());
    return JSON.parse(result.response.text())
  }


  
 

  //run();
 export async function POST(request) {
    try{
    let {prompt,email,title,description}= await request.json()
     if (!prompt || typeof prompt !== "string") {
         return NextResponse.json(
           { error: "Invalid or missing prompt" },
           { status: 400 }
         );
       }
        console.log(email,title,description)
       // Send the prompt to the AI model
       const result = await run(prompt);
 
 
 //      let img=await query(result.prompt)
       //convert to base 64
   //    const buffer=Buffer.from(img,"binary")
         //console.log(result)
        //generate logo from ai model
     // const base64Image=buffer.toString('base64')
       // const base64ImageWithMime=`data:image/png;base64,${base64Image}`
   //     console.log(base64ImageWithMime)
        //save to firebase database
        
       return NextResponse.json({prompt:result.prompt});
      
    }
    catch(e)
    {
        return NextResponse.json({error:e},{status:500});
    }
  }