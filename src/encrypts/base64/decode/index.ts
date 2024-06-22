const decode = (text: string): string => Buffer.from(text, 'base64').toString('utf-8');

export default decode;
