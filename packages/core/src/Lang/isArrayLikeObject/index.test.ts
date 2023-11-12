import { describe, it, expect } from 'vitest';
import isArrayLikeObject from './';

// 测试描述
describe('isArrayLikeObject', () => {
  // 测试普通数组
  it('应该返回 true 当值是一个数组', () => {
    expect(isArrayLikeObject([1, 2, 3])).toBe(true);
  });

  // 测试类似数组的对象
  it('应该返回 true 当值是一个类似数组的对象', () => {
    expect(isArrayLikeObject({ length: 0 })).toBe(true);
  });

  // 测试字符串（非类似数组对象）
  it('应该返回 false 当值是一个字符串', () => {
    expect(isArrayLikeObject('abc')).toBe(false);
  });

  // 测试 null
  it('应该返回 false 当值是 null', () => {
    expect(isArrayLikeObject(null)).toBe(false);
  });

  // 测试 undefined
  it('应该返回 false 当值是 undefined', () => {
    expect(isArrayLikeObject(undefined)).toBe(false);
  });

  // 测试非对象类型（例如数字）
  it('应该返回 false 当值是一个非对象类型', () => {
    expect(isArrayLikeObject(123)).toBe(false);
  });

  // 测试一个不包含 length 属性的对象
  it('应该返回 false 当对象没有 length 属性', () => {
    expect(isArrayLikeObject({ a: 1 })).toBe(false);
  });

  // 测试一个具有非数字类型 length 属性的对象
  it('应该返回 false 当对象的 length 属性不是数字', () => {
    expect(isArrayLikeObject({ length: 'not a number' })).toBe(false);
  });

  // 测试一个具有负数 length 属性的对象
  it('应该返回 false 当对象的 length 属性是负数', () => {
    expect(isArrayLikeObject({ length: -1 })).toBe(false);
  });
});
