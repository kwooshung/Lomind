export { default as MD5 } from './md5';
export { default as SHA1 } from './sha1';
export { default as SHA256 } from './sha256';

import MD5 from './md5';
import SHA1 from './sha1';
import SHA256 from './sha256';

/**
 * @zh 加密、哈希、编码
 * @en Encryption, hash, encoding
 */
const Encrypts = {
  MD5,
  SHA1,
  SHA256
};

export default Encrypts;
