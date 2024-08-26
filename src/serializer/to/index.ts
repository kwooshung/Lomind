/**
 * @zh 序列化方法，处理所有 JavaScript 数据类型
 * @en Serialization method, handling all JavaScript data types
 * @param {any} data 数据
 * @returns {string} 序列化后的字符串
 */
const to = (data: any): string => {
  const seen = new WeakSet();

  return JSON.stringify(data, (key, value) => {
    // 处理循环引用
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return; // 终止循环引用
      }
      seen.add(value);
    }

    const type = typeof value;

    if (type === 'undefined') return { type: 'Undefined' };
    if (type === 'function') return { type: 'Function', value: value.toString() };
    if (type === 'symbol') return { type: 'Symbol', value: value.toString() };
    if (type === 'bigint') return { type: 'BigInt', value: value.toString() };
    if (value instanceof Date) {
      return { type: 'Date', value: value.toISOString() };
    }
    if (Number.isNaN(value)) return { type: 'NaN' };
    if (value === Infinity) return { type: 'Infinity' };
    if (value === -Infinity) return { type: '-Infinity' };
    if (value instanceof RegExp) return { type: 'RegExp', value: value.toString() };
    if (value instanceof Date) return { type: 'Date', value: value.toISOString() };
    if (value instanceof Set) return { type: 'Set', value: Array.from(value) };
    if (value instanceof Map)
      return {
        type: 'Map',
        value: Array.from(value.entries())
      };
    if (value === null) return { type: 'Null' };

    return value;
  });
};

export default to;
