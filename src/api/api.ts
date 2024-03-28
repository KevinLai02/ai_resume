import OpenAI from "openai";
import { IFormData } from "@/containers/Resume/store/types";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true
  });

export const callOpenAIApi = async(details: IFormData) => {
  try {
    const {name, talent, profession, category} = details
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `用以下條件產生一篇100字有關${category}產業的中文正式履歷自傳 '''名字:${name},專長:${talent},曾經職位:${profession}'''` }],
      model: "gpt-3.5-turbo",
      max_tokens: 300
    });    
    return completion.choices[0]
  } catch (error) {
    console.log(error);
  }
    
  }