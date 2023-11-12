import { describe, it, expect } from 'vitest';
import last from './';

describe('last 函数测试', () => {
  it('应当返回普通数组的最后一个元素', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b', 'c'])).toBe('c');
  });

  it('当数组为空时，应当返回 undefined', () => {
    expect(last([])).toBeUndefined();
  });

  it('当输入为 null 时，应当返回 undefined', () => {
    expect(last(null)).toBeUndefined();
  });

  it('当输入为 undefined 时，应当返回 undefined', () => {
    expect(last(undefined)).toBeUndefined();
  });
});
