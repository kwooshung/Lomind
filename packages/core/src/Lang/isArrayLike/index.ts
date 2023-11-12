import isLength from '../isLength';

/**
 * 检查 value 是否是类数组。类数组对象不是函数，并且有一个符合特定范围的 length 属性。
 * 这个函数使用 ES6 的箭头函数和类型守卫来提高代码的简洁性和可读性。
 *
 * @param value 要检查的值。
 * @returns {boolean} 如果是类数组，返回 true，否则返回 false。
 * @version 0.0.1
 * @category Lang
 * @example
 * isArrayLike([1, 2, 3]);
 * // => true
 *
 * isArrayLike('abc');
 * // => true
 *
 * isArrayLike(() => {});
 * // => false
 *
 * isArrayLike({ length: 3 });
 * // => true
 *
 * isArrayLike({ length: -1 });
 * // => false
 */
const isArrayLike = (value: any): boolean => value != null && typeof value !== 'function' && isLength(value.length);

export default isArrayLike;
