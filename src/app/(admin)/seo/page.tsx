import { SeoAnalyzer } from '@/components/seo/SeoAnalyzer';

export default function SeoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">SEO 设置</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* 全局 SEO 设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">全局 SEO 设置</h2>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="defaultTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  默认标题格式
                </label>
                <input
                  type="text"
                  id="defaultTitle"
                  name="defaultTitle"
                  defaultValue="%post_title% - %site_name%"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  可用变量: %post_title%, %site_name%, %category%, %tag%, %author%
                </p>
              </div>
              
              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  默认元描述
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={3}
                  defaultValue="这是一个由Next.js构建的类WordPress博客系统，提供清新精美的UI和强大的后台功能。"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="defaultKeywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  默认关键词
                </label>
                <input
                  type="text"
                  id="defaultKeywords"
                  name="defaultKeywords"
                  defaultValue="博客, Next.js, WordPress, Markdown, SEO"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  用逗号分隔多个关键词
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  id="enableSitemap"
                  name="enableSitemap"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableSitemap" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用自动站点地图生成
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="enableRobotsTxt"
                  name="enableRobotsTxt"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableRobotsTxt" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用自动robots.txt生成
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                保存设置
              </button>
            </div>
          </form>
        </div>
        
        {/* AI SEO 设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI SEO 设置</h2>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="aiApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI API 密钥
                </label>
                <input
                  type="password"
                  id="aiApiKey"
                  name="aiApiKey"
                  placeholder="输入您的API密钥"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="enableAutoSeo"
                  name="enableAutoSeo"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableAutoSeo" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用自动SEO优化建议
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="enableRealTimeAnalysis"
                  name="enableRealTimeAnalysis"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableRealTimeAnalysis" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用实时SEO分析
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                保存设置
              </button>
            </div>
          </form>
        </div>
        
        {/* SEO 分析器演示 */}
        <SeoAnalyzer
          title="如何使用Next.js构建类WordPress博客系统"
          content="Next.js是一个流行的React框架，它提供了服务器端渲染、静态网站生成等功能，非常适合构建博客系统。本文将介绍如何使用Next.js构建一个类似WordPress的博客系统，包括前端界面和后台管理功能。我们将使用Tailwind CSS来设计清新精美的UI，并实现Markdown支持和AI SEO功能。"
          keywords={["Next.js", "WordPress", "博客系统", "React", "Tailwind CSS"]}
        />
      </div>
    </div>
  );
}
