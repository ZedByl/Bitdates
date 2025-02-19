import { baseEndpoint } from "@/api/constants.ts";
import { RespError } from "@/models/error.ts";

export const setErrorData = (error: any): RespError => {
  const code = error?.status || error?.code || 500; // Default to 500 if no status
  const data = error?.data || null;
  const url = error?.url || '';
  const message = error?.message || 'Сервис временно недоступен, попробуйте повторить позже';

  return { code, data, message, url };
};

export interface FetchInstance {
    get: <T = any>(url: string, options?: RequestInit) => Promise<T>,
    post: <T = any>(url: string, body?: any, options?: RequestInit) => Promise<T>
    put: <T = any>(url: string, body?: any, options?: RequestInit) => Promise<T>
    patch: <T = any>(url: string, body?: any, options?: RequestInit) => Promise<T>
    delete: <T = any>(url: string, options?: RequestInit) => Promise<T>
    addRequestInterceptor: (interceptor: Interceptor) => void
    addResponseInterceptor: (interceptor: ResponseInterceptor) => void
}

export interface FetchResponse {
    status: number;
    method: string | undefined;
    data: any;
    url: string;
    path: string;
}

type Interceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor = (response: Response, data?: any) => Response | Promise<Response>;

export const fetchWrapper = (commonOptions: any = {}): FetchInstance => {
  commonOptions.credentials = 'include';
  commonOptions["Content-Type"] = 'multipart/form-data';

  const requestInterceptors: Interceptor[] = [];
  const responseInterceptors: ResponseInterceptor[] = [];

  const addRequestInterceptor = (interceptor: Interceptor) => {
    requestInterceptors.push(interceptor);
  };

  const addResponseInterceptor = (interceptor: ResponseInterceptor) => {
    responseInterceptors.push(interceptor);
  };

  const applyRequestInterceptors = async (options: RequestInit) => {
    for (const interceptor of requestInterceptors) {
      try {
         
        options = await interceptor(options);
      } catch (error) {
        return Promise.reject(setErrorData(error));
      }
    }
    return options;
  };

  const applyResponseInterceptors = async (response: Response, data: FetchResponse) => {
    for (const interceptor of responseInterceptors) {
      try {
         
        response = await interceptor(response, data);
      } catch (error) {
        return Promise.reject(setErrorData(error));
      }
    }
    return response;
  };

  const request = async (url: string = baseEndpoint, options: RequestInit) => {
    try {
      options = await applyRequestInterceptors({ ...commonOptions, ...options });

      if (!url.includes('http')) {
        url = baseEndpoint + url;
      }

      const response = await fetch(url, { ...commonOptions, ...options });
      const data = await response.json();
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      const { status } = response;
      const modifiedResponse = await applyResponseInterceptors(response, { data, method: options.method, url, path, status });

      if (!modifiedResponse.ok) {
        await Promise.reject(setErrorData({
          status: modifiedResponse.status,
          data,
          url
        }));
      }

      return data;
    } catch (error) {
      return Promise.reject(setErrorData(error));
    }
  };

  return {
    get: (url: string, options?: RequestInit) => request(url, { method: 'GET', ...options }),
    post: (url: string, body?: any, options?: RequestInit) => request(url, { method: 'POST', body: JSON.stringify(body), ...options }),
    put: (url: string, body: any, options?: RequestInit) => request(url, { method: 'PUT', body: JSON.stringify(body), ...options }),
    patch: (url: string, body: any, options?: RequestInit) => request(url, { method: 'PATCH', body: JSON.stringify(body), ...options }),
    delete: (url: string, options?: RequestInit) => request(url, { method: 'DELETE', ...options }),
    addRequestInterceptor,
    addResponseInterceptor,
  };
};

export const fetchAPI = fetchWrapper();
