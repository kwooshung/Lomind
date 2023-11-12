/**
 * 创建一个由指定数组和额外的值或数组连接成的新数组。
 * 注意：原始数组不会被修改。
 * @param {any} array 原始数组。
 * @param {any} values 要连接的值或数组。
 * @returns {T[]} 返回连接后的新数组。
 * @version 0.0.1
 * @category Array
 * @example
 * concat([1, 2], [3, 4], 5, [6]);
 * // => [1, 2, 3, 4, 5, 6]
 *
 * concat(['a', 'b'], ['c'], 'd', ['e', 'f']);
 * // => ['a', 'b', 'c', 'd', 'e', 'f']
 *
 * const array = [1];
 * concat(array, 2, [3], [[4]]);
 * // => [1, 2, 3, [4]]
 * console.log(array);
 * // => [1]
 */
const concat = <T>(array: any, ...values: any): T[] => {
  // 创建原始数组的深拷贝，以保护原始数据
  const safeArray = Array.isArray(array) ? [...array] : [array];

  // 遍历 values，如果是数组则直接添加，否则包装成数组再添加
  values.forEach((value: any) => {
    if (Array.isArray(value)) {
      safeArray.push(...value);
    } else {
      safeArray.push(value);
    }
  });

  return safeArray;
};

export default concat;
