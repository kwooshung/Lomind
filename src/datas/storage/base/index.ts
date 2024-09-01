import Serializer from '../../../serializer';
import TSerializer from './interface';

/**
 * @zh 存储基类
 * @en Storage base class
 */
class Base {
  /**
   * @zh 前缀
   * @en Prefix
   */
  private _prefix: string = '';

  /**
   * @zh 过期键后缀
   * @en Expire key suffix
   */
  public _expireKeySuffix: string = '_ks_expire';

  /**
   * @zh 序列化器
   * @en Serializer
   */
  public serializer: TSerializer = {
    serialize: Serializer.to,
    deserialize: Serializer.from
  };

  /**
   * @zh 设置前缀
   * @en Set key prefix
   * @param {string} prefix 键的前缀
   */
  public prefix(prefix: string): void {
    this._prefix = prefix;
  }

  /**
   * @zh 存储数据
   * @en Store data
   * @param {Storage} storage 存储对象（localStorage 或 sessionStorage）
   * @param {string} key 键
   * @param {any} value 值
   * @param {number} [expireMillis] 过期时间（以毫秒为单位），如果不设置则永久存储
   */
  public set(storage: Storage, key: string, value: any, expireMillis?: number): void {
    const fullKey = this._prefix + key; // 确认前缀使用一致
    const data = this.serializer.serialize(value);

    storage.setItem(fullKey, data);

    if (expireMillis) {
      const expireTime = new Date().getTime() + expireMillis;
      storage.setItem(fullKey + this._expireKeySuffix, expireTime.toString());
    }
  }

  /**
   * @zh 读取数据
   * @en Retrieve data
   * @param {Storage} storage 存储对象（localStorage 或 sessionStorage）
   * @param {string} key 键
   * @returns {any | null} 返回存储的值或 null
   */
  public get(storage: Storage, key: string): any | null {
    const fullKey = this._prefix + key; // 确认前缀使用一致
    const expireTime = storage.getItem(fullKey + this._expireKeySuffix);

    if (expireTime && new Date().getTime() > parseInt(expireTime)) {
      this.remove(storage, key);
      return null;
    }

    const data = storage.getItem(fullKey);
    if (!data) {
      return null;
    }

    return this.serializer.deserialize(data);
  }

  /**
   * @zh 删除数据
   * @en Remove data
   * @param {Storage} storage 存储对象（localStorage 或 sessionStorage）
   * @param {string} key 键
   */
  public remove(storage: Storage, key: string): void {
    const fullKey = this._prefix + key;
    storage.removeItem(fullKey);
    storage.removeItem(fullKey + this._expireKeySuffix);
  }

  /**
   * @zh 清除所有数据
   * @en Clear all data
   * @param {Storage} storage 存储对象（localStorage 或 sessionStorage）
   */
  public clear(storage: Storage): void {
    storage.clear();
  }
}

export default Base;
