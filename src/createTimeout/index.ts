/**
 * @zh 创建一个延时器，并返回一个清除函数
 * @en Create a timeout and return a cleanup function
 * @param {() => void} callback 需要执行的函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {() => void} 清除函数
 */
const createTimeout = (callback: () => void, delay: number): (() => void) => {
  const timeoutId = setTimeout(callback, delay);

  return () => {
    clearTimeout(timeoutId);
  };
};

export default createTimeout;
