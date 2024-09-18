import { IGenerateData } from "@/containers/Resume/store/types";
import axios from "axios";

export const callAlpacaResume = async (data: IGenerateData) => {
  const request = axios({
    method: "post",
    url: "http://127.0.0.1:5000/resume",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return request;
};
