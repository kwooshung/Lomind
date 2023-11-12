import isArrayLike from '../isArrayLike';
import isObjectLike from '../isObjectLike';

/**
 * 检查提供的值是否是一个类似数组的对象。
 * 一个类似数组的对象拥有数字索引和 length 属性，同时它是一个对象类型（不是 null）。
 *
 * @param {any} value 要检查的值。
 * @returns {boolean} 如果值是类数组对象，则返回 true，否则返回 false。
 * @version 0.0.1
 * @category Lang
 * @example
 * isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * isArrayLikeObject(document.body.children);
 * // => true
 *
 * isArrayLikeObject('abc');
 * // => false
 *
 * isArrayLikeObject(null);
 * // => false
 */
const isArrayLikeObject = (value: any): boolean => isArrayLike(value) && isObjectLike(value);

export default isArrayLikeObject;
