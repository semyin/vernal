import { format, parse } from "date-fns";
import { zhCN } from "date-fns/locale"; // 导入中文语言包

/**
 * 自定义 Hook：用于格式化日期
 * @param dateString 原始日期字符串
 * @param inputFormat 原始日期字符串的格式（默认为 'yyyy-MM-dd HH:mm:ss'）
 * @param outputFormat 目标日期格式（默认为 'yyyy年M月d日 · a h:mm'）
 * @returns 格式化后的日期字符串
 */
const useDateFormat = (
  dateString: string,
  inputFormat: string = "yyyy-MM-dd HH:mm:ss",
  outputFormat: string = "yyyy年M月d日 · a h:mm"
): string => {
  // 将字符串解析为 Date 对象
  const date = parse(dateString, inputFormat, new Date());

  // 格式化日期，使用中文语言包
  const formattedDate = format(date, outputFormat, { locale: zhCN });

  return formattedDate;
};

export default useDateFormat;
