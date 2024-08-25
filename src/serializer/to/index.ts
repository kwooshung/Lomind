/**
 * @zh 序列化方法，处理各种 JavaScript 数据类型
 * @en Serialization method, handling various JavaScript data types
 * @param {any} data 数据
 * @returns {string} 序列化后的字符串
 */
const to = (data: any): string =>
  JSON.stringify(data, (key, value) => {
    if (value instanceof Set) {
      return { type: 'Set', value: [...value] };
    }
    if (value instanceof Map) {
      return { type: 'Map', value: [...value] };
    }
    if (value instanceof RegExp) {
      return { type: 'RegExp', value: value.toString() };
    }
    if (value instanceof Date) {
      return { type: 'Date', value: value.toISOString() };
    }
    return value;
  });

export default to;
