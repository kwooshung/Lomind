/**
 * 检查 value 是否是类对象。类对象定义为不是 null 且 typeof 结果是 "object"。
 *
 * @param value 要检查的值。
 * @returns {boolean} 如果 value 是类对象返回 true，否则返回 false。
 * @version 0.0.1
 * @category Lang
 * @example
 * isObjectLike({});
 * // => true
 *
 * isObjectLike([1, 2, 3]);
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 *
 * isObjectLike(null);
 * // => false
 *
 * isObjectLike(3);
 * // => false
 */
const isObjectLike = (value: unknown): boolean => value !== null && typeof value === 'object';
export default isObjectLike;
