import debounce from '../debounce';
import { ThrottleOptions } from './interface';

/**
 * @zh 节流函数，保证在一定时间间隔内最多只执行一次函数。
 * @en Throttle function, ensures the function is executed at most once in the specified time interval.
 * @param {(...args: any[]) => void} func 需要节流处理的函数
 * @param {number} wait 时间间隔，毫秒
 * @param {ThrottleOptions} [options={}] 配置项
 * @returns {(...args: any[]) => void} 节流处理后的函数
 */
const throttle = (func: (...args: any[]) => void, wait: number, options: ThrottleOptions = {}): ((...args: any[]) => void) => {
  let leading = true; // 是否在开始时调用
  let trailing = true; // 是否在结束时调用

  if (typeof options === 'object') {
    leading = 'leading' in options ? !!options.leading : leading; // 是否在开始时调用
    trailing = 'trailing' in options ? !!options.trailing : trailing; // 是否在结束时调用
  }

  // 调用 debounce 函数，实现节流功能
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait // 设置 maxWait 为 wait，保证函数在指定时间间隔内最多只执行一次
  });
};

export default throttle;
