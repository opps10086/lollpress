import { Settings, SettingsUpdateInput } from '@/models/Settings';

// 模拟数据库中的设置
let siteSettings: Settings = {
  id: 'settings-1',
  siteName: '我的博客',
  siteDescription: '一个基于Next.js的类WordPress博客系统',
  siteUrl: 'https://myblog.com',
  postsPerPage: 10,
  defaultCommentStatus: 'open',
  theme: 'default',
  socialMedia: {},
  seoSettings: {},
  updatedAt: new Date()
};

/**
 * 获取网站设置
 * @returns 网站设置对象
 */
export async function getSettings(): Promise<Settings> {
  return siteSettings;
}

/**
 * 更新网站设置
 * @param data 更新数据
 * @returns 更新后的设置
 */
export async function updateSettings(data: SettingsUpdateInput): Promise<Settings> {
  siteSettings = {
    ...siteSettings,
    ...data,
    updatedAt: new Date()
  };
  
  return siteSettings;
}
