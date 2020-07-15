<template>
    <div :id="id"></div>
</template>

<script lang="ts">
import {Component, Vue, Emit, Prop} from 'vue-property-decorator';

@Component
export default class RoboPassportLogin extends Vue {
    @Prop({type: Boolean, default: false}) showLoading!: boolean;

    loading: any = null;

    submitBtn: null | HTMLElement = null;

    @Emit('login-success-cb')
    loginSuccess() {}

    id = 'passportContainer';

    passportPreLogin() {
        passport.use('login', {tangram: true, loginVersion: 'v4', defaultCss: true}, (magic) => {
            const {origin, search} = window.location;
            const staticPage = `${origin}/passport/v3Jump.html`;
            const targetUrl = search ? `${origin}/${search}/#/login` : `${origin}/#/login`;

            // 渲染 passport 登录框
            const loginInstance: passport.LoadingStance = new magic.passport.login({
                product: 'eagle_fleet', // 产品线标志
                loginType: 1,
                hasRegUrl: true, // 是否有注册链接
                autosuggest: true, // 是否自动提示
                hasPlaceholder: true, // 是否有 placeholder
                sms: 5, // 短信登录，配置 5 表示接入短信登录能力
                userPwdLogin: 1, // 默认帐号密码登录，配置 1 表示指定帐号密码登录
                u: targetUrl, // 跳转连接
                staticPage
            });
            loginInstance.on('loginSuccess', (evt: {returnValue: false}) => {
                this.loginSuccess();
                evt.returnValue = false;
                return false;
            });
            loginInstance.on('render', () => {
                if (this.loading) {
                    this.loading.close();
                }
                this.submitBtn = document.querySelector('input[type="submit"]');
            });
            loginInstance.render(this.id);
        });
    }

    mounted() {
        if (this.showLoading) {
            this.loading = this.$fullLoading();
        }
        this.passportPreLogin();
    }

    resetSubmitBtn() {
        if (this.submitBtn) {
            this.submitBtn.removeAttribute('disabled');
            this.submitBtn.setAttribute('value', '登录');
            this.submitBtn.setAttribute('style', 'color: #fff');
        }
    }
}
</script>
