import isCrypto from '.';

// 模拟 window 对象
declare let global: any;

describe('isWindowCrypto', () => {
  let originalWindow: any;

  beforeAll(() => {
    originalWindow = global.window;
  });

  afterAll(() => {
    global.window = originalWindow;
  });

  it('在浏览器环境下，crypto 和 crypto.subtle 存在时，应该返回 true', () => {
    global.window = {
      crypto: {
        subtle: {}
      }
    };
    expect(isCrypto()).toBeTruthy();
  });

  it('在浏览器环境下，crypto 不存在时，应该返回 false', () => {
    global.window = {};
    expect(isCrypto()).toBeFalsy();
  });

  it('在非浏览器环境下，应该返回 false', () => {
    global.window = undefined;
    expect(isCrypto()).toBeFalsy();
  });
});
