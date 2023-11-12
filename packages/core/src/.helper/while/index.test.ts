import { describe, expect, it } from 'vitest';
import _while from '.';

describe('测试 _while 函数', () => {
  it('从左侧开始丢弃元素，直到断言函数返回假值', () => {
    const array = [1, 2, 3, 4, 5];
    const result = _while(array, (n) => n < 3, true, false);
    expect(result).toEqual([3, 4, 5]);
  });

  it('从右侧开始丢弃元素，直到断言函数返回假值', () => {
    const array = [1, 2, 3, 4, 5];
    const result = _while(array, (n) => n > 3, true, true);
    expect(result).toEqual([1, 2, 3]);
  });

  it('从左侧开始获取元素，直到断言函数返回假值', () => {
    const array = [1, 2, 3, 4, 5];
    const result = _while(array, (n) => n < 4, false, false);
    expect(result).toEqual([1, 2, 3]);
  });

  it('从右侧开始获取元素，直到断言函数返回假值', () => {
    const array = [1, 2, 3, 4, 5];
    const result = _while(array, (n) => n > 2, false, true);
    expect(result).toEqual([3, 4, 5]);
  });
});
