import values from '../values';

/**
 * 根据值的类型（数字或字符串）执行定制化比较的函数。
 * 对于数字类型，直接比较它们的数值差异；对于字符串类型，使用基本比较；对于不同类型，字符串排序在后。
 * @param {T} a - 第一个比较值
 * @param {T} b - 第二个比较值
 * @returns {number} - 比较结果
 */
const mixedTypes = (a: T, b: T): number => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b; // 数字间比较
  } else if (typeof a === 'string' && typeof b === 'string') {
    return values(a, b); // 字符串间比较
  } else {
    // 类型不同，字符串排在数字后面
    return typeof a === 'string' ? 1 : -1;
  }
};

export default mixedTypes;
