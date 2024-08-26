/**
 * @zh 将序列化的字符串反序列化为数据对象
 * @en Convert serialized string to data object
 * @param {string} data 序列化后的字符串
 * @returns {any | null} 反序列化后的数据，如果解析失败返回 null
 */
const from = (data: any): any | null => {
  try {
    return JSON.parse(data, (key, value) => {
      if (value && typeof value === 'object' && 'type' in value) {
        switch (value.type) {
          case 'BigInt':
            return BigInt(value.value);
          case 'Symbol':
            return Symbol(value.value.slice(7, -1)); // 提取 Symbol 描述
          case 'Function':
            return new Function(`return ${value.value}`)();
          case 'String':
            return value.value;
          case 'Number':
            return Number(value.value);
          case 'Boolean':
            return Boolean(value.value);
          case 'NaN':
            return NaN;
          case 'Infinity':
            return Infinity;
          case '-Infinity':
            return -Infinity;
          case 'Null':
            return null;
          case 'Undefined':
            return undefined;
          case 'Set':
            return new Set(value.value);
          case 'Map':
            return new Map(value.value);
          case 'RegExp':
            const match = value.value.match(/\/(.*?)\/([gimsuy]*)$/);
            return new RegExp(match[1], match[2]);
          case 'Date':
            return new Date(value.value);
          default:
            return value;
        }
      }
      return value;
    });
  } catch (error) {
    console.error('Failed to deserialize data:', error);
    return null; // 返回 null 表示解析失败
  }
};

export default from;
