/**
 * @file 导航守卫类型定义
 */
// 路由导航下一步动作
// Next 对应 next()
// Stay 对应 next(false)
// Login 对应 next('/login')
// Root 对应 next('/')
enum NextSteps {
    Next = 'next',
    Stay = 'false',
    Login = 'login'
}

interface GetLoginCheckNextStep {
    (toPath: string, fromPath?: string): NextSteps.Next | NextSteps.Stay | NextSteps.Login;
}

export {NextSteps, GetLoginCheckNextStep};
