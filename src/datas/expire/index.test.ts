import Expire from '.';

describe('Expire', () => {
  it('应该将秒转换为毫秒', () => {
    expect(Expire.seconds(1)).toBe(1000);
  });

  it('应该将分钟转换为毫秒', () => {
    expect(Expire.minutes(1)).toBe(60000);
  });

  it('应该将小时转换为毫秒', () => {
    expect(Expire.hours(1)).toBe(3600000);
  });

  it('应该将天转换为毫秒', () => {
    expect(Expire.days(1)).toBe(86400000);
  });

  it('应该将月转换为毫秒', () => {
    const millis = Expire.months(1);
    expect(millis).toBeGreaterThanOrEqual(2592000000); // 30 天的毫秒数
    expect(millis).toBeLessThanOrEqual(2678400000); // 31 天的毫秒数
  });

  it('应该将年转换为毫秒', () => {
    const millis = Expire.years(1);
    expect(millis).toBeGreaterThanOrEqual(31536000000); // 365 天的毫秒数
    expect(millis).toBeLessThanOrEqual(31622400000); // 366 天的毫秒数
  });
});
