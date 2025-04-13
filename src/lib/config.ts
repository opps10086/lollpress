import { useState, useEffect } from 'react';

// 配置类型定义
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
  darkMode: boolean;
}

export interface ContentConfig {
  contentSource: 'filesystem' | 'database' | 'api';
  apiEndpoint?: string;
  postsPerPage: number;
  excerptLength: number;
  defaultCommentStatus: 'open' | 'closed';
}

export interface SeoConfig {
  enableAiSeo: boolean;
  aiApiKey?: string;
  defaultTitleFormat: string;
  defaultDescription: string;
  generateSitemap: boolean;
}

export interface LollPressConfig {
  siteName: string;
  siteDescription: string;
  theme: ThemeConfig;
  content: ContentConfig;
  seo: SeoConfig;
  customComponents: Record<string, any>;
  plugins: string[];
}

// 默认配置
const defaultConfig: LollPressConfig = {
  siteName: 'Loll Press Site',
  siteDescription: '基于Next.js的现代化博客平台',
  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: '0.375rem',
    darkMode: true
  },
  content: {
    contentSource: 'filesystem',
    postsPerPage: 10,
    excerptLength: 160,
    defaultCommentStatus: 'open'
  },
  seo: {
    enableAiSeo: true,
    defaultTitleFormat: '%post_title% - %site_name%',
    defaultDescription: '',
    generateSitemap: true
  },
  customComponents: {},
  plugins: []
};

// 配置钩子
export function useLollPressConfig() {
  const [config, setConfig] = useState<LollPressConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 在实际应用中，这里会从配置文件或API加载配置
    // 这里模拟异步加载
    const loadConfig = async () => {
      try {
        // 模拟从服务器获取配置
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 检查是否有本地存储的配置
        const storedConfig = localStorage.getItem('lollpress_config');
        if (storedConfig) {
          setConfig(JSON.parse(storedConfig));
        }
        
        setIsLoaded(true);
      } catch (error) {
        console.error('加载配置失败:', error);
        setIsLoaded(true);
      }
    };
    
    loadConfig();
  }, []);

  // 更新配置的函数
  const updateConfig = (newConfig: Partial<LollPressConfig>) => {
    setConfig(prevConfig => {
      const updatedConfig = { ...prevConfig, ...newConfig };
      // 保存到本地存储
      localStorage.setItem('lollpress_config', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  // 更新主题配置
  const updateTheme = (themeConfig: Partial<ThemeConfig>) => {
    setConfig(prevConfig => {
      const updatedConfig = {
        ...prevConfig,
        theme: { ...prevConfig.theme, ...themeConfig }
      };
      localStorage.setItem('lollpress_config', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  // 注册自定义组件
  const registerComponent = (name: string, component: any) => {
    setConfig(prevConfig => {
      const updatedComponents = {
        ...prevConfig.customComponents,
        [name]: component
      };
      const updatedConfig = {
        ...prevConfig,
        customComponents: updatedComponents
      };
      localStorage.setItem('lollpress_config', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  // 添加插件
  const addPlugin = (pluginName: string) => {
    setConfig(prevConfig => {
      if (prevConfig.plugins.includes(pluginName)) {
        return prevConfig;
      }
      
      const updatedConfig = {
        ...prevConfig,
        plugins: [...prevConfig.plugins, pluginName]
      };
      localStorage.setItem('lollpress_config', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  // 移除插件
  const removePlugin = (pluginName: string) => {
    setConfig(prevConfig => {
      const updatedConfig = {
        ...prevConfig,
        plugins: prevConfig.plugins.filter(p => p !== pluginName)
      };
      localStorage.setItem('lollpress_config', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  return {
    config,
    isLoaded,
    updateConfig,
    updateTheme,
    registerComponent,
    addPlugin,
    removePlugin
  };
}

// 应用主题的钩子
export function useThemeStyles() {
  const { config } = useLollPressConfig();
  const { theme } = config;

  useEffect(() => {
    // 应用主题到文档根元素
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--font-family', theme.fontFamily);
    document.documentElement.style.setProperty('--border-radius', theme.borderRadius);
    
    // 设置暗色模式
    if (theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return theme;
}

// 导出默认配置供参考
export { defaultConfig };
