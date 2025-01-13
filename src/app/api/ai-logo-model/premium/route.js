const { NextRequest, NextResponse } = require("next/server");

async function getImage(data) {
    const resp = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '3dd9eb87-eb26-4d64-a6d1-2d10a0e6d423'
        },
        body: JSON.stringify({
            text: data,
        })
    });
    
    const result = await resp.json();
    console.log(result);
    return result
}
export async function POST(request) {
    let {prompt}=await request.json()
    try{
    let data =await getImage(prompt)
    return NextResponse.json({image:data})
}
    catch(e)
    {
        return NextRequest.json({error:e})
    }
}