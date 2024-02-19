/**
 * @zh 主题管理器
 * @en Theme Manager
 */
class Theme {
  /**
   * @zh 暗黑模式媒体查询
   * @en Dark mode media query
   */
  private static readonly DARK_THEME_QUERY = '(prefers-color-scheme: dark)';

  /**
   * @zh 单例实例
   * @en Singleton instance
   */
  private static instance: Theme | null = null;

  /**
   * @zh 可用主题
   * @en Available themes
   */
  private valid: string[];

  /**
   * @zh 当前主题
   * @en Current theme
   */
  private current: string;

  /**
   * @zh 媒体查询实例
   * @en Media query instance
   */
  private mediaQueryList: MediaQueryList;

  /**
   * @zh 是否已经监听媒体查询
   * @en Whether the media query is already being listened
   */
  public isListenerAttached: boolean;

  /**
   * @zh 构造函数
   * @en Constructor
   * @param {string} [initialTheme='auto'] 初始主题
   * @param {string[]} [initialThemes=['light', 'dark']] 初始主题列表
   */
  private constructor(initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark']) {
    this.valid = initialThemes;
    this.current = initialTheme;
    this.mediaQueryList = window.matchMedia(Theme.DARK_THEME_QUERY);
    this.isListenerAttached = false;
    this.init();
  }

  /**
   * @zh 初始化
   * @en Initialize
   * @returns {void} 无返回值
   */
  private init(): void {
    this.set(this.current);
    this.current === 'auto' && this.attachListener();
  }

  /**
   * @zh 应用主题
   * @en Apply theme
   * @param {string} theme 主题
   * @returns {void} 无返回值
   */
  private apply(theme: string): void {
    document.documentElement.setAttribute('data-theme', this.valid.includes(theme) ? theme : 'light');
  }

  /**
   * @zh 处理系统主题变化
   * @en Handle system theme change
   * @returns {void} 无返回值
   */
  private handleSystemChange = (): void => {
    const isDarkMode = this.mediaQueryList.matches;
    if (this.current === 'auto') {
      this.apply(isDarkMode ? 'dark' : 'light');
    }
  };

  /**
   * @zh 监听媒体查询
   * @en Listen to media query
   * @returns {void} 无返回值
   */
  private attachListener(): void {
    if (!this.isListenerAttached) {
      this.mediaQueryList.addEventListener('change', this.handleSystemChange.bind(this));
      this.isListenerAttached = true;
    }
  }

  /**
   * @zh 移除媒体查询监听
   * @en Remove media query listener
   * @returns {void} 无返回值
   */
  private detachListener(): void {
    if (this.isListenerAttached) {
      this.mediaQueryList.removeEventListener('change', this.handleSystemChange.bind(this));
      this.isListenerAttached = false;
    }
  }

  /**
   * @zh 获取单例实例
   * @en Get singleton instance
   * @param {string} [initialTheme] 初始主题
   * @param {string[]} [initialThemes] 初始主题列表
   * @returns {Theme} 主题管理器实例
   */
  public static getInstance(initialTheme?: string, initialThemes?: string[]): Theme {
    if (!Theme.instance) {
      Theme.instance = new Theme(initialTheme, initialThemes);
    }
    return Theme.instance;
  }

  /**
   * @zh 设置主题
   * @en Set theme
   * @param {string} theme 主题
   * @returns {void} 无返回值
   */
  public set(theme: string): void {
    this.current = theme;
    localStorage.setItem('theme', theme);

    if (theme === 'auto') {
      this.attachListener();
      this.handleSystemChange();
    } else {
      this.apply(theme);
    }
  }

  /**
   * @zh 添加主题
   * @en Add theme
   * @param {string | string[]} theme 主题
   * @returns {void} 无返回值
   */
  public add(theme: string | string[]): void {
    const themesToAdd: string[] = Array.isArray(theme) ? theme : [theme];
    themesToAdd.forEach((t) => {
      if (!this.valid.includes(t)) {
        this.valid.push(t);
      }
    });
  }

  /**
   * @zh 获得当前主题
   * @en Get current theme
   * @returns {string} 当前主题
   */
  public getCurrent(): string {
    return this.current;
  }

  /**
   * @zh 获得可用主题
   * @en Get available themes
   * @returns {string[]} 可用主题
   */
  public getAvailable(): string[] {
    return this.valid;
  }

  /**
   * @zh 卸载主题管理器，主要是移除媒体查询监听，防止内存泄漏
   * @en Uninstall theme manager, mainly remove media query listener to prevent memory leaks
   */
  public uninstall(): void {
    this.detachListener();
  }
}

export default Theme;
