import { describe, expect, it } from 'vitest';
import differenceBy from './';

describe('differenceBy 函数测试', () => {
  it('应正确处理基本示例', () => {
    expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);
  });

  it('当没有提供迭代函数时，应按元素本身进行比较', () => {
    expect(differenceBy([1, 2, 3], [2, 3])).toEqual([1]);
  });

  it('应支持对象数组和属性名作为迭代器', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
    expect(differenceBy(objects, [{ x: 1 }, { x: 3 }], 'x')).toEqual([{ x: 2 }]);
  });

  it('应处理空数组和无效输入', () => {
    expect(differenceBy([], [1, 2, 3])).toEqual([]);
    expect(differenceBy(null, [1, 2, 3])).toEqual([]);
    expect(differenceBy(undefined, [1, 2, 3])).toEqual([]);
  });

  it('当迭代器为非函数时，应正常处理', () => {
    expect(differenceBy([2.1, 1.2], [2.3, 3.4], 'not a function')).toEqual([2.1, 1.2]);
  });

  it('处理默认迭代器的情况', () => {
    const array = [1.2, 2.4, 3.6];
    const valuesToExclude = [1.3, 2.5];
    const result = differenceBy(array, valuesToExclude);
    expect(result).toEqual([1.2, 2.4, 3.6]);
  });
});
