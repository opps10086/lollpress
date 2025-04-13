import { SeoAnalysisResult } from './seoUtils';
import { analyzeContentWithAI } from './aiSeoApi';

/**
 * SEO工具类型定义
 */
export interface SeoToolsOptions {
  enableAutoSuggestions?: boolean;
  enableRealTimeAnalysis?: boolean;
  apiKey?: string;
}

/**
 * SEO优化建议类型
 */
export interface SeoSuggestion {
  type: 'error' | 'warning' | 'success';
  message: string;
  priority: number; // 1-10，10为最高优先级
}

/**
 * 生成SEO标题
 * @param title 原始标题
 * @param keywords 关键词
 * @returns 优化后的SEO标题
 */
export async function generateSeoTitle(title: string, keywords: string[]): Promise<string> {
  // 这里将来会调用实际的AI API生成SEO标题
  // 目前返回一个简单的优化版本
  
  if (!title) return '';
  
  // 如果标题中已经包含主要关键词，则直接返回
  if (keywords.length > 0 && title.toLowerCase().includes(keywords[0].toLowerCase())) {
    return title;
  }
  
  // 简单的标题优化：添加主要关键词
  if (keywords.length > 0) {
    return `${title} - ${keywords[0]}`;
  }
  
  return title;
}

/**
 * 生成SEO描述
 * @param content 文章内容
 * @param keywords 关键词
 * @param maxLength 最大长度
 * @returns 优化后的SEO描述
 */
export async function generateSeoDescription(
  content: string,
  keywords: string[],
  maxLength: number = 160
): Promise<string> {
  // 这里将来会调用实际的AI API生成SEO描述
  // 目前返回一个简单的摘要
  
  if (!content) return '';
  
  // 提取内容的前几句话
  const sentences = content.split(/[.!?。！？]+/).filter(s => s.trim().length > 0);
  let description = sentences.slice(0, 3).join('. ');
  
  // 确保描述中包含关键词
  if (keywords.length > 0 && !description.toLowerCase().includes(keywords[0].toLowerCase())) {
    description = `${keywords[0]}: ${description}`;
  }
  
  // 截断到指定长度
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
}

/**
 * 分析内容并提供SEO建议
 * @param content 文章内容
 * @param title 文章标题
 * @param keywords 关键词
 * @returns SEO分析结果
 */
export async function analyzeSeo(
  content: string,
  title: string,
  keywords: string[]
): Promise<SeoAnalysisResult> {
  return await analyzeContentWithAI(content, title, keywords);
}

/**
 * 优化内容以提高SEO得分
 * @param content 原始内容
 * @param title 文章标题
 * @param keywords 关键词
 * @returns 优化后的内容
 */
export async function optimizeContent(
  content: string,
  title: string,
  keywords: string[]
): Promise<string> {
  // 这里将来会调用实际的AI API优化内容
  // 目前返回原始内容
  
  // 分析当前内容
  const analysis = await analyzeContentWithAI(content, title, keywords);
  
  // 如果分数已经很高，不需要优化
  if (analysis.score >= 90) {
    return content;
  }
  
  // 简单的优化：确保内容中包含所有关键词
  let optimizedContent = content;
  
  for (const keyword of keywords) {
    if (!content.toLowerCase().includes(keyword.toLowerCase())) {
      // 在内容末尾添加一个包含关键词的句子
      optimizedContent += `\n\n本文与${keyword}相关，提供了有价值的信息和见解。`;
    }
  }
  
  return optimizedContent;
}

/**
 * 生成SEO友好的URL别名
 * @param title 文章标题
 * @returns SEO友好的URL别名
 */
export function generateSeoSlug(title: string): string {
  if (!title) return '';
  
  // 转换为小写
  let slug = title.toLowerCase();
  
  // 移除特殊字符
  slug = slug.replace(/[^\w\s\u4e00-\u9fa5]/g, '');
  
  // 将中文字符转换为拼音（实际实现需要使用专门的库）
  // 这里简化处理，直接移除中文字符
  slug = slug.replace(/[\u4e00-\u9fa5]/g, '');
  
  // 将空格替换为连字符
  slug = slug.replace(/\s+/g, '-');
  
  // 移除连续的连字符
  slug = slug.replace(/-+/g, '-');
  
  // 移除开头和结尾的连字符
  slug = slug.replace(/^-|-$/g, '');
  
  return slug;
}
