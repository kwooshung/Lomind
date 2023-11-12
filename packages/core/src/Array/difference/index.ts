// import isArrayLikeObject from '../../Lang/isArrayLikeObject';

/**
 * 创建一个新数组，包含第一个数组中不在其他数组中的元素。
 *
 * @param {any} array 需要处理的数组。
 * @param {any} values 用于对比差异的一个或多个数组。
 * @returns {any} 返回一个差异化后的新数组。
 * @version 0.0.1
 * @category Array
 * @example
 * difference([2, 1], [2, 3]);
 * // => [1]
 */
const difference = (array: any[], ...values: any[]): any[] => {
  if (!Array.isArray(array)) return [];

  // 将所有用于比较的数组扁平化并合并成一个数组
  const compareArray = values.flat();

  // 筛选出仅存在于第一个数组中的元素
  return array.filter((element) => !compareArray.includes(element));
  // return isArrayLikeObject(array) ? array.filter((element) => !compareArray.includes(element)) : [];
};

export default difference;
