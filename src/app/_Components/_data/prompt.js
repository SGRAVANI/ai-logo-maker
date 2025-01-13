const prompt={
    DESIGN_IDEA_PROMPT:"Based on Logo of {logoType} Generate a text prompt to create Logo for Logo title/Brand name : {logoTitle} with description: {logoDesc} and reffering to prompt: {logoPrompt}. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with field ideas and it should be array of strings"
,

LOGO_PROMPT:' Generate a text prompt to create Logo for Logo title/Brand name : {logoTitle} with description: {logoDesc} with color combination of {logoColor} and include {logoDesign} design idea {logoIdea} and Referring to this logo Prompt :{logoPrompt} Give me result in portal with prompt field only in JSON format and  generate prompt for single logo with  width 600px and height 600px'
}
export {prompt}