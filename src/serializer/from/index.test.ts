import from from '.';

describe('from 函数测试', () => {
  it('应该正确反序列化一个普通字符串', () => {
    const serializedStr = '{"type":"String","value":"hello"}';
    const result = from(serializedStr);
    expect(result).toBe('hello');
  });

  it('应该正确反序列化一个 JSON 字符串', () => {
    const serializedJsonString = '{"type":"String","value":"{\\"key\\":\\"value\\"}"}';
    const result = from(serializedJsonString);
    expect(result).toBe('{"key":"value"}'); // 反序列化后应保持为原始 JSON 字符串
  });

  it('应该正确反序列化一个数字', () => {
    const serializedNum = '{"type":"Number","value":123}';
    const result = from(serializedNum);
    expect(result).toBe(123);
  });

  it('应该正确反序列化一个布尔值', () => {
    const serializedBool = '{"type":"Boolean","value":true}';
    const result = from(serializedBool);
    expect(result).toBe(true);
  });

  it('应该正确反序列化 null', () => {
    const serializedNull = '{"type":"Null"}';
    const result = from(serializedNull);
    expect(result).toBeNull();
  });

  it('应该正确反序列化 undefined', () => {
    const serializedUndefined = '{"type":"Undefined"}';
    const result = from(serializedUndefined);
    expect(result).toBeUndefined();
  });

  it('应该正确反序列化 NaN', () => {
    const serializedNaN = '{"type":"NaN"}';
    const result = from(serializedNaN);
    expect(Number.isNaN(result)).toBe(true);
  });

  it('应该正确反序列化 Infinity', () => {
    const serializedInfinity = '{"type":"Infinity"}';
    const result = from(serializedInfinity);
    expect(result).toBe(Infinity);
  });

  it('应该正确反序列化 -Infinity', () => {
    const serializedNegInfinity = '{"type":"-Infinity"}';
    const result = from(serializedNegInfinity);
    expect(result).toBe(-Infinity);
  });

  it('应该正确反序列化一个 BigInt', () => {
    const serializedBigInt = '{"type":"BigInt","value":"123456789012345678901234567890"}';
    const result = from(serializedBigInt);
    expect(result).toBe(BigInt('123456789012345678901234567890'));
  });

  it('应该正确反序列化一个 Symbol', () => {
    const serializedSymbol = '{"type":"Symbol","value":"Symbol(test)"}';
    const result = from(serializedSymbol);
    expect(typeof result).toBe('symbol');
    expect(result.toString()).toBe('Symbol(test)');
  });

  it('应该正确反序列化一个函数', () => {
    const serializedFunction = '{"type":"Function","value":"() => {}"}';
    const result = from(serializedFunction);
    expect(typeof result).toBe('function');
  });

  it('应该正确反序列化一个正则表达式', () => {
    const serializedRegExp = '{"type":"RegExp","value":"/abc/g"}';
    const result = from(serializedRegExp);
    expect(result).toEqual(/abc/g);
  });

  it('应该正确反序列化一个日期', () => {
    const serializedDate = '{"type":"Date","value":"2024-01-01T00:00:00.000Z"}';
    const result = from(serializedDate);
    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe('2024-01-01T00:00:00.000Z');
  });

  it('应该正确反序列化一个 Set', () => {
    const serializedSet = '{"type":"Set","value":[1,2,3]}';
    const result = from(serializedSet);
    expect(result).toBeInstanceOf(Set);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('应该正确反序列化一个 Map', () => {
    const serializedMap = '{"type":"Map","value":[["key1","value1"],["key2","value2"]]}';
    const result = from(serializedMap);
    expect(result).toBeInstanceOf(Map);
    expect(result).toEqual(
      new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
      ])
    );
  });

  it('应该正确反序列化一个嵌套对象', () => {
    const serializedNestedObj =
      '{"key1":{"type":"String","value":"hello"},"key2":{"type":"Number","value":123},"key3":{"type":"Boolean","value":true},"key4":{"type":"Set","value":[1,2,3]},"key5":{"nestedKey":{"type":"String","value":"nestedValue"}}}';
    const result = from(serializedNestedObj);
    expect(result).toEqual({
      key1: 'hello',
      key2: 123,
      key3: true,
      key4: new Set([1, 2, 3]),
      key5: { nestedKey: 'nestedValue' }
    });
  });

  it('应该正确反序列化一个带有逻辑的函数', () => {
    const serializedFunction = '{"type":"Function","value":"(a, b) => a + b"}';
    const result = from(serializedFunction);
    expect(typeof result).toBe('function');
    expect(result(2, 3)).toBe(5); // 测试函数是否正常工作
  });

  it('应该正确反序列化一个带有复杂描述的 Symbol', () => {
    const serializedSymbol = '{"type":"Symbol","value":"Symbol(complex_description)"}';
    const result = from(serializedSymbol);
    expect(typeof result).toBe('symbol');
    expect(result.toString()).toBe('Symbol(complex_description)');
  });

  it('应该正确反序列化包含特殊类型的嵌套对象', () => {
    const serializedNestedObj = `{
    "key1":{"type":"Symbol","value":"Symbol(testSymbol)"},
    "key2":{"type":"BigInt","value":"12345678901234567890"},
    "key3":{"type":"Function","value":"(x) => x * 2"}
  }`;
    const result = from(serializedNestedObj);
    expect(typeof result.key1).toBe('symbol');
    expect(result.key1.toString()).toBe('Symbol(testSymbol)');
    expect(result.key2).toBe(BigInt('12345678901234567890'));
    expect(typeof result.key3).toBe('function');
    expect(result.key3(2)).toBe(4);
  });

  it('应该处理未知类型并返回原始对象', () => {
    const unknownTypeString = '{"type":"UnknownType","value":"someValue"}';
    const result = from(unknownTypeString);
    expect(result).toEqual({ type: 'UnknownType', value: 'someValue' });
  });

  it('应该处理空字符串并返回 null', () => {
    const result = from('');
    expect(result).toBeNull();
  });

  it('应该处理仅包含类型但没有值的对象', () => {
    const result = from('{"type":"String"}');
    expect(result).toBe(undefined);
  });

  it('应该处理一个可能未被预期的数据类型', () => {
    const serializedUnexpectedType = '{"type":"UnexpectedType","value":"unexpectedValue"}';
    const result = from(serializedUnexpectedType);
    expect(result).toEqual({ type: 'UnexpectedType', value: 'unexpectedValue' });
  });

  it('应该在 JSON 解析失败时返回 null', () => {
    const invalidJsonString = '{"type":"InvalidJson"';
    const result = from(invalidJsonString);
    expect(result).toBeNull();
  });
});
