import { describe, it, expect } from 'vitest';
import isLength from './';

describe('isLength 函数测试', () => {
  it('应该返回 true 当值是有效的长度', () => {
    expect(isLength(3)).toBe(true);
    expect(isLength(0)).toBe(true);
    expect(isLength(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it('应该返回 false 当值不是有效的长度', () => {
    expect(isLength(Number.MIN_VALUE)).toBe(false);
    expect(isLength(Infinity)).toBe(false);
    expect(isLength(-1)).toBe(false);
    expect(isLength('3')).toBe(false);
    expect(isLength(null)).toBe(false);
    expect(isLength(undefined)).toBe(false);
    expect(isLength({})).toBe(false);
    expect(isLength([])).toBe(false);
    expect(isLength(() => {})).toBe(false);
  });
});
