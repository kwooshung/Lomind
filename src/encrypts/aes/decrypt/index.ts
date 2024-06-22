import CryptoJS from 'crypto-js';
import SHA1 from '../../sha1';

/**
 * @zh AES解密
 * @en AES decryption
 * @param {string} text 待解密文本
 * @param {string} key 钥匙
 * @returns {string} 解密后的文本
 */
const decrypt = (text: string, key: string): string => {
  if (text) {
    const sha1 = SHA1(key, 32);
    const keyBytes = CryptoJS.enc.Utf8.parse(sha1.slice(16));
    const ivBytes = CryptoJS.enc.Utf8.parse(sha1.slice(0, 16));
    const decrypted = CryptoJS.AES.decrypt(text, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  return '';
};

export default decrypt;
