const { NextResponse } = require("next/server")

async function GET(request,content)
{
    let themeTitle=await request.json()
    if(themeTitle=='Cartoon Logo')
    {
     return NextResponse.json({ideas:["Smiling Axe with sunglasses",
"Crazy Zipper with hat",
"Cool Cactus with pun",
"Sneaky Scissors character",
"Chatty Crab with joke"],success:true},{status:200})
    }
    else if(themeTitle=='App Logo')
    {
    return NextResponse.json({success:true,ideas:[
        "3D Letter 'A' grass",
        "3D Puzzle piece sky",
        "Rounded Cube icon cloud",
        "Glossy 'Z' Icon sunshine", 
        "3D Colorful 'X' shape"]},{status:200})
    }
    else if(themeTitle=='Modern Mascot Logos')
        {
            return NextResponse.json({success:true,ideas:[
                "Smiling robot with wrench",
                "Friendly fox with gear",
                "Animated star holding bolt",
                "Happy alien with circuit", 
                "Playful cat with tools"]},{status:200})
            
        }
    else if(themeTitle=='Black And White Line Logos')
    {
        return NextResponse.json({success:true,ideas:[
            "Intertwined 'a', 'x', 'z'",
            "Geometric 'a' with lines",
            "Simple 'axzsc' in circle",
            "Minimalist 'a' and 'z'", 
            "Abstract 'x' shape"]},{status:200})
        
    }
    else if(themeTitle=='Minimalists And Elegants Logos')
    {
        return NextResponse.json({success:true,ideas:[
            "Floral 'a' with lines",
            "3D Puzzle piece sky",
            "Rounded Cube icon cloud",
            "Glossy 'Z' Icon sunshine", 
            "3D Colorful 'X' shape"]},{status:200})
        
    }
    else if(themeTitle=='Vintage Custom Logos')
    {
        return NextResponse.json({success:true,ideas:[
            "3D Letter 'A' grass",
            "3D Puzzle piece sky",
            "Rounded Cube icon cloud",
            "Glossy 'Z' Icon sunshine", 
            "3D Colorful 'X' shape"]},{status:200})
        
    }
    else if(themeTitle=='Modern Sharp Lined Logos')
    {
        return NextResponse.json({success:true,ideas:[
            "3D Letter 'A' grass",
            "3D Puzzle piece sky",
            "Rounded Cube icon cloud",
            "Glossy 'Z' Icon sunshine", 
            "3D Colorful 'X' shape"]},{status:200})
        
    }
else if(themeTitle=='Custom Luxury Logo Designs')
    {
        return NextResponse.json({success:true,ideas:[
            "3D Letter 'A' grass",
            "3D Puzzle piece sky",
            "Rounded Cube icon cloud",
            "Glossy 'Z' Icon sunshine", 
            "3D Colorful 'X' shape"]},{status:200})
        
    }
    else if(themeTitle=='Vintage Logo Designs With Text & Icon')
    {
        return NextResponse.json({success:true,ideas:[
            "3D Letter 'A' grass",
            "3D Puzzle piece sky",
            "Rounded Cube icon cloud",
            "Glossy 'Z' Icon sunshine", 
            "3D Colorful 'X' shape"]},{status:200})
        
    }


}