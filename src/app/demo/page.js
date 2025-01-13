"use client"
import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
import React, { useState } from 'react'
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
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
  }
  
//  run();
function Page() {
    let [inp,setInp]=useState()
    function handleSubmit(e)
    {
        e.preventDefault()
        run(inp)

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>{setInp(e.target.value)}} />
        <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Page