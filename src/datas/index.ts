export { default as Cookie } from './cookie';
export { default as Storage } from './storage';
export { default as Expire } from './expire';

import Cookie from './cookie';
import Storage from './storage';
import Expire from './expire';

/**
 * @zh 存储模块
 * @en Storage module
 */
const Datas = {
  Cookie,
  Storage,
  Expire
};

export default Datas;
