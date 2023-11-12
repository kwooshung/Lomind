/**
 * 获取数组中的最后一个元素。
 * 如果输入不是数组或数组为空，则返回 undefined。
 *
 * @param {any[] | null | undefined} array 要检索的数组，可以是 null 或 undefined。
 * @returns {(T | undefined)} 返回数组中的最后一个元素，如果输入不是数组或数组为空，则返回 undefined。
 * @version 0.0.1
 * @category Array
 * @example
 * last([1, 2, 3]);
 * // => 3
 *
 * last([]);
 * // => undefined
 *
 * last(null);
 * // => undefined
 *
 * last(undefined);
 * // => undefined
 */
const last = <T>(array: any[] | null | undefined): T | undefined => {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
};

export default last;
