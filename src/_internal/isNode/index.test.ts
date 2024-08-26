import isNode from '.';

// 模拟 process 对象
declare let global: any;

describe('isNode', () => {
  let originalProcess: any;

  beforeAll(() => {
    originalProcess = global.process;
  });

  afterAll(() => {
    global.process = originalProcess;
  });

  it('在 Node.js 环境下，process 和 process.versions.node 存在时，应该返回 true', () => {
    global.process = {
      versions: {
        node: '14.0.0'
      }
    };

    expect(isNode()).toBeTruthy();
  });

  it('在 Node.js 环境下，process.versions 不存在时，应该返回 false', () => {
    global.process = {
      versions: {}
    };

    expect(isNode()).toBeFalsy();
  });

  it('在非 Node.js 环境下，应该返回 false', () => {
    global.process = undefined;

    expect(isNode()).toBeFalsy();
  });
});
