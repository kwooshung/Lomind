import { generate } from '../../../../../../.internal';
import quick from '.';

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
    const expected = [1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9, 'apple', 'b1', 'banana', 'cherry'];
    const result = quick(input);

    expect(result).to.deep.equal(expected);
  });

  it(`测试100万条，4-12位的字符串数据 和 0-99999 的数据排序，执行速度是否小于1500ms（在本机测试，为了 test ci 测试通过，所以设置这么大，经过多轮测试，平均为550ms左右）`, () => {
    const datas = generate.array(1000000);

    const startTime = performance.now();
    quick(datas);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`快速排序，测试10万条，4-12位的字符串数据 和 0-99999 的数据排序，执行速度 > ${executionTime}ms`);
    const expectedTime = 1500;
    expect(executionTime).toBeLessThan(expectedTime);
  });
});
