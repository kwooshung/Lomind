import { describe, it, expect } from 'vitest';
import toFinite from './';

describe('toFinite函数测试', () => {
  it('应该将Infinity转换为最大有限数', () => {
    expect(toFinite(Infinity)).toBe(1.7976931348623157e308);
  });

  it('应该将字符串转换为对应的数值', () => {
    expect(toFinite('3.2')).toBe(3.2);
  });

  it('应该将非数值转换为0', () => {
    expect(toFinite(NaN)).toBe(0);
    expect(toFinite('abc')).toBe(0);
  });

  it('应该处理正常的数值', () => {
    expect(toFinite(3.2)).toBe(3.2);
    expect(toFinite(-5)).toBe(-5);
  });

  it('应该将非真值转换为0', () => {
    expect(toFinite(null)).toBe(0);
    expect(toFinite(undefined)).toBe(0);
    expect(toFinite(false)).toBe(0);
  });
});
