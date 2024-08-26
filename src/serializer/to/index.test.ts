import to from '.';

describe('to 函数测试', () => {
  it('应该正确序列化一个普通字符串', () => {
    const str = 'hello';
    const result = to(str);
    expect(result).toBe('"hello"');
  });

  it('应该正确序列化一个 JSON 字符串', () => {
    const jsonString = '{"key":"value"}';
    const result = to(jsonString);
    expect(result).toBe(JSON.stringify(jsonString));
  });

  it('应该正确序列化一个数字', () => {
    const num = 123;
    const result = to(num);
    expect(result).toBe('123');
  });

  it('应该正确序列化一个布尔值', () => {
    const bool = true;
    const result = to(bool);
    expect(result).toBe('true');
  });

  it('应该正确序列化 null', () => {
    const value = null;
    const result = to(value);
    expect(result).toBe('{"type":"Null"}');
  });

  it('应该正确序列化 undefined', () => {
    const value = undefined;
    const result = to(value);
    expect(result).toBe('{"type":"Undefined"}');
  });

  it('应该正确序列化 NaN', () => {
    const value = NaN;
    const result = to(value);
    expect(result).toBe('{"type":"NaN"}');
  });

  it('应该正确序列化 Infinity', () => {
    const value = Infinity;
    const result = to(value);
    expect(result).toBe('{"type":"Infinity"}');
  });

  it('应该正确序列化 -Infinity', () => {
    const value = -Infinity;
    const result = to(value);
    expect(result).toBe('{"type":"-Infinity"}');
  });

  it('应该正确序列化一个 BigInt', () => {
    const value = BigInt('123456789012345678901234567890');
    const result = to(value);
    expect(result).toBe('{"type":"BigInt","value":"123456789012345678901234567890"}');
  });

  it('应该正确序列化一个 Symbol', () => {
    const value = Symbol('test');
    const result = to(value);
    expect(result).toBe('{"type":"Symbol","value":"Symbol(test)"}');
  });

  it('应该正确序列化一个函数', () => {
    const fn = () => {};
    const result = to(fn);

    // 解析结果为对象
    const parsedResult = JSON.parse(result);

    // 确认类型是 Function
    expect(parsedResult.type).toBe('Function');

    // 去掉 value 中的所有空白字符并进行比较
    expect(parsedResult.value.replace(/\s+/g, '')).toBe('()=>{}');
  });

  it('应该正确序列化一个正则表达式', () => {
    const regExp = /abc/g;
    const result = to(regExp);
    expect(result).toBe('{"type":"RegExp","value":"/abc/g"}');
  });

  it('应该正确序列化一个日期', () => {
    const date = new Date('2024-01-01T00:00:00.000Z');
    const result = to(date);

    expect(result).toBe('"2024-01-01T00:00:00.000Z"');
  });

  it('应该正确序列化一个 Set', () => {
    const set = new Set([1, 2, 3]);
    const result = to(set);
    expect(result).toBe('{"type":"Set","value":[1,2,3]}');
  });

  it('应该正确序列化一个 Map', () => {
    const map = new Map([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);
    const result = to(map);
    expect(result).toBe('{"type":"Map","value":[["key1","value1"],["key2","value2"]]}');
  });

  it('应该正确序列化一个嵌套对象', () => {
    const nestedObj = {
      key1: 'hello',
      key2: 123,
      key3: true,
      key4: new Set([1, 2, 3]),
      key5: { nestedKey: 'nestedValue' }
    };
    const result = to(nestedObj);
    expect(result).toBe('{"key1":"hello","key2":123,"key3":true,"key4":{"type":"Set","value":[1,2,3]},"key5":{"nestedKey":"nestedValue"}}');
  });

  it('应该正确处理循环引用对象', () => {
    const obj: any = {};
    obj.self = obj; // 创建循环引用
    const result = to(obj);
    expect(result).toBe('{}'); // 循环引用会被跳过
  });

  it('应该正确序列化一个空的 Set', () => {
    const set = new Set();
    const result = to(set);
    expect(result).toBe('{"type":"Set","value":[]}');
  });

  it('应该正确序列化一个空的 Map', () => {
    const map = new Map();
    const result = to(map);
    expect(result).toBe('{"type":"Map","value":[]}');
  });

  it('应该正确序列化一个嵌套的 Set', () => {
    const nestedSet = new Set([1, new Set([2, 3])]);
    const result = to(nestedSet);
    expect(result).toBe('{"type":"Set","value":[1,{"type":"Set","value":[2,3]}]}');
  });

  it('应该正确序列化一个嵌套的 Map', () => {
    const nestedMap = new Map([['key1', new Map([['nestedKey', 'nestedValue']])]]);
    const result = to(nestedMap);
    expect(result).toBe('{"type":"Map","value":[["key1",{"type":"Map","value":[["nestedKey","nestedValue"]]}]]}');
  });

  it('应该正确序列化一个包含对象的 Set', () => {
    const obj = { key: 'value' };
    const setWithObject = new Set([obj]);
    const result = to(setWithObject);
    expect(result).toBe('{"type":"Set","value":[{"key":"value"}]}');
  });

  it('应该正确序列化一个包含对象的 Map', () => {
    const obj = { key: 'value' };
    const mapWithObject = new Map([['objectKey', obj]]);
    const result = to(mapWithObject);
    expect(result).toBe('{"type":"Map","value":[["objectKey",{"key":"value"}]]}');
  });
});
