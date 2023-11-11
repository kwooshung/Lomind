/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from 'vitest';
import slice from './';

describe('slice 函数测试', () => {
  const data = [1, 2, 3, 4, 5];

  it('应正确处理正常范围', () => {
    expect(slice(data, 1, 4)).toEqual([2, 3, 4]);
  });

  it('当 start 为负数时应正确处理', () => {
    expect(slice(data, -3, 4)).toEqual([3, 4]);
  });

  it('当 start 和 end 都为负数时应正确处理', () => {
    expect(slice(data, -4, -1)).toEqual([2, 3, 4]);
  });

  it('当 end 为负数时应正确处理', () => {
    expect(slice(data, 1, -1)).toEqual([2, 3, 4]);
  });

  it('当 start 大于 end 时应返回空数组', () => {
    expect(slice(data, 4, 2)).toEqual([]);
  });

  it('处理起始或结束索引超出数组长度的情况', () => {
    expect(slice([1, 2, 3], 1, 5)).toEqual([2, 3]);
    expect(slice([1, 2, 3], -5, 2)).toEqual([1, 2]);

    [5, 6, 2 ** 64, Infinity, -Infinity, -2].map((start) => expect(slice(data, start)).toEqual([]));
  });

  it('当数组为空时应返回空数组', () => {
    expect(slice([], 1, 4)).toEqual([]);
  });

  it('当数组为 null 或 undefined 时应返回空数组', () => {
    // @ts-ignore next-line
    expect(slice(null)).toEqual([]);
    // @ts-ignore next-line
    expect(slice(undefined)).toEqual([]);
    // @ts-ignore next-line
    expect(slice(null, 1, 4)).toEqual([]);
  });

  it('处理负起始和结束索引的情况', () => {
    expect(slice(data, -4, -1)).toEqual([2, 3, 4]);
  });
});

export default slice;
