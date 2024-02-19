/**
 * @zh 创建一个定时器，并返回一个清除函数
 * @en Create a timer and return a cleanup function
 * @param {(callback: () => void, delay: number) => number} timerFunction 定时器函数
 * @param {() => void} callback 需要执行的函数
 * @param {number} delay 间隔时间（毫秒）
 * @returns {() => void} 清除函数
 */
const createTimer = (timerFunction: (callback: () => void, delay: number) => number, callback: () => void, delay: number): (() => void) => {
  const timerId = timerFunction(callback, delay);

  return () => (timerFunction === setInterval ? clearInterval(timerId) : clearTimeout(timerId));
};

export default createTimer;
