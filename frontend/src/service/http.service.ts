import axios from 'axios';
import { baseEndpoint } from "@/api/constants.ts";

export type RespError = {
    code: number,
    message: string,
    data: any,
    url: string,
}

export const setErrorData = (error: any): RespError => {
  const code = error?.response?.status;
  const data = error?.response?.data;
  const url = error?.config?.url || '';
  const message = 'Сервис временно недоступен, попробуйте повторить позже';

  return { code, data, message, url };
};

const httpService = axios.create({
  baseURL: baseEndpoint,
  withCredentials: true,
});

httpService.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

httpService.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(setErrorData(error)),
);

httpService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(setErrorData(error)),
);

export default httpService;

