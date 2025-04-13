import { useState, useEffect } from 'react';
import { LollPressConfig } from '@/lib/config';

// 主题接口定义
export interface Theme {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  screenshot?: string;
  styles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
    components: Record<string, any>;
  };
  templates: Record<string, string>;
  layouts: Record<string, any>;
}

// 主题注册表
class ThemeRegistry {
  private static instance: ThemeRegistry;
  private themes: Map<string, Theme> = new Map();
  private activeThemeId: string | null = null;

  private constructor() {}

  // 单例模式
  public static getInstance(): ThemeRegistry {
    if (!ThemeRegistry.instance) {
      ThemeRegistry.instance = new ThemeRegistry();
    }
    return ThemeRegistry.instance;
  }

  // 注册主题
  public registerTheme(theme: Theme): boolean {
    if (this.themes.has(theme.id)) {
      console.warn(`主题 ${theme.id} 已经注册`);
      return false;
    }

    this.themes.set(theme.id, theme);
    console.log(`主题 ${theme.name} (${theme.version}) 已成功注册`);
    return true;
  }

  // 注销主题
  public unregisterTheme(themeId: string): boolean {
    if (!this.themes.has(themeId)) {
      return false;
    }

    if (this.activeThemeId === themeId) {
      console.warn(`无法注销当前激活的主题 ${themeId}`);
      return false;
    }

    this.themes.delete(themeId);
    return true;
  }

  // 激活主题
  public activateTheme(themeId: string): boolean {
    if (!this.themes.has(themeId)) {
      console.error(`主题 ${themeId} 不存在`);
      return false;
    }

    this.activeThemeId = themeId;
    return true;
  }

  // 获取当前主题
  public getActiveTheme(): Theme | null {
    if (!this.activeThemeId) {
      return null;
    }
    return this.themes.get(this.activeThemeId) || null;
  }

  // 获取所有主题
  public getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  // 获取特定主题
  public getTheme(themeId: string): Theme | undefined {
    return this.themes.get(themeId);
  }
}

// 主题管理钩子
export function useThemes() {
  const [themeRegistry] = useState(() => ThemeRegistry.getInstance());
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);

  // 初始化主题列表
  useEffect(() => {
    setThemes(themeRegistry.getAllThemes());
    setActiveTheme(themeRegistry.getActiveTheme());
  }, [themeRegistry]);

  // 注册主题
  const registerTheme = (theme: Theme) => {
    const success = themeRegistry.registerTheme(theme);
    if (success) {
      setThemes(themeRegistry.getAllThemes());
    }
    return success;
  };

  // 激活主题
  const activateTheme = (themeId: string) => {
    const success = themeRegistry.activateTheme(themeId);
    if (success) {
      setActiveTheme(themeRegistry.getActiveTheme());
    }
    return success;
  };

  // 应用主题样式
  useEffect(() => {
    if (activeTheme) {
      document.documentElement.style.setProperty('--primary-color', activeTheme.styles.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', activeTheme.styles.secondaryColor);
      document.documentElement.style.setProperty('--font-family', activeTheme.styles.fontFamily);
      document.documentElement.style.setProperty('--border-radius', activeTheme.styles.borderRadius);
    }
  }, [activeTheme]);

  return {
    themes,
    activeTheme,
    registerTheme,
    activateTheme,
    getTheme: (id: string) => themeRegistry.getTheme(id)
  };
}

// 创建主题工厂函数
export function createTheme(
  id: string,
  name: string,
  description: string,
  version: string,
  author: string,
  styles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
    components?: Record<string, any>;
  },
  templates: Record<string, string> = {},
  layouts: Record<string, any> = {},
  screenshot?: string
): Theme {
  return {
    id,
    name,
    description,
    version,
    author,
    screenshot,
    styles: {
      ...styles,
      components: styles.components || {}
    },
    templates,
    layouts
  };
}

// 默认主题
export const defaultTheme = createTheme(
  'default',
  'Loll Press 默认主题',
  '一个简洁现代的默认主题',
  '1.0.0',
  'Loll Press Team',
  {
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: '0.375rem'
  },
  {
    post: 'default-post',
    page: 'default-page',
    category: 'default-category',
    tag: 'default-tag'
  }
);

// 暗色主题
export const darkTheme = createTheme(
  'dark',
  'Loll Press 暗色主题',
  '一个优雅的暗色主题',
  '1.0.0',
  'Loll Press Team',
  {
    primaryColor: '#60a5fa',
    secondaryColor: '#34d399',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: '0.375rem'
  },
  {
    post: 'dark-post',
    page: 'dark-page',
    category: 'dark-category',
    tag: 'dark-tag'
  }
);

// 初始化默认主题
const themeRegistry = ThemeRegistry.getInstance();
themeRegistry.registerTheme(defaultTheme);
themeRegistry.registerTheme(darkTheme);
themeRegistry.activateTheme('default');
