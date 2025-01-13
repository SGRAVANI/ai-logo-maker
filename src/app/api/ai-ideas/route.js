// import { NextResponse } from "next/server"
// import { AILogoPrompt } from "../../../../aimodel"

// export async function POST(request,content) {
//     const {prompt}=await request.json()
//     console.log("from server",prompt)
//     try{
//      //generate Ai Text prompt for logo
//      const aiPromptResult=await AILogoPrompt.sendMessage(prompt)
//      console.log(JSON.parse(await aiPromptResult.response.text()))
//      const AiPrompt=JSON.parse(await aiPromptResult.response.text())
//      return NextResponse.json(AiPrompt)
//      //pass prompt to ai logo image model

//     }
//     catch(e)
//     {

//     }
// }
import { NextResponse } from "next/server";
//import { AILogoDesignPrompt } from "../../../../aimodel";
import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
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

export async function POST(request) {
 try{
  const { prompt } = await request.json();
    console.log(prompt,typeof prompt)
   const AILogoDesignPrompt = model.startChat({
       generationConfig,
       history: [
         {
           role: "user",
           parts: [
             {text: "Based on Logo of Modern Sharp Lined Logos Generate a text prompt to create Logo for Logo title/Brand name : indian spice with description: {hotel} and reffering to prompt: Design a creative and artistic logo with a retro-modern vibe that showcases the brand's identity. Use bold outlines, intricate patterns, and vibrant, contrasting colors to make the design pop. Incorporate thematic elements like food, nature, technology, or lifestyle symbols depending on the brand's niche. The typography should be playful yet clear, complementing the overall composition with a dynamic and balanced layout. Ensure the logo feels unique, versatile, and eye-catching. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with field ideas and it should be array of strings"},
           ],
         },
         {
           role: "model",
           parts: [
             {text: "```json\n{\n  \"ideas\": [\n    \"Spiced Mandala Retro Sun\",\n     \"Geometric Curry Leaf\",\n     \"Bold Pepper Outline Plate\",\n      \"Vibrant Spice Grid\",\n     \"Indian Art Deco Hotel\"\n  ]\n}\n```\n"},
           ],
         },
       ],
     });
   
   



  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing prompt" },
      { status: 400 }
    );
  }

  // Send the prompt to the AI model
  const result = await AILogoDesignPrompt.sendMessage(prompt);

  // Parse the AI response text
  //const result = await chatSession.sendMessage(prompt);

    // Get the raw response from the AI model
    const rawResponse = JSON.parse(result.response.text());
    console.log(rawResponse)
    // Clean and parse the response into JSON
    //const cleanResponse = rawResponse.replace(/```json|```/g, "").trim(); // Remove markdown formatting
    //const jsonResponse = JSON.parse(cleanResponse);

 //   // Send the JSON response back to the client
  return NextResponse.json(rawResponse);
//  return NextResponse.json({ideas:[prompt]})
} catch (error) {
  console.error("Error generating AI logo prompt:", error);

  // Return an error response with status 500
  return NextResponse.json(
    { error: "Failed to generate AI logo prompt" },
    { status: 500 }
  );
}
}

