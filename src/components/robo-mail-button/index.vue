<template>
    <div class="robo-mail-buttons-container">
        <template v-for="item in btnList">
            <el-popover v-if="getMailInfo(item)" :key="item.id + item.templateId" trigger="hover" placement="top">
                <p>需要系统中安装邮件客户端并且进行正确配置</p>
                <div slot="reference">
                    <el-button type="primary" class="mail-btn" size="medium" icon="el-icon-message">
                        <a :href="getMailInfo(item)">{{ getBtnText(item) }}</a>
                    </el-button>
                </div>
            </el-popover>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {MAIL_CONFIG} from './config';
import {TypeMailItem} from './types';

@Component
export default class MailButton extends Vue {
    @Prop({type: String, required: true}) mailId!: string;

    get btnList() {
        return MAIL_CONFIG[this.mailId] || [];
    }

    getMailInfo(mailItem: TypeMailItem) {
        if (!mailItem) {
            return null;
        }
        const {subject, receivers, body, carbonCopies = []} = mailItem;
        const mailTo = `mailto:${receivers.join(',')}`;
        const cc = carbonCopies.map((v) => `cc=${v}`).join('&');
        const mailContent = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join('\n'))}`;
        return `${mailTo}?${cc}&${mailContent}`;
    }

    getBtnText(mailItem: TypeMailItem) {
        if (!mailItem || !mailItem.btnText) {
            return '邮件申请';
        }
        return mailItem.btnText;
    }
}
</script>

<style scoped lang="scss">
.robo-mail-buttons-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .mail-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
}
</style>
