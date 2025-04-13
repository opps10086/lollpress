# Loll Press 配置指南

Loll Press 提供了高度的自定义能力，允许您通过配置文件和API调整几乎所有方面的行为和外观。本指南将帮助您了解如何配置Loll Press以满足您的需求。

## 配置文件

Loll Press使用`lollpress.config.js`文件作为主要配置源。这个文件应该位于项目根目录下，并导出一个配置对象。

### 基本配置示例

```javascript
// lollpress.config.js
module.exports = {
  // 站点基本信息
  site: {
    name: '我的博客',
    description: '这是我的个人博客',
    language: 'zh-CN',
    url: 'https://myblog.com'
  },
  
  // 主题配置
  theme: {
    id: 'default', // 使用默认主题
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    borderRadius: '0.375rem',
    darkMode: true
  },
  
  // 内容配置
  content: {
    source: 'filesystem', // 使用文件系统作为内容源
    postsPerPage: 10,
    excerptLength: 160,
    defaultCommentStatus: 'open'
  },
  
  // SEO配置
  seo: {
    enableAiSeo: true,
    aiApiKey: process.env.AI_API_KEY,
    defaultTitleFormat: '%post_title% - %site_name%',
    defaultDescription: '',
    generateSitemap: true
  },
  
  // 插件配置
  plugins: [
    'lollpress-plugin-social-share',
    'lollpress-plugin-code-highlight',
    {
      name: 'lollpress-plugin-analytics',
      options: {
        provider: 'google',
        trackingId: 'UA-XXXXXXXXX-X'
      }
    }
  ]
};
```

## 配置选项详解

### 站点配置

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `site.name` | `string` | `'Loll Press Site'` | 站点名称 |
| `site.description` | `string` | `''` | 站点描述 |
| `site.language` | `string` | `'en'` | 站点语言 |
| `site.url` | `string` | `''` | 站点URL |
| `site.favicon` | `string` | `'/favicon.ico'` | 站点图标路径 |
| `site.logo` | `string` | `''` | 站点Logo路径 |

### 主题配置

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `theme.id` | `string` | `'default'` | 主题ID |
| `theme.primaryColor` | `string` | `'#3b82f6'` | 主要颜色 |
| `theme.secondaryColor` | `string` | `'#10b981'` | 次要颜色 |
| `theme.fontFamily` | `string` | `'system-ui, ...'` | 字体系列 |
| `theme.borderRadius` | `string` | `'0.375rem'` | 边框圆角 |
| `theme.darkMode` | `boolean` | `true` | 是否启用暗色模式 |

### 内容配置

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `content.source` | `string` | `'filesystem'` | 内容源类型 |
| `content.apiEndpoint` | `string` | `''` | API内容源的端点URL |
| `content.postsPerPage` | `number` | `10` | 每页显示的文章数 |
| `content.excerptLength` | `number` | `160` | 摘要长度 |
| `content.defaultCommentStatus` | `'open'` \| `'closed'` | `'open'` | 默认评论状态 |

### SEO配置

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `seo.enableAiSeo` | `boolean` | `true` | 是否启用AI SEO |
| `seo.aiApiKey` | `string` | `''` | AI API密钥 |
| `seo.defaultTitleFormat` | `string` | `'%post_title% - %site_name%'` | 默认标题格式 |
| `seo.defaultDescription` | `string` | `''` | 默认描述 |
| `seo.generateSitemap` | `boolean` | `true` | 是否生成站点地图 |

### 插件配置

插件可以通过字符串（仅使用默认选项）或对象（带自定义选项）配置：

```javascript
plugins: [
  // 使用默认选项
  'plugin-name',
  
  // 使用自定义选项
  {
    name: 'plugin-name',
    options: {
      // 插件特定选项
    }
  }
]
```

## 环境变量

Loll Press支持通过环境变量配置敏感信息或环境特定设置。创建一个`.env.local`文件在项目根目录：

```
# .env.local
AI_API_KEY=your_api_key_here
DATABASE_URL=your_database_url
```

然后在配置文件中使用：

```javascript
module.exports = {
  seo: {
    aiApiKey: process.env.AI_API_KEY
  },
  content: {
    databaseUrl: process.env.DATABASE_URL
  }
};
```

## 编程式配置

除了配置文件外，Loll Press还提供了编程式配置API，允许您在运行时动态修改配置：

```typescript
import { useLollPressConfig } from '@/lib/config';

function MyComponent() {
  const { config, updateConfig, updateTheme } = useLollPressConfig();
  
  // 更新整个配置
  const handleUpdateConfig = () => {
    updateConfig({
      siteName: '新站点名称'
    });
  };
  
  // 仅更新主题
  const handleUpdateTheme = () => {
    updateTheme({
      primaryColor: '#ff0000'
    });
  };
  
  return (
    <div>
      <h1>{config.siteName}</h1>
      <button onClick={handleUpdateConfig}>更新站点名称</button>
      <button onClick={handleUpdateTheme}>更新主题颜色</button>
    </div>
  );
}
```

## 高级配置

### 自定义内容源

您可以创建自定义内容源来从任何数据源获取内容：

```typescript
import { ContentSource, useContentSources } from '@/lib/content-sources';

// 实现自定义内容源
class MyCustomSource implements ContentSource {
  // 实现所有必需的方法
}

// 注册内容源
function RegisterContentSource() {
  const { registerSource } = useContentSources();
  
  useEffect(() => {
    const source = new MyCustomSource('custom-id', '自定义源', '我的自定义内容源');
    registerSource(source);
  }, []);
  
  return null;
}
```

### 组件覆盖

您可以覆盖Loll Press的默认组件：

```typescript
import { useComponents } from '@/lib/components-registry';
import MyCustomPostComponent from './MyCustomPostComponent';

function RegisterCustomComponent() {
  const { registerComponent, overrideComponent } = useComponents();
  
  useEffect(() => {
    // 注册自定义组件
    registerComponent({
      id: 'my-custom-post',
      name: '自定义文章组件',
      type: 'post',
      description: '替换默认文章组件',
      author: '您的名字',
      version: '1.0.0',
      component: MyCustomPostComponent
    });
    
    // 覆盖默认组件
    overrideComponent('default-post', 'my-custom-post');
  }, []);
  
  return null;
}
```

## 配置最佳实践

1. **使用环境变量存储敏感信息**：API密钥、数据库URL等不应硬编码在配置文件中
2. **为不同环境创建不同配置**：开发、测试和生产环境可能需要不同的配置
3. **模块化配置**：将大型配置拆分为多个文件，然后合并
4. **验证配置**：在应用启动时验证配置的有效性
5. **提供合理的默认值**：确保即使用户未指定某些配置，应用也能正常工作

## 故障排除

如果您在配置Loll Press时遇到问题，请检查：

1. 配置文件语法是否正确
2. 环境变量是否正确设置
3. 配置值是否在有效范围内
4. 控制台是否有错误消息

如需更多帮助，请参考完整文档或在GitHub上提问。
