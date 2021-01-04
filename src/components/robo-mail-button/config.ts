import {TypeMailConfig} from './types';

export const MAIL_CONFIG: TypeMailConfig = {
    '2-01': [
        {
            id: '2-01',
            templateId: '1',
            btnText: '开票申请',
            receivers: ['abc@xx.com'],
            carbonCopies: ['abc@xx.com', 'abc@xx.com'],
            subject: 'XX项目XX阶段申请开票',
            body: [
                '您好，XX项目XX阶段已交付完成，申请开票，请协助支持，谢谢。',
                '1、项目名称：',
                '2、合同编号：',
                '3、开票金额：',
                '4、开票交付阶段：',
                '详情请看附件《发票申请表格》。',
                'AR签名'
            ]
        },
        {
            id: '2-01',
            templateId: '2',
            btnText: '认款申请',
            receivers: ['abc@xx.com'],
            carbonCopies: ['abc@xx.com', 'abc@xx.com'],
            subject: 'XX项目认款申请',
            body: [
                '您好，XX项目已经回款，需要在招财猫系统中进行认款，请协助支持，谢谢。',
                '1、项目名称：',
                '2、合同编号：',
                '3、回款金额：'
            ]
        }
    ]
};
