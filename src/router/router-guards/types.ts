/**
 * @file 导航守卫类型定义
 */

// 路由导航下一步动作
// Next 对应 next()
// Stay 对应 next(false)
// Login 对应 next('/login')
// Root 对应 next('/')
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

export interface GetRoleCheckNextStep {
    (toPath: string, fromPath?: string): NextSteps.Next | NextSteps.Forbidden;
}
