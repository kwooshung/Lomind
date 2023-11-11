const { GoogleTranslator } = require('@translate-tools/core/translators/GoogleTranslator/index.js');

/**
 * 停留时间
 * @type {number} [ms = 10] 停留时间
 */
const delay = (ms = 10) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Google 翻译器
 * @type {GoogleTranslator}
 */
const translator = new GoogleTranslator();

/**
 * 翻译文本 > 中文翻译为英文
 * @param {string} text 要翻译的文本
 * @param {string} [from = 'zh_CN'] 源语言
 * @param {string} [to = 'en_US'] 目标语言
 * @returns {Promise<string>} 翻译后的文本
 */
const translateText = async (text, from = 'zh_CN', to = 'en_US') => await translator.translate(text, from, to);

module.exports = {
  delay,
  translateText
};
