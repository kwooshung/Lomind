import Version from '.';

describe('版本号测试', () => {
  it('应该正确导出版本号', () => {
    expect(Version).toMatch(/^(\d+)\.(\d+)\.(\d+)(?:-([\w-]+(?:\.[\w-]+)*))?(?:\+([\w-]+(?:\.[\w-]+)*))?$/);
  });
});
