import { describe, it, expect } from 'vitest';
import flatten from '.';

describe('flatten 函数测试', () => {
  it('扁平化单层嵌套数组', () => {
    const result = flatten([1, [2, 3], 4]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('扁平化多层嵌套数组', () => {
    const result = flatten([1, [2, [3, [4]]], 5]);
    expect(result).toEqual([1, 2, [3, [4]], 5]);
  });

  it('扁平化多层嵌套数组，指定深度', () => {
    const result = flatten([1, [2, [3, [4]]], 5], 2);
    expect(result).toEqual([1, 2, 3, [4], 5]);
  });

  it('处理空数组', () => {
    const result = flatten([]);
    expect(result).toEqual([]);
  });

  it('处理非数组输入', () => {
    const result = flatten(123);
    expect(result).toEqual([]);
  });

  it('处理含有非数组元素的数组', () => {
    const result = flatten([1, 'a', [2, 'b'], 3]);
    expect(result).toEqual([1, 'a', 2, 'b', 3]);
  });
});
