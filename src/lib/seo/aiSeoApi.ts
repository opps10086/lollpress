import { SeoAnalysisResult } from '@/lib/seo/seoUtils';

/**
 * 调用AI SEO API进行内容分析
 * @param content 文章内容
 * @param title 文章标题
 * @param keywords 目标关键词
 * @returns SEO分析结果
 */
export async function analyzeContentWithAI(
  content: string,
  title: string,
  keywords: string[]
): Promise<SeoAnalysisResult> {
  try {
    // 这里将来会调用实际的AI SEO API
    // 目前返回一个模拟的分析结果
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 计算关键词密度（简化版）
    const keywordDensity: Record<string, number> = {};
    const contentLower = content.toLowerCase();
    const wordCount = content.split(/\s+/).length;
    
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const regex = new RegExp(`\\b${keywordLower}\\b`, 'gi');
      const matches = contentLower.match(regex);
      const count = matches ? matches.length : 0;
      const density = (count / wordCount) * 100;
      keywordDensity[keyword] = parseFloat(density.toFixed(2));
    });
    
    // 基于内容长度、关键词密度等因素计算分数
    let score = 75; // 基础分数
    
    // 内容长度评分
    if (wordCount < 300) {
      score -= 15;
    } else if (wordCount > 1500) {
      score += 10;
    }
    
    // 关键词密度评分
    const hasGoodDensity = Object.values(keywordDensity).some(density => 
      density >= 0.5 && density <= 2.5
    );
    
    if (hasGoodDensity) {
      score += 10;
    }
    
    // 标题中包含关键词
    const titleLower = title.toLowerCase();
    const hasKeywordInTitle = keywords.some(keyword => 
      titleLower.includes(keyword.toLowerCase())
    );
    
    if (hasKeywordInTitle) {
      score += 5;
    }
    
    // 生成建议
    const suggestions: string[] = [];
    
    if (!hasKeywordInTitle) {
      suggestions.push("在标题中添加主要关键词，以提高SEO效果");
    }
    
    if (wordCount < 300) {
      suggestions.push("文章内容过短，建议扩展到至少300字以上");
    }
    
    const lowDensityKeywords = Object.entries(keywordDensity)
      .filter(([_, density]) => density < 0.5)
      .map(([keyword, _]) => keyword);
    
    if (lowDensityKeywords.length > 0) {
      suggestions.push(`增加关键词 "${lowDensityKeywords.join('", "')}" 的使用频率`);
    }
    
    const highDensityKeywords = Object.entries(keywordDensity)
      .filter(([_, density]) => density > 2.5)
      .map(([keyword, _]) => keyword);
    
    if (highDensityKeywords.length > 0) {
      suggestions.push(`关键词 "${highDensityKeywords.join('", "')}" 使用过于频繁，可能被视为关键词堆砌`);
    }
    
    // 添加一些通用建议
    suggestions.push("添加更多内部链接以提高相关性");
    suggestions.push("确保文章结构清晰，使用适当的标题标签（H1, H2, H3等）");
    
    return {
      score,
      suggestions,
      keywordDensity
    };
  } catch (error) {
    console.error('AI SEO分析失败:', error);
    return {
      score: 0,
      suggestions: ['AI SEO分析失败，请稍后重试'],
      keywordDensity: {}
    };
  }
}
