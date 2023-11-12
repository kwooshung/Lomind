import { describe, it, expect } from 'vitest';
import dropRight from './';

describe('dropRight 函数测试', () => {
  it('从数组末尾移除一个元素', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2]);
  });

  it('从数组末尾移除多个元素', () => {
    expect(dropRight([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]);
  });

  it('当 n 大于数组长度时，返回空数组', () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([]);
  });

  it('当 n 为 0 时，返回原数组', () => {
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it('当数组为空时，返回空数组', () => {
    expect(dropRight([], 2)).toEqual([]);
  });

  it('当数组为 null 或 undefined 时，返回空数组', () => {
    expect(dropRight(null as any, 2)).toEqual([]);
    expect(dropRight(undefined as any, 2)).toEqual([]);
  });

  it('移除数组末尾的一个元素', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2]);
  });

  it('移除数组末尾的两个元素', () => {
    expect(dropRight([1, 2, 3], 2)).toEqual([1]);
  });

  it('当 n 大于数组长度时返回空数组', () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([]);
  });

  it('当 n 为 0 时返回原数组', () => {
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
});
