import createInterval from '.';

describe('createInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('周期性地执行回调函数', () => {
    const callback = vi.fn();

    createInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('提供的清理函数能够停止定时器', () => {
    const callback = vi.fn();
    const clear = createInterval(callback, 1000);

    vi.advanceTimersByTime(3000);
    clear();
    vi.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});
