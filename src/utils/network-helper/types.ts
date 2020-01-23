import {AxiosRequestConfig, AxiosResponse, AxiosInstance, CustomSuccessData} from 'axios';

// 业务相关响应对象
export interface CustomResponse extends AxiosResponse {
    data: CustomSuccessData<any>;
}

export interface InterceptorHandler<V> {
    onFulfilled?(value: V): V | Promise<V>;
    onRejected?(err: any): any;
}

export interface InterceptorRequestHandler extends InterceptorHandler<AxiosRequestConfig> {}
export interface InterceptorResponseHandler extends InterceptorHandler<CustomResponse> {}

export interface HintNetError {
    (code: number, msg?: string): void;
}

export interface Get {
    <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>>;
}

export interface Post {
    <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>>;
}

export interface Put {
    <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>>;
}

export interface Del {
    <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>>;
}

export type Instance = AxiosInstance;
