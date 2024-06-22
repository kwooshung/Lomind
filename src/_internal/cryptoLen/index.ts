/**
 * @zh 获取字符串的哈希值
 * @en Get the hash value of the string
 * @param {string} str 待处理的字符串
 * @param {number} len 输出哈希值的长度
 * @param {number} max 最大输出长度
 * @returns {string} 值
 */
const Len = (str: string, len: number, max: number): string => {
  // 最大多少位
  if (len >= max) {
    return str;
  }

  // 如果输出长度小于1，返回1位哈希值
  if (len < 1) {
    return str.slice(0, 1);
  }

  // 如果输出长度为偶数
  if (len % 2 === 0) {
    const count = Math.ceil(len / 2);
    return `${str.slice(0, count)}${str.slice(-count)}`;
  }

  // 如果输出长度为奇数
  const count = len / 2;
  const start = Math.ceil(count);
  const end = Math.floor(count);
  return `${str.slice(0, end)}${str.slice(-start)}`.toLowerCase();
};

export default Len;
