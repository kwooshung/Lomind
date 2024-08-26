import Cookie from '.';
import Serializer from '../../serializer';

describe('Cookie', () => {
  beforeEach(() => {
    // 清理所有 cookies
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=; Max-Age=-99999999;`;
    });
  });

  it('应该设置并获取 cookie', () => {
    Cookie.set('test', 'value', 1000);
    expect(Cookie.get('test')).toBe('value');
  });

  it('应该设置并获取复杂对象作为 cookie', () => {
    const obj = { key: 'value' };
    Cookie.set('testObj', obj, 1000);
    expect(Cookie.get('testObj')).toEqual(obj);
  });

  it('应该删除 cookie', () => {
    Cookie.set('test', 'value', 1000);
    Cookie.remove('test');
    expect(Cookie.get('test')).toBeNull();
  });

  it('对于已过期的 cookie 应该返回 null', () => {
    Cookie.set('test', 'value', -1000); // 设置一个立即过期的 cookie
    expect(Cookie.get('test')).toBeNull();
  });

  it('在反序列化失败时应该返回 null 并记录错误', () => {
    // 模拟 Serializer.from 方法抛出异常
    vi.spyOn(Serializer, 'from').mockImplementation(() => {
      throw new Error('Deserialization error');
    });

    // 设置一个 cookie
    Cookie.set('test', 'value');

    // 测试 get 方法是否返回 null
    expect(Cookie.get('test')).toBeNull();

    // 恢复 Serializer.from 的原始实现
    vi.restoreAllMocks();
  });

  it('应该删除指定路径的 cookie', () => {
    Cookie.set('test', 'value', 1000, '/');
    Cookie.remove('test', '/');
    expect(Cookie.get('test')).toBeNull();
  });
});
