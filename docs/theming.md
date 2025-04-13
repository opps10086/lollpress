# Loll Press 自定义主题指南

Loll Press 提供了强大的主题自定义功能，允许您完全控制博客的外观和用户体验。本指南将帮助您创建和自定义 Loll Press 主题。

## 主题基础

Loll Press 的主题系统基于 React 组件和 Tailwind CSS，提供了比传统 WordPress 主题更灵活、更强大的自定义能力。

### 主题结构

一个完整的 Loll Press 主题包含以下部分：

1. **主题定义**：描述主题的基本信息和样式
2. **组件覆盖**：自定义 UI 组件
3. **布局模板**：定义页面结构
4. **样式配置**：自定义颜色、字体和其他视觉元素

### 创建基本主题

使用 `createTheme` 函数创建一个基本主题：

```typescript
import { createTheme } from '@/lib/themes';

const myTheme = createTheme(
  'my-theme',           // 主题ID
  '我的自定义主题',      // 主题名称
  '一个美观的博客主题',  // 主题描述
  '1.0.0',             // 版本
  '您的名字',           // 作者
  {
    // 基本样式
    primaryColor: '#4f46e5',
    secondaryColor: '#10b981',
    fontFamily: '"Noto Sans SC", sans-serif',
    borderRadius: '0.5rem'
  },
  {
    // 页面模板
    post: 'my-post-template',
    page: 'my-page-template',
    category: 'my-category-template',
    tag: 'my-tag-template'
  }
);

export default myTheme;
```

### 注册主题

创建主题后，需要将其注册到 Loll Press：

```typescript
import { useThemes } from '@/lib/themes';
import myTheme from './my-theme';

function RegisterTheme() {
  const { registerTheme } = useThemes();
  
  useEffect(() => {
    registerTheme(myTheme);
  }, []);
  
  return null;
}
```

## 高级主题自定义

### 自定义组件

要完全控制主题外观，您可以自定义各种 UI 组件：

```typescript
import { createComponent } from '@/lib/components-registry';
import MyCustomPostCard from './MyCustomPostCard';

// 创建自定义文章卡片组件
const customPostCard = createComponent(
  'my-post-card',
  '自定义文章卡片',
  'post',
  '一个美观的文章卡片组件',
  '您的名字',
  '1.0.0',
  MyCustomPostCard,
  {
    // 默认属性
    showFeaturedImage: true,
    showExcerpt: true,
    showAuthor: true,
    showDate: true
  }
);

// 在应用中注册并覆盖默认组件
import { useComponents } from '@/lib/components-registry';

function RegisterCustomComponents() {
  const { registerComponent, overrideComponent } = useComponents();
  
  useEffect(() => {
    registerComponent(customPostCard);
    // 覆盖默认的文章卡片组件
    overrideComponent('default-post-card', 'my-post-card');
  }, []);
  
  return null;
}
```

### 自定义布局

创建自定义布局组件来控制页面结构：

```tsx
// src/components/layouts/MyCustomLayout.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

interface MyCustomLayoutProps {
  children: React.ReactNode;
}

export default function MyCustomLayout({ children }: MyCustomLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <main className="flex-grow p-6">{children}</main>
        <Sidebar className="w-80 p-6" />
      </div>
      <Footer />
    </div>
  );
}
```

然后注册为布局组件：

```typescript
import { createComponent } from '@/lib/components-registry';
import MyCustomLayout from './MyCustomLayout';

const customLayout = createComponent(
  'my-custom-layout',
  '自定义布局',
  'layout',
  '一个两栏布局',
  '您的名字',
  '1.0.0',
  MyCustomLayout
);
```

### 自定义样式

除了基本颜色和字体外，您还可以自定义更多样式：

```typescript
import { createTheme } from '@/lib/themes';

const myTheme = createTheme(
  'my-theme',
  '我的自定义主题',
  '一个美观的博客主题',
  '1.0.0',
  '您的名字',
  {
    primaryColor: '#4f46e5',
    secondaryColor: '#10b981',
    fontFamily: '"Noto Sans SC", sans-serif',
    borderRadius: '0.5rem',
    // 扩展样式
    components: {
      // 卡片样式
      card: {
        background: '#ffffff',
        shadow: 'lg',
        hoverEffect: true
      },
      // 按钮样式
      button: {
        rounded: 'full',
        padding: 'px-6 py-2',
        transition: 'transform hover:scale-105'
      },
      // 标题样式
      heading: {
        fontFamily: '"Playfair Display", serif',
        weight: 'font-bold',
        letterSpacing: 'tracking-tight'
      }
    }
  }
);
```

## 响应式设计

Loll Press 主题应该适配各种屏幕尺寸。使用 Tailwind CSS 的响应式工具：

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map(post => (
    <PostCard key={post.id} post={post} />
  ))}
</div>
```

## 暗色模式支持

Loll Press 内置支持暗色模式。确保您的组件适配两种模式：

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    {post.title}
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    {post.excerpt}
  </p>
</div>
```

## 主题切换

允许用户在多个主题之间切换：

```tsx
import { useThemes } from '@/lib/themes';

function ThemeSwitcher() {
  const { themes, activeTheme, activateTheme } = useThemes();
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-2">选择主题</h2>
      <div className="space-y-2">
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => activateTheme(theme.id)}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTheme?.id === theme.id
                ? 'bg-primary-100 text-primary-800'
                : 'hover:bg-gray-100'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## CSS 变量

Loll Press 使用 CSS 变量实现动态样式。您可以在自定义组件中使用这些变量：

```css
.my-component {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-family: var(--font-family);
  border-radius: var(--border-radius);
}
```

## 主题发布和分享

完成主题后，您可以将其发布为独立的 npm 包，或直接在 GitHub 上分享：

1. 创建一个包含所有主题文件的仓库
2. 添加清晰的文档，说明如何安装和使用主题
3. 提供截图或演示站点
4. 在 Loll Press 社区分享您的主题

## 主题最佳实践

1. **保持一致性**：确保整个主题的视觉语言一致
2. **优先考虑性能**：避免不必要的大型依赖
3. **遵循无障碍标准**：确保足够的对比度和键盘导航
4. **提供合理的默认值**：即使用户不进行任何配置，主题也应该看起来不错
5. **模块化设计**：将主题拆分为可重用的组件
6. **文档完善**：提供详细的使用说明和自定义选项

## 示例主题

### 极简主题

```typescript
import { createTheme } from '@/lib/themes';

const minimalistTheme = createTheme(
  'minimalist',
  '极简主题',
  '一个注重内容的简约主题',
  '1.0.0',
  'Loll Press Team',
  {
    primaryColor: '#000000',
    secondaryColor: '#666666',
    fontFamily: '"Inter", sans-serif',
    borderRadius: '0',
    components: {
      card: {
        background: '#ffffff',
        shadow: 'none',
        border: 'border-b border-gray-200'
      },
      button: {
        rounded: 'none',
        padding: 'px-4 py-1',
        transition: 'none'
      }
    }
  }
);

export default minimalistTheme;
```

### 杂志主题

```typescript
import { createTheme } from '@/lib/themes';

const magazineTheme = createTheme(
  'magazine',
  '杂志主题',
  '一个类似杂志的博客主题',
  '1.0.0',
  'Loll Press Team',
  {
    primaryColor: '#e63946',
    secondaryColor: '#457b9d',
    fontFamily: '"Playfair Display", "Noto Serif SC", serif',
    borderRadius: '0.25rem',
    components: {
      card: {
        background: '#ffffff',
        shadow: 'md',
        border: 'border-t-4 border-primary-500'
      },
      heading: {
        fontFamily: '"Playfair Display", serif',
        weight: 'font-bold',
        decoration: 'border-b-2 border-primary-500 inline-block'
      }
    }
  }
);

export default magazineTheme;
```

通过遵循本指南，您可以创建独特、美观且功能丰富的 Loll Press 主题，为您的博客提供独特的视觉体验。
