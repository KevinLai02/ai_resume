import { IGenerateData } from "@/containers/Resume/store/types";
import axios from "axios";

export const callAlpacaResume = async (data: IGenerateData) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/resume",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return request;
};

export const callUploadResume = async (data: any) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/upload",
    headers: {
      Accept: "multipart/form-data",
    },
    data,
  });
  return request;
};
export const callSignUp = async (data: any) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/signUp",
    data,
  });
  return request;
};
export const callLogin = async (data: any) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/login",
    data,
  });
  return request;
};
