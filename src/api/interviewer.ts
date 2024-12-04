import axios from "axios";

export const callGetInterviewQuestion = async (data: any) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/AIspeak/resumeData",
    data,
  });
  return request;
};
export const callRateAnswer = async (data: any) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/AIspeak/rateAnwser",
    data,
  });
  return request;
};
