/**
 * @zh 检测是否在 Node.js 环境中
 * @en Check if in Node.js environment
 * @returns {boolean} 是否在 Node.js 环境中
 */
const isNode = (): boolean => typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export default isNode;
