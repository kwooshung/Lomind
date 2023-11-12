import { describe, it, expect } from 'vitest';
import drop from './';

describe('drop函数测试', () => {
  // 测试基本功能
  it('基本裁剪功能', () => {
    expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
  });

  // 裁剪的数量等于数组长度
  it('裁剪数量等于数组长度', () => {
    expect(drop([1, 2, 3], 3)).toEqual([]);
  });

  // 裁剪的数量大于数组长度
  it('裁剪数量大于数组长度', () => {
    expect(drop([1, 2, 3], 5)).toEqual([]);
  });

  // 裁剪的数量为0
  it('裁剪数量为0', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  // 未提供裁剪数量
  it('未提供裁剪数量，默认裁剪1个', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
  });

  // 提供的数组为null或undefined
  it('提供的数组为null或undefined', () => {
    expect(drop(null as any)).toEqual([]);
    expect(drop(undefined as any)).toEqual([]);
  });

  // 裁剪的数量为负数
  it('裁剪的数量为负数', () => {
    expect(drop([1, 2, 3], -1)).toEqual([1, 2, 3]);
  });

  // 提供的不是数组类型
  it('提供的不是数组类型', () => {
    expect(drop('不是数组' as any, 2)).toEqual([]);
  });

  // 测试 _.drop([1, 2, 3]);
  it('默认裁剪1个元素', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
  });

  // 测试 _.drop([1, 2, 3], 2);
  it('裁剪前2个元素', () => {
    expect(drop([1, 2, 3], 2)).toEqual([3]);
  });

  // 测试 _.drop([1, 2, 3], 5);
  it('裁剪数量大于数组长度', () => {
    expect(drop([1, 2, 3], 5)).toEqual([]);
  });

  // 测试 _.drop([1, 2, 3], 0);
  it('裁剪数量为0', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
});
