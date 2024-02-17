import createTimeout from '.';

describe('createTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('在指定延迟后执行回调函数', () => {
    const callback = vi.fn();

    createTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('提供的清理函数能够取消定时器', () => {
    const callback = vi.fn();
    const clear = createTimeout(callback, 1000);

    clear();
    vi.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });
});
