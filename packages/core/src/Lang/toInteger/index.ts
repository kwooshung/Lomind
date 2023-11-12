import toFinite from '../toFinite';

/**
 * 转换 value 为整数。
 * 使用 toFinite 确保数值是有限的，然后使用 Math.trunc 直接去除小数部分。
 * @param {any} value 要转换的值。
 * @returns {number} 返回转换后的整数。
 * @example
 * toInteger(3.2);
 * // => 3
 *
 * toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * toInteger(Infinity);
 * // => Infinity
 *
 * toInteger('123');
 * // => 123
 */
const toInteger = (value: any): number => {
  if (value === Infinity || value === -Infinity) return value;
  return Math.trunc(toFinite(value));
};

export default toInteger;
