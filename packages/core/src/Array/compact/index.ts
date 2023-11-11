/**
 * 创建一个新数组，包含原数组中所有非假值元素。
 * 这个版本使用了高阶函数 filter，简化了逻辑，并提高了代码的可读性。
 * @param {any[]} array 原数组。
 * @returns {any[]} 返回过滤假值后的新数组。
 * @version 0.0.1
 * @catygory Array
 * @example
 * compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 *
 * compact([null, undefined, NaN, '', 0, false]);
 * // => []
 *
 * compact([1, 2, 3]);
 * // => [1, 2, 3]
 *
 * compact([]);
 * // => []
 *
 * compact(null);
 * // => []
 */
const compact = (array: any[] | null | undefined): any[] => {
  if (array == null) return [];
  return array.filter(Boolean);
};

export default compact;
