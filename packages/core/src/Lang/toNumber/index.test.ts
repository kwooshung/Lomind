import { describe, it, expect } from 'vitest';
import toNumber from './';

describe('toNumber 函数测试', () => {
  // 测试数字输入
  it('应当正确处理数字输入', () => {
    expect(toNumber(3.14)).toBe(3.14);
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    expect(toNumber(Infinity)).toBe(Infinity);
  });

  // 测试字符串输入
  it('应当正确处理字符串输入', () => {
    expect(toNumber('3.14')).toBe(3.14);
    expect(toNumber(' 3.14 ')).toBe(3.14); // 测试带空格的字符串
    expect(toNumber('0b101')).toBe(5); // 测试二进制字符串
    expect(toNumber('0o7')).toBe(7); // 测试八进制字符串
    expect(toNumber('-0x1a')).toBe(NaN); // 测试十六进制字符串
  });

  // 测试其他类型的输入
  it('应当正确处理其他类型的输入', () => {
    expect(toNumber(true)).toBe(1); // 测试布尔值
    expect(toNumber(null)).toBe(0); // 测试 null
    expect(toNumber(undefined)).toBeNaN(); // 测试 undefined
    expect(toNumber({})).toBeNaN(); // 测试对象
    expect(toNumber([1, 2, 3])).toBeNaN(); // 测试数组
  });

  // 测试特殊情况
  it('应当正确处理特殊情况', () => {
    expect(toNumber(NaN)).toBeNaN(); // 测试 NaN
    expect(toNumber('NaN')).toBeNaN(); // 测试字符串 'NaN'
  });
});
