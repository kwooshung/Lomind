const fs = require('fs');
const semver = require('semver');
const { execSync } = require('child_process');
const commitTypes = require('../configs/commitTypes.cjs');
const { delay, translateText } = require('./translate.cjs');

// 全局调试变量
const DEBUG = false;
// Markdown链接正则表达式
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
// 占位符
const placeholder = '@@@';
// 占位符：正则表达式
const placeholderRegexp = new RegExp('@@@', 'g');

/**
 * 获得本地标签
 * @returns {string[]} 标签列表
 */
const getLocalTags = () => {
  try {
    const output = execSync('git tag').toString().trim();
    return output.split('\n').filter((tag) => tag);
  } catch (error) {
    console.error('Error getting local tags:', error);
    return [];
  }
};

/**
 * 移除破折号和换行符
 * @param {string} text 要处理的文本
 * @returns {string} 处理后的文本
 */
const removeDashesAndNewlines = (text) => {
  // 正则表达式匹配 '---' 及其前后的可选换行符
  const regex = /(\n)?---(\n)?/g;
  // 将匹配到的内容替换为空字符串
  return text.replace(regex, '');
};

/**
 * 提取 changelog
 * @param {string} tag 标签
 * @param {string} [changelogPath = 'CHANGELOG.md'] changelog 路径
 * @returns {string} changelog
 */
const extractChangelog = (tag, changelogPath = 'CHANGELOG.md') => {
  const changelog = fs.readFileSync(changelogPath, 'utf-8');
  const versionRegex = new RegExp(`## 🎉 ${tag} .+?\\n(.*?)(\\n## |\\n$)`, 's');
  const match = changelog.match(versionRegex);
  return match ? removeDashesAndNewlines(match[1].trim()) : null;
};

/**
 * 查找提交类型
 * @param {string} value emoji 和 描述
 * @returns {object} 匹配的提交类型
 */
const findCommitType = (value) => {
  // 分割输入值为 emoji 和描述
  const [emoji, description] = value.split(' ').map((part) => part.trim());

  // 查找匹配的对象
  return commitTypes.find((type) => type.value.includes(emoji) && type.name.includes(description));
};

/**
 * 翻译并替换 changelog
 * @param {string} text 要翻译的文本
 * @returns {Promise<string>} 翻译后的文本
 */
const translateAndReplace = async (text) => {
  let translatedText = '';
  const lines = text.split('\n');
  const originalWords = text.toLowerCase().match(/\b\w+\b/g);

  for (let line of lines) {
    if (line.startsWith('## ')) {
      continue;
    }

    if (line.startsWith('### ')) {
      const type = findCommitType(line.replace('### ', '').trim());

      if (type) {
        line = `### ${type.value}`;
      }
    } else if (line.trim() !== '') {
      const links = [];
      let match;
      while ((match = linkRegex.exec(line)) !== null) {
        links.push(match[0]);
      }
      const textToTranslate = line.replace(linkRegex, placeholder);

      line = await translateText(textToTranslate);
      console.log(`translate: \n\t${textToTranslate}\n\t---------- ↓↓↓ ----------\n\t${line}`.replace(placeholderRegexp, ' '));

      const translatedWords = line.toLowerCase().match(/\b\w+\b/g);
      translatedWords.forEach((word, index) => {
        if (originalWords.includes(word)) {
          const regex = new RegExp('\\b' + translatedWords[index] + '\\b', 'i');
          line = line.replace(regex, originalWords[originalWords.indexOf(word)]);
        }
      });

      line = line.replace(/-(?=\S)/, '- ');

      links.forEach((link) => {
        line = line.replace(placeholder, link);
      });
      await delay(10);
    }

    translatedText = `${translatedText}${line}\n`;
  }

  return translatedText.trim();
};

/**
 * 自动发布
 * @returns {Promise<void>} void
 */
async function autoRelease() {
  let tags, releasedTags, octokit, owner, repo;

  if (DEBUG) {
    // 使用本地 Git 数据
    tags = getLocalTags().map((name) => ({ name }));
    // releasedTags = getLocalReleases();
    releasedTags = [];
  } else {
    // 使用 GitHub API
    const { Octokit } = require('@octokit/rest');
    octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    owner = process.env.GITHUB_REPOSITORY.split('/')[0];
    repo = process.env.GITHUB_REPOSITORY.split('/')[1];

    tags = await octokit.repos.listTags({ owner, repo, per_page: 100 }).then((res) => res.data);
    releasedTags = await octokit.repos.listReleases({ owner, repo, per_page: 100 }).then((res) => res.data.map((release) => release.tag_name));
  }

  const sortedTags = tags.sort((a, b) => semver.compare(a.name, b.name));

  for (const tag of sortedTags) {
    if (!releasedTags.includes(tag.name)) {
      let changelog = extractChangelog(tag.name);

      if (changelog) {
        const translatedChangelog = await translateAndReplace(changelog);

        changelog += '\n---\n\n> 🚩 This `changelog` was auto-translated by Google and may include inaccuracies.\n\n' + translatedChangelog;

        if (DEBUG) {
          fs.writeFileSync('RELEASE.Debug.md', changelog);
          console.log(`Debug output for ${tag.name} saved to RELEASE.Debug.md`);
        } else {
          // 创建 GitHub 发布
          await octokit.repos.createRelease({
            owner,
            repo,
            tag_name: tag.name,
            name: `🎉 ${tag.name}`,
            body: changelog
          });
        }
      }
    }
  }
}

autoRelease().catch((err) => {
  console.error(err);
  process.exit(1);
});
