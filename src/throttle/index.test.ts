import throttle from '.';

// 清除定时器
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

/**
 * @zh 测试节流函数的基本功能
 * @en Test the basic functionality of throttle function
 */
describe('throttle', () => {
  it('应该在leading为false时不立即调用函数', () => {
    const func = vi.fn();
    const throttled = throttle(func, 1000, { leading: false });

    // 不应该立即调用
    throttled();
    expect(func).not.toHaveBeenCalled();

    // 过了时间间隔后调用
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在trailing为false时不在结束时调用函数', () => {
    const func = vi.fn();
    const throttled = throttle(func, 1000, { trailing: false });

    // 立即调用
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    // 过了时间间隔后，不应该再次调用
    vi.advanceTimersByTime(1000);
    throttled();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('应该正确处理多次调用', () => {
    const func = vi.fn();
    const throttled = throttle(func, 1000);

    // 第一次调用
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    // 500ms内多次调用，不会触发多次
    vi.advanceTimersByTime(500);
    throttled();
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    // 再过500ms，应该触发第二次
    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(2);

    // 再次调用
    throttled();
    expect(func).toHaveBeenCalledTimes(2);

    // 1000ms后再次触发
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(3);
  });
});
