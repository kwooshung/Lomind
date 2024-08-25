import from from '.';

describe('反序列化 (From)', () => {
  it('应该反序列化一个基本的 JSON 字符串', () => {
    expect(from('{"key":"value"}')).toEqual({ key: 'value' });
  });

  it('应该反序列化一个 Set', () => {
    const set = from('{"type":"Set","value":[1,2,3]}');
    expect(set).toBeInstanceOf(Set);
    expect(set).toEqual(new Set([1, 2, 3]));
  });

  it('应该反序列化一个 Map', () => {
    const map = from('{"type":"Map","value":[["key1","value1"],["key2","value2"]]}');
    expect(map).toBeInstanceOf(Map);
    expect(map).toEqual(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
      ])
    );
  });

  it('应该反序列化一个 RegExp', () => {
    const regExp = from('{"type":"RegExp","value":"/abc/g"}');
    expect(regExp).toBeInstanceOf(RegExp);
    expect(regExp).toEqual(/abc/g);
  });

  it('应该反序列化一个 Date', () => {
    const date = from('{"type":"Date","value":"2024-01-01T00:00:00.000Z"}');
    expect(date).toBeInstanceOf(Date);
    expect(date.toISOString()).toBe('2024-01-01T00:00:00.000Z');
  });

  it('对于无效的 JSON 应该返回 null', () => {
    expect(from('invalid')).toBeNull();
  });
});
