import { IGenerateData } from "@/containers/Resume/store/types";
import axios from "axios";

export const callAlpacaResume = async (data: IGenerateData) => {
  const request = axios({
    method: "post",
    url: "http://localhost:8080/resume",
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
    url: "http://localhost:8080/upload",
    headers: {
      Accept: "multipart/form-data",
    },
    data,
  });
  return request;
};
