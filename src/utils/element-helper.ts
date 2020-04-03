// 校验 el-form
import {ElForm} from 'element-ui/types/form';

export const validateELForm: (from: ElForm) => Promise<boolean> = (form) => {
    return new Promise((resolve) => {
        form.validate((valid) => {
            if (valid) {
                resolve(true);
            } else {
                resolve(false);
                return false;
            }
        });
    });
};

// 重置 el-form
export const resetElFrom: (from: ElForm) => void = (form) => {
    form.resetFields();
};
