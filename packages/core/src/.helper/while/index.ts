import slice from '../../Array/slice';

/**
 * “dropWhile”和“takeWhile”等方法的基本实现。
 *
 * @param {Array} array 要查询的数组。
 * @param {Function} predicate 每次迭代调用的函数。
 * @param {boolean} isDrop 是否为“dropWhile”方法。
 * @param {boolean} fromRight 是否从右侧开始迭代。
 * @returns {Array} 返回数组的切片。
 */
const _while = (array: any[], predicate: (arg0: any, arg1: any, arg2: any) => any, isDrop: any, fromRight: any) => {
  const { length } = array;
  let index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}

  // 检查是否需要返回空数组
  if (fromRight && index === -1) {
    return [];
  }

  return isDrop ? slice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : slice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
};

export default _while;
