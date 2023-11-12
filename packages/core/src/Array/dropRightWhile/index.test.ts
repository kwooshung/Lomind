import { describe, it, expect } from 'vitest';
import dropRightWhile from './';

describe('dropRightWhile 函数测试', () => {
  it('应该从数组末尾移除元素，直到断言函数返回假值', () => {
    const array = [1, 2, 3, 4, 5];
    const result = dropRightWhile(array, (n: number) => n > 3);
    expect(result).toEqual([1, 2, 3]);
  });

  it('对于空数组，应返回空数组', () => {
    expect(dropRightWhile([], (n: number) => n < 3)).toEqual([]);
  });

  it('对于未定义的数组，应返回空数组', () => {
    expect(dropRightWhile(undefined as any, (n: number) => n < 3)).toEqual([]);
  });

  it('当断言函数永远返回真值时，应返回空数组', () => {
    expect(dropRightWhile([1, 2, 3, 4], () => true)).toEqual([]);
  });

  it('当断言函数永远返回假值时，应返回原数组', () => {
    expect(dropRightWhile([1, 2, 3, 4], () => false)).toEqual([1, 2, 3, 4]);
  });

  it('应使用函数作为断言处理对象数组', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false }
    ];
    const result = dropRightWhile(users, (o) => !o.active);
    expect(result).toEqual([{ user: 'barney', active: true }]);
  });

  it('应使用 _.matches 迭代器速记', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false }
    ];
    const result = dropRightWhile(users, { user: 'pebbles', active: false });
    expect(result).toEqual([
      { user: 'barney', active: true },
      { user: 'fred', active: false }
    ]);
  });

  it('应使用 _.matchesProperty 迭代器速记', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false }
    ];
    const result = dropRightWhile(users, ['active', false]);
    expect(result).toEqual([{ user: 'barney', active: true }]);
  });

  it('应使用 _.property 迭代器速记', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false }
    ];
    const result = dropRightWhile(users, 'active');
    expect(result).toEqual(users);
  });
});
