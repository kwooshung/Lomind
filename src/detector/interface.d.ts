/**
 * @zh 浏览器信息
 * @en Browser info
 */
interface BrowserInfo {
  /**
   * @zh 浏览器名称
   * @en Browser name
   */
  name: string;
  /**
   * @zh 浏览器版本
   * @en Browser version
   */
  fullVersion: string;
  /**
   * @zh 浏览器主版本号
   * @en Browser major version
   */
  majorVersion: string;
}

/**
 * @zh 操作系统信息
 * @en OS info
 */
interface OSInfo {
  /**
   * @zh 操作系统名称
   * @en OS name
   */
  osName: string;
  /**
   * @zh 操作系统版本
   * @en OS version
   */
  osVersion: string;
}
