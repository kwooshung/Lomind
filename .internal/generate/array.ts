import { Chance } from 'chance';

/**
 * 生成随机字符串数组
 * @param {number} [arrayLength = 10000] 数组长度
 * @param {number} [minLength = 4] 最小长度
 * @param {number} [maxLength = 12] 最大长度
 * @param {number} [minNumber = 0] 最小数字
 * @param {number} [maxNumber = 99999] 最大数字
 * @returns 随机字符串数组
 */
const build = (arrayLength: number = 10000, minLength: number = 4, maxLength: number = 12, minNumber: number = 0, maxNumber: number = 99999) => {
  const chance = new Chance();

  return Array.from({ length: arrayLength }, () => {
    if (chance.bool()) {
      const randomLength = chance.integer({ min: minLength, max: maxLength });
      const randomString = chance.string({
        length: randomLength,
        pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'
      });
      return randomString;
    } else {
      const randomNumber = chance.integer({ min: minNumber, max: maxNumber });
      return randomNumber;
    }
  });
};

export default build;
