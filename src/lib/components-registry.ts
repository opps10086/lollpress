import { useState } from 'react';

// 组件类型
export type ComponentType = 
  | 'layout' 
  | 'header' 
  | 'footer' 
  | 'sidebar' 
  | 'post' 
  | 'page' 
  | 'widget' 
  | 'form' 
  | 'button' 
  | 'input' 
  | 'custom';

// 组件接口
export interface ComponentDefinition {
  id: string;
  name: string;
  type: ComponentType;
  description: string;
  author: string;
  version: string;
  component: any; // React组件
  props?: Record<string, any>; // 默认属性
  slots?: string[]; // 组件插槽
  dependencies?: string[]; // 依赖的其他组件
  styles?: Record<string, any>; // 组件样式
}

// 组件注册表
class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components: Map<string, ComponentDefinition> = new Map();
  private overrides: Map<string, string> = new Map(); // 组件覆盖映射

  private constructor() {}

  // 单例模式
  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  // 注册组件
  public registerComponent(component: ComponentDefinition): boolean {
    if (this.components.has(component.id)) {
      console.warn(`组件 ${component.id} 已经注册`);
      return false;
    }

    this.components.set(component.id, component);
    console.log(`组件 ${component.name} (${component.version}) 已成功注册`);
    return true;
  }

  // 注销组件
  public unregisterComponent(componentId: string): boolean {
    if (!this.components.has(componentId)) {
      return false;
    }

    // 检查是否有其他组件依赖此组件
    for (const [id, component] of this.components.entries()) {
      if (component.dependencies?.includes(componentId)) {
        console.warn(`无法注销组件 ${componentId}，因为组件 ${id} 依赖它`);
        return false;
      }
    }

    // 移除任何对此组件的覆盖
    for (const [original, override] of this.overrides.entries()) {
      if (override === componentId) {
        this.overrides.delete(original);
      }
    }

    this.components.delete(componentId);
    return true;
  }

  // 覆盖组件
  public overrideComponent(originalId: string, overrideId: string): boolean {
    if (!this.components.has(originalId)) {
      console.error(`原始组件 ${originalId} 不存在`);
      return false;
    }

    if (!this.components.has(overrideId)) {
      console.error(`覆盖组件 ${overrideId} 不存在`);
      return false;
    }

    const original = this.components.get(originalId)!;
    const override = this.components.get(overrideId)!;

    // 确保类型兼容
    if (original.type !== override.type && override.type !== 'custom') {
      console.error(`组件类型不兼容: ${original.type} vs ${override.type}`);
      return false;
    }

    this.overrides.set(originalId, overrideId);
    console.log(`组件 ${originalId} 已被 ${overrideId} 覆盖`);
    return true;
  }

  // 移除组件覆盖
  public removeOverride(originalId: string): boolean {
    if (!this.overrides.has(originalId)) {
      return false;
    }

    this.overrides.delete(originalId);
    return true;
  }

  // 获取组件（考虑覆盖）
  public getComponent(componentId: string): ComponentDefinition | undefined {
    const overrideId = this.overrides.get(componentId);
    if (overrideId) {
      return this.components.get(overrideId);
    }
    return this.components.get(componentId);
  }

  // 获取特定类型的所有组件
  public getComponentsByType(type: ComponentType): ComponentDefinition[] {
    return Array.from(this.components.values()).filter(component => component.type === type);
  }

  // 获取所有组件
  public getAllComponents(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }
}

// 组件管理钩子
export function useComponents() {
  const [registry] = useState(() => ComponentRegistry.getInstance());
  const [components, setComponents] = useState<ComponentDefinition[]>(registry.getAllComponents());

  // 注册组件
  const registerComponent = (component: ComponentDefinition) => {
    const success = registry.registerComponent(component);
    if (success) {
      setComponents(registry.getAllComponents());
    }
    return success;
  };

  // 注销组件
  const unregisterComponent = (componentId: string) => {
    const success = registry.unregisterComponent(componentId);
    if (success) {
      setComponents(registry.getAllComponents());
    }
    return success;
  };

  // 覆盖组件
  const overrideComponent = (originalId: string, overrideId: string) => {
    return registry.overrideComponent(originalId, overrideId);
  };

  // 移除组件覆盖
  const removeOverride = (originalId: string) => {
    return registry.removeOverride(originalId);
  };

  // 获取组件
  const getComponent = (componentId: string) => {
    return registry.getComponent(componentId);
  };

  // 获取特定类型的组件
  const getComponentsByType = (type: ComponentType) => {
    return registry.getComponentsByType(type);
  };

  return {
    components,
    registerComponent,
    unregisterComponent,
    overrideComponent,
    removeOverride,
    getComponent,
    getComponentsByType
  };
}

// 创建组件工厂函数
export function createComponent(
  id: string,
  name: string,
  type: ComponentType,
  description: string,
  author: string,
  version: string,
  component: any,
  props?: Record<string, any>,
  slots?: string[],
  dependencies?: string[],
  styles?: Record<string, any>
): ComponentDefinition {
  return {
    id,
    name,
    type,
    description,
    author,
    version,
    component,
    props,
    slots,
    dependencies,
    styles
  };
}
