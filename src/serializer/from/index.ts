/**
 * @zh 将序列化的字符串反序列化为数据对象
 * @en Convert serialized string to data object
 * @param {string} data 序列化后的字符串
 * @returns {any | null} 反序列化后的数据，如果解析失败返回 null
 */
const from = (data: string): any => {
  try {
    return JSON.parse(data, (key, value) => {
      if (value && value.type === 'Set') {
        return new Set(value.value);
      }
      if (value && value.type === 'Map') {
        return new Map(value.value);
      }
      if (value && value.type === 'RegExp') {
        const match = value.value.match(/\/(.*?)\/([gimsuy]*)$/);
        return new RegExp(match[1], match[2]);
      }
      if (value && value.type === 'Date') {
        return new Date(value.value);
      }
      return value;
    });
  } catch (error) {
    console.error('Failed to deserialize data:', error);
    return null; // 返回 null 表示解析失败
  }
};

export default from;
