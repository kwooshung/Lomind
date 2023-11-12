import { describe, it, expect } from 'vitest';
import isArrayLike from './';

describe('isArrayLike', () => {
  it('应返回 true，当传入普通数组时', () => {
    expect(isArrayLike([1, 2, 3])).toBe(true);
  });

  it('应返回 true，当传入字符串时', () => {
    expect(isArrayLike('abc')).toBe(true);
  });

  it('应返回 true，当传入具有合法长度属性的对象时', () => {
    expect(isArrayLike({ length: 3 })).toBe(true);
  });

  it('应返回 false，当传入 null 时', () => {
    expect(isArrayLike(null)).toBe(false);
  });

  it('应返回 false，当传入函数时', () => {
    expect(isArrayLike(() => {})).toBe(false);
  });

  it('应返回 false，当传入不具有长度属性的对象时', () => {
    expect(isArrayLike({})).toBe(false);
  });

  it('应返回 false，当传入长度为负数的对象时', () => {
    expect(isArrayLike({ length: -1 })).toBe(false);
  });

  it('应返回 false，当传入长度超过 MAX_SAFE_INTEGER 的对象时', () => {
    expect(isArrayLike({ length: Number.MAX_SAFE_INTEGER + 1 })).toBe(false);
  });
});
