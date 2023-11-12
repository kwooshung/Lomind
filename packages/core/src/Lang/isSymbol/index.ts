/**
 * 检查 value 是否是原始 Symbol 或者对象。
 *
 * @param value 要检查的值。
 * @returns {boolean} 如果是 Symbol 类型，返回 true，否则返回 false。
 * @version 0.0.1
 * @category Lang
 * @example
 * isSymbol(Symbol.iterator);
 * // => true
 *
 * isSymbol('abc');
 * // => false
 */
const isSymbol = (value: any): boolean => {
  const type = typeof value;
  // 直接使用 typeof 检查原始 Symbol 类型
  if (type === 'symbol') {
    return true;
  }
  return type === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Symbol]';
};
export default isSymbol;
