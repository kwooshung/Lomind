import { generate } from '../../../../../../.internal';
import quick from '.';

/**
 * 简单比较函数
 * @param {number|string} a 比较值
 * @param {number|string} b 比较值
 * @returns {number} 比较结果
 */
const simpleCompare = (a: number | string, b: number | string): number => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
};

/**
 * 自定义比较函数
 * @param {number|string} a 比较值
 * @param {number|string} b 比较值
 * @returns {number} 比较结果
 */
const customCompare = (a: number | string, b: number | string): number => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b; // 数字比较
  } else if (typeof a === 'string' && typeof b === 'string') {
    return simpleCompare(a, b); // 字符串比较
  } else {
    // 类型不同，将字符串排在前面
    return typeof a === 'string' ? -1 : 1;
  }
};

describe('快速排序', () => {
  it('对 数字数组 进行排序', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6];
    const expected = [1, 1, 2, 3, 4, 5, 6, 9];
    const result = quick(input);

    expect(result).to.deep.equal(expected);
  });

  it('对 字符串数组 进行排序', () => {
    const input = ['banana', 'apple', 'cherry'];
    const expected = ['apple', 'banana', 'cherry'];
    const result = quick(input);

    expect(result).to.deep.equal(expected);
  });

  it('对 字符串和数字数组 进行排序', () => {
    const input = [3, 1, 4, 1, 'banana', 'b1', 5, 3, 5, 8, 9, 7, 9, 3, 'apple', 'cherry', 5, 9, 2, 6];
    const expected = ['apple', 'b1', 'banana', 'cherry', 1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9];
    const result = quick(input, customCompare);

    expect(result).to.deep.equal(expected);
  });

  it(`测试10万条，4-12位的字符串数据和0-99999的数据排序执行速度`, () => {
    const datas = generate.array(100000);

    const startTime = performance.now();
    quick(datas);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    const expectedTime = 600; //在本机测试，平均执行时间为 550ms
    expect(executionTime).toBeLessThan(expectedTime);
  });
});
