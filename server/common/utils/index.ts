export { completeTimeFromDateRange };

function completeTimeFromDateRange(dates: string[] | undefined): string[] {
  const dateRange: string[] = [];
  if (Array.isArray(dates) && dates.length === 2) {
    const start = dates[0];
    const end = dates[1];
    // 验证日期格式（示例：YYYY-MM-DD）
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateRegex.test(start) && dateRegex.test(end)) {
      [`${start} 00:00:00`, `${end} 23:59:59`].forEach((item) => {
        dateRange.push(item);
      });
    } else {
      throw new Error("日期格式不正确，应为['YYYY-MM-DD', 'YYYY-MM-DD']");
    }
  }
  return dateRange;
}
