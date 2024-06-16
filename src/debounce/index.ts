import { DebounceOptions } from './interface';

/**
 * @zh 防抖函数，保证在特定时间内函数只会被调用一次，且是最后一次。
 * @en Debounce function, ensures the function is called once within the specified time, and it's the last call.
 * @param {(...args: any[]) => void} func 需要防抖处理的函数
 * @param {number} wait 等待时间，毫秒
 * @param {DebounceOptions} [options={}] 配置项
 * @returns {(...args: any[]) => void} 防抖处理后的函数
 */
const debounce = (func: (...args: any[]) => void, wait: number, options: DebounceOptions = {}) => {
  let lastArgs: any; // 上一次调用的参数
  let lastThis: any; // 上一次调用的 this 上下文
  let maxWait: number | undefined; // 最大等待时间
  let result: any; // 上一次函数调用的结果
  let timerId: number | undefined; // 定时器ID
  let lastCallTime: number | undefined; // 上一次调用时间
  let lastInvokeTime = 0; // 上一次函数调用时间
  let leading = false; // 是否在开始时调用
  let maxing = false; // 是否有最大等待时间
  let trailing = true; // 是否在结束时调用

  // 使用 requestAnimationFrame 时设置为 true
  const useRAF = !wait && wait !== 0 && typeof requestAnimationFrame === 'function';

  // 检查 func 是否为函数类型
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (typeof options === 'object') {
    leading = !!options.leading; // 是否在开始时调用
    maxing = 'maxWait' in options; // 是否设置最大等待时间
    maxWait = maxing ? Math.max(+options.maxWait! || 0, wait) : maxWait; // 最大等待时间
    trailing = 'trailing' in options ? !!options.trailing : trailing; // 是否在结束时调用
  }

  /**
   * @zh 调用函数并重置参数
   * @en Invoke the function and reset parameters
   * @param {number} time 当前时间
   * @returns {any} 函数调用结果
   */
  const invokeFunc = (time: number) => {
    const args = lastArgs; // 取出上一次调用的参数
    const thisArg = lastThis; // 取出上一次调用的上下文
    lastArgs = lastThis = undefined; // 重置 lastArgs 和 lastThis
    lastInvokeTime = time; // 更新 lastInvokeTime
    result = func.apply(thisArg, args); // 调用函数
    return result; // 返回函数结果
  };

  /**
   * @zh 启动定时器
   * @en Start the timer
   * @param {Function} pendingFunc 定时器到期时调用的函数
   * @param {number} milliseconds 定时器等待时间
   * @returns {number} 定时器ID
   */
  const startTimer = (pendingFunc: Function, milliseconds: number): number => {
    if (useRAF) {
      cancelAnimationFrame(timerId!); // 取消上一个 requestAnimationFrame
      return requestAnimationFrame(pendingFunc as FrameRequestCallback); // 启动新的 requestAnimationFrame
    }
    return setTimeout(pendingFunc, milliseconds); // 启动新的 setTimeout
  };

  /**
   * @zh 取消定时器
   * @en Cancel the timer
   * @param {number} id 定时器ID
   */
  const cancelTimer = (id: number) => {
    if (useRAF) {
      cancelAnimationFrame(id); // 取消 requestAnimationFrame
      return;
    }
    clearTimeout(id); // 取消 setTimeout
  };

  /**
   * @zh 处理leading edge的逻辑
   * @en Handle the leading edge logic
   * @param {number} time 当前时间
   * @returns {any} 函数调用结果
   */
  const leadingEdge = (time: number) => {
    lastInvokeTime = time; // 更新 lastInvokeTime
    timerId = startTimer(timerExpired, wait); // 启动定时器
    return leading ? invokeFunc(time) : result; // 如果 leading 为 true，立即调用函数，否则返回上一次结果
  };

  /**
   * @zh 计算剩余等待时间
   * @en Calculate remaining wait time
   * @param {number} time 当前时间
   * @returns {number} 剩余等待时间
   */
  const remainingWait = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0); // 距离上一次调用的时间
    const timeSinceLastInvoke = time - lastInvokeTime; // 距离上一次函数调用的时间
    const timeWaiting = wait - timeSinceLastCall; // 剩余等待时间
    return maxing ? Math.min(timeWaiting, maxWait! - timeSinceLastInvoke) : timeWaiting; // 如果设置了最大等待时间，取最小值，否则返回剩余等待时间
  };

  /**
   * @zh 判断是否需要调用函数
   * @en Determine if the function should be invoked
   * @param {number} time 当前时间
   * @returns {boolean} 是否应该调用
   */
  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0); // 距离上一次调用的时间
    const timeSinceLastInvoke = time - lastInvokeTime; // 距离上一次函数调用的时间
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || (maxing && timeSinceLastInvoke >= maxWait!);
  };

  /**
   * @zh 定时器到期时调用的函数
   * @en Function called when the timer expires
   * @returns {any} 函数调用结果
   */
  const timerExpired = () => {
    const time = Date.now(); // 获取当前时间
    if (shouldInvoke(time)) {
      // 如果应该调用函数
      return trailingEdge(time); // 调用 trailingEdge
    }
    timerId = startTimer(timerExpired, remainingWait(time)); // 否则重新启动定时器
    return undefined;
  };

  /**
   * @zh 处理trailing edge的逻辑
   * @en Handle the trailing edge logic
   * @param {number} time 当前时间
   * @returns {any} 函数调用结果
   */
  const trailingEdge = (time: number) => {
    timerId = undefined; // 清除定时器ID
    if (trailing && lastArgs) {
      // 如果 trailing 为 true 且有上一次的调用参数
      return invokeFunc(time); // 调用函数
    }
    lastArgs = lastThis = undefined; // 重置 lastArgs 和 lastThis
    return result; // 返回上一次结果
  };

  /**
   * @zh 取消防抖处理
   * @en Cancel the debounce
   */
  const cancel = () => {
    if (timerId !== undefined) {
      cancelTimer(timerId); // 取消定时器
    }

    lastInvokeTime = 0; // 重置 lastInvokeTime
    lastArgs = lastCallTime = lastThis = timerId = undefined; // 重置 lastArgs、lastCallTime、lastThis 和 timerId
  };

  /**
   * @zh 立即调用函数并清除定时器
   * @en Invoke the function immediately and clear the timer
   * @returns {any} 函数调用结果
   */
  const flush = (): any => (timerId === undefined ? result : trailingEdge(Date.now()));

  /**
   * @zh 判断定时器是否在运行
   * @en Determine if the timer is running
   * @returns {boolean} 定时器是否在运行
   */
  const pending = (): boolean => timerId !== undefined;

  /**
   * @zh 防抖处理后的函数
   * @en Debounced function
   * @param {...any[]} args 调用参数
   * @returns {any} 函数调用结果
   */
  const debounced = (...args: any[]): any => {
    const time = Date.now(); // 获取当前时间
    const isInvoking = shouldInvoke(time); // 判断是否应该调用函数
    lastArgs = args; // 保存调用参数
    lastThis = this; // 保存调用上下文
    lastCallTime = time; // 更新 lastCallTime

    if (isInvoking) {
      if (timerId === undefined) {
        // 如果没有定时器
        return leadingEdge(lastCallTime); // 处理 leading edge
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait); // 启动定时器
        return invokeFunc(lastCallTime); // 调用函数
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait); // 启动定时器
    }
    return result; // 返回函数调用结果
  };

  debounced.cancel = cancel; // 取消防抖处理
  debounced.flush = flush; // 立即调用函数并清除定时器
  debounced.pending = pending; // 判断定时器是否在运行

  return debounced; // 返回防抖处理后的函数
};

export default debounce;
