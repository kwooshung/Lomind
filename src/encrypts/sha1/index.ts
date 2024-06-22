import { cryptoLen } from '../../_internal';
import CryptoJS from 'crypto-js';

/**
 * @zh 对字符串进行 SHA-1 加密
 * @en Encrypt text using SHA-1 algorithm
 * @param {string} text 待加密的文本
 * @param {number} len 输出哈希值的长度，最大40
 * @returns {string} 根据指定长度的十六进制字符串
 */
const encrypt = (text: string, len: number = 40): string => {
  // 计算 SHA-1 哈希值
  const hash = CryptoJS.SHA1(text);
  // 将哈希值转换为十六进制字符串
  const hex = hash.toString(CryptoJS.enc.Hex);

  return cryptoLen(hex, len, 40);
};

export default encrypt;
