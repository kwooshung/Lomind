/**
 * 交换数组中的两个元素
 * @param {Array} arr 要交换元素的数组
 * @param {number} x 要交换元素的索引
 * @param {number} y 要交换元素的索引
 * @returns {void} 无返回值
 */
const swap = <T>(arr: T[], x: number, y: number): void => {
  const tmp: T = arr[y];
  arr[y] = arr[x];
  arr[x] = tmp;
};

/**
 * 分区，将数组分为两部分，左边的元素都小于枢纽元素，右边的元素都大于枢纽元素
 * @param {Array} arr 要分区的数组
 * @param {number} lo 要分区的数组的起始索引
 * @param {number} hi 要分区的数组的结束索引
 * @param {Function} compareFunction 比较函数，定义元素的排序方式。
 * @returns {number} 返回枢纽元素的索引。
 */
const partition = <T>(arr: T[], lo: number, hi: number, compareFunction: (a: T, b: T) => number): number => {
  // 随机选择枢纽元素
  const pivotIndex: number = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  const pivot: T = arr[pivotIndex];

  swap(arr, pivotIndex, hi);

  let dividerPosition: number = lo;

  for (let i: number = lo; i < hi; i++) {
    if (compareFunction(arr[i], pivot) < 0) {
      swap(arr, i, dividerPosition);
      dividerPosition++;
    }
  }

  swap(arr, dividerPosition, hi);

  return dividerPosition;
};

/**
 * 快速排序
 * @description 平均情况下，拥有 O(n log n) 的时间复杂度，特别是在数据随机分布的情况下；但在最坏情况下（如当输入数组已经是有序的或者是逆序的），其时间复杂度会退化到 O(n²)；
 * 迭代方式：这个函数采用了迭代方式而不是递归，因此避免了递归深度过大的问题，对于大型数据集来说，减少了栈空间的占用，提高了性能。
 * 优化的分区算法：分区算法采用了随机选择枢纽元素，这有助于在某些情况下避免最坏情况的发生，提高了平均性能。
 * @param {Array} array 要排序的数组。
 * @param {modifyOriginal} [modifyOriginal = true] 是否修改原数组
 * @param {Function} [compareFunction = (a, b) => (a < b ? -1 : a > b ? 1 : 0)] 比较函数，定义元素的排序方式。
 * @returns {Array} 返回排序后的数组。
 * @example
 * quick([3, 1, 4, 1, 5, 9, 2, 6]);
 * // => [1, 1, 2, 3, 4, 5, 6, 9]
 *
 * quick(['banana', 'apple', 'cherry']);
 * // => ['apple', 'banana', 'cherry']
 */
const quick = <T>(array: T[], compareFunction: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0), modifyOriginal: boolean = true): T[] => {
  if (!modifyOriginal) {
    array = [...array];
  }

  const stack: number[] = [];
  stack.push(0);
  stack.push(array.length - 1);

  while (stack.length > 0) {
    const hi: number = stack.pop()!;
    const lo: number = stack.pop()!;

    const p: number = partition(array, lo, hi, compareFunction);

    if (p - 1 > lo) {
      stack.push(lo);
      stack.push(p - 1);
    }

    if (p + 1 < hi) {
      stack.push(p + 1);
      stack.push(hi);
    }
  }

  return array;
};

export default quick;
