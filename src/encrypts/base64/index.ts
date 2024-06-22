import TBase64 from './interface';

export { default as encode } from './encode';
export { default as decode } from './decode';

import encode from './encode';
import decode from './decode';

/**
 * @zh Base64 编码、解码
 * @en Base64 encoding and decoding
 */
const Base64: TBase64 = {
  encode,
  decode
};

export default Base64;
