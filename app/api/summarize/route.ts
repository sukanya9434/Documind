import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { DocumentSummarySchema } from "@/lib/schemas/summaryprocess";
import { SUMMARY_PROMPT } from "@/lib/promptsum/prompt";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
 
 
export async function POST(request:Request){
try{    //fetch from upload
const formData= await request.formData();
const file=formData.get('file');

 //check File type
if (!(file instanceof File)){
    return NextResponse.json({error:"No pdf file provded"},
        {status:400});
}

if (file.type !== "application/pdf") {
  return NextResponse.json(
    { error: "Only PDF files are supported" },
    { status: 400 }
  );
}

if (file.size === 0) {
  return NextResponse.json(
    { error: "The uploaded file is empty" },
    { status: 400 }
  );
}
const MAX_FILE_SIZE = 10 * 1024 * 1024;
if (file.size > MAX_FILE_SIZE) {
  return NextResponse.json(
    { error: "File size must be less than 10 MB" },
    { status: 400 }
  );
}
//for checked file
//do arraybuffer and then buffer
const arrayBuffer=await file.arrayBuffer();
 const base64Data = Buffer.from(arrayBuffer).toString("base64");


//llm integration
  const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64Data,
          },
        },
        {
          text:SUMMARY_PROMPT ,
        },
      ],
      config: {
      responseMimeType: "application/json",
},
    }); 
    
const text = response.text;

if (!text) {
  return NextResponse.json(
    { error: "Gemini returned an empty response" },
    { status: 500 }
  );
}

//turn to object from json string
let parsed;

try {
  parsed = JSON.parse(text);
} catch (error) {
   console.error("Invalid JSON from Gemini:", error); 
  return NextResponse.json(
    { error: "Gemini returned invalid JSON" },
    { status: 502 }
  );
}
const result = DocumentSummarySchema.safeParse(parsed);//passing object to schema 

if (!result.success) {
   console.error("Invalid Gemini structure:", result.error);  
  return NextResponse.json(
    { error: "Gemini returned invalid data" },
    { status: 502 }
  );
}

return NextResponse.json({
    filename: file.name,
    summary:result.data
})
}
catch(error){
    console.error(error)
    return NextResponse.json(
        {error:"File can't be processed"},
        {status:500}
    )
}}