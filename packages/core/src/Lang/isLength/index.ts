/**
 * 检查 value 是否是有效数组长度。
 *
 * @param {any} value 要检查的值。
 * @returns {boolean} 如果是有效长度返回 true，否则返回 false。
 * @since 0.0.1
 * @category Lang
 * @example
 * isLength(3);
 * // => true
 *
 * isLength(Number.MIN_VALUE);
 * // => false
 *
 * isLength(Infinity);
 * // => false
 *
 * isLength('3');
 * // => false
 */
const isLength = (value: any): boolean => typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;

export default isLength;
