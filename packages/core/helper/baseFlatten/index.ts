/**
 * 将数组扁平化
 * @param {any} array 待处理的数组
 * @param {number} depth 扁平化的深度
 * @returns {any} 返回一个扁平化后的新数组
 */
const baseFlatten = (array: any, depth: number = 1): any => {
  const result = [];
  const stack = [{ array, index: 0, depth }];

  while (stack.length) {
    const { array, index, depth }: any = stack.pop();
    for (let i = index; i < array.length; i++) {
      const value = array[i];
      if (Array.isArray(value) && depth > 0) {
        stack.push({ array, index: i + 1, depth });
        stack.push({ array: value, index: 0, depth: depth - 1 });
        break;
      } else {
        result.push(value);
      }
    }
  }
  return result;
};

export default baseFlatten;
