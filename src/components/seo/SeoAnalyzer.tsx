import React, { useState } from 'react';
import { analyzeSeo, generateSeoTitle, generateSeoDescription, optimizeContent } from '@/lib/seo/seoUtils';
import { SeoAnalysisResult } from '@/lib/seo/seoUtils';

interface SeoAnalyzerProps {
  content: string;
  title: string;
  keywords: string[];
  onOptimize?: (optimizedTitle: string, optimizedDescription: string, optimizedContent: string) => void;
}

export function SeoAnalyzer({ content, title, keywords, onOptimize }: SeoAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);
  const [optimizedTitle, setOptimizedTitle] = useState('');
  const [optimizedDescription, setOptimizedDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  // 分析SEO
  const handleAnalyze = async () => {
    if (!content || !title) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeSeo(content, title, keywords);
      setAnalysisResult(result);
      
      // 生成优化的标题和描述
      const seoTitle = await generateSeoTitle(title, keywords);
      const seoDescription = await generateSeoDescription(content, keywords);
      
      setOptimizedTitle(seoTitle);
      setOptimizedDescription(seoDescription);
    } catch (error) {
      console.error('SEO分析失败:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 应用AI优化
  const handleOptimize = async () => {
    if (!content || !title) return;
    
    setIsOptimizing(true);
    try {
      const optimizedContentText = await optimizeContent(content, title, keywords);
      
      if (onOptimize) {
        onOptimize(optimizedTitle, optimizedDescription, optimizedContentText);
      }
    } catch (error) {
      console.error('内容优化失败:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI SEO 分析</h2>
      
      {/* 分析按钮 */}
      <div className="mb-6">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !content || !title}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? '分析中...' : '分析内容'}
        </button>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          使用AI分析您的内容，获取SEO优化建议
        </p>
      </div>
      
      {/* 分析结果 */}
      {analysisResult && (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={analysisResult.score >= 80 ? '#10b981' : analysisResult.score >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="3"
                    strokeDasharray={`${analysisResult.score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{analysisResult.score}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                SEO 得分
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {analysisResult.score >= 80 ? '优秀' : analysisResult.score >= 60 ? '良好' : '需要改进'}
              </p>
            </div>
          </div>
          
          {/* 关键词密度 */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
              关键词密度
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(analysisResult.keywordDensity).map(([keyword, density]) => (
                <div key={keyword} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{keyword}</span>
                  <span className={`text-sm font-medium ${
                    density >= 0.5 && density <= 2.5 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {density}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* 优化建议 */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
              优化建议
            </h3>
            <ul className="space-y-2">
              {analysisResult.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 优化的标题和描述 */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
              AI优化建议
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  优化后的标题
                </label>
                <input
                  type="text"
                  value={optimizedTitle}
                  onChange={(e) => setOptimizedTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  优化后的描述
                </label>
                <textarea
                  value={optimizedDescription}
                  onChange={(e) => setOptimizedDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* 应用优化按钮 */}
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isOptimizing ? '优化中...' : '应用AI优化'}
          </button>
        </div>
      )}
    </div>
  );
}
