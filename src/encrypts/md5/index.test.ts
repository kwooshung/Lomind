import MD5 from '.';

describe('Encrypt.MD5', () => {
  it('应该正确加密文本并返回32位哈希', () => {
    const text = 'Hello, World!';
    const result = MD5(text);
    expect(result).toBe('65a8e27d8879283831b664bd8b7f0ad4');
  });

  it('应该返回指定长度的哈希 (len = 16)', () => {
    const text = 'Hello, World!';
    const result = MD5(text, 16);
    expect(result).toBe('65a8e27d8b7f0ad4');
    expect(result.length).toBe(16);
  });

  it('应该返回1位哈希 (len = 1)', () => {
    const text = 'Hello, World!';
    const result = MD5(text, 1);
    expect(result).toBe('4');
    expect(result.length).toBe(1);
  });

  it('应该正确处理 len < 1 的情况', () => {
    const text = 'Hello, World!';
    const result = MD5(text, 0);
    expect(result).toBe('6');
    expect(result.length).toBe(1);
  });

  it('应该返回指定长度的哈希 (len 为奇数)', () => {
    const text = 'Hello, World!';
    const result = MD5(text, 15);
    expect(result).toBe('65a8e278b7f0ad4');
    expect(result.length).toBe(15);
  });

  it('应该返回指定长度的哈希 (len 为偶数)', () => {
    const text = 'Hello, World!';
    const result = MD5(text, 16);
    expect(result).toBe('65a8e27d8b7f0ad4');
    expect(result.length).toBe(16);
  });

  it('当 len > 32 时应返回32位哈希', () => {
    const text = 'Hello, World!';
    const result = MD5(text, 40);
    expect(result).toBe('65a8e27d8879283831b664bd8b7f0ad4');
    expect(result.length).toBe(32);
  });

  it('当文本为空时应返回哈希', () => {
    const text = '';
    const result = MD5(text);
    expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });

  it('当文本为特殊字符时应正确处理', () => {
    const text = '!@#$%^&*()_+-={}[]:";<>?,./';
    const result = MD5(text);
    expect(result).toBe('999f1495341c72ea84b438822ca4c688');
  });

  it('应正确处理中文字符', () => {
    const text = '你好，世界！';
    const result = MD5(text);
    expect(result).toBe('5082079d92a8ef985f59e001d445ff20');
  });
});
