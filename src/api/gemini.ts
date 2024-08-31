// import OpenAI from "openai";
import { IFormData } from "@/containers/Resume/store/types";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function callResume(props: IFormData) {
  const { talent, profession, category } = props;
  const prompt = `用繁體中文生成一段大約150字有關 [${talent},${profession},${category}] 的繁體中文履歷自我介紹句子`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}

// export async function callRefactorWorkExperience(props: IFormData) {
//   const { talent, profession, category } = props;
//   const prompt = `用繁體中文生成一段大約150字有關 [${talent},${profession},${category}] 的繁體中文履歷自我介紹句子`;

//   const result = await model.generateContent(prompt);
//   const text = result.response.text();
//   return text;
// }
