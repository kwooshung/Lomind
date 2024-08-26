/**
 * @zh 过期时间工具类
 * @en Expiration time utility class
 */
class Expire {
  /**
   * @zh 时间转换函数，以秒为单位
   * @en Time conversion function, in seconds
   * @param {number} seconds 秒数
   * @returns {number} 转换后的毫秒数
   */
  static seconds = (seconds: number): number => seconds * 1000;

  /**
   * @zh 时间转换函数，以毫秒为单位
   * @en Time conversion function, in milliseconds
   * @param {number} milliseconds 毫秒数
   * @returns {number} 转换后的毫秒数
   */
  static milliseconds = (milliseconds: number): number => milliseconds;

  /**
   * @zh 时间转换函数，以分钟为单位
   * @en Time conversion function, in minutes
   * @param {number} minutes 分钟数
   * @returns {number} 转换后的毫秒数
   */
  static minutes = (minutes: number): number => Expire.seconds(minutes * 60);

  /**
   * @zh 时间转换函数，以小时为单位
   * @en Time conversion function, in hours
   * @param {number} hours 小时数
   * @returns {number} 转换后的毫秒数
   */
  static hours = (hours: number): number => Expire.minutes(hours * 60);

  /**
   * @zh 时间转换函数，以天为单位
   * @en Time conversion function, in days
   * @param {number} days 天数
   * @returns {number} 转换后的毫秒数
   */
  static days = (days: number): number => Expire.hours(days * 24);

  /**
   * @zh 时间转换函数，以月为单位
   * @en Time conversion function, in months
   * @param {number} months 月数
   * @returns {number} 转换后的毫秒数
   */
  static months(months: number): number {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setMonth(currentDate.getMonth() + months);
    return targetDate.getTime() - currentDate.getTime();
  }

  /**
   * @zh 时间转换函数，以年为单位
   * @en Time conversion function, in years
   * @param {number} years 年数
   * @returns {number} 转换后的毫秒数
   */
  static years(years: number): number {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setFullYear(currentDate.getFullYear() + years);
    return targetDate.getTime() - currentDate.getTime();
  }
}

export default Expire;
