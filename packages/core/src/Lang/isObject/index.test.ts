import { describe, it, expect } from 'vitest';
import isObject from './';

describe('isObject 函数测试', () => {
  // 测试普通对象
  it('应当对普通对象返回 true', () => {
    expect(isObject({})).toBe(true);
  });

  it('应该为对象返回 true', () => {
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject(Object(false))).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Error())).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(Object(0))).toBe(true);
    expect(isObject(/x/)).toBe(true);
    expect(isObject(Object('a'))).toBe(true);
  });

  // 测试数组
  it('应当对数组返回 true', () => {
    expect(isObject([1, 2, 3])).toBe(true);
  });

  // 测试函数
  it('应当对函数返回 true', () => {
    expect(isObject(() => {})).toBe(true);
  });

  // 测试 null
  it('应当对 null 返回 false', () => {
    expect(isObject(null)).toBe(false);
  });

  // 测试 undefined
  it('应当对 undefined 返回 false', () => {
    expect(isObject(undefined)).toBe(false);
  });

  // 测试字符串
  it('应当对字符串返回 false', () => {
    expect(isObject('string')).toBe(false);
  });

  // 测试数字
  it('应当对数字返回 false', () => {
    expect(isObject(123)).toBe(false);
  });

  // 测试布尔值
  it('应当对布尔值返回 false', () => {
    expect(isObject(true)).toBe(false);
  });
});
