export { default as encrypt } from './encrypt';
export { default as decrypt } from './decrypt';

import encrypt from './encrypt';
import decrypt from './decrypt';

/**
 * @zh AES 加解密
 * @en AES encryption and decryption
 */
const Aes = {
  encrypt,
  decrypt
};

export default Aes;
