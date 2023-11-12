/**
 * 计算差异数组
 * @param {any} array 待处理的数组
 * @param {(element: any) => any} valuesToExclude 用于比较差异的数组
 * @returns {any} 返回一个差异化后的新数组
 */
const difference = (array: any, valuesToExclude: any, comparator: (element: any) => any): any => {
  const excludedValues = new Set(valuesToExclude.map(comparator));
  return array.filter((item: any) => !excludedValues.has(comparator(item)));
};

export default difference;
