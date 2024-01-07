const types = require('./.ks-cvlar.types.cjs');
const scopes = require('./.ks-cvlar.scopes.cjs');

/**
 * 以下所有配置项，均支持此种配置，如：开启配置：只赋值 'default'、'{}' 或 '无此项配置' 即可，这将启用 '默认配置';
 * 关闭配置：只需要赋值 'false' 即可;
 * 推荐使用命令 'cvlar i' 初始化配置文件
 */
module.exports = {
  // Git提交，方便在菜单中选择性提交内容
  commit: {
    types,
    scopes
  },
  // 包管理，方便在菜单中选择性执行特定命令
  package: {
    /**
     * package.json 中的 scripts 配置项，赋值对象，如下所示：
     * {
     *   dev: 'npm run dev',
     *   build: 'npm run build',
     *   'test:watch': 'npm run build',
     *   ...
     * }
     *
     * 格式说明：
     *   key：必须，表示命令名称，必须和 'package.json' 中的 'scripts' 配置项中的 'key' 一致，否则无法正确执行命令
     *   value：必须，表示命令描述，用于在菜单中做说明
     *     空字符串，在菜单中，将直接使用key表示
     *     非空字符串，在菜单中，将直接使用value表示
     */
    scripts: {
      prepare: '准备',
      test: '测试',
      'test:watch': '测试',
      'test:ci': '测试',
      'dev:js': '开发模式',
      'dev:react': '开发模式',
      'dev:vue': '开发模式',
      'build:all': '生产模式',
      'build:js': '生产模式',
      'build:react': '生产模式',
      'build:vue': '生产模式',
      stylelint: '样式检查',
      eslint: '脚本检查'
    },
    // 包管理工具
    manager: {
      /**
       * 包管理工具类型，赋值字符串，可赋值：
       * npm, yarn, pnpm, 等其他包管理工具的名称
       */
      type: 'pnpm',
      /**
       * 依赖源，默认：auto，表示按照包管理工具的默认源，一般是：https://registry.npmjs.org
       * 注意：此配置不会影响全局或当前项目的依赖源，只会影响通过本工具安装的依赖时的依赖源
       */
      registry: 'auto',
      /**
       * 包管理命令，格式说明：
       *   key：必须，表示命令名称，例如 'npm install xxx'，'key' 就是 'install'
       *   value：必须，表示命令描述，用于在菜单中做说明
       *     空字符串，在菜单中，将直接使用key表示
       *     非空字符串，在菜单中，将直接使用value表示
       * 注意：
       *   1. 以下默认命令，均以 npm 为准，您可自行修改
       *   2. 如果您使用的是 yarn 或 pnpm，可能会出现不兼容的情况，
       *      您可以自行修改与之对应的命令即可
       *   3. 新版本的 npm/yarn/pnpm 命令均互相兼容，
       *      若出现不兼容的情况，自行修改下方命令或升级包管理工具
       */
      commands: {
        install: '安装',
        update: '更新',
        uninstall: '卸载',
        outdated: '列出过时的包',
        list: '查看列表',
        info: '查看信息',
        search: '搜索',
        login: '登录',
        publish: '发布'
      }
    }
  },
  // 版本管理，可用于升级、撤销 版本号，自动升级和提交
  version: {
    // 是否自动更新 package.json 中的版本号，布尔类型，默认：true
    package: true
  },
  // 日志，自动根据 Git 提交记录生成日志
  changelog: {
    // 日志文件相关配置
    file: {
      save: './changelogs'
    },
    // 日志翻译相关配置
    translate: {
      /**
       * CHANGELOG 文件的原始语言，default 'zh-CN'
       *   支持的语言列表：https://cloud.google.com/translate/docs/languages
       */
      origin: 'zh-CN',
      /**
       * CHANGELOG 文件的目标语言，default 'en'，可以是数组，表示翻译成多种语言
       * 若已存在翻译版本的日志，仅对新生成的日志有效，你可选择 '重新生成所有日志'
       *   支持的语言列表：https://cloud.google.com/translate/docs/languages
       */
      target: ['en', 'jp', 'ko', 'ru']
    },
    // 日志模板相关配置
    template: {
      /**
       * CHANGELOG 文件的内容模板，支持 md 语法
       *   默认值：
       *     ## 🎉 {{tag}} `{{date}}`
       *     {{logs}}
       *
       * 日志会按照提交类型顺序分类
       * 目前支持的变量如下：
       *   tag：tag名
       *   date：日期，如：2023-12-17
       *   time：时间，如：04:59:39
       *   logs：日志内容，对应下面的 logs 配置项
       *
       *【注意】当已存在使用此模板生成的日志，且启用了 `cvlar -r/release` 自动发布，
       *       建议重新生成所有日志，避免 `cvlar -r/release` 自动发布时，可能无法准确获取到日志内容'
       */
      content: '## 🎉 {{tag}} `{{date}}`\n{{logs}}',
      /**
       * 根据type分类，具体的日志内容
       * 若已存在翻译版本的日志，仅对新生成的日志有效，
       * 你可选择 '重新生成所有日志'
       */
      logs: {
        // 标题模板
        title: {
          /**
           * 标准的标题模板，也就是`提交类型`存在时的模板
           *
           * 可使用的变量：
           *   emoji:`提交类型`对应的 emoji
           *   type：`提交类型`，变量首字母大写，则内容首字母也会大写
           *   scope：提交范围，变量首字母大写，则内容首字母也会大写
           *   date: 日期，如：2023-12-17
           *   time: 时间，如：04:59:39
           */
          standard: '### {{emoji}} {{Type}}',
          // 其他标题模板，也就是`提交类型`不存在时的模板，无法根据`提交类型`分类的标题
          other: '### Other'
        },
        /**
         * 每条日志消息的模板
         *
         * 可使用的变量：
         *   message：日志消息，变量首字母大写，则内容首字母也会大写
         *   commitlink：提交记录详情页链接
         *   date: 日期，如：2023-12-17
         *   time: 时间，如：04:59:39
         */
        item: '- {{message}} ({{commitlink}})',
        /**
         * CHANGELOG 文件中，每条日志均有具体的提交详情页
         * 用于跳转到提交记录详情页链接
         */
        commitlink: {
          /**
           * 链接文本
           *   id：表示提交的ID
           *    [substr:n,l]：
           *    n（必要参数）：表示从第几个字符开始截取，若l不存在，此参数就表示从 0 截取到 n 个字符
           *    l（可选参数）：表示截取多少个字符
           */
          text: '#{{id[substr:7]}}',
          /**
           * 链接地址
           *
           * 可使用的变量：
           * id：表示提交id，完整的ID一般为40位
           */
          url: 'https://github.com/kwooshung/cvlar/commit/{{id}}'
        }
      }
    }
  },
  release: {
    /**
     * 发布页面，tag版本标题模板
     *
     * 可使用的变量：
     *   tag：tag名
     */
    subject: '🎉 {{tag}}',
    /**
     * 每当你创建新标签到暂存到git本地仓库，并且还未推送到远程仓库时，
     * 会自动执行日志生成，翻译，写入文件等操作。
     * 这样会导致你的仓库文件发生变化，因此需要提交这些变化的文件到仓库（一般仅有日志变化），
     * 因此需要提交信息，但总不能每次提交tag都要手动选择一遍 commit type 和 commit scope 吧，这样太麻烦了，而且每次提交信息都差不多，所以就有了这个配置项
     *
     * 但是，由于暂存到本地仓库的标签，不包含新创建的日志
     * 所以，需要撤销本地仓库的标签，重新创建同样的标签，这样就会包含新的日志
     *
     * 因此内部执行的流程看起来是这样的：
     *  1、创建标签 1.0.0（肯定不会包含第二步的日志内容）
     *  2、根据标签生成日志
     *  3、暂存日志到git本地仓库
     *  4、撤销本地git仓库标签 1.0.0
     *  5、重新创建标签 1.0.0（这样就会包含根据标签生成的日志）
     *  6、推送本地仓库到远程仓库
     *  7、推送标签到远程仓库
     *
     *
     * 根据下面的 `type`、`scope` 和 `subject`，生成的提交信息的短说明：
     * 程序内部执行的模板：{{emoji}}{{type}}({{scope}}): {{subject}}
     *
     * 如果使用的是默认 `commit types` 和 `commit scopes` 配置
     * 而且 `subject` 内容为 `new version {{tag}}`
     * 那么最终结果如下：
     * 📦️ release(tag): new version 1.0.0
     */
    pushTagMessage: {
      /**
       * 提交类型，参考本文配置文件中的 `commit.types`
       * 将根据 `name` 字段，自动匹配到对应的提交类型
       *
       * 【注意】建议与 `commit.types` 中的 `name` 字段保持一致
       */
      type: 'release',
      /**
       * 可选，`commit scopes`，提交范围，参考本文配置文件中的 `commit.scopes`
       *
       * 【注意】建议与 `commit.scopes` 中的 `name` 字段保持一致
       */
      scope: 'tag',
      /**
       * `commit subject`，提交信息的短说明
       *
       * 可使用的变量：
       *  tag：tag名
       *
       * 若是启用了提交信息翻译，即 `commit.submit` 配置项不为 false
       * `commit.submit.origin` 这里指定什么语言，此选项就应该使用什么语言写内容
       * `commit.submit.target` 而后会根据这个配置，将内容翻译成指定的语言
       */
      subject: '新版本 {{tag}}'
    },
    /**
     * 当启用多语言
     * 即 `changelog.translate.origin` 和 `changelog.translate.target` 配置项不为 false 时，使用此配置项
     */
    lang: {
      /**
       * 多语言内容模板
       *
       * 可使用的变量：
       *   name（必要参数）：语言名称
       *   code（可选参数）：语言代码
       *
       * 若不需要，可设置此项为false，将不会在日志中出现此标题
       */
      subject: '## 🌐 {{name}} ({{code}})',
      // 分隔符
      separator: '\n\n'
    },
    /**
     * 布尔类型，默认：true
     * 是否在 'Github Release' 内容中，每条 'Release' 的最后，加入如下md代码：
     *   > This [Changelog](changelog.file.save 的目录设置值), Powered by @kwooshung/[cvlar](https://github.com/kwooshung/cvlar/)
     *   参考：https://github.com/kwooshung/cvlar/releases
     */
    poweredby: true
  },
  /**
   * 用于此工具提示信息的国际化配置
   * 可自定义任何语言，以下内容根据内容自行翻译需要的语言即可
   */
  i18n: {
    // 是，主要用于菜单中的单选，表示选中
    yes: '是',
    // 否，主要用于菜单中的单选，表示未选中
    no: '否',
    /**
     * 最多可选数量，主要用于菜单中的选项，
     * 表示最少展示多少个选项，多余的将需要滚动查看
     */
    choicesLimit: 15,
    // 多选，只能用于菜单中的多选中的菜单相关配置
    checkbox: {
      // 在多选菜单展示时，默认提示，表示按键操作
      instructions: '按<空格>进行选择，按<a>切换全部，按<i>反转选择，按<回车>确认选择'
    },
    // 一级菜单的标题
    select: '我想 ...',
    // package.json 中的 scripts，用于菜单中的运行脚本
    scripts: {
      // 菜单中的运行脚本的标题
      message: '运行',
      description: '选择要运行的脚本',
      select: {
        message: '主菜单 > 运行 > 选择脚本'
      }
    },
    // git相关
    git: {
      message: 'Git',
      description: 'Git版本控制',
      // git 提交相关
      commit: {
        message: '提交代码',
        description: '提交代码到 Git 仓库',
        select: {
          message: '主菜单 > 版本控制'
        },
        type: {
          message: '选择提交类型'
        },
        scope: {
          message: '选择修改范围'
        },
        /**
         * git提交信息，短说明，
         *
         *  其中
         *    transformer：可选，表示对值处理函数
         *    validate：可选，表示验证函数
         *
         *    两个函数均可自定义，具体请参考：https://github.com/SBoudrias/Inquirer.js/tree/master/packages/input
         */
        subject: {
          message: '短说明',
          description: '不建议超过72个字符',
          validate(val) {
            val = val.trim();
            if (val.length <= 0) {
              return '短说明不能为空';
            } else if (val.length > 72) {
              return '短说明不能超过72个字符';
            }
            return true;
          }
        },
        // 长说明，同样支持 `transformer` 和 `validate`
        body: {
          message: '长说明',
          description: '使用 "|" 换行',
          // 是否必填项，布尔类型，默认：false
          required: false,
          // 必填项的提示信息
          requiredMessage: '长说明不能为空'
        },
        // 破坏性变更，不向下兼容, 同样支持 `transformer` 和 `validate`
        breaking: {
          message: 'BREAKING CHANGES（破坏性变更，不向下兼容）',
          field: 'BREAKING CHANGE: ',
          required: false,
          requiredMessage: '长说明不能为空'
        },
        /**
         * 自定义字段，支持三种类型：`input`、`select`、`checkbox`，参考本项目仓库根目录下的 `.ks-cvlarrc.cjs` 文件
         * 在仓库说明中，也有此配置的详细说明
         * 若不需要，可删除 `custom` 字段 或 将 `custom` 字段赋值为 `false`
         */
        custom: false,
        // issues相关
        issues: {
          message: '是否需要关闭 issue？',
          default: false,
          close: {
            message: '选择关闭 issue 的关键词，支持多选',
            // issues相关，可自定义关键字，默认：`fixes`、`resolves` 和 `closes`
            choices: [
              { name: '修复', value: 'fixes', description: '修复' },
              { name: '增强', value: 'resolves', description: '增强' },
              { name: '关闭', value: 'closes', description: '关闭' }
            ],
            number: {
              message: '{0} 的 issue 编号 (例如：#11 #17 #27)'
            }
          }
        },
        translate: {
          connect: {
            message: '正在连接 Google翻译，并检查是否可用...',
            success: '连接 Google翻译 成功',
            fail: '连接 Google翻译 失败'
          },
          process: {
            message: '正在翻译提交信息：',
            success: '翻译成功',
            fail: '翻译失败，错误信息如下：'
          },
          error: {
            config: 'commit.submit 配置项错误'
          }
        },
        /**
         * 生成提交信息后，触发此函数，可自行处理提交信息的格式
         * 返回值，是一个对象，包含两个属性，fail、val：
         *   fail：true时，则不会继续执行提交操作，
         *   val：提交信息
         * 也可用于自定义提示信息
         */
        complate(val) {
          return { fail: false, val };
        },
        confirm: {
          message: '请确认最终信息正确？',
          yes: '正确，直接提交',
          no: '不准确，使用 `文本编辑器` 修改后提交',
          editor: {
            message: '按下 <回车> 键，打开 `文本编辑器`，修改后保存并关闭，即可提交'
          }
        },
        push: {
          message: '是否推送到远程仓库？',
          // true：自动选择是，false：自动选择否，默认：false
          default: false
        },
        tag: {
          message: '是否需要打标签？',
          // true：自动选择是，false：自动选择否，默认：false
          default: false
        }
      },
      // 升/降级版本号相关
      version: {
        message: '版本号',
        description: '版本号管理，可用于升级、撤销 版本号，自动升级和提交',
        translate: {
          check: {
            message: '将使用 Google翻译，是否检查连接状态？',
            success: '连接 Google翻译 成功',
            fail: '连接失败',
            retry: '是否重试？',
            error: '无法连接 Google翻译，暂时不能生成日志'
          }
        },
        select: {
          message: '请选择操作'
        },
        upgrade: {
          message: '升级版本（自动）',
          description: '选择 主版本号、次版本号 或 补丁版本号，自动根据 当前版本号，计算下个版本号',
          type: {
            message: '您打算升级哪个版本',
            major: {
              message: '主要',
              description: '一般引入了不向后兼容的 API 更改或重大功能更改。'
            },
            minor: {
              message: '次要',
              description: '新的向后兼容功能，建议在确定新功能对项目有用时进行更新。'
            },
            patch: {
              message: '补丁',
              description: '通常用于小的错误修复和更新，不影响软件的主要功能和向后兼容性。'
            }
          }
        },
        specify: {
          message: '升级版本（指定）',
          description: '完全由您自定义，但是也得符合语义化版本规范（SemVer）',
          input: {
            message: '请输入版本号：'
          }
        },
        downgrade: {
          message: '降级版本（回退/撤销）',
          description: '撤销指定版本号，仅撤销版本，不会对文件产生修改',
          select: {
            message: '请选择要撤销的版本号',
            confirm: {
              message: '是否修改 package.json 中的版本号？',
              default: true,
              remote: {
                message: '是否删除远程仓库中的 tag？',
                default: false
              },
              change: {
                message: '您想使用哪个版本号 package.json 中？',
                descriptions: {
                  auto: '自动计算前一个版本，但在以往的tags中，可能不存在这个版本号',
                  prevtag: '将使用前一个tag作为版本号'
                },
                specify: {
                  message: '指定版本号'
                }
              }
            },
            error: {
              no: '没有可撤销的版本号，请重新选择'
            }
          }
        },
        flag: {
          message: '是否添加发布标识符？',
          description: '可能是 稳定版本 或 预发布版本',
          select: {
            message: '选择发布标识符',
            choices: [
              { name: '预览版 (alpha)', value: 'alpha', description: '{0}，预览版，主要用于内部测试，可能包含很多BUG，功能不全，存在很多错误' },
              { name: '测试版 (beta)', value: 'beta', description: '{0}，该版本任然存在很多BUG，但是相对alpha版要稳定一些，会不断增加新功能' },
              { name: '候选版本 (rc)', value: 'rc', description: '{0}，这个版本接近最终产品，主要目的是查找可能的遗漏的问题。如果没有发现重大问题，这个版本可能就会成为最终发布的版本。' },
              { name: '正式版本 (stable)', value: 'stable', description: '{0}，正式版本，该版本相对稳定，基本不会再修改代码，除非发现BUG，或者出现新的需求' }
            ]
          },
          iterations: {
            message: {
              no: '当前版本号：{0}，不存在预发号，确认使用 {1} 作为预发版本号？',
              add: '当前版本号：{0}，预发版本类型为{1}，迭代号为：{2}，是否使用 {3} 作为预发版本号？',
              newno: '当前版本号：{0}，新版本号是：{1}，不存在预发布版本号，是否使用：{2} 作为预发版本号？'
            },
            input: {
              message: '请输入迭代版本号：',
              validate(val) {
                val = val.trim();
                if (val.length <= 0) {
                  return '迭代版本号不能为空';
                } else if (!val.test(/([1-9]d*)/)) {
                  return '迭代版本号格式不正确';
                }
                return true;
              }
            }
          }
        },
        annotate: {
          message: '是否添加说明？',
          no: '无说明',
          short: '短说明',
          long: '长说明（将使用文本编辑器打开）',
          default: ''
        },
        file: {
          message: '是否更新 package.json 中的版本号？',
          default: true
        },
        push: {
          message: '是否推送 tags 到远程仓库？',
          default: true
        },
        error: {
          exists: '当前版本号 {0} 已存在，请重新输入',
          format: '版本号格式不符合 Semver语义化标准，请重新输入'
        }
      }
    },
    // 包管理相关
    package: {
      message: '包管理',
      description: '安装，更新，卸载，查看，登录，发布 等',
      dependencies: '↓↓↓↓↓ [生产依赖] ↓↓↓↓↓',
      devDependencies: '↓↓↓↓↓ [开发依赖] ↓↓↓↓↓',
      commands: {
        message: '主菜单 > 包管理 > 选择命令',
        install: {
          message: '包名：',
          description:
            "格式：vue react | vite vitest\n说明：\n    · '|' 左边表示 'dependencies，右边表示 'devDependencies'\n    · 若是单独安装 'dependencies'，则不需要 '|'\n    · 若是单独安装 'devDependencies'，只需 '| vite vitest'",
          error: {
            format: '格式错误，请重新输入'
          }
        },
        uninstall: {
          message: '选择要卸载的包'
        },
        update: {
          message: '选择要更新的包',
          loadings: {
            reading: '正在读取 package.json 文件 ...',
            request: '正在拉取 https://registry.npmjs.org ...',
            analysing: '正在分析依赖 ... {0}'
          },
          error: {
            noUpdate: '没有更新的包，是否重新检查？',
            nonSelect: '请先选择要更新的包'
          },
          dev: '开发依赖',
          prod: '生产依赖',
          category: {
            major: {
              message: '主要更新',
              description: '可能引入了不向后兼容的 API 更改或重大功能更改。建议在更新之前仔细查看更新日志和文档，确保新版本不会破坏项目。'
            },
            minor: {
              message: '次要更新',
              description: '新的向后兼容功能，建议在确定新功能对项目有用时进行更新。'
            },
            patch: {
              message: '补丁更新',
              description: '通常用于小的错误修复和更新，不影响软件的主要功能和向后兼容性。'
            },
            prerelease: {
              message: '预发布',
              description: '预发布版本，可能包含新功能，也可能包含错误修复。请慎重更新。'
            },
            nonsemver: {
              message: '不符合语义化版本规范',
              description: '表示包的版本号不符合语义化版本规范（SemVer），通常是版本号小于 1.0.0。这些版本可能不稳定，会引入较大的更改，因此需要谨慎使用。'
            }
          }
        },
        list: {
          dependencies: '生产依赖',
          devDependencies: '开发依赖'
        },
        info: {
          message: '选择要查看详情的包',
          link: '主页：',
          other: '还要查看其他包的信息吗？'
        },
        search: {
          message: '搜索包名：',
          loading: '正在从 https://www.npmjs.com/ 拉取搜索数据，请稍等...',
          result: {
            date: {
              format: 'YYYY-MM-DD HH:mm:ss',
              second: '秒前',
              seconds: '秒前',
              minute: '分钟前',
              minutes: '分钟前',
              hour: '小时前',
              hours: '小时前',
              day: '天前',
              days: '天前',
              week: '周前',
              weeks: '周前',
              month: '月前',
              months: '月前'
            },
            flags: {
              insecure: {
                yes: '不安全：',
                no: '安全'
              },
              unstable: {
                yes: '不稳定',
                no: '稳定'
              }
            },
            score: {
              final: '综合：',
              quality: '质量：',
              popularity: '欢迎：',
              maintenance: '维护：',
              process: {
                /**
                 * 搜索结果的包打分的进度条符号
                 *   若是设置为字符串：'▇'
                 *     则表示为：▇▇▇▇▇▇▇▇▇▇▇▇
                 *
                 *   若设置为字符串数组：['▇', '_']
                 *     则表示为：▇▇▇▇________
                 */
                symbol: '▇',
                /**
                 * 搜索结果的包打分的进度条长度,
                 *   默认：50
                 *   会自动根据值计算百分比
                 */
                length: 50,
                // 表示激活的进度，是否加粗，布尔类型，默认：false
                activeBold: false
              }
            },
            fields: {
              author: '作者：',
              keywords: '关键词：',
              description: '描述：'
            },
            error: {
              empty: '请输入搜索内容',
              abnormal: '搜索出现异常，请重试，错误信息如下：'
            }
          },
          pagination: {
            message: '找到了 {0} 条结果，每页 {1} 条，总共 {2} 页，当前第 {3} 页，你打算：',
            // 每页条数
            size: 10,
            // 页码范围
            range: 10,
            next: '下一页',
            prev: '上一页',
            n: '第 {0} 页',
            first: '首页',
            last: '尾页',
            goto: {
              jump: '跳转指定页',
              message: '请输入页码：',
              error: '页码格式错误，请重新输入'
            },
            delimiter: {
              keyword: '关键词：',
              result: '结果：',
              pageSize: '每页：',
              pageTotal: '总页：',
              pageCurrent: '当前：'
            },
            error: {
              format: '格式错误，请重新输入'
            }
          },
          error: {
            input: '请输入搜索内容'
          }
        }
      }
    },
    // 日志相关，也与 `cvlar -r` 相关，若没有启用日志，则 `cvlar -r` 也无法使用
    changelog: {
      message: '日志管理',
      title: '主菜单 > 日志管理',
      build: {
        message: '生成日志',
        description: '自动计算需要生成的日志',
        success: '生成日志成功',
        error: '生成日志失败，是否重试？',
        translate: {
          check: {
            message: '由于 其他语言 将使用 Google翻译，是否检查连接状态？',
            success: '连接 Google翻译 成功',
            fail: '连接失败',
            retry: '是否重试？',
            error: '无法连接 Google翻译，暂时不能生成日志'
          },
          fail: {
            retry: '翻译失败，是否重试？'
          },
          translateing: '翻译进度：'
        }
      },
      rebuild: {
        message: '重新生成',
        description: '将会删除之前生成的所有日志文件，重新生成日志文件',
        confirm: {
          message: '此操作可能需要较长的时间，是否继续？',
          description: '此操作将会删除之前生成的所有日志文件，并重新生成，可能需要一定的时间'
        },
        template: {
          message: '由于日志模板 `changelog.template.content` 已修改，会导致 `cvlar -r` 发布功能无法准确识别待发布的日志内容，您需要重新生成所有日志，是否继续？'
        }
      },
      clean: {
        message: '清理日志',
        description: '删除之前生成的所有日志文件',
        confirm: {
          message: '此操作将会删除之前生成的所有日志文件，是否继续？',
          description: '此过程不可逆'
        },
        retry: {
          message: '清理日志失败，是否重试？',
          default: true
        }
      },
      loading: {
        git: {
          tag: {
            reading: '正在读取本地 git 仓库 tag ...',
            success: '读取本地 git 仓库 tag 成功',
            retry: {
              message: '读取 tag 失败，是否重试？',
              default: true
            }
          },
          messages: {
            reading: '正在读取本地 git 仓库提交消息 ...',
            success: '读取本地 git 仓库 提交消息 成功',
            retry: {
              message: '读取 提交信息 失败，是否重试？',
              default: true
            }
          }
        },
        history: {
          diffing: '正在对比 ...',
          done: {
            success: {
              build: '开始生成日志 ...',
              no: '没有需要生成的日志'
            },
            fail: {
              message: '没有找到记录文件 {0}，是否生成所有日志？',
              description: '这将会清理掉之前生成的所有日志文件，并重新生成，可能需要一定的时间',
              default: true
            }
          }
        },
        build: {
          message: '正在生成日志 ...',
          success: '生成日志成功',
          fail: '生成日志失败，是否重试？'
        },
        translate: {
          connect: {
            message: '正在连接 Google翻译，并检查是否可用...',
            success: '连接 Google翻译 成功',
            fail: '连接 Google翻译 失败'
          },
          process: {
            message: '正在翻译日志 ...',
            success: '翻译成功',
            fail: '翻译失败，错误信息如下：'
          }
        },
        write: {
          message: '正在写入日志文件 ...',
          success: '写入日志成功',
          retry: '写入日志失败，是否重试？',
          fail: '写入日志失败'
        },
        clean: {
          message: '正在清理日志 ...',
          success: '清理日志成功'
        }
      }
    },
    // 帮助相关
    help: {
      message: '帮助',
      description: '查看帮助信息'
    },
    // 返回上级菜单
    back: {
      message: '..',
      description: '返回上级菜单'
    },
    // 推出
    exit: {
      message: '退出'
    }
  }
};
