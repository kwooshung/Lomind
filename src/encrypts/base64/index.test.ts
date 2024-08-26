import { encode, decode } from '.';

describe('Base64', () => {
  const text = 'hello world';
  const base64Text = 'aGVsbG8gd29ybGQ=';

  it('应对字符串进行 BASE64 编码', () => {
    const encoded = encode(text);
    expect(encoded).toBe(base64Text);
  });

  it('应对字符串进行 BASE64 解码', () => {
    const decoded = decode(base64Text);
    expect(decoded).toBe(text);
  });

  it('应对空字符串进行 BASE64 编码', () => {
    const encoded = encode('');
    expect(encoded).toBe('');
  });

  it('应对空字符串进行 BASE64 解码', () => {
    const decoded = decode('');
    expect(decoded).toBe('');
  });

  it('对应其他Base64编码结果，应当与其他版本的实现的编码数据，可解码', () => {
    const base64Text = 'aGVsbG8gd29ybGQ=';
    const decoded = decode(base64Text);
    expect(decoded).toBe('hello world');
  });

  it('对于本代码编码的数据，应当与其他版本的实现结果一致', () => {
    const encrypted = 'hello world';
    const decrypted = encode(encrypted);
    expect(decrypted).toBe('aGVsbG8gd29ybGQ=');
  });
});
