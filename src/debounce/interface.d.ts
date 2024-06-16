/**
 * @zh 防抖函数配置项类型
 * @en Debounce options type
 */
export type DebounceOptions = {
  /**
   * 是否在开始时调用
   */
  leading?: boolean;

  /**
   * 最大等待时间
   */
  maxWait?: number;

  /**
   * 是否在结束时调用
   */
  trailing?: boolean;
};
