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

  it('应当处理 valueOf 方法返回另一个对象的情况', () => {
    const objectWithNestedObject1 = {
      valueOf: () => ({ inner: 1 }),
      toString: () => 'nested object'
    };
    const objectWithNestedObject2 = {
      valueOf: () => ({ inner: 1 }),
      toString: () => '3'
    };
    const date = new Date();

    expect(toNumber(objectWithNestedObject1)).toBe(NaN);
    expect(toNumber(objectWithNestedObject2)).toBe(3);
    expect(toNumber(date)).toBe(date.valueOf());
  });

  it('应当处理 Symbol 类型的输入', () => {
    expect(toNumber(Symbol('test'))).toBeNaN();
  });

  it('应当正确处理值为 0 的情况', () => {
    expect(toNumber('0')).toBe(0);
  });

  it('应当正确处理空字符串', () => {
    expect(toNumber('')).toBe(0);
    expect(toNumber(' ')).toBe(0);
  });

  it('应当正确处理非标准格式的数值字符串', () => {
    expect(toNumber('123abc')).toBeNaN();
    expect(toNumber('abc')).toBeNaN();
  });

  it('应当正确处理极端数值', () => {
    expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });

  it('应当正确处理特殊数值的字符串表示', () => {
    expect(toNumber('Infinity')).toBe(Infinity);
    expect(toNumber('-Infinity')).toBe(-Infinity);
    expect(toNumber('NaN')).toBeNaN();
  });

  it('应当正确处理 valueOf 和 toString 都返回非原始值的对象', () => {
    const complexObject = {
      valueOf: () => ({ value: 1 }),
      toString: () => 'object'
    };
    expect(toNumber(complexObject)).toBeNaN();
  });
});
