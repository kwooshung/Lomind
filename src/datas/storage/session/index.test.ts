import Session from '.';

describe('SessionStorage 管理', () => {
  beforeEach(() => {
    Session.clear();
  });

  it('应该存储并检索数据', () => {
    Session.set('test', 'value');
    expect(Session.get('test')).toBe('value');
  });

  it('应该处理过期数据', () => {
    Session.set('test', 'value', 10);
    expect(Session.get('test')).toBe('value');
    setTimeout(() => {
      expect(Session.get('test')).toBeNull();
    }, 20);
  });

  it('应该删除数据', () => {
    Session.set('test', 'value');
    Session.remove('test');
    expect(Session.get('test')).toBeNull();
  });

  it('应该清除所有数据', () => {
    Session.set('test1', 'value1');
    Session.set('test2', 'value2');
    Session.clear();
    expect(Session.get('test1')).toBeNull();
    expect(Session.get('test2')).toBeNull();
  });
});
