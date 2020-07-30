/**
 * @file 导航守卫类型定义
 */
export interface CheckLogin {
    (toPath: string, fromPath: string, next: (to: any) => void): boolean;
}

export interface CheckPermission {
    (toPath: string, fromPath: string, next: (to: any) => void): Promise<boolean>;
}
