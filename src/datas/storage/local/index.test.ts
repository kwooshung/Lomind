import Local from '.';

describe('LocalStorage 管理', () => {
  beforeEach(() => {
    Local.clear();
  });

  it('应该存储并检索数据', () => {
    Local.set('test', 'value');
    expect(Local.get('test')).toBe('value');
  });

  it('应该处理过期数据', () => {
    Local.set('test', 'value', 10);
    expect(Local.get('test')).toBe('value');
    setTimeout(() => {
      expect(Local.get('test')).toBeNull();
    }, 20);
  });

  it('应该删除数据', () => {
    Local.set('test', 'value');
    Local.remove('test');
    expect(Local.get('test')).toBeNull();
  });

  it('应该清除所有数据', () => {
    Local.set('test1', 'value1');
    Local.set('test2', 'value2');
    Local.clear();
    expect(Local.get('test1')).toBeNull();
    expect(Local.get('test2')).toBeNull();
  });
});
