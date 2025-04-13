import { useState } from 'react';

// 内容源类型
export type ContentSourceType = 'filesystem' | 'database' | 'api' | 'custom';

// 内容项接口
export interface ContentItem {
  id: string;
  type: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// 内容源接口
export interface ContentSource {
  id: string;
  name: string;
  type: ContentSourceType;
  description: string;
  
  // 基本CRUD操作
  getItem: (id: string, type: string) => Promise<ContentItem | null>;
  getItems: (type: string, options?: any) => Promise<ContentItem[]>;
  createItem: (item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ContentItem>;
  updateItem: (id: string, data: Partial<ContentItem>) => Promise<ContentItem | null>;
  deleteItem: (id: string, type: string) => Promise<boolean>;
  
  // 搜索和过滤
  search: (query: string, types?: string[]) => Promise<ContentItem[]>;
  filter: (criteria: Record<string, any>, types?: string[]) => Promise<ContentItem[]>;
  
  // 元数据操作
  getMetadata: () => Promise<Record<string, any>>;
  updateMetadata: (metadata: Record<string, any>) => Promise<boolean>;
}

// 内容源注册表
class ContentSourceRegistry {
  private static instance: ContentSourceRegistry;
  private sources: Map<string, ContentSource> = new Map();
  private activeSourceId: string | null = null;

  private constructor() {}

  // 单例模式
  public static getInstance(): ContentSourceRegistry {
    if (!ContentSourceRegistry.instance) {
      ContentSourceRegistry.instance = new ContentSourceRegistry();
    }
    return ContentSourceRegistry.instance;
  }

  // 注册内容源
  public registerSource(source: ContentSource): boolean {
    if (this.sources.has(source.id)) {
      console.warn(`内容源 ${source.id} 已经注册`);
      return false;
    }

    this.sources.set(source.id, source);
    console.log(`内容源 ${source.name} 已成功注册`);
    return true;
  }

  // 注销内容源
  public unregisterSource(sourceId: string): boolean {
    if (!this.sources.has(sourceId)) {
      return false;
    }

    if (this.activeSourceId === sourceId) {
      console.warn(`无法注销当前激活的内容源 ${sourceId}`);
      return false;
    }

    this.sources.delete(sourceId);
    return true;
  }

  // 激活内容源
  public activateSource(sourceId: string): boolean {
    if (!this.sources.has(sourceId)) {
      console.error(`内容源 ${sourceId} 不存在`);
      return false;
    }

    this.activeSourceId = sourceId;
    return true;
  }

  // 获取当前内容源
  public getActiveSource(): ContentSource | null {
    if (!this.activeSourceId) {
      return null;
    }
    return this.sources.get(this.activeSourceId) || null;
  }

  // 获取所有内容源
  public getAllSources(): ContentSource[] {
    return Array.from(this.sources.values());
  }

  // 获取特定内容源
  public getSource(sourceId: string): ContentSource | undefined {
    return this.sources.get(sourceId);
  }
}

// 内容源管理钩子
export function useContentSources() {
  const [registry] = useState(() => ContentSourceRegistry.getInstance());
  const [sources, setSources] = useState<ContentSource[]>(registry.getAllSources());
  const [activeSource, setActiveSource] = useState<ContentSource | null>(registry.getActiveSource());

  // 注册内容源
  const registerSource = (source: ContentSource) => {
    const success = registry.registerSource(source);
    if (success) {
      setSources(registry.getAllSources());
    }
    return success;
  };

  // 激活内容源
  const activateSource = (sourceId: string) => {
    const success = registry.activateSource(sourceId);
    if (success) {
      setActiveSource(registry.getActiveSource());
    }
    return success;
  };

  return {
    sources,
    activeSource,
    registerSource,
    activateSource,
    getSource: (id: string) => registry.getSource(id)
  };
}

// 文件系统内容源（模拟实现）
export class FileSystemContentSource implements ContentSource {
  id: string;
  name: string;
  type: ContentSourceType;
  description: string;
  private items: Map<string, ContentItem> = new Map();

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.type = 'filesystem';
    this.description = description;
  }

  async getItem(id: string, type: string): Promise<ContentItem | null> {
    return this.items.get(id) || null;
  }

  async getItems(type: string, options?: any): Promise<ContentItem[]> {
    return Array.from(this.items.values()).filter(item => item.type === type);
  }

  async createItem(item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> {
    const id = `${item.type}-${Date.now()}`;
    const now = new Date();
    const newItem: ContentItem = {
      ...item,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.items.set(id, newItem);
    return newItem;
  }

  async updateItem(id: string, data: Partial<ContentItem>): Promise<ContentItem | null> {
    const item = this.items.get(id);
    if (!item) return null;
    
    const updatedItem: ContentItem = {
      ...item,
      ...data,
      updatedAt: new Date()
    };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  async deleteItem(id: string, type: string): Promise<boolean> {
    return this.items.delete(id);
  }

  async search(query: string, types?: string[]): Promise<ContentItem[]> {
    const queryLower = query.toLowerCase();
    return Array.from(this.items.values()).filter(item => {
      if (types && !types.includes(item.type)) return false;
      return (
        item.title.toLowerCase().includes(queryLower) ||
        item.content.toLowerCase().includes(queryLower)
      );
    });
  }

  async filter(criteria: Record<string, any>, types?: string[]): Promise<ContentItem[]> {
    return Array.from(this.items.values()).filter(item => {
      if (types && !types.includes(item.type)) return false;
      
      return Object.entries(criteria).every(([key, value]) => {
        if (key in item) {
          return item[key as keyof ContentItem] === value;
        }
        if (key in item.metadata) {
          return item.metadata[key] === value;
        }
        return false;
      });
    });
  }

  async getMetadata(): Promise<Record<string, any>> {
    return {
      totalItems: this.items.size,
      types: [...new Set(Array.from(this.items.values()).map(item => item.type))]
    };
  }

  async updateMetadata(metadata: Record<string, any>): Promise<boolean> {
    // 文件系统内容源不支持更新元数据
    return false;
  }
}

// API内容源（模拟实现）
export class ApiContentSource implements ContentSource {
  id: string;
  name: string;
  type: ContentSourceType;
  description: string;
  private apiEndpoint: string;

  constructor(id: string, name: string, description: string, apiEndpoint: string) {
    this.id = id;
    this.name = name;
    this.type = 'api';
    this.description = description;
    this.apiEndpoint = apiEndpoint;
  }

  async getItem(id: string, type: string): Promise<ContentItem | null> {
    // 模拟API调用
    console.log(`从API获取项目: ${id}, 类型: ${type}`);
    return null;
  }

  async getItems(type: string, options?: any): Promise<ContentItem[]> {
    // 模拟API调用
    console.log(`从API获取所有${type}项目`);
    return [];
  }

  async createItem(item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> {
    // 模拟API调用
    console.log(`通过API创建项目: ${item.title}`);
    const id = `api-${Date.now()}`;
    const now = new Date();
    return {
      ...item,
      id,
      createdAt: now,
      updatedAt: now
    };
  }

  async updateItem(id: string, data: Partial<ContentItem>): Promise<ContentItem | null> {
    // 模拟API调用
    console.log(`通过API更新项目: ${id}`);
    return null;
  }

  async deleteItem(id: string, type: string): Promise<boolean> {
    // 模拟API调用
    console.log(`通过API删除项目: ${id}, 类型: ${type}`);
    return true;
  }

  async search(query: string, types?: string[]): Promise<ContentItem[]> {
    // 模拟API调用
    console.log(`通过API搜索: ${query}, 类型: ${types?.join(', ')}`);
    return [];
  }

  async filter(criteria: Record<string, any>, types?: string[]): Promise<ContentItem[]> {
    // 模拟API调用
    console.log(`通过API过滤: ${JSON.stringify(criteria)}, 类型: ${types?.join(', ')}`);
    return [];
  }

  async getMetadata(): Promise<Record<string, any>> {
    // 模拟API调用
    console.log(`从API获取元数据`);
    return {};
  }

  async updateMetadata(metadata: Record<string, any>): Promise<boolean> {
    // 模拟API调用
    console.log(`通过API更新元数据: ${JSON.stringify(metadata)}`);
    return true;
  }
}

// 创建默认的文件系统内容源
const defaultFileSystemSource = new FileSystemContentSource(
  'default-fs',
  '本地文件系统',
  '基于本地文件系统的内容存储'
);

// 注册默认内容源
const registry = ContentSourceRegistry.getInstance();
registry.registerSource(defaultFileSystemSource);
registry.activateSource('default-fs');
