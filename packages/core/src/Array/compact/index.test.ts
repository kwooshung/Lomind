import { describe, it, expect } from 'vitest';
import compact from './';

describe('compact 函数测试', () => {
  it('应该从数组中移除所有假值', () => {
    const result = compact([0, 1, false, 2, '', 3, null, undefined, NaN]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('空数组应该返回空数组', () => {
    const result = compact([]);
    expect(result).toEqual([]);
  });

  it('仅含假值的数组应该返回空数组', () => {
    const result = compact([false, null, 0, '', undefined, NaN]);
    expect(result).toEqual([]);
  });

  it('null 或 undefined 应该返回空数组', () => {
    expect(compact(null)).toEqual([]);
    expect(compact(undefined)).toEqual([]);
  });

  it('不含假值的数组应保持不变', () => {
    const result = compact([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
});
