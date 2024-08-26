export { default as from } from './from';
export { default as to } from './to';

import _from from './from';
import _to from './to';

/**
 * @zh 序列化方法，处理各种 JavaScript 数据类型
 * @en Serialization method, handling various JavaScript data types
 */
const Serializer = {
  from: _from,
  to: _to
};

export default Serializer;
