import CryptoJS from 'crypto-js';
import SHA1 from '../../sha1';

/**
 * @zh AES加密
 * @en AES encryption
 * @param {string} text 待加密文本
 * @param {string} key 钥匙
 * @returns {string} 加密后的文本
 */
const encrypt = (text: string, key: string): string => {
  if (text) {
    const sha1 = SHA1(key, 32);
    const keyBytes = CryptoJS.enc.Utf8.parse(sha1.slice(16));
    const ivBytes = CryptoJS.enc.Utf8.parse(sha1.slice(0, 16));
    const encrypted = CryptoJS.AES.encrypt(text, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  return '';
};

export default encrypt;
