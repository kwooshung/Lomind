import { describe, it, expect } from 'vitest';
import concat from './';

describe('concat函数测试', () => {
  const array = [1];

  it('连接多个数组', () => {
    expect(concat([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(concat(array, 2, [3], [[4]])).toEqual([1, 2, 3, [4]]);
  });

  it('检查原数组是否被第一个测试改变', () => {
    expect(concat(array)).toEqual([1]);
  });

  it('连接数组和单个元素', () => {
    expect(concat(['a', 'b'], 'c')).toEqual(['a', 'b', 'c']);
  });

  it('连接包含嵌套数组的数组', () => {
    expect(concat([1, 2], [3, [4, 5]])).toEqual([1, 2, 3, [4, 5]]);
  });

  it('空数组应返回空数组', () => {
    expect(concat([])).toEqual([]);
  });

  it('非数组类型作为首个参数', () => {
    expect(concat('a', [1, 2])).toEqual(['a', 1, 2]);
  });

  it('仅有一个非数组参数', () => {
    expect(concat('a')).toEqual(['a']);
  });
});
