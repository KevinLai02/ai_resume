// import OpenAI from "openai";
import { IGenerateData } from "@/containers/Resume/store/types";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function callResume(props: IGenerateData) {
  const { talent, profession, category } = props;
  const prompt = `用繁體中文生成一段350字有關 [${talent},${profession},${category}] 的繁體中文履歷自我介紹句子`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}

export async function callRefactorWorkExperience(
  workExperience: string,
  category: string,
) {
  const prompt = `用繁體中文將以下這段在其他${category}公司的工作經驗以條列式補足300字，不要加任何標題 [${workExperience}]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}

export async function callRefactorTalent(talent: string) {
  const prompt = `以下這段是使用者本身的專業技能，用繁體中文將他的專業技能補足400字，不要引入任何標題 [${talent}]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text.replace("**", "");
}
