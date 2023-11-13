/**
 * 对数字或字符串进行简单比较的函数。
 * 如果 a 小于 b，则返回 -1；如果 a 大于 b，则返回 1；如果相等，则返回 0。
 * @param {number|string} a - 第一个比较值
 * @param {number|string} b - 第二个比较值
 * @returns {number} - 比较结果
 */
const values = (a: number | string, b: number | string): number => {
  if ((typeof a === 'number' && typeof b === 'string') || a < b) {
    return -1;
  } else if ((typeof a === 'string' && typeof b === 'number') || a > b) {
    return 1;
  }
  return 0;
};

export default values;
