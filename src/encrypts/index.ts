export { default as MD5 } from './md5';
export { default as SHA1 } from './sha1';
export { default as SHA256 } from './sha256';
export { default as Aes } from './aes';
export { default as Base64 } from './base64';

import MD5 from './md5';
import SHA1 from './sha1';
import SHA256 from './sha256';
import Aes from './aes';
import Base64 from './base64';

/**
 * @zh 加密、哈希、编码
 * @en Encryption, hash, encoding
 */
const Encrypts = {
  MD5,
  SHA1,
  SHA256,
  Aes,
  Base64
};

export default Encrypts;
