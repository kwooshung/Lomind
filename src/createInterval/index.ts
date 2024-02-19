import createTimer from '../_internal/createTimer';

/**
 * @zh 创建一个间隔执行的函数，并返回一个清除函数
 * @en Create an interval function and return a cleanup function
 * @param {() => void} callback 需要执行的函数
 * @param {number} delay 间隔时间（毫秒）
 * @returns {() => void} 清除函数
 */
const createInterval = (callback: () => void, delay: number): (() => void) => createTimer(setInterval, callback, delay);

export default createInterval;
