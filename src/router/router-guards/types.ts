/**
 * @file 导航守卫类型定义
 */

// 路由导航下一步动作
export enum NextSteps {
    Next,
    Stay,
    Login,
    Root,
    Forbidden
}

export interface GetLoginCheckNextStep {
    (toPath: string): NextSteps.Next | NextSteps.Stay | NextSteps.Login | NextSteps.Root;
}

export type RoleCheckNextSte = NextSteps.Next | NextSteps.Forbidden | NextSteps.Root | NextSteps.Stay;

export interface GetRoleCheckNextStep {
    (toPath: string, fromPath?: string): Promise<RoleCheckNextSte>;
}
