/**
 * @file 与 ElementUI 强耦合的辅助函数
 */
import {ElForm} from 'element-ui/types/form';
import {GetElCellEmptyText, FormatterElCellContent} from '@/utils/element-helper/types';
import {getStartOfTodayHelper} from '@/utils';

// 校验 el-form
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

export const clearValidate: (from: ElForm) => void = (form) => {
    form.clearValidate();
};

export const validateFiled = (form: ElForm, rules: string[]) => {
    form.validateField(rules);
};

// 设置 el-table 的 cell 值为空时显示的字符
export const getElCellEmptyText: GetElCellEmptyText = (row, column, emptyText = '') => {
    const key = column.property || column.prop;
    const val = row[key];
    if (val === undefined || val === null) {
        return emptyText;
    }
    return val;
};

// 用于 el-table 的 cell 的格式化工具，接受 column.formatter 作为参数，返回格式化后的字符
export const formatterElCellContent: FormatterElCellContent = (formatter, row, column) => {
    if (formatter && typeof formatter === 'function') {
        return formatter(row, column) || getElCellEmptyText(row, column);
    }
    return getElCellEmptyText(row, column);
};

// 禁用今天之前的日期
export const disablePassedDate = (date: Date) => date.getTime() < getStartOfTodayHelper().getTime();
