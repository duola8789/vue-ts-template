/**
 * @file 日期、时间相关格式化参数，采用了 date-fns 作为工具
 * https://date-fns.org/docs/Getting-Started
 */
import {format, differenceInSeconds, startOfToday} from 'date-fns';

// 时间格式化
export const formatTimeHelper = (date: Date | number, formatStr = 'yyyy-MM-dd HH:mm:ss'): string => {
    return format(date, formatStr);
};

// 日期差（秒）
export const differenceInSecondsHelper = (laterDate: Date, earlierDate = new Date()): number => {
    return differenceInSeconds(laterDate, earlierDate);
};

export const getStartOfTodayHelper = () => startOfToday();
