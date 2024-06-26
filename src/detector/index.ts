import UAParser from 'ua-parser-js';
import { IBrowserInfo, IOSInfo, TOperator } from './interface';

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
  browserInfo: IBrowserInfo;
  /**
   * @zh 操作系统信息
   * @en OS information
   */
  osInfo: IOSInfo;

  /**
   * @zh 构造函数
   * @en Constructor
   */
  constructor() {
    this.ua = navigator.userAgent;
    this.parser = new UAParser(this.ua);
    this.browserInfo = this.getBrowserInfo();
    this.osInfo = { name: '', version: '', platform: '' }; // 初始化 osInfo
    this.initializeOSInfo();
  }

  /**
   * @zh 获取浏览器信息
   * @en Get browser information
   */
  private getBrowserInfo = (): IBrowserInfo => {
    const browser = this.parser.getBrowser();
    return {
      name: browser.name || '',
      fullVersion: browser.version || '',
      majorVersion: browser.major || ''
    };
  };

  /**
   * @zh 初始化操作系统信息
   * @en Initialize OS information
   */
  private initializeOSInfo = () => {
    const os = this.parser.getOS();
    const cpu = this.parser.getCPU();

    let name = os.name || '';
    let version = os.version || '';

    if (navigator['userAgentData'] && navigator['userAgentData'].getHighEntropyValues) {
      navigator['userAgentData'].getHighEntropyValues(['platformVersion']).then((ua: any) => {
        if (navigator['userAgentData'].platform === 'Windows') {
          const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
          if (majorPlatformVersion >= 13) {
            name = 'Windows 11';
            version = ua.platformVersion;
          }
        }

        this.osInfo = {
          name,
          version,
          platform: cpu.architecture || ''
        };
      });
    } else {
      this.osInfo = {
        name,
        version,
        platform: cpu.architecture || ''
      };
    }
  };

  /**
   * @zh 比较版本号
   * @en Compare version number
   * @param {string} version 目标版本
   * @param {TOperator} operator 比较操作符
   * @param {string} currentVersion 当前版本
   * @return 是否满足条件
   */
  private compare = (version: string, operator: TOperator, currentVersion: string): boolean => {
    // 检查传入的操作符是否为有效的比较符号
    if (!['<', '>', '=', '<=', '>='].includes(operator)) {
      return false; // 如果操作符无效，返回false
    }

    // 将当前浏览器的完整版本号按点分割转换成数字数组
    const currentVersionParts = currentVersion.split('.').map(Number);
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
  };

  /**
   * @zh 判断是否为指定浏览器
   * @en Determine if it is a specified browser
   * @param {string} name 浏览器名称
   * @returns 是否为指定浏览器
   */
  isBrowserName = (name: string): boolean => this.browserInfo.name.toLowerCase() === name.toLowerCase();

  /**
   * @zh 判断是否为指定浏览器版本
   * @en Determine if it is a specified OS
   * @param {string} version 目标版本
   * @param {TOperator} operator 比较操作符
   * @return 是否满足条件
   */
  compareBrowserVersion(version: string, operator: TOperator): boolean {
    return this.compare(version, operator, this.browserInfo.fullVersion);
  }

  /**
   * @zh 判断是否为指定操作系统
   * @en Determine if it is a specified OS
   * @param {string} name 操作系统名称
   * @returns 是否为指定操作系统
   */
  isOSName = (name: string): boolean => this.osInfo.name.toLowerCase() === name.toLowerCase();

  /**
   * @zh 判断是否为指定操作系统版本
   * @en Determine if it is a specified OS version
   * @param {string} version 目标版本
   * @param {TOperator} operator 比较操作符
   * @return 是否满足条件
   */
  compareOSVersion(version: string, operator: TOperator): boolean {
    return this.compare(version, operator, this.osInfo.version);
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

export default detector;
