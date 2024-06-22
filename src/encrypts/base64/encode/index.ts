/**
 * @zg 将文本进行 base64 编码
 * @param {string} text 待加密文本
 * @returns {string} 加密后的文本
 */
const encode = (text: string): string => Buffer.from(text, 'utf-8').toString('base64');

export default encode;
