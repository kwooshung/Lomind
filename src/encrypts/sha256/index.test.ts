import encrypt from '.';

describe('SHA-256 加密测试', () => {
  it('应对字符串进行完整的 SHA-256 加密', () => {
    const result = encrypt('hello world');
    expect(result).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
  });

  it('应对字符串进行指定长度的 SHA-256 加密 (len = 16)', () => {
    const result = encrypt('hello world', 16);
    expect(result).toBe('b94d27b9e2efcde9');
  });

  it('应对字符串进行最小长度的 SHA-256 加密 (len = 1)', () => {
    const result = encrypt('hello world', 1);
    expect(result).toBe('9');
  });

  it('应对空字符串进行 SHA-256 加密', () => {
    const result = encrypt('');
    expect(result).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  it('应对奇数长度进行 SHA-256 加密 (len = 7)', () => {
    const result = encrypt('hello world', 7);
    expect(result).toBe('b94cde9');
  });

  it('应对偶数长度进行 SHA-256 加密 (len = 8)', () => {
    const result = encrypt('hello world', 8);
    expect(result).toBe('b94dcde9');
  });

  it('应对输出长度大于64进行 SHA-256 加密', () => {
    const result = encrypt('hello world', 70);
    expect(result).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
  });

  it('应对输出长度小于1进行 SHA-256 加密 (len = 0)', () => {
    const result = encrypt('hello world', 0);
    expect(result).toBe('b');
  });
});
