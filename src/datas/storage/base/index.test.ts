import Base from '.';

class TestStorage {
  private base: Base;

  constructor() {
    this.base = new Base();
  }

  public set(key: string, value: any, expireMillis?: number): void {
    this.base.set(localStorage, key, value, expireMillis);
  }

  public get(key: string): any | null {
    return this.base.get(localStorage, key);
  }

  public remove(key: string): void {
    this.base.remove(localStorage, key);
  }

  public clear(): void {
    this.base.clear(localStorage);
  }

  public prefix(prefix: string): void {
    this.base.prefix(prefix);
  }
}

describe('存储基类', () => {
  const storage = new TestStorage();

  beforeEach(() => {
    storage.clear();
  });

  it('应该存储并检索数据', () => {
    storage.prefix('testPrefix_'); // 设置前缀
    storage.set('test', { foo: 'bar' });
    expect(storage.get('test')).toEqual({ foo: 'bar' }); // 检查存储的数据
  });

  it('应该处理过期数据', (done) => {
    storage.prefix('testPrefix_'); // 设置前缀
    storage.set('test', 'value', 10);
    expect(storage.get('test')).toBe('value');

    setTimeout(() => {
      expect(storage.get('test')).toBeNull(); // 确认数据已过期并删除
      (done as any)(); // 确保测试用例正确结束
    }, 20); // 延迟时间略大于过期时间
  });

  it('应该删除数据', () => {
    storage.prefix('testPrefix_'); // 确保前缀一致
    storage.set('test', 'value');
    storage.remove('test');
    expect(storage.get('test')).toBeNull(); // 确保数据已经删除
  });

  it('应该清除所有数据', () => {
    storage.set('test1', 'value1');
    storage.set('test2', 'value2');
    storage.clear();
    expect(storage.get('test1')).toBeNull();
    expect(storage.get('test2')).toBeNull();
  });
});
