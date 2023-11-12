import slice from '../slice';
import toInteger from '../../Lang/toInteger';

/**
 * 裁剪数组中的前 N 个元素，返回剩余的部分。
 * 使用 Array.prototype.slice 实现裁剪，确保非破坏性操作。
 * 默认裁剪1个元素，如果 n 不是数字或小于1，则不裁剪。
 * @param array 要处理的数组。
 * @param n 裁剪的元素个数，默认为1。
 * @returns 返回数组的剩余部分。
 * @version 0.0.1
 * @category Array
 * @example
 * drop([1, 2, 3, 4, 5]);
 * // => [2, 3, 4, 5]
 *
 * drop([1, 2, 3, 4, 5], 2);
 * // => [3, 4, 5]
 *
 * drop([1, 2, 3, 4, 5], 10);
 * // => []
 */
function drop<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array)) return [];

  const length = array == null ? 0 : array.length;
  // 使用 toInteger 来处理 n，确保 n 为整数
  const dropCount = Math.max(toInteger(n), 0);

  return length ? slice(array, dropCount, length) : [];
}

export default drop;
