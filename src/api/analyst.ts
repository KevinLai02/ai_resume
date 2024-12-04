import axios from "axios";

export const callCompanyAnalyst = async (data: string) => {
  const request = axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/analyze",
    data: { user_input: data },
  });
  return request;
};
