import Theme from '.';

// 模拟 DOM 和 localStorage
global.document = {
  documentElement: {
    setAttribute: vi.fn()
  }
};
global.localStorage = {
  setItem: vi.fn()
};

// 模拟媒体查询
const mockMatchMedia = (initialMatches) => {
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
    callChange: (newMatches) => {
      matches = newMatches;
      if (changeHandler) changeHandler({ matches: newMatches });
    }
  });
};

describe('Theme 类测试', () => {
  let theme;
  let mediaQueryMock;

  beforeEach(() => {
    vi.clearAllMocks();
    Theme['instance'] = null;
    mediaQueryMock = mockMatchMedia(false);
    window.matchMedia = mediaQueryMock;
  });

  it('单例模式能正确工作', () => {
    const firstInstance = Theme.getInstance();
    const secondInstance = Theme.getInstance();
    expect(firstInstance).toBe(secondInstance);
  });

  it('能正确初始化并应用初始主题', () => {
    window.matchMedia = mockMatchMedia(false);
    theme = Theme.getInstance();
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('能正确设置并应用新主题', () => {
    theme = Theme.getInstance();
    theme.set('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
  });

  it('如果设置的主题不存在，则默认使用 light', () => {
    theme = Theme.getInstance();
    theme.set('non-exist-theme');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('直接设置 auto', () => {
    theme = Theme.getInstance('dark');
    theme.set('auto');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('一次性添加多个主题', () => {
    theme = Theme.getInstance('auto');
    theme.add(['a', 'b', 'c']);
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
  });

  it('能正确处理自动主题', () => {
    theme = Theme.getInstance('auto');
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
    theme = Theme.getInstance();
    theme.add('new-theme');
    expect(theme.getAvailable()).toEqual(['light', 'dark', 'new-theme']);
  });

  it('能获取当前主题', () => {
    theme = Theme.getInstance('dark');
    expect(theme.getCurrent()).toBe('dark');
  });

  it('卸载时能正确移除媒体查询监听器', () => {
    theme = Theme.getInstance('auto');
    // 这里假设 attachListener 已被调用并添加了事件监听器
    theme.uninstall();
    // 验证 removeEventListener 是否被正确调用
    expect(theme.isListenerAttached).toBeFalsy();
  });
});
