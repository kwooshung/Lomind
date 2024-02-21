import Themes from '.';

// 模拟 DOM 和 localStorage
global.document = {
  documentElement: {
    setAttribute: vi.fn()
  }
};
global.localStorage = {
  setItem: vi.fn()
};

// 模拟 localStorage
const mockLocalStorage = () => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: () => {
      store = {};
    }
  };
};

// 模拟媒体查询
const mockMatchMedia = (initialMatches: boolean) => {
  let matches = initialMatches;
  let changeHandler = null;

  return () => ({
    get matches() {
      return matches;
    },
    addEventListener: vi.fn((event, handler) => {
      if (event === 'change') {
        changeHandler = handler;
      }
    }),
    removeEventListener: vi.fn((event, handler) => {
      if (event === 'change' && handler === changeHandler) {
        changeHandler = null;
      }
    }),
    callChange: (newMatches: any) => {
      matches = newMatches;
      if (changeHandler) changeHandler({ matches: newMatches });
    }
  });
};

describe('Themes 类测试', () => {
  let themeManager: Themes;
  let mediaQueryMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    Themes['instance'] = null;
    global.localStorage = mockLocalStorage();
    mediaQueryMock = mockMatchMedia(false);
    window.matchMedia = mediaQueryMock;
  });

  it('正确初始化并从本地存储获取主题', () => {
    localStorage.setItem('ks-theme', 'dark');
    themeManager = Themes.getInstance();
    expect(themeManager.getName()).toBe('dark');
  });

  it('如果本地存储中没有有效主题，则使用默认主题', () => {
    localStorage.setItem('ks-theme', 'non-existent-theme');
    themeManager = Themes.getInstance();
    expect(themeManager.getValue()).toBe('auto');
  });

  it('能够正确设置并应用新主题', () => {
    themeManager = Themes.getInstance();
    themeManager.set('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('ks-theme', 'dark');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('单例模式能正确工作', () => {
    const firstInstance = Themes.getInstance();
    const secondInstance = Themes.getInstance();
    expect(firstInstance).toBe(secondInstance);
  });

  it('能正确初始化并应用初始主题', () => {
    window.matchMedia = mockMatchMedia(false);
    themeManager = Themes.getInstance();
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('能正确设置并应用新主题', () => {
    themeManager = Themes.getInstance();
    themeManager.set('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('ks-theme', 'dark');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('如果设置的主题不存在，则默认使用 light', () => {
    themeManager = Themes.getInstance();
    themeManager.set('non-exist-theme');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('直接设置 auto', () => {
    themeManager = Themes.getInstance('dark');
    themeManager.set('auto');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('一次性添加多个主题', () => {
    themeManager = Themes.getInstance('auto');
    themeManager.add(['a', 'b', 'c']);
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('能正确处理自动主题', () => {
    themeManager = Themes.getInstance('auto');
    // 确保 matches 开始为 false
    expect(mediaQueryMock().matches).toBe(false);

    // 模拟暗黑模式
    mediaQueryMock().callChange(true);
    expect(mediaQueryMock().matches).toBe(true); // 确认 matches 已更改
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');

    // 模拟非暗黑模式
    mediaQueryMock().callChange(false);
    expect(mediaQueryMock().matches).toBe(false); // 确认 matches 已更改
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('能添加新的可用主题', () => {
    themeManager = Themes.getInstance();
    themeManager.add('new-theme');
    expect(themeManager.getAvailable()).toEqual(['light', 'dark', 'new-theme']);
  });

  it('能获取当前主题', () => {
    themeManager = Themes.getInstance('dark');
    expect(themeManager.getName()).toBe('dark');
  });

  it('bindChange 正确绑定并触发 onChange 回调', () => {
    themeManager = Themes.getInstance();
    const mockOnChange = vi.fn();

    // 绑定模拟的 onChange 回调
    themeManager.bindChange(mockOnChange);

    // 改变主题以触发回调
    themeManager.set('dark');

    // 检查模拟回调是否被调用
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith('dark', 'dark');
  });

  it('卸载时能正确移除媒体查询监听器', () => {
    themeManager = Themes.getInstance('auto');
    // 这里假设 attachListener 已被调用并添加了事件监听器
    themeManager.uninstall();
    // 验证 removeEventListener 是否被正确调用
    expect(themeManager.isListenerAttached).toBeFalsy();
  });
});
