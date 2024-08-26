import Base from '../base';

/**
 * @zh SessionStorage 管理类
 * @en SessionStorage management class
 */
class Session {
  /**
   * @zh 单例实例
   * @en Singleton instance
   */
  private static instance: Session;

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
   * @returns {Session} 单例实例
   */
  public static getInstance(): Session {
    if (!Session.instance) {
      Session.base = new Base();
      Session.instance = new Session();
    }
    return Session.instance;
  }

  /**
   * @zh 存储数据
   * @en Store data
   * @param {string} key 键
   * @param {any} value 值
   * @param {number} [expireMillis] 过期时间（以毫秒为单位），如果不设置则永久存储
   */
  public set = (key: string, value: any, expireMillis?: number): void => Session.base.set(sessionStorage, key, value, expireMillis);

  /**
   * @zh 读取数据
   * @en Retrieve data
   * @param {string} key 键
   * @returns {any | null} 返回存储的值或 null
   */
  public get = (key: string): any | null => Session.base.get(sessionStorage, key);

  /**
   * @zh 删除数据
   * @en Remove data
   * @param {string} key 键
   */
  public remove = (key: string): void => Session.base.remove(sessionStorage, key);

  /**
   * @zh 清除所有数据
   * @en Clear all data
   */
  public clear = (): void => Session.base.clear(sessionStorage);
}

export default Session.getInstance();
