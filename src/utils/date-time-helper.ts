import { format, addDays, subDays } from 'date-fns';

// 时间格式化
const formatTimeHelper = (formatStr = 'YYYY-MM-DD HH:mm:ss', date = new Date()): string => {
  return format(date, formatStr);
};

// 按天增加
const addDayHelper = (days: number, date = new Date()): Date => {
  return addDays(date, days);
};

// 按天减少
const subDaysHelper = (days: number, date = new Date()): Date => {
  return subDays(date, days);
};

export { formatTimeHelper, addDayHelper, subDaysHelper };
