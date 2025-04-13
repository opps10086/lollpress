# 贡献指南

感谢您对Loll Press的关注！我们非常欢迎社区贡献，无论是代码、文档、设计还是想法。本指南将帮助您了解如何参与Loll Press的开发。

## 行为准则

参与Loll Press项目的所有贡献者都需要遵守我们的行为准则。请确保您的互动是尊重的、包容的，并且对所有人都友好。

## 如何贡献

### 报告问题

如果您发现了bug或有功能请求，请通过GitHub Issues提交。提交问题时，请尽可能详细地描述：

- 对于bug：描述复现步骤、预期行为和实际行为，以及您的环境信息
- 对于功能请求：描述您希望的功能，以及它如何帮助Loll Press的用户

### 提交代码

1. Fork仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个Pull Request

### 代码风格

- 我们使用TypeScript编写代码，请确保您的代码通过TypeScript检查
- 使用2个空格进行缩进
- 使用有意义的变量名和函数名
- 为函数和类添加JSDoc注释
- 遵循React Hooks的规则
- 使用函数组件而不是类组件

### 提交信息规范

我们使用[约定式提交](https://www.conventionalcommits.org/)规范。提交信息应该遵循以下格式：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

类型可以是：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更改
- `style`: 不影响代码含义的更改（空格、格式化等）
- `refactor`: 既不修复bug也不添加功能的代码更改
- `perf`: 提高性能的代码更改
- `test`: 添加或修正测试
- `chore`: 对构建过程或辅助工具的更改

### 开发流程

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 运行测试：`npm test`
4. 构建生产版本：`npm run build`

## 项目结构

```
loll-press/
├── src/
│   ├── app/             # Next.js应用路由
│   │   ├── (blog)/      # 博客前端路由
│   │   ├── (admin)/     # 管理后台路由
│   │   └── api/         # API路由
│   ├── components/      # React组件
│   │   ├── blog/        # 博客前端组件
│   │   ├── admin/       # 管理后台组件
│   │   ├── markdown/    # Markdown相关组件
│   │   └── seo/         # SEO相关组件
│   ├── lib/             # 工具函数和核心库
│   │   ├── config.ts    # 配置系统
│   │   ├── plugins.ts   # 插件系统
│   │   ├── themes.ts    # 主题系统
│   │   ├── content-sources.ts # 内容源适配器
│   │   └── components-registry.ts # 组件注册系统
│   └── models/          # 数据模型
├── public/              # 静态资源
├── migrations/          # 数据库迁移
└── wrangler.toml        # Cloudflare配置
```

## 扩展Loll Press

### 创建插件

插件是扩展Loll Press功能的主要方式。要创建插件，请使用`createPlugin`函数：

```typescript
import { createPlugin } from '@/lib/plugins';

const myPlugin = createPlugin(
  'my-plugin',
  '我的插件',
  '这是一个示例插件',
  '1.0.0',
  '您的名字',
  {
    // 钩子
    'content:beforeSave': [(content) => {
      // 在内容保存前处理
      return content;
    }]
  },
  // 初始化函数
  () => {
    console.log('插件已初始化');
  },
  // 清理函数
  () => {
    console.log('插件已清理');
  }
);

export default myPlugin;
```

### 创建主题

主题可以自定义Loll Press的外观。要创建主题，请使用`createTheme`函数：

```typescript
import { createTheme } from '@/lib/themes';

const myTheme = createTheme(
  'my-theme',
  '我的主题',
  '这是一个自定义主题',
  '1.0.0',
  '您的名字',
  {
    primaryColor: '#ff6b6b',
    secondaryColor: '#4ecdc4',
    fontFamily: 'Roboto, sans-serif',
    borderRadius: '0.5rem'
  },
  {
    // 模板
    post: 'my-post-template',
    page: 'my-page-template'
  }
);

export default myTheme;
```

### 创建内容源

内容源允许Loll Press从不同的数据源获取内容。要创建自定义内容源，请实现`ContentSource`接口：

```typescript
import { ContentSource, ContentSourceType, ContentItem } from '@/lib/content-sources';

export class MyCustomContentSource implements ContentSource {
  id: string;
  name: string;
  type: ContentSourceType;
  description: string;
  
  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.type = 'custom';
    this.description = description;
  }
  
  // 实现所有必需的方法
  async getItem(id: string, type: string): Promise<ContentItem | null> {
    // 实现获取单个内容项的逻辑
  }
  
  // ... 其他方法
}
```

### 注册自定义组件

组件可以扩展或替换Loll Press的UI元素。要注册自定义组件，请使用`createComponent`函数：

```typescript
import { createComponent } from '@/lib/components-registry';
import MyCustomPostComponent from './MyCustomPostComponent';

const myComponent = createComponent(
  'my-custom-post',
  '自定义文章组件',
  'post',
  '这是一个自定义文章显示组件',
  '您的名字',
  '1.0.0',
  MyCustomPostComponent,
  {
    // 默认属性
    showAuthor: true,
    showDate: true
  }
);

// 然后在应用中注册
import { useComponents } from '@/lib/components-registry';

function MyPlugin() {
  const { registerComponent } = useComponents();
  
  useEffect(() => {
    registerComponent(myComponent);
  }, []);
  
  return null;
}
```

## 获取帮助

如果您在贡献过程中遇到任何问题，请通过以下方式获取帮助：

- 在GitHub Issues中提问
- 加入我们的社区讨论
- 查阅我们的文档

感谢您对Loll Press的贡献！
