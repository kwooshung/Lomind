import { describe, it, expect } from 'vitest';
import difference from '.';

describe('difference 函数测试', () => {
  it('正常差异比较', () => {
    const array = [1, 2, 3, 4];
    const valuesToExclude = [2, 3];
    const result = difference(array, valuesToExclude, (x) => x);
    expect(result).toEqual([1, 4]);
  });

  it('使用自定义比较器', () => {
    const array = [1.1, 2.2, 3.3];
    const valuesToExclude = [2.3];
    const result = difference(array, valuesToExclude, Math.floor);
    expect(result).toEqual([1.1, 3.3]);
  });

  it('处理空数组', () => {
    const result = difference([], [1, 2, 3], (x) => x);
    expect(result).toEqual([]);
  });

  it('处理不同类型元素', () => {
    const array = [1, '2', 3];
    const valuesToExclude = ['1', 2, '3'];
    const result = difference(array, valuesToExclude, (x) => typeof x + x);
    expect(result).toEqual([1, '2', 3]);
  });
});
