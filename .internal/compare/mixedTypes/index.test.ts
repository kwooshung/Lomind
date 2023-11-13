import { describe, it, expect } from 'vitest';
import mixedTypes from '.';

describe('测试 mixedTypes 函数', () => {
  it('比较数字', () => {
    expect(mixedTypes(1, 2)).toBe(-1); // 1 < 2
    expect(mixedTypes(3, 2)).toBe(1); // 3 > 2
    expect(mixedTypes(5, 5)).toBe(0); // 5 == 5
  });

  it('比较字符串', () => {
    expect(mixedTypes('a', 'b')).toBe(-1); // 'a' < 'b'
    expect(mixedTypes('c', 'b')).toBe(1); // 'c' > 'b'
    expect(mixedTypes('d', 'd')).toBe(0); // 'd' == 'd'
  });

  it('比较数字和字符串', () => {
    expect(mixedTypes(1, '1')).toBe(-1); // 数字通常在字符串之前
    expect(mixedTypes('2', 2)).toBe(1); // 字符串通常在数字之后
  });

  it('比较不同类型的字符串', () => {
    expect(mixedTypes('100', '2')).toBe(-1); // 按字典序 '100' < '2'
    expect(mixedTypes('100', '100')).toBe(0); // 相等
    expect(mixedTypes('2', '100')).toBe(1); // 按字典序 '2' > '100'
  });
});
