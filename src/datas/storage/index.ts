export { default as Local } from './local';
export { default as Session } from './session';

import Local from './local';
import Session from './session';

/**
 * @zh 存储模块
 * @en Storage module
 */
const Storage = {
  Local,
  Session
};

export default Storage;
