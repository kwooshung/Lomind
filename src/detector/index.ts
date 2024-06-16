import UAParser from 'ua-parser-js';
import { BrowserInfo, OSInfo } from './interface';

/**
 * @zh 探测器
 * @en Detector
 */
class detector {
  /**
   * @zh UA 字符串
   * @en UA string
   */
  ua: string;
  /**
   * @zh UA 解析器
   * @en UA parser
   */
  parser: UAParser.UAParserInstance;
  /**
   * @zh 浏览器信息
   * @en Browser information
   */
  browserInfo: BrowserInfo;
  /**
   * @zh 操作系统信息
   * @en OS information
   */
  osInfo: OSInfo;

  /**
   * @zh 构造函数
   * @en Constructor
   */
  constructor() {
    this.ua = navigator.userAgent;
    this.parser = new UAParser(this.ua);
    this.browserInfo = this.getBrowserInfo();
    this.osInfo = this.getOSInfo();
  }

  /**
   * @zh 获取浏览器信息
   * @en Get browser information
   */
  private getBrowserInfo = (): BrowserInfo => {
    const browser = this.parser.getBrowser();
    return {
      name: browser.name || 'Unknown',
      fullVersion: browser.version || 'Unknown',
      majorVersion: browser.major || 'Unknown'
    };
  };

  /**
   * @zh 获取操作系统信息
   * @en Get OS information
   */
  private getOSInfo = (): OSInfo => {
    const os = this.parser.getOS();
    return {
      osName: os.name || 'Unknown',
      osVersion: os.version || 'Unknown'
    };
  };

  /**
   * @zh 判断是否为指定浏览器
   * @en Determine if it is a specified browser
   * @param name 浏览器名称
   * @param name Browser name
   * @returns 是否为指定浏览器
   */
  isBrowser = (name: string): boolean => this.browserInfo.name.toLowerCase() === name.toLowerCase();

  /**
   * @zh 判断是否为指定操作系统
   * @en Determine if it is a specified OS
   * @param version 目标版本
   * @param operator 比较操作符：'<', '>', '=', '<=', '>='
   * @return 是否满足条件
   */
  compareBrowserVersion(version: string, operator: '<' | '>' | '=' | '<=' | '>='): boolean {
    // 检查传入的操作符是否为有效的比较符号
    if (!['<', '>', '=', '<=', '>='].includes(operator)) {
      return false; // 如果操作符无效，返回false
    }

    // 将当前浏览器的完整版本号按点分割转换成数字数组
    const currentVersionParts = this.browserInfo.fullVersion.split('.').map(Number);
    // 将目标版本号按点分割转换成数字数组
    const targetVersionParts = version.split('.').map(Number);

    // 确定实际进行比较的版本号部分的长度，取当前版本和目标版本中较短的长度
    const compareLength = Math.min(currentVersionParts.length, targetVersionParts.length);

    // 循环比较每一部分的版本号
    for (let i = 0; i < compareLength; i++) {
      // 如果当前部分小于目标版本的相应部分
      if (targetVersionParts[i] < currentVersionParts[i]) {
        // 如果操作符为'<'或者'<='，返回true
        return operator === '<' || operator === '<=';
      }
      // 如果当前部分大于目标版本的相应部分
      else if (targetVersionParts[i] > currentVersionParts[i]) {
        // 如果操作符为'>'或者'>='，返回true
        return operator === '>' || operator === '>=';
      }
    }

    // 如果所有比较的部分都相等，则根据操作符返回相应的结果
    return operator === '=' || operator === '<=' || operator === '>=';
  }

  /**
   * 判断是否为移动设备
   */
  isMobile = (): boolean => /Mobile|Android|iP(hone|od)/.test(this.ua);

  /**
   * 判断是否为平板设备
   */
  isTablet = (): boolean => /iPad|Tablet/.test(this.ua);
}

/**
 * @zh 导出探测器实例
 * @en Export detector instance
 */
export default detector;
