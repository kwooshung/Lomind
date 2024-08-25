import to from '.';

describe('序列化 (To)', () => {
  it('应该序列化一个基本对象', () => {
    expect(to({ key: 'value' })).toBe('{"key":"value"}');
  });

  it('应该序列化一个 Set', () => {
    const set = new Set([1, 2, 3]);
    expect(to(set)).toBe('{"type":"Set","value":[1,2,3]}');
  });

  it('应该序列化一个 Map', () => {
    const map = new Map([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);
    expect(to(map)).toBe('{"type":"Map","value":[["key1","value1"],["key2","value2"]]}');
  });

  it('应该序列化一个 RegExp', () => {
    const regExp = /abc/g;
    expect(to(regExp)).toBe('{"type":"RegExp","value":"/abc/g"}');
  });

  it('应该序列化一个 Date', () => {
    const date = new Date('2024-01-01T00:00:00.000Z');
    expect(to(date)).toBe('"2024-01-01T00:00:00.000Z"');
  });

  it('应该序列化一个 null 值', () => {
    expect(to(null)).toBe('null');
  });
});
