import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN_KEY } from '../constants';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axiosInstance.defaults.withCredentials = true;

export async function apiRequest<
  T = any,
  ReturnType = AxiosResponse<T>,
  RequestData = any,
>(config: AxiosRequestConfig<RequestData>): Promise<ReturnType> {
  try {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        withCredentials: true,
        ...config.headers,
      };
    }
    const response = await axiosInstance.request<T, ReturnType, RequestData>(
      config,
    );
    return response;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
}

export async function apiGet<R = AxiosResponse>(url: string): Promise<R> {
  return await apiRequest({ method: 'GET', url });
}

export async function apiPost<R = AxiosResponse>(
  url: string,
  data: any,
): Promise<R> {
  return await apiRequest({ method: 'POST', url, data });
}

export async function apiPut<R = AxiosResponse>(
  url: string,
  data: any,
): Promise<R> {
  return await apiRequest({ method: 'PUT', url, data });
}
