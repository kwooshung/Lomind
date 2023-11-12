/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from 'vitest';
import difference from './';

describe('difference 函数测试', () => {
  it('应该返回存在于第一个数组中但不在其他数组中的元素', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
    expect(difference([3, 2, 1], [4, 2])).toEqual([3, 1]);
  });

  it('如果第一个参数不是数组，应该返回空数组', () => {
    // @ts-ignore
    expect(difference('not an array', [1, 2, 3])).toEqual([]);
  });

  it('如果没有提供其他数组，应该返回原数组的副本', () => {
    expect(difference([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('应该处理多个对比数组', () => {
    expect(difference([2, 1, 3], [2, 3], [1, 4])).toEqual([]);
  });
});
