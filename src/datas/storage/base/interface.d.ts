/**
 * @zh 存储序列化接口
 * @en Storage serialization interface
 */
type TSerializer = {
  /**
   * @zh 序列化
   * @en Serialize
   * @param {any} data 数据
   * @returns {string} 序列化后的字符串
   */
  serialize: (data: any) => string;

  /**
   * @zh 反序列化
   * @en Deserialize
   * @param {string} data 字符串
   * @returns {any} 反序列化后的数据
   */
  deserialize: (data: string) => any;
};

export default TSerializer;
