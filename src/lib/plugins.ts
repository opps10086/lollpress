import { useState } from 'react';
import { useLollPressConfig } from '@/lib/config';

// 插件接口定义
export interface LollPressPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  hooks: Record<string, Function[]>;
  initialize: () => void;
  cleanup: () => void;
}

// 插件管理器
export class PluginManager {
  private static instance: PluginManager;
  private plugins: Map<string, LollPressPlugin> = new Map();
  private hooks: Map<string, Function[]> = new Map();

  private constructor() {}

  // 单例模式
  public static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }
    return PluginManager.instance;
  }

  // 注册插件
  public registerPlugin(plugin: LollPressPlugin): boolean {
    if (this.plugins.has(plugin.id)) {
      console.warn(`插件 ${plugin.id} 已经注册`);
      return false;
    }

    // 注册插件
    this.plugins.set(plugin.id, plugin);
    
    // 注册插件的钩子
    Object.entries(plugin.hooks).forEach(([hookName, handlers]) => {
      handlers.forEach(handler => {
        this.addHook(hookName, handler);
      });
    });
    
    // 初始化插件
    try {
      plugin.initialize();
      console.log(`插件 ${plugin.name} (${plugin.version}) 已成功加载`);
      return true;
    } catch (error) {
      console.error(`初始化插件 ${plugin.id} 失败:`, error);
      this.unregisterPlugin(plugin.id);
      return false;
    }
  }

  // 注销插件
  public unregisterPlugin(pluginId: string): boolean {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      return false;
    }

    // 清理插件
    try {
      plugin.cleanup();
    } catch (error) {
      console.error(`清理插件 ${pluginId} 失败:`, error);
    }

    // 移除插件的钩子
    Object.entries(plugin.hooks).forEach(([hookName, handlers]) => {
      handlers.forEach(handler => {
        this.removeHook(hookName, handler);
      });
    });

    // 移除插件
    this.plugins.delete(pluginId);
    console.log(`插件 ${plugin.name} 已卸载`);
    return true;
  }

  // 添加钩子
  public addHook(hookName: string, handler: Function): void {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    this.hooks.get(hookName)!.push(handler);
  }

  // 移除钩子
  public removeHook(hookName: string, handler: Function): void {
    if (!this.hooks.has(hookName)) {
      return;
    }
    const handlers = this.hooks.get(hookName)!;
    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  // 执行钩子
  public applyHook(hookName: string, ...args: any[]): any[] {
    if (!this.hooks.has(hookName)) {
      return [];
    }
    
    const results: any[] = [];
    const handlers = this.hooks.get(hookName)!;
    
    for (const handler of handlers) {
      try {
        const result = handler(...args);
        results.push(result);
      } catch (error) {
        console.error(`执行钩子 ${hookName} 失败:`, error);
      }
    }
    
    return results;
  }

  // 获取所有插件
  public getPlugins(): LollPressPlugin[] {
    return Array.from(this.plugins.values());
  }

  // 获取插件
  public getPlugin(pluginId: string): LollPressPlugin | undefined {
    return this.plugins.get(pluginId);
  }
}

// 插件钩子React钩子
export function usePlugins() {
  const { config, addPlugin, removePlugin } = useLollPressConfig();
  const [pluginManager] = useState(() => PluginManager.getInstance());
  
  // 安装插件
  const installPlugin = (plugin: LollPressPlugin) => {
    const success = pluginManager.registerPlugin(plugin);
    if (success) {
      addPlugin(plugin.id);
    }
    return success;
  };
  
  // 卸载插件
  const uninstallPlugin = (pluginId: string) => {
    const success = pluginManager.unregisterPlugin(pluginId);
    if (success) {
      removePlugin(pluginId);
    }
    return success;
  };
  
  // 应用钩子
  const applyHook = (hookName: string, ...args: any[]) => {
    return pluginManager.applyHook(hookName, ...args);
  };
  
  return {
    plugins: pluginManager.getPlugins(),
    installPlugin,
    uninstallPlugin,
    applyHook,
    getPlugin: (id: string) => pluginManager.getPlugin(id)
  };
}

// 创建插件工厂函数
export function createPlugin(
  id: string,
  name: string,
  description: string,
  version: string,
  author: string,
  hooks: Record<string, Function[]> = {},
  initialize: () => void = () => {},
  cleanup: () => void = () => {}
): LollPressPlugin {
  return {
    id,
    name,
    description,
    version,
    author,
    hooks,
    initialize,
    cleanup
  };
}
