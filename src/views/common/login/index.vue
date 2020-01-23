<template>
    <div class="container">
        <div class="inner-container">
            <el-form ref="loginForm" :model="loginInfo" :rules="formRules">
                <el-form-item prop="account">
                    <el-input v-model="loginInfo.account" placeholder="请输入账户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginInfo.password" show-password placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="loginHandler">登陆</el-button>
                    <el-button @click="resetFormHandler">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Ref} from 'vue-property-decorator';
import {Action} from 'vuex-class';
import {ROOT_LOGIN_ACTION} from '@/store/root-store/store-types';
import {ElForm} from 'element-ui/types/form';
import {validateELForm, resetElFrom} from '@/utils';

@Component
export default class Login extends Vue {
    @Ref() readonly loginForm!: ElForm;

    loginInfo = {
        account: '',
        password: ''
    };
    formRules = {
        account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
    };

    @Action(ROOT_LOGIN_ACTION) login!: (payload: {account: string; password: string}) => Promise<boolean>;

    async loginHandler() {
        const isFormValid = await validateELForm(this.loginForm);
        if (isFormValid) {
            const isLoginSuccess = await this.login({...this.loginInfo});
            if (isLoginSuccess) {
                this.$message({
                    type: 'success',
                    message: '登陆成功',
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

<style scoped lang="less">
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner-container {
        width: 400px;
    }
}
</style>
