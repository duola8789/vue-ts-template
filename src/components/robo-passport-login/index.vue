<template>
    <div class="login-custom-container">
        <div :id="id" class="login-passport-container"></div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Emit, Prop} from 'vue-property-decorator';

@Component
export default class RoboPassportLogin extends Vue {
    @Prop({type: Boolean, default: false}) showLoading!: boolean;

    loading: any = null;
    rendered = false;

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
                this.rendered = true;
                this.closeLoading();
                this.submitBtn = document.querySelector('input[type="submit"]');
            });
            loginInstance.render(this.id);
        });
    }

    mounted() {
        this.delayShowLoading();
        this.passportPreLogin();
    }

    delayShowLoading() {
        // 1s 之内不显示 loading
        setTimeout(() => {
            if (!this.rendered) {
                this.loading = this.$fullLoading();

                // 安全设计
                setTimeout(() => {
                    this.closeLoading();
                }, 10000);
            }
        }, 1000);
    }

    resetSubmitBtn() {
        if (this.submitBtn) {
            this.submitBtn.removeAttribute('disabled');
            this.submitBtn.setAttribute('value', '登录');
            this.submitBtn.setAttribute('style', 'color: #fff');
        }
    }

    closeLoading() {
        if (this.loading) {
            this.loading.close();
        }
    }
}
</script>

<style lang="scss">
/**
 * 百度 Passport 登陆样式
 */
// 链接
@mixin pass-link() {
    display: inline-block;
    color: #eceded;
    font-size: 0.12rem;
    text-decoration: none;
    cursor: pointer;
    transition: color linear 0.1s;

    &:hover {
        color: #fff;
    }

    a {
        color: #eceded;
        font-size: 0.12rem;
        text-decoration: none;
        cursor: pointer;
        transition: color linear 0.1s;

        &:hover {
            color: #fff;
        }
    }
}

.login-custom-container {
    @include absCenter();

    z-index: 2;
    background: transparent;
    border-radius: 0;
    overflow: hidden;

    a {
        vertical-align: baseline;

        &.pass-reglink {
            right: 0;
            color: #1d2a43;
        }
    }

    .tang-pass-login {
        width: 358px;

        a {
            color: #515866;

            &.pass-sms-btn {
                top: 64px;
            }
        }

        .pass-form-item {
            width: 328px;

            input {
                &.pass-text-input-userName,
                &.pass-text-input-password {
                    width: 306px;
                    border-radius: 8px;
                    padding-left: 12px;
                    font-size: 14px;
                }
            }

            .pass-text-input {
                height: 30px;
                line-height: 30px;
            }

            .pass-clearbtn {
                top: 19px;
                right: 6px;
            }
        }

        .pass-form-item-submit {
            input {
                width: 328px;
                height: 52px;
                line-height: 52px;
                background: #4f6ef2;

                &.pass-button-submit {
                    background: #4f6ef2;
                    border-radius: 8px;
                }
            }
        }

        .pass-form-item-memberPass {
            label {
                color: #515866;
            }
        }

        .pass-generalErrorWrapper {
            margin-bottom: 2px;
        }

        .pass-item-timer,
        .pass-item-time-timing {
            height: 52px;
            line-height: 52px;
            border-radius: 8px;
            border: 1px solid #d4d6d9;
            font-size: 12px;
            font-weight: 400;
        }
    }

    .tang-pass-sms {
        .pass-form-item {
            input {
                &.pass-text-input-smsPhone {
                    width: 308px;
                    border-radius: 8px;
                    padding-left: 12px;
                    font-size: 14px;
                }

                &.pass-text-input-smsVerifyCode {
                    width: 193px;
                    border-radius: 8px;
                    padding-left: 12px;
                    font-size: 14px;
                }
            }

            .pass-sms-link-back {
                margin-right: 0;
            }

            span.pass-clearbtn-smsVerifyCode {
                left: 190px;
            }
        }

        p.pass-form-item-smsVerifyCode,
        p.pass-form-item-verifyCode {
            width: 330px;
        }
    }

    .tang-pass-footerBar {
        background: none;
        border-top: 1px solid #d4d6d9;
        padding: 0;
        margin-left: 30px;
        font-size: 14px;
        font-weight: 400;
        color: #1d2a43;
    }

    .tang-pass-qrcode {
        .Qrcode-status-con {
            width: 156px;
            height: 156px;
        }

        .tang-pass-qrcode-title {
            margin-top: 20px;

            .pass-link {
                color: #2e82ff;
            }
        }
    }

    .tang-pass-qrcode-ullist {
        span.tang-pass-qrcode-list-aq,
        span.tang-pass-qrcode-list-gx,
        span.tang-pass-qrcode-list-bj {
            height: 16px;
            top: 0;
        }
    }
}
</style>
