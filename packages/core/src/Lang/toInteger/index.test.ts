import { describe, it, expect } from 'vitest';
import toInteger from './';

describe('toInteger 函数测试', () => {
  it('确保函数能正确地将浮点数转换为最接近的整数', () => {
    expect(toInteger(4.6)).toBe(4);
    expect(toInteger(-3.7)).toBe(-3);
  });

  it('检查函数对于极小数值和无穷大/小数值的处理', () => {
    expect(toInteger(Number.MIN_VALUE)).toBe(0);
    expect(toInteger(Infinity)).toBe(Infinity);
    expect(toInteger(-Infinity)).toBe(-Infinity);
  });

  it('确保能够处理数字形式的字符串，并正确转换', () => {
    expect(toInteger('123.45')).toBe(123);
    expect(toInteger('-123.45')).toBe(-123);
  });

  it('验证对于非数字的字符串、对象、数组等的处理', () => {
    expect(toInteger('abc')).toBe(0);
    expect(toInteger({})).toBe(0);
    expect(toInteger([])).toBe(0);
    expect(toInteger(null)).toBe(0);
  });

  it('确保 NaN 被正确转换为 0', () => {
    expect(toInteger(NaN)).toBe(0);
  });
});
