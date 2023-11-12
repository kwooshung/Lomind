import { describe, it, expect } from 'vitest';
import differenceWith from './';

// 定义一个比较函数
const isEqual = (a: any, b: any) => a === b;

describe('differenceWith 函数测试', () => {
  it('排除指定元素', () => {
    const result = differenceWith([1, 2, 3], [2, 3], isEqual);
    expect(result).toEqual([1]);
    expect(differenceWith([1, 2, 3], [2, 3, 4], isEqual)).toEqual([1]);
  });

  it('处理多个values数组', () => {
    const result = differenceWith([1, 2, 3, 4], [2], [3], isEqual);
    expect(result).toEqual([1, 4]);
  });

  it('处理空数组', () => {
    const result = differenceWith([], [2, 3], isEqual);
    expect(result).toEqual([]);
  });

  it('处理非数组输入', () => {
    const result = differenceWith(null, [2, 3], isEqual);
    expect(result).toEqual([]);
  });

  it('处理带有非数组值的values数组', () => {
    const result = differenceWith([1, 2, 3, 4], [2, 'a'], [3, {}], isEqual);
    expect(result).toEqual([1, 4]);
  });

  it('lodash 同名函数的案例测试', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ];

    const result = differenceWith(objects, [{ x: 1, y: 2 }], isEqual);
    expect(result).toEqual(objects);
  });

  it('处理无comparator的情况', () => {
    const result = differenceWith([1, 2, 3], [2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
});
