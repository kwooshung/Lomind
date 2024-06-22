import { describe, it, expect } from 'vitest';
import { encrypt, decrypt } from '.';

describe('AES 加解密测试', () => {
  const text = 'hello world';
  const key = 'my secret key';

  it('应对字符串进行 AES 加密和解密', () => {
    const encrypted = encrypt(text, key);
    const decrypted = decrypt(encrypted, key);
    expect(decrypted).toBe(text);
  });

  it('应对空字符串进行 AES 加密', () => {
    const encrypted = encrypt('', key);
    expect(encrypted).toBe('');
  });

  it('应对空字符串进行 AES 解密', () => {
    const decrypted = decrypt('', key);
    expect(decrypted).toBe('');
  });

  it('应对 AES 加密后的文本进行解密', () => {
    const encrypted = encrypt(text, key);
    const decrypted = decrypt(encrypted, key);
    expect(decrypted).toBeTruthy();
    expect(decrypted).toBe(text);
  });

  it('对应其他AES加密结果，应当与其他版本的实现的加密数据，可解密', () => {
    const encrypted = 'g/lWnIj76GVn1qpt/0G4/jN/S2++1l+8anbe7UOG7Ec=';
    const decrypted = decrypt(encrypted, key);
    expect(decrypted).toBe(`!@#$%^&*()_+-={}[]:";'<>?,./`);
  });

  it('对于本代码加密的数据，应当与其他版本的实现结果一致', () => {
    const encrypted = 'hello world';
    const decrypted = encrypt(encrypted, key);
    expect(decrypted).toBe('9N4FDRYLqFRftEddJ8uJQg==');
  });
});
