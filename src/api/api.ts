// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

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
