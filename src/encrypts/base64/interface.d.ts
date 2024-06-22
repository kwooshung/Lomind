/**
 * @zh AES加密
 * @en AES Encodeion
 * @param {string} text 待加密文本
 * @param {string} key 钥匙
 * @returns {string} 加密后的文本
 */
type TEncode = (text: string, key: string) => string;

/**
 * @zh AES解密
 * @en AES decryption
 * @param {string} text 待解密文本
 * @param {string} key 钥匙
 * @returns {string} 解密后的文本
 */
type TDecode = (text: string, key: string) => string;

/**
 * @zh base64 加解密
 * @en base64 encode and decode
 */
type TBase64 = {
  encode: TEncode;
  decode: TDecode;
};

export default TBase64;
