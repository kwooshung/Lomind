/**
 * @zh 主题管理器
 * @en Theme Manager
 */
class Themes {
  /**
   * @zh 暗黑模式媒体查询
   * @en Dark mode media query
   */
  private static readonly DARK_THEME_QUERY = '(prefers-color-scheme: dark)';

  /**
   * @zh 单例实例
   * @en Singleton instance
   */
  private static instance: Themes | null = null;

  /**
   * @zh 本地存储 key
   * @en Local storage key
   */
  private saveKey: string = 'ks-theme';

  /**
   * @zh 可用主题
   * @en Available themes
   */
  private valid: string[];

  /**
   * @zh 当前主题值
   * @en Current theme value
   */
  private value: string;

  /**
   * @zh 当前主题名
   * @en Current theme name
   */
  private name: string;

  /**
   * @zh 主题改变时触发
   * @en Triggered when the theme changes
   */
  private onChange: (value: string, name: string) => void;

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
   * @param {(value: string, name: string) => void} [onChange=() => {}] 主题改变时触发
   */
  private constructor(initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark'], onChange: (value: string, name: string) => void = () => {}) {
    this.valid = initialThemes;
    this.value = this.getLocalStorageTheme(initialTheme);
    this.name = this.value;
    this.mediaQueryList = window.matchMedia(Themes.DARK_THEME_QUERY);
    this.isListenerAttached = false;
    this.onChange = onChange;
    this.init();
  }

  /**
   * @zh 初始化
   * @en Initialize
   * @returns {void} 无返回值
   */
  private init(): void {
    this.set(this.value);
    this.value === 'auto' && this.attachListener();
  }

  /**
   * @zh 应用主题
   * @en Apply theme
   * @param {string} theme 主题
   * @returns {void} 无返回值
   */
  private apply(theme: string): void {
    this.name = this.valid.includes(theme) ? theme : 'light';
    document.documentElement.setAttribute('data-theme', this.name);
    this.onChange(this.value, this.name);
  }

  /**
   * @zh 处理系统主题变化
   * @en Handle system theme change
   * @returns {void} 无返回值
   */
  private handleSystemChange = (): void => {
    if (this.value === 'auto') {
      this.apply(this.mediaQueryList.matches ? 'dark' : 'light');
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
   * @zh 从本地存储获取主题
   * @en Get theme from local storage
   * @param {string} [initialThemes='auto'] 初始主题
   * @returns {string} 主题
   */
  private getLocalStorageTheme(initialThemes: string = 'auto'): string {
    const theme = localStorage.getItem(this.saveKey);
    return theme && this.valid.includes(theme) ? theme : initialThemes;
  }

  /**
   * @zh 获取单例实例
   * @en Get singleton instance
   * @param {string} [initialTheme] 初始主题
   * @param {string[]} [initialThemes] 初始主题列表
   * @param {(value: string, name: string) => void} [onChange=() => {}] 主题改变时触发
   * @returns {Themes} 主题管理器实例
   */
  public static getInstance(initialTheme?: string, initialThemes?: string[], onChange: (value: string, name: string) => void = () => {}): Themes {
    if (!Themes.instance) {
      Themes.instance = new Themes(initialTheme, initialThemes, onChange);
    }
    return Themes.instance;
  }

  /**
   * @zh 设置主题
   * @en Set theme
   * @param {string} theme 主题
   * @returns {void} 无返回值
   */
  public set(theme: string): void {
    this.value = theme;
    localStorage.setItem(this.saveKey, theme);

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
   * @zh 获得当前主题值
   * @en Get current theme value
   * @returns {string} 当前主题值
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * @zh 获得当前主题名, value=auto 为跟随系统主题，因此需要根据系统主题值返回 light 或 dark
   * @en Get current theme name, value=auto is the system theme, so you need to return light or dark based on the system theme value
   * @returns {string} 当前主题名
   */
  public getName(): string {
    return this.name;
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
   * @zh 绑定主题改变事件
   * @en Bind theme change event
   * @param {Function} [onChange] 主题改变时触发
   */
  public bindChange = (onChange: (value: string, name: string) => void): void => {
    this.onChange = onChange;
  };

  /**
   * @zh 卸载主题管理器，主要是移除媒体查询监听，防止内存泄漏
   * @en Uninstall theme manager, mainly remove media query listener to prevent memory leaks
   */
  public uninstall(): void {
    this.detachListener();
  }
}

export default Themes;
