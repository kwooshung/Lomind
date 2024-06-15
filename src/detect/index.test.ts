import { describe, it, expect, beforeEach } from 'vitest';
import Detector from './index';

describe('Detector', () => {
  let detector: Detector;

  beforeEach(() => {
    detector = new Detector();
  });

  it('应该正确获取浏览器信息', () => {
    const browserInfo = detector.browserInfo;
    console.log('-----------------------');
    console.log(browserInfo.name);
    expect(browserInfo).toHaveProperty('name');
    expect(browserInfo).toHaveProperty('fullVersion');
    expect(browserInfo).toHaveProperty('majorVersion');
  });

  it('应该正确获取操作系统信息', () => {
    const osInfo = detector.osInfo;
    expect(osInfo).toHaveProperty('osName');
    expect(osInfo).toHaveProperty('osVersion');
  });

  it('应该判断是否为指定浏览器', () => {
    // 模拟不同的 userAgent
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.isBrowser('Chrome')).toBeTruthy();
    expect(detector.isBrowser('Firefox')).toBeFalsy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应该正确比较浏览器版本', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.compareBrowserVersion('91.0.4472.124', '=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.4472.123', '<')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.4472.125', '>')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.4472.124', '>=')).toBeTruthy();
    expect(detector.compareBrowserVersion('90.0.4472.124', '<=')).toBeTruthy();
    // 新增：测试不同长度的版本号
    expect(detector.compareBrowserVersion('91.0', '=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0', '<=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0', '>=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.0.0', '<')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.1.1', '<')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.4472', '<=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.4472', '>=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91.0.4473', '>=')).toBeTruthy();
    expect(detector.compareBrowserVersion('92.0.4472', '>=')).toBeTruthy();
    expect(detector.compareBrowserVersion('91', '<=')).toBeTruthy();
    // 新增：测试非法操作符
    expect(detector.compareBrowserVersion('91.0.4472.124', 'invalid' as any)).toBeFalsy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应该判断是否为移动设备', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1',
      writable: true
    });
    detector = new Detector();
    expect(detector.isMobile()).toBeTruthy();
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', writable: true });
    detector = new Detector();
    expect(detector.isMobile()).toBeFalsy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应该判断是否为平板设备', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1',
      writable: true
    });
    detector = new Detector();
    expect(detector.isTablet()).toBeTruthy();
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', writable: true });
    detector = new Detector();
    expect(detector.isTablet()).toBeFalsy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应该处理未知的操作系统名称和版本', () => {
    const originalGetOS = detector.parser.getOS;
    detector.parser.getOS = () => ({ name: undefined, version: undefined });
    const osInfo = detector.getOSInfo();
    expect(osInfo.osName).toBe('Unknown');
    expect(osInfo.osVersion).toBe('Unknown');
    detector.parser.getOS = originalGetOS;
  });

  it('应处理解析器返回空对象的情况', () => {
    const originalGetBrowser = detector.parser.getBrowser;
    detector.parser.getBrowser = () => ({});
    // eslint-disable-next-line
    const browserInfo = (detector as any).getBrowserInfo();
    expect(browserInfo.name).toBe('Unknown');
    expect(browserInfo.fullVersion).toBe('Unknown');
    expect(browserInfo.majorVersion).toBe('Unknown');
    detector.parser.getBrowser = originalGetBrowser;
  });

  it('应处理解析器抛出异常的情况', () => {
    const originalGetBrowser = detector.parser.getBrowser;
    detector.parser.getBrowser = () => {
      throw new Error('Failed to parse user agent');
    };
    expect(() => (detector as any).getBrowserInfo()).toThrow('Failed to parse user agent');
    detector.parser.getBrowser = originalGetBrowser;
  });

  it('应在不区分大小写的情况下判断浏览器', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.isBrowser('chrome')).toBeTruthy();
    expect(detector.isBrowser('Chrome')).toBeTruthy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应正确识别同时符合移动和平板标准的设备', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15A372 Safari/604.1',
      writable: true
    });
    detector = new Detector();
    expect(detector.isMobile()).toBeTruthy();
    expect(detector.isTablet()).toBeTruthy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });
});
