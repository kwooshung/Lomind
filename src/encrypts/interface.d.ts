import TAes from './aes/interface';
import TBase64 from './base64/interface';

/**
 * @zh 使用 MD5 算法加密文本；注意MD5 已不被推荐用于高安全环境，同时 CryptoJS 在处理特殊字符时可能会出现问题，因此不推荐在安全性要求高的场景使用，推荐仅用于生成某些简单的字符串使用。
 * @en Encrypt text using MD5 algorithm, note that MD5 is not recommended for high-security environments, and CryptoJS may have problems when dealing with special characters, so it is not recommended to use it in high-security scenarios, it is recommended to use it only for generating some simple strings.
 * @param {string} text 待加密的文本
 * @param {number} len 加密长度
 * @returns {string} 加密后的文本
 */
type TMD5 = (text: string, len: number) => string;

/**
 * @zh 对字符串进行 SHA-1 加密
 * @en Encrypt text using SHA-1 algorithm
 * @param {string} text 待加密的文本
 * @param {number} len 输出哈希值的长度，最大40
 * @returns {string} 根据指定长度的十六进制字符串
 */
type TSHA1 = (text: string, len: number) => string;

/**
 * @zh 对字符串进行 SHA-256 加密
 * @en Encrypt text using SHA-256 algorithm
 * @param {string} text 待加密的文本
 * @param {number} len 输出哈希值的长度，最大64
 * @returns {string} 根据指定长度的十六进制字符串
 */
type TSHA256 = (text: string, len: number) => string;

/**
 * @zh 加密、哈希、编码
 * @en Encryption, hash, encoding
 */
type TEncrypts = {
  MD5: TMD5;
  SHA1: TSHA1;
  SHA256: TSHA256;
  Aes: TAes;
  Base64: TBase64;
};

export default TEncrypts;
