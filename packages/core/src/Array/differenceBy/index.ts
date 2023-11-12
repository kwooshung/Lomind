import last from '../last';
import isArrayLikeObject from '../../Lang/isArrayLikeObject';
import { baseDifference, baseFlatten } from '../../../helper';

/**
 * 计算差异数组，该函数会通过 iteratee 处理每个元素后进行比较。
 *
 * @param array 待处理的数组。
 * @param values 用于比较差异的数组。
 * @param iteratee 处理每个元素的函数，默认为元素本身。
 * @returns 返回一个包含所有独特元素的新数组。
 * @version 0.0.1
 * @category Array
 * @example
 * differenceBy([11.12, 11.11, 11.10], [4.4, 2.5], Math.floor);
 * // => [11.12, 11.11]
 *
 * differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
 * // => [{ 'x': 2 }]
 */
const differenceBy = (array: any, ...values: any) => {
  let iteratee: any = last(values);

  // 检查 iteratee 是否为函数，或者是字符串且数组的元素是对象且包含这个属性
  if (typeof iteratee === 'function' || (typeof iteratee === 'string' && array.length > 0 && typeof array[0] === 'object' && iteratee in array[0])) {
    values.pop();
  } else {
    iteratee = (element: any) => element; // 使用默认的身份函数
  }

  let comparator: any = iteratee;
  if (typeof iteratee === 'function') {
    comparator = (element: any) => iteratee(element);
  } else if (typeof iteratee === 'string') {
    comparator = (element: any) => element[iteratee];
  }

  return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1), comparator) : [];
};

export default differenceBy;
