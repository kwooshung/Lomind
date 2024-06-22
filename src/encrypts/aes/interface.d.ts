/**
 * @zh AES加密
 * @en AES encryption
 * @param {string} text 待加密文本
 * @param {string} key 钥匙
 * @returns {string} 加密后的文本
 */
type TEncrypt = (text: string, key: string) => string;

/**
 * @zh AES解密
 * @en AES decryption
 * @param {string} text 待解密文本
 * @param {string} key 钥匙
 * @returns {string} 解密后的文本
 */
type TDecrypt = (text: string, key: string) => string;

/**
 * @zh AES 加解密
 * @en AES encryption and decryption
 */
type TAes = {
  encrypt: TEncrypt;
  decrypt: TDecrypt;
};

export default TAes;
