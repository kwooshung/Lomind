import isSSR from '.';

describe('isSSR', () => {
  it('判断是否为服务端渲染', () => {
    // 模拟服务端环境
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    expect(isSSR()).toBe(true);

    // 恢复 window 对象
    global.window = originalWindow;
  });

  it('判断是否为客户端渲染', () => {
    // 模拟客户端环境
    global.window = {} as any;

    expect(isSSR()).toBe(false);

    // 清除模拟的 window 对象
    delete global.window;
  });
});
