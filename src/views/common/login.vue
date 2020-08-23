<template>
    <div class="login-container">
        <div class="inner-container">
            <h1 class="login-title">Vue + TypeScript</h1>
            <el-form ref="loginForm" :model="loginInfo" :rules="formRules">
                <el-form-item prop="account">
                    <el-input v-model="loginInfo.account" placeholder="请输入账户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginInfo.password" show-password placeholder="请输入密码" />
                </el-form-item>
            </el-form>
            <div class="login-button-container">
                <el-button class="form-button" type="primary" @click="loginHandler">登录</el-button>
                <el-button class="form-button" @click="resetFormHandler">重置</el-button>
            </div>
        </div>
        <div class="login-background">
            <picture>
                <source srcset="~@/assets/images/login/login-background.webp" type="image/webp" />
                <img class="login-background-img" srcset="~@/assets/images/login/login-background.png" alt="" />
            </picture>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Ref} from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {USER_ROLE_ACTION, LOGIN_ACTION} from '@/store/root-store/store-types';
import {ElForm} from 'element-ui/types/form';
import {validateELForm, resetElFrom} from '@/utils';

@Component
export default class Login extends Vue {
    @State username!: string;

    @Action(USER_ROLE_ACTION) getUserRole!: (username: string) => Promise<string>;
    @Action(LOGIN_ACTION) login!: (payload: {account: string; password: string}) => Promise<boolean>;

    @Ref() readonly loginForm!: ElForm;

    loginInfo = {
        account: '',
        password: ''
    };

    formRules = {
        account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
    };

    async loginHandler() {
        const isFormValid = await validateELForm(this.loginForm);
        if (isFormValid) {
            const isLoginSuccess = await this.login({...this.loginInfo});
            if (isLoginSuccess) {
                await this.getUserRole(this.username);
                this.$message({
                    type: 'success',
                    message: '登录成功',
                    duration: 1000,
                    onClose: () => {
                        this.$router.push('/');
                    }
                });
            }
        }
    }

    async resetFormHandler() {
        resetElFrom(this.loginForm);
    }
}
</script>

<style scoped lang="scss">
.login-container {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner-container {
        width: 400px;
        z-index: 2;

        .login-title {
            text-align: center;
            color: #fff;
            font-size: 32px;
            margin-bottom: 20px;
        }

        .login-button-container {
            display: flex;

            .form-button {
                flex: 1;
            }
        }
    }

    .login-background {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: hidden;

        .login-background-img {
            width: 100%;
            height: auto;
        }
    }
}
</style>
