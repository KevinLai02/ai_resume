// import OpenAI from "openai";
import { IFormData } from "@/containers/Resume/store/types";
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function callResume(props: IFormData) {
  const { talent, profession, category } = props;
  const prompt = `用繁體中文生成一段大約100字有關 [${talent},${profession},${category}] 的繁體中文履歷自我介紹句子`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

// export async function apiHandler<T = any>(
//   params: AxiosRequestConfig,
// ) {
//   try {
//     const apiEndpoint = process.env.API_URL
//     const request = axios.create({
//       baseURL: '',
//       timeout: 60 * 5000,
//     })

//     const res = await request.request<T>({ ...params })

//     return res
//   } catch (error) {
//     const resError = error as AxiosError
//     console.log(resError);

//     }
//   }

//   export const callResume = async() => {
//     const request = axios({
//       method: 'get', // or 'post', 'put', etc.
//       url: 'https://966c-1-172-243-31.ngrok-free.app/resume',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//     })
//     return request
//   }
