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

// Start a chat session
export const AILogoPrompt = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        `Generate a text prompt to create a Logo for Logo title/Brand name: Indian Spice with description: Restaurant with color combination of Ocean Blues and include Vintage Logo Designs With Text & Icon design idea and Referring to this logo Prompt: Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses. Give me result in portal with prompt field only in JSON format`,
      ],
    },
    {
      role: "model",
      parts: [
        `{
  "prompt": "Design a vintage-inspired logo for an Indian spice restaurant called \\"Indian Spice\\". Use a hand-drawn, artistic style with intricate details. The color palette should primarily consist of ocean blues, incorporating various shades to create depth. The logo should feature both text and an icon. Think retro aesthetic with bold typography and a design that evokes both the rich tradition of Indian spices and the calming nature of the ocean. Create a few variations showcasing different vintage design styles, for example, one with a detailed icon of a spice or a traditional Indian pattern, and another with a stylized calligraphic font. Consider design elements that would be versatile for use across branding materials. Ensure the feeling is nostalgic and authentic."
}`,
      ],
    },
  ],
});



export const AILogoDesignPrompt = model.startChat({
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



// Send a message in the chat session
// const response = chatSession.sendMessage("INSERT_INPUT_HERE");

// response
//   .then((res) => {
//     console.log(res.text);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
