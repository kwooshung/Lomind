import { while as _while } from '../../.helper/';
/**
 * 判断对象是否匹配属性值。
 * @param {object} object 要检查的对象。
 * @param {object} source 属性值。
 * @returns {boolean} 如果匹配返回 true，否则返回 false。
 */
const isMatch = (object: { [x: string]: any }, source: { [x: string]: any }): boolean => Object.keys(source).every((key) => object[key] === source[key]);

/**
 * 从数组末尾开始移除元素，直到断言函数返回假值为止。
 * 注意：此方法用于在不改变原数组的情况下，获取符合条件的子数组。
 * @param {any[]} array 要处理的数组。
 * @param {any} [predicate=_.identity] 断言函数，每次迭代调用。
 * @returns {any[]} 返回处理后的数组。
 * @version 0.0.1
 * @category Array
 * @example
 * dropRightWhile([1, 2, 3, 4], n => n < 3);
 * // => [1, 2]
 *
 * dropRightWhile([1, 2, 3, 4], (value, index) => index < 2);
 * // => [1, 2]
 *
 * dropRightWhile([1, 2, 3, 4], (value, index, array) => array.length - index > 2);
 * // => [1, 2]
 */
const dropRightWhile = (array: any, predicate: any) => {
  if (!Array.isArray(array) || !array.length) {
    return [];
  }

  let callback: any = predicate;
  // 对 _.matchesProperty 进行调整
  if (Array.isArray(predicate) && predicate.length === 2) {
    callback = (obj: { [x: string]: any }) => obj[predicate[0]] === predicate[1];
  } else if (typeof predicate === 'object') {
    callback = (obj: { [x: string]: any }) => isMatch(obj, predicate);
  } else if (typeof predicate === 'string') {
    callback = (obj: { [x: string]: any }) => obj[predicate];
  }

  return _while(array, callback, true, true);
};

export default dropRightWhile;
