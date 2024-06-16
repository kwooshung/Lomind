/**
 * @zh 节流函数配置项类型
 * @en Throttle options type
 */
export type ThrottleOptions = {
  /**
   * 是否在开始时调用
   */
  leading?: boolean;

  /**
   * 是否在结束时调用
   */
  trailing?: boolean;
};
