/**
 * @zh Base64 解码
 * @en Base64 decode
 * @param {string} text 待解码文本
 * @returns {string} 解码后的文本
 */
const decode = (text: string): string => Buffer.from(text, 'base64').toString('utf-8');

export default decode;
