import axios from "axios";

export const callGetInterviewQuestion = async (data: any) => {
  const request = axios({
    method: "post",
    url: "http://localhost:8080/AIspeak/resumeData",
    data,
  });
  return request;
};
export const callRateAnswer = async (data: any) => {
  const request = axios({
    method: "post",
    url: "http://localhost:8080/AIspeak/rateAnwser",
    data,
  });
  return request;
};
