/**
 * dayOfYear
 * 计算当前已经过了多少天
 */
const dayOfYear = date => {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0))/1000/60/60/24);
};

dayOfYear(new Date()); // 118

/** 
 * formatDuration
 * 格式化时间
 */
const formatDuration = ms => {
    if (ms < 0) {
        ms = -ms;
    }

    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    };

    return Object.entries(time).filter(i => i[1])
            .map(([key, value]) => {
                return `${value} ${key}${value !== 1 ? 's' : ''}`;
            }).join(', ');
};

/** 
 * 获取当前的时间：HH:MM:SS
 */
const getColonTimeFromDate = time => time.toTimeString().slice(0,8);
// "23:15:49 GMT+0800 (中国标准时间)" => 经过slice(0,8)截取以后变成 => 23:15:49

/** 
 * tomorrow
 * 返回明天的日期
 */
const tomorrow = () => {
    let t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')(0);
};
