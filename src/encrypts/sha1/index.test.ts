import SHA1 from '.';

describe('SHA-1 加密测试', () => {
  it('应对字符串进行完整的 SHA-1 加密', () => {
    const result = SHA1('hello world');
    expect(result).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
  });

  it('应对字符串进行指定长度的 SHA-1 加密 (len = 10)', () => {
    const result = SHA1('hello world', 10);
    expect(result).toBe('2aae6846ed');
  });

  it('应对字符串进行最小长度的 SHA-1 加密 (len = 1)', () => {
    const result = SHA1('hello world', 1);
    expect(result).toBe('d');
  });

  it('应对空字符串进行 SHA-1 加密', () => {
    const result = SHA1('');
    expect(result).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  it('应对奇数长度进行 SHA-1 加密 (len = 7)', () => {
    const result = SHA1('hello world', 7);
    expect(result).toBe('2aa46ed');
  });

  it('应对偶数长度进行 SHA-1 加密 (len = 8)', () => {
    const result = SHA1('hello world', 8);
    expect(result).toBe('2aae46ed');
  });

  it('应对输出长度大于40进行 SHA-1 加密', () => {
    const result = SHA1('hello world', 50);
    expect(result).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
  });

  it('应对输出长度小于1进行 SHA-1 加密 (len = 0)', () => {
    const result = SHA1('hello world', 0);
    expect(result).toBe('2');
  });

  it('当文本为特殊字符时应正确处理', () => {
    const text = '!@#$%^&*()_+-={}[]:";\'<>?,./';
    const result = SHA1(text);
    expect(result).toBe('9ea392b116a364e56051cc7b7ab8f891c3b1153c');
  });
});
