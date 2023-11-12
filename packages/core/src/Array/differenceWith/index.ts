import { baseFlatten } from '../../.helper';

/**
 * 创建一个从原始数组中排除了所有给定值的新数组。此方法接受一个 comparator 进行比较和排除。
 * @param {any} array 需要处理的数组。
 * @param {...any} values 用于对比差异的数组。
 * @returns {any} 返回一个差异化后的新数组。
 * @version 0.0.1
 * @category Array
 * @example
 * const isEqual = (a, b) => a === b;
 * differenceWith([1, 2, 3], [2, 3, 4], isEqual);
 * // => [1]
 */
const differenceWith = (array: any, ...values: any[]): any => {
  if (!Array.isArray(array)) return [];

  let comparator = values[values.length - 1];
  if (typeof comparator !== 'function') {
    comparator = undefined;
  } else {
    values.pop();
  }

  const flattenedValues = baseFlatten(values, 1);
  if (comparator) {
    return array.filter((arrVal) => !flattenedValues.some((othVal: any) => comparator(arrVal, othVal)));
  }
  return array;
};

export default differenceWith;
