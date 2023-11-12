import { describe, it, expect } from 'vitest';
import isObjectLike from './';

describe('isObjectLike 测试', () => {
  it('应当对纯对象返回 true', () => {
    expect(isObjectLike({})).toBe(true);
  });

  it('应当对数组返回 true', () => {
    expect(isObjectLike([1, 2, 3])).toBe(true);
  });

  it('应当对 null 返回 false', () => {
    expect(isObjectLike(null)).toBe(false);
  });

  it('应当对 undefined 返回 false', () => {
    expect(isObjectLike(undefined)).toBe(false);
  });

  it('应当对数字返回 false', () => {
    expect(isObjectLike(1)).toBe(false);
  });

  it('应当对字符串返回 false', () => {
    expect(isObjectLike('string')).toBe(false);
  });

  it('应当对布尔值返回 false', () => {
    expect(isObjectLike(true)).toBe(false);
  });

  it('应当对函数返回 false', () => {
    expect(isObjectLike(() => {})).toBe(false);
    expect(isObjectLike(Function)).toBe(false);
  });
});
