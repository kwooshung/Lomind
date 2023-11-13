import { describe, it, expect } from 'vitest';
import build from '.';

describe('测试 build 函数', () => {
  it('使用默认参数', () => {
    const result = build();
    expect(result).toHaveLength(10000);
  });

  it('测试生成的数组元素长度是否符合要求', () => {
    const result = build(100, 2, 10, 0, 20);
    result.forEach((item) => {
      if (typeof item === 'string') {
        expect(item.length).toBeGreaterThanOrEqual(2);
        expect(item.length).toBeLessThanOrEqual(10);
      } else {
        expect(item).toBeGreaterThanOrEqual(0);
        expect(item).toBeLessThanOrEqual(20);
      }
    });
  });

  it('生成指定长度的数组', () => {
    const length = 500;
    const result = build(length);
    expect(result).toHaveLength(length);
  });

  it('数组中包含字符串和数字', () => {
    const result = build(100, 1, 1, 1, 1);
    const hasString = result.some((item) => typeof item === 'string');
    const hasNumber = result.some((item) => typeof item === 'number');
    expect(hasString).toBe(true);
    expect(hasNumber).toBe(true);
  });

  it('测试字符串长度的限制', () => {
    const minLength = 3;
    const maxLength = 8;
    const result = build(100, minLength, maxLength);
    result.forEach((item) => {
      if (typeof item === 'string') {
        expect(item.length).toBeGreaterThanOrEqual(minLength);
        expect(item.length).toBeLessThanOrEqual(maxLength);
      }
    });
  });

  it('测试数字范围的限制', () => {
    const minNumber = 10;
    const maxNumber = 500;
    const result = build(100, 4, 12, minNumber, maxNumber);
    result.forEach((item) => {
      if (typeof item === 'number') {
        expect(item).toBeGreaterThanOrEqual(minNumber);
        expect(item).toBeLessThanOrEqual(maxNumber);
      }
    });
  });
});
