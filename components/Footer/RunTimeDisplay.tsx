import React, { useState, useEffect } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";

// 定义组件的 Props 类型
interface RunTimeDisplayProps {
  runTime: string; // 后端返回的时间字符串
}

// 定义时间差的状态类型
interface TimeDiff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const RunTimeDisplay: React.FC<RunTimeDisplayProps> = ({ runTime }) => {
  // 初始化时间差状态
  const [timeDiff, setTimeDiff] = useState<TimeDiff>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 使用 date-fns 的 parseISO 解析后端返回的时间字符串
    const startTime = parseISO(runTime);

    // 每秒更新一次时间差
    const interval = setInterval(() => {
      const now = new Date();

      // 使用 date-fns 计算时间差
      const days = differenceInDays(now, startTime);
      const hours = differenceInHours(now, startTime) % 24;
      const minutes = differenceInMinutes(now, startTime) % 60;
      const seconds = differenceInSeconds(now, startTime) % 60;

      // 更新状态
      setTimeDiff({ days, hours, minutes, seconds });
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, [runTime]);

  return (
    <span>
      已运行：{timeDiff.days}天{timeDiff.hours}时{timeDiff.minutes}分{timeDiff.seconds}秒
    </span>
  );
};

export default RunTimeDisplay;
