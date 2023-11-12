import toNumber from '../toNumber';

const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e308;

/**
 * 将给定值转换为有限的数值。
 * 如果值是 `Infinity` 或 `-Infinity`，则转换为最大或最小的有限数值。
 * 如果值不是数值，首先尝试转换为数值。
 * @param value {*} 要转换的值。
 * @returns {number} 返回转换后的有限数值。
 * @since 0.0.1
 * @category Lang
 * @example
 * toFinite(3.2); // => 3.2
 * toFinite(Number.MIN_VALUE); // => 5e-324
 * toFinite(Infinity); // => 1.7976931348623157e+308
 * toFinite('3.2'); // => 3.2
 */
const toFinite = (value: any): number => {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    return Math.sign(value) * MAX_INTEGER;
  }
  return value === value ? value : 0;
};

export default toFinite;
