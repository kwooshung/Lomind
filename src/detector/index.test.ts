import Detector from '.';

describe('Detector', () => {
  let detector: Detector;

  beforeEach(() => {
    detector = new Detector();
  });

  it('应该正确获取浏览器信息', () => {
    const browserInfo = detector.browserInfo;
    expect(browserInfo).toHaveProperty('name');
    expect(browserInfo).toHaveProperty('fullVersion');
    expect(browserInfo).toHaveProperty('majorVersion');
  });

  it('应该正确获取操作系统信息', () => {
    const osInfo = detector.osInfo;
    expect(osInfo).toHaveProperty('name');
    expect(osInfo).toHaveProperty('version');
    expect(osInfo).toHaveProperty('platform');
  });

  it('应该正确获取 Windows 11 的操作系统信息', async () => {
    // 模拟 userAgentData 和 getHighEntropyValues
    const originalUserAgentData = navigator['userAgentData'];
    const mockUserAgentData = {
      platform: 'Windows',
      getHighEntropyValues: vi.fn().mockResolvedValue({
        platformVersion: '13.0.0'
      })
    };
    Object.defineProperty(navigator, 'userAgentData', {
      value: mockUserAgentData,
      writable: true
    });

    detector = new Detector();

    // 等待异步操作完成
    await new Promise(setImmediate);

    const osInfo = detector.osInfo;
    expect(osInfo.name).toBe('Windows 11');
    expect(osInfo.version).toBe('13.0.0');

    // 恢复原始的 userAgentData
    Object.defineProperty(navigator, 'userAgentData', { value: originalUserAgentData });
  });

  it('应该判断是否为指定浏览器', () => {
    // 模拟不同的 userAgent
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.isBrowserName('Chrome')).toBeTruthy();
    expect(detector.isBrowserName('Firefox')).toBeFalsy();
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

  it('应该判断是否为指定系统', () => {
    // 模拟不同的 userAgent
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.isOSName('windows')).toBeTruthy();
    expect(detector.isOSName('MacOs')).toBeFalsy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应该正确比较系统版本', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.compareOSVersion('10', '=')).toBeTruthy();
    expect(detector.compareOSVersion('9', '<')).toBeTruthy();
    expect(detector.compareOSVersion('11', '>')).toBeTruthy();
    expect(detector.compareOSVersion('11', '>=')).toBeTruthy();
    expect(detector.compareOSVersion('10', '<=')).toBeTruthy();
    // 新增：测试不同长度的版本号
    expect(detector.compareOSVersion('10.0', '=')).toBeTruthy();
    expect(detector.compareOSVersion('9.0', '<=')).toBeTruthy();
    expect(detector.compareOSVersion('10.111', '>=')).toBeTruthy();
    expect(detector.compareOSVersion('9.0', '<')).toBeTruthy();
    expect(detector.compareOSVersion('9.0', '<')).toBeTruthy();
    expect(detector.compareOSVersion('10.0', '<=')).toBeTruthy();
    expect(detector.compareOSVersion('11.0', '>=')).toBeTruthy();
    expect(detector.compareOSVersion('12.0.4473', '>=')).toBeTruthy();
    expect(detector.compareOSVersion('10.0.4472', '>=')).toBeTruthy();
    expect(detector.compareOSVersion('9', '<=')).toBeTruthy();
    // 新增：测试非法操作符
    expect(detector.compareOSVersion('91.', 'invalid' as any)).toBeFalsy();
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
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      writable: true
    });
    detector = new Detector();
    expect(detector.isTablet()).toBeFalsy();
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent });
  });

  it('应该处理未知的操作系统名称和版本', async () => {
    // 模拟 getOS 方法返回 undefined 的名称和版本
    detector.parser.getOS = () => ({ name: undefined, version: undefined });
    (detector as any).initializeOSInfo();

    // 等待异步操作完成
    await new Promise(setImmediate);

    const osInfo = detector.osInfo;
    expect(osInfo.name).toBe('');
    expect(osInfo.version).toBe('');
  });

  it('应处理解析器返回空对象的情况', () => {
    const originalGetBrowser = detector.parser.getBrowser;
    detector.parser.getBrowser = () => ({});
    const browserInfo = (detector as any).getBrowserInfo();
    expect(browserInfo.name).toBe('');
    expect(browserInfo.fullVersion).toBe('');
    expect(browserInfo.majorVersion).toBe('');
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
    expect(detector.isBrowserName('chrome')).toBeTruthy();
    expect(detector.isBrowserName('Chrome')).toBeTruthy();
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
