import createTimer from '.';

describe('createTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('使用 setInterval 创建的定时器应周期性执行回调函数', () => {
    const callback = vi.fn();
    const clear = createTimer(setInterval, callback, 1000);

    vi.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);

    clear();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3); // 确保清理函数有效
  });

  it('使用 setTimeout 创建的定时器应在指定延迟后执行回调函数', () => {
    const callback = vi.fn();
    const clear = createTimer(setTimeout, callback, 1000);

    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);

    clear();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1); // 确保清理函数有效
  });

  it('清理函数应正确取消 setInterval 定时器', () => {
    const callback = vi.fn();
    const clear = createTimer(setInterval, callback, 1000);

    clear();
    vi.advanceTimersByTime(3000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('清理函数应正确取消 setTimeout 定时器', () => {
    const callback = vi.fn();
    const clear = createTimer(setTimeout, callback, 1000);

    clear();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });
});
