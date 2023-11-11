import slice from '../slice';
import toInteger from '../../Lang/toInteger';

/**
 * 将数组拆分成多个指定长度的块，并组成一个新数组。如果数组无法被均匀拆分，最后的剩余元素将形成一个单独的块。
 * @param {Array} array 要拆分的数组。
 * @param {number} [size=1] 每个块的长度。
 * @returns {Array} 返回拆分后的新数组。
 * @version 1.0.0
 * @category Array
 * @example
 * chunk([1, 2, 3, 4], 2);
 * // => [[1, 2], [3, 4]]
 *
 * chunk(['a', 'b', 'c', 'd', 'e', 'f'], 2);
 * // => [['a', 'b'], ['c', 'd'], ['e', 'f']]
 *
 * chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 * // => [['a', 'b', 'c'], ['d', 'e', 'f']]
 *
 * chunk(['a', 'b', 'c', 'd', 'e', 'f'], 4);
 * // => [['a', 'b', 'c', 'd'], ['e', 'f']]
 *
 * chunk([{ id: 1 }, { id: 2 }, { id: 3 }], 2);
 * // => [[{ id: 1 }, { id: 2 }], [{ id: 3 }]]
 *
 * chunk([1, 2, 3, 4, 5], 0);
 * // => [] (size为0时返回空数组)
 */
const chunk = <T>(array: T[] | null | undefined, size: number = 1): T[][] => {
  const integerSize = Math.max(toInteger(size) | 0, 0);
  if (!array || array.length === 0 || integerSize < 1) return [];

  const length = array.length;
  const result = new Array(Math.ceil(length / integerSize));

  for (let index = 0, resIndex = 0; index < length; index += integerSize) {
    result[resIndex++] = slice(array, index, index + integerSize);
  }

  return result;
};

export default chunk;
