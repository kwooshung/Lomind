import { describe, it, expect } from 'vitest';
import isSymbol from './';

describe('isSymbol 函数测试', () => {
  it('原始 Symbol 应返回 true', () => {
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });

  it('非 Symbol 类型应返回 false', () => {
    expect(isSymbol('abc')).toBe(false);
    expect(isSymbol(123)).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
  });

  it('对于非符号应该返回 false', () => {
    expect(isSymbol([1, 2, 3])).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(new Date())).toBe(false);
    expect(isSymbol(new Error())).toBe(false);
    expect(isSymbol({ 0: 1, length: 1 })).toBe(false);
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(/x/)).toBe(false);
    expect(isSymbol('a')).toBe(false);
  });
});
