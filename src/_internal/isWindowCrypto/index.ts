/**
 * @zh 检测是否支持 `window.crypto.subtle`
 * @en Check if `window.crypto.subtle` is supported
 * @returns {boolean} 是否支持 `window.crypto.subtle`
 */
const isWindowCrypto = (): boolean => !!(typeof window !== 'undefined' && window.crypto && window.crypto.subtle);

export default isWindowCrypto;
