/**
 * @file 路由辅助函数
 */
export interface CheckLogin {
    (toPath: string, fromPath: string, next: (to: any) => void): boolean;
}

export interface CheckPermission {
    (toPath: string, fromPath: string, next: (to: any) => void): Promise<boolean>;
}
