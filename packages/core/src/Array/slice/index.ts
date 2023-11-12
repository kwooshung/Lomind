/**
 * 裁剪数组，从 start 位置开始到 end 结束，但不包括 end 本身的位置。
 * 注意: 这个方法用于代替 Array#slice 来确保数组正确返回
 * @param {any[]} array 要裁剪的数组。
 * @param {number} [start=0] 开始位置。
 * @param {number} [end=array.length] 结束位置。
 * @returns {any[]} 返回裁剪后的数组。
 * @version 0.0.1
 * @catygory Array
 * @example
 * slice([1, 2, 3], 1, 5);
 * // => [2, 3]
 *
 * slice([1, 2, 3], -5, 2);
 * // => [1, 2]
 *
 * [5, 6, 2 ** 64, Infinity, -Infinity, -2].map((start) => slice([1, 2, 3, 4, 5], start));
 * // => [[], [], [], [], [], []]
 *
 * slice([1, 2, 3, 4, 5], -4, -1);
 * // => [2, 3, 4]
 */
const slice = (array: any[], start: number = 0, end?: number): any[] => {
  if (!array || start === Infinity || start === -Infinity || end === Infinity || end === -Infinity || (start < 0 && !end)) return [];
  end = end || array.length;
  start = Math.max(start < 0 ? array.length + start : start, 0);
  end = end > array.length ? array.length : end < 0 ? array.length + end : end;

  return array.slice(start, end);
};

export default slice;
