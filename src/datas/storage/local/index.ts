import Base from '../base';

/**
 * @zh LocalStorage 管理类
 * @en LocalStorage management class
 */
class Local {
  /**
   * @zh 单例实例
   * @en Singleton instance
   */
  private static instance: Local;

  /**
   * @zh 基类实例
   * @en Base instance
   */
  private static base: Base;

  /**
   * @zh 私有构造函数
   * @en Private constructor
   */
  private constructor() {}

  /**
   * @zh 获取单例实例
   * @en Get singleton instance
   * @returns {Local} 单例实例
   */
  public static getInstance(): Local {
    if (!Local.instance) {
      Local.base = new Base();
      Local.instance = new Local();
    }
    return Local.instance;
  }

  /**
   * @zh 存储数据
   * @en Store data
   * @param {string} key 键
   * @param {any} value 值
   * @param {number} [expireMillis] 过期时间（以毫秒为单位），如果不设置则永久存储
   */
  public set = (key: string, value: any, expireMillis?: number): void => Local.base.set(localStorage, key, value, expireMillis);

  /**
   * @zh 读取数据
   * @en Retrieve data
   * @param {string} key 键
   * @returns {any | null} 返回存储的值或 null
   */
  public get = (key: string): any | null => Local.base.get(localStorage, key);

  /**
   * @zh 删除数据
   * @en Remove data
   * @param {string} key 键
   */
  public remove = (key: string): void => Local.base.remove(localStorage, key);

  /**
   * @zh 清除所有数据
   * @en Clear all data
   */
  public clear = (): void => Local.base.clear(localStorage);
}

export default Local.getInstance();
