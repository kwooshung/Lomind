/**
 * 从数组末尾移除 n 个元素，返回一个新数组。如果数组为 null 或 undefined，返回空数组。
 * @param {Array} array 要查询的数组。
 * @param {number} [n=1] 要移除的元素数量，默认为1。
 * @returns {Array} 返回数组的切片。
 * @since 0.0.1
 * @category Array
 * @example
 * dropRight([1, 2, 3], 1);
 * // => [1, 2]
 *
 * dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * dropRight([1, 2, 3]);
 * // => [1, 2]
 *
 * dropRight([1, 2, 3], 5);
 * // => []
 *
 * dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
const dropRight = (array: Array<any>, n: number = 1): Array<any> => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  // 将 n 转换为整数，且不允许负数
  const length = array.length;
  n = Math.max(length - Math.floor(n), 0);

  return array.slice(0, n);
};

export default dropRight;
