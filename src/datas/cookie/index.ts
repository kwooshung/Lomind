import Serializer from '../../serializer';

/**
 * @zh Cookie 管理类
 * @en Cookie management class
 */
class Cookie {
  private static instance: Cookie;

  private constructor() {}

  /**
   * @zh 获取单例实例
   * @en Get singleton instance
   * @returns {Cookie} 单例实例
   */
  public static getInstance(): Cookie {
    if (!Cookie.instance) {
      Cookie.instance = new Cookie();
    }
    return Cookie.instance;
  }

  /**
   * @zh 设置cookie
   * @en Set cookie
   * @param {string} name cookie名称
   * @param {any} value cookie值
   * @param {number} [expireMillis] 过期时间（以毫秒为单位），如果不设置则为会话cookie
   * @param {string} [path] cookie路径
   */
  public set(name: string, value: any, expireMillis?: number, path: string = '/'): void {
    const serializedValue = Serializer.to(value);
    let expires = '';
    if (expireMillis) {
      const date = new Date();
      date.setTime(date.getTime() + expireMillis);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${serializedValue}${expires}; path=${path}`;
  }

  /**
   * @zh 获取cookie
   * @en Get cookie
   * @param {string} name cookie名称
   * @returns {any | null} 反序列化后的cookie值或 null
   */
  /**
   * @zh 获取cookie
   * @en Get cookie
   * @param {string} name cookie名称
   * @returns {any | null} 反序列化后的cookie值或 null
   */
  public get(name: string): any | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        try {
          return Serializer.from(value);
        } catch (error) {
          console.error('Failed to deserialize cookie data:', error);
          return null;
        }
      }
    }
    return null;
  }

  /**
   * @zh 删除cookie
   * @en Remove cookie
   * @param {string} name cookie名称
   * @param {string} [path] cookie路径
   */
  public remove(name: string, path: string = '/'): void {
    document.cookie = `${name}=; Max-Age=-99999999; path=${path}`;
  }
}

export default Cookie.getInstance();
