/**
 * 检查 value 是否是 Object，包括对象和函数。
 * @param value 要检查的值。
 * @returns {boolean} 如果是对象或函数返回 true，否则返回 false。
 * @version 0.0.1
 * @catygory Lang
 * @example
 * isObject({});
 * // => true
 *
 * isObject([1, 2, 3]);
 * // => true
 *
 * isObject(Function);
 * // => true
 *
 * isObject(() => {});
 * // => true
 *
 * isObject(undefined);
 * // => false
 *
 * isObject(null);
 * // => false
 */
const isObject = (value: any): boolean => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

export default isObject;
