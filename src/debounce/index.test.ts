import debounce from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('debounce', () => {
  it('应该在等待时间后调用函数', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000);

    debounced();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该取消定时器', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(1000);
    expect(func).not.toHaveBeenCalled();
  });

  it('应该立即调用函数并清除定时器', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000);

    debounced();
    debounced.flush();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在leading为true时立即调用函数', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { leading: true });

    debounced();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在maxWait时间后调用函数', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { maxWait: 1500 });

    debounced();
    vi.advanceTimersByTime(1500);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在trailing为false时不调用函数', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { trailing: false });

    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).not.toHaveBeenCalled();
  });

  it('应该正确处理多次调用', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000);

    debounced();
    vi.advanceTimersByTime(500);
    debounced();
    vi.advanceTimersByTime(500);
    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('pending应该返回定时器是否在运行', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000);

    debounced();
    expect(debounced.pending()).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(debounced.pending()).toBe(false);
  });

  it('应该在 wait 为 0 时使用 requestAnimationFrame', () => {
    const func = vi.fn();
    const debounced = debounce(func, 0);

    debounced();
    expect(func).not.toHaveBeenCalled();

    vi.runAllTimers();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在 trailing edge 时调用函数', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { trailing: true });

    debounced();
    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在 leading edge 时调用函数', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { leading: true, trailing: false });

    debounced();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该抛出错误当func不是函数', () => {
    expect(() => debounce(undefined as any, 1000)).toThrow(TypeError);
  });

  it('应该在使用 requestAnimationFrame 时取消定时器', () => {
    const func = vi.fn();
    const debounced = debounce(func, 0);

    debounced();
    debounced.cancel();
    expect(func).not.toHaveBeenCalled();
  });

  it('应该在正确的上下文中调用函数', () => {
    const context = { value: 42 };
    const func = vi.fn(function (this: any) {
      return this.value;
    });
    const debounced = debounce(func.bind(context), 1000);

    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).toHaveReturnedWith(42);
  });

  it('应该处理maxWait为0的情况', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { maxWait: 0 });

    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该正确处理maxing为true的情况', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { maxWait: 1500 });

    debounced();
    vi.advanceTimersByTime(1500);
    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('应该处理leading和trailing同时为false的情况', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { leading: false, trailing: false });

    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).not.toHaveBeenCalled();

    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).not.toHaveBeenCalled();
  });

  it('应该处理trailing和maxing为true的情况', () => {
    const func = vi.fn();
    const debounced = debounce(func, 1000, { trailing: true, maxWait: 2000 });

    debounced();
    vi.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(1);

    debounced();
    vi.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('应该在正确的上下文中调用函数并处理多个参数', () => {
    const context = { value: 42 };
    const func = vi.fn(function (this: any, arg: any) {
      return this.value + arg;
    });
    const debounced = debounce(func.bind(context), 1000);

    debounced(8);
    vi.advanceTimersByTime(1000);
    expect(func).toHaveReturnedWith(50);
  });

  it('应该在使用 requestAnimationFrame 时处理多次调用', () => {
    const func = vi.fn();
    const debounced = debounce(func, 0);

    debounced();
    debounced();
    expect(func).not.toHaveBeenCalled();

    vi.runAllTimers();
    expect(func).toHaveBeenCalledTimes(1);
  });
});
