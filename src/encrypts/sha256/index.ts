import { cryptoLen } from '../../_internal';
import CryptoJS from 'crypto-js';

/**
 * 对字符串进行 SHA-256 加密
 * @param {string} text 待加密的文本
 * @param {number} len 输出哈希值的长度，最大64
 * @returns {string} 根据指定长度的十六进制字符串
 */
const encrypt = (text: string, len: number = 64): string => {
  // 计算 SHA-256 哈希值
  const hash = CryptoJS.SHA256(text);
  // 将哈希值转换为十六进制字符串
  const hex = hash.toString(CryptoJS.enc.Hex);

  return cryptoLen(hex, len, 64);
};

export default encrypt;
