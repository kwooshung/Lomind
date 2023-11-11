const fs = require('fs');
const commitTypes = require('../configs/commitTypes.cjs');

const CHANGELOG_PATH = 'CHANGELOG.md';

const parseCommitType = (commit) => {
  for (const type of commitTypes) {
    if (commit.includes(type.value)) return type;
  }
  return null;
};

const transformChangelog = (content) => {
  // 检查内容中是否包含 '## <small>' 来决定如何分割
  const sections = content.includes('## <small>')
    ? content.split('## <small>')
    : content
        .split('## ')
        .slice(1)
        .map((s) => `## ${s}`);
  let result = '';
  let isFirstVersion = true;

  for (const section of sections) {
    if (!section.trim()) continue;

    // 检查section中是否使用了 <small> 标签
    const isUsingSmallTag = section.includes('<small>');
    const [header, ...commits] = section.split('\n').filter(Boolean);
    let version, date;

    // 根据是否使用 <small> 标签来提取版本号和日期
    if (isUsingSmallTag) {
      [version, date] = header.split(' (');
    } else {
      [version, date] = header.replace('## ', '').split(' (');
    }

    date = date.replace(')', '').replace('</small>', '');

    // 确保我们添加了版本前缀并正确格式化日期
    version = version.trim().startsWith('v') ? version.trim() : `v${version.trim()}`;
    date = date.trim();

    if (isFirstVersion) {
      isFirstVersion = false;
    } else {
      result += '---\n\n';
    }

    result += `## 🎉 ${version} \`${date}\`\n`;

    const categorized = {};

    for (const commit of commits) {
      const type = parseCommitType(commit);
      if (!type) continue;

      const emoji = type.value.split(' ')[0];
      const chineseName = type.name.split('：')[0].trim();
      const cnValue = `${emoji} ${chineseName}`;

      if (!categorized[cnValue]) {
        categorized[cnValue] = [];
      }

      const message = commit.split('): ')[1];
      if (message) {
        categorized[cnValue].push(`- ${message}`);
      }
    }

    let hasValidContent = false;
    for (const [, items] of Object.entries(categorized)) {
      if (items.length > 0) {
        hasValidContent = true;
        break;
      }
    }

    if (!hasValidContent) {
      result += '- 没有特别的说明！\n\n';
      continue;
    }

    for (const [category, items] of Object.entries(categorized)) {
      if (items.length > 0) {
        result += `### ${category}\n`;
        items.forEach((item) => {
          result += `${item}\n`;
        });
        result += '\n';
      }
    }
  }

  return result;
};

// 读取CHANGELOG文件的内容
const content = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
// 转换CHANGELOG内容
const transformed = transformChangelog(content);
// 将转换后的内容写回CHANGELOG文件
fs.writeFileSync(CHANGELOG_PATH, transformed);
