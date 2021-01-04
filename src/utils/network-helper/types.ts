import {AxiosRequestConfig, AxiosResponse, AxiosInstance, TypeCustomSuccessData} from 'axios';

// 业务相关响应对象
export interface TypeCustomResponse extends AxiosResponse {
    data: TypeCustomSuccessData<any>;
}

export interface TypeInterceptorHandler<V> {
    onFulfilled?(value: V): V | Promise<V>;
    onRejected?(err: any): any;
}

export interface TypeInterceptorReqHandler extends TypeInterceptorHandler<AxiosRequestConfig> {}
export interface TypeInterceptorResHandler extends TypeInterceptorHandler<TypeCustomResponse> {}

export interface TypeHintNetError {
    (code: number, msg?: string): void;
}

export interface TypeGet {
    <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<TypeCustomSuccessData<T>>;
}

export interface TypePost extends TypeGet {}

export interface TypePut extends TypeGet {}

export interface TypeDel extends TypeGet {}

export interface TypeUpload extends TypeGet {}
