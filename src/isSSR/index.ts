/**
 * @zh 判断是否为服务端渲染
 * @en Determine if it is server-side rendering
 * @returns {boolean} 是否为服务端渲染
 */
const isSSR = (): boolean => typeof window === 'undefined';

export default isSSR;
