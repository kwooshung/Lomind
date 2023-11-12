import { describe, it, expect } from 'vitest';
import chunk from './';

describe('chunk函数测试', () => {
  it('应正确地分割数组', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4]
    ]);
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
    expect(chunk([{ id: 1 }, { id: 2 }, { id: 3 }], 1)).toEqual([[{ id: 1 }], [{ id: 2 }], [{ id: 3 }]]);
  });

  it('size为0时应返回空数组', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
  });

  it('空数组应返回空数组', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('数组为null或undefined时应返回空数组', () => {
    expect(chunk(null, 3)).toEqual([]);
    expect(chunk(undefined, 3)).toEqual([]);
  });

  it('size大于数组长度时应返回原数组作为单个块', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
});
