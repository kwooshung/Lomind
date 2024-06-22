import { cryptoLen } from '../../_internal';
import { MD5, enc } from 'crypto-js';

/**
 * @zh 使用 MD5 算法加密文本；注意MD5 已不被推荐用于高安全环境，同时 CryptoJS 在处理特殊字符时可能会出现问题，因此不推荐在安全性要求高的场景使用，推荐仅用于生成某些简单的字符串使用。
 * @en Encrypt text using MD5 algorithm, note that MD5 is not recommended for high-security environments, and CryptoJS may have problems when dealing with special characters, so it is not recommended to use it in high-security scenarios, it is recommended to use it only for generating some simple strings.
 * @param {string} text 待加密的文本
 * @param {number} len 加密长度
 * @returns {string} 加密后的文本
 */
const encrypt = (text: string, len: number = 32): string => {
  // 将输入的文本转换为UTF-8编码的字节数组，然后计算MD5哈希
  const utf8Text = enc.Utf8.parse(text);
  const hash = MD5(utf8Text).toString(enc.Hex);
  return cryptoLen(hash, len, 32);
};

export default encrypt;
