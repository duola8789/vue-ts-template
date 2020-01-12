import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export interface InterceptorHandler<V> {
  onFulfilled?(value: V): V | Promise<V>;
  onRejected?(err: any): any;
}

export interface InterceptorRequestHandler extends InterceptorHandler<AxiosRequestConfig> {}
export interface InterceptorResponseHandler extends InterceptorHandler<AxiosResponse> {}

export interface HintNetError {
  (code: number, response?: AxiosResponse, msg?: string): Promise<AxiosResponse>;
}

// 业务相关响应对象
export interface successResponse {
  code: number;
  data?: any;
}

export interface Get {
  (url: string, params?: object, config?: AxiosRequestConfig): Promise<successResponse>;
}

export interface Post {
  (url: string, data?: object, config?: AxiosRequestConfig): Promise<successResponse>;
}

export interface Put {
  (url: string, data?: object, config?: AxiosRequestConfig): Promise<successResponse>;
}

export interface Del {
  (url: string, data?: object, config?: AxiosRequestConfig): Promise<successResponse>;
}

export type Instance = AxiosInstance;
