import axios from "axios";

export const callResume = async () => {
  const request = axios({
    method: "get", // or 'post', 'put', etc.
    url: "http://127.0.0.1:5000/resume",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request;
};
