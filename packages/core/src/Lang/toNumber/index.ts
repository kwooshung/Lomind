import isObject from '../isObject';
import isSymbol from '../isSymbol';

const NAN = 0 / 0;

/**
 * 尝试将值转换为原始类型。
 * 对于对象类型，尝试调用 valueOf 和 toString 方法。
 * @param {any} value 要处理的值。
 * @returns {*} 转换后的原始类型值。
 */
const toPrimitive = (value: any): unknown => {
  if (isObject(value)) {
    const primitive = value.valueOf();
    return isObject(primitive) ? value.toString() : primitive;
  }
  return value;
};

/**
 * 检查并转换特定格式的字符串（二进制、八进制、十六进制）。
 * @param {string} value 要转换的字符串。
 * @returns {number} 数字或 NaN。
 */
const parseSpecialFormatString = (value: string): number => {
  const binaryMatch = value.match(/^0b[01]+$/i);
  const octalMatch = value.match(/^0o[0-7]+$/i);
  const hexMatch = value.match(/^[-+]0x[0-9a-f]+$/i);

  if (binaryMatch) return parseInt(binaryMatch[0].substring(2), 2);
  if (octalMatch) return parseInt(octalMatch[0].substring(2), 8);
  if (hexMatch) return NaN;

  return +value;
};

/**
 * 将给定值转换为数值。
 *
 * @param {any} value 要处理的值。
 * @returns {number} 返回转换后的数值。
 * @version 0.0.1
 * @category Lang
 * @example
 * toNumber(Infinity);
 * // => Infinity
 *
 * toNumber(3.14);
 * // => 3.14
 *
 * toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * toNumber('3.14');
 * // => 3.14
 */
function toNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (isSymbol(value)) return NAN;

  value = toPrimitive(value);

  if (typeof value === 'string') return parseSpecialFormatString(value.trim());

  return +value;
}

export default toNumber;
