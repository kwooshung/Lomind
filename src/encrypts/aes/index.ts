import TAes from './interface';

export { default as encrypt } from './encrypt';
export { default as decrypt } from './decrypt';

import encrypt from './encrypt';
import decrypt from './decrypt';

const Aes: TAes = {
  encrypt,
  decrypt
};

export default Aes;
