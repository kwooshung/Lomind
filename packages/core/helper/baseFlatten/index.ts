/**
 * 将数组扁平化
 * @param {any} array 待处理的数组
 * @param {number} depth 扁平化的深度
 * @returns {any} 返回一个扁平化后的新数组
 */
const baseFlatten = (array: any, depth: number = 1): any => {
  if (depth === 1) {
    return array.reduce((acc: string | any[], val: any) => acc.concat(val), []);
  }

  return array.reduce((acc: string | any[], val: any) => acc.concat(Array.isArray(val) ? baseFlatten(val, depth - 1) : val), []);
};

export default baseFlatten;
