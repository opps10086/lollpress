import React, { useState } from 'react';
import { useLollPressConfig } from '@/lib/config';
import { useThemes } from '@/lib/themes';
import { useContentSources } from '@/lib/content-sources';
import { useComponents } from '@/lib/components-registry';
import { usePlugins } from '@/lib/plugins';

export default function CustomizationPanel() {
  const [activeTab, setActiveTab] = useState('general');
  const { config, updateConfig } = useLollPressConfig();
  const { themes, activeTheme, activateTheme } = useThemes();
  const { sources, activeSource, activateSource } = useContentSources();
  const { components, getComponentsByType } = useComponents();
  const { plugins, installPlugin, uninstallPlugin } = usePlugins();

  // 常规设置表单状态
  const [generalSettings, setGeneralSettings] = useState({
    siteName: config.siteName,
    siteDescription: config.siteDescription
  });

  // 主题设置表单状态
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: config.theme.primaryColor,
    secondaryColor: config.theme.secondaryColor,
    fontFamily: config.theme.fontFamily,
    borderRadius: config.theme.borderRadius,
    darkMode: config.theme.darkMode
  });

  // 处理常规设置保存
  const handleSaveGeneralSettings = () => {
    updateConfig({
      siteName: generalSettings.siteName,
      siteDescription: generalSettings.siteDescription
    });
  };

  // 处理主题设置保存
  const handleSaveThemeSettings = () => {
    updateConfig({
      theme: {
        ...config.theme,
        ...themeSettings
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* 标签导航 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'general'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('general')}
        >
          常规设置
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'theme'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('theme')}
        >
          主题设置
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'content'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('content')}
        >
          内容设置
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'components'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('components')}
        >
          组件设置
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'plugins'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('plugins')}
        >
          插件设置
        </button>
      </div>

      {/* 面板内容 */}
      <div className="p-6">
        {/* 常规设置面板 */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">常规设置</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  站点名称
                </label>
                <input
                  type="text"
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  站点描述
                </label>
                <textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveGeneralSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 主题设置面板 */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">主题设置</h2>
            
            {/* 主题选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择主题
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map(theme => (
                  <div
                    key={theme.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      activeTheme?.id === theme.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => activateTheme(theme.id)}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">{theme.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{theme.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">版本: {theme.version}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 主题自定义 */}
            <div className="space-y-4 mt-6">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">自定义当前主题</h3>
              
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  主要颜色
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    id="primaryColor"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="h-8 w-8 rounded border-gray-300 mr-2"
                  />
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  次要颜色
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                    className="h-8 w-8 rounded border-gray-300 mr-2"
                  />
                  <input
                    type="text"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  字体系列
                </label>
                <select
                  id="fontFamily"
                  value={themeSettings.fontFamily}
                  onChange={(e) => setThemeSettings({ ...themeSettings, fontFamily: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">系统默认字体</option>
                  <option value="'Noto Sans SC', sans-serif">Noto Sans SC</option>
                  <option value="'Noto Serif SC', serif">Noto Serif SC</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Playfair Display', serif">Playfair Display</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  边框圆角
                </label>
                <select
                  id="borderRadius"
                  value={themeSettings.borderRadius}
                  onChange={(e) => setThemeSettings({ ...themeSettings, borderRadius: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="0">无圆角</option>
                  <option value="0.125rem">小圆角 (0.125rem)</option>
                  <option value="0.25rem">中圆角 (0.25rem)</option>
                  <option value="0.375rem">大圆角 (0.375rem)</option>
                  <option value="0.5rem">超大圆角 (0.5rem)</option>
                  <option value="9999px">圆形 (9999px)</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={themeSettings.darkMode}
                  onChange={(e) => setThemeSettings({ ...themeSettings, darkMode: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用暗色模式
                </label>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleSaveThemeSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  保存主题设置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 内容设置面板 */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">内容设置</h2>
            
            {/* 内容源选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择内容源
              </label>
              <div className="space-y-4">
                {sources.map(source => (
                  <div
                    key={source.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      activeSource?.id === source.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => activateSource(source.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{source.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{source.description}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        {source.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 内容设置 */}
            <div className="space-y-4 mt-6">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">内容显示设置</h3>
              
              <div>
                <label htmlFor="postsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  每页文章数
                </label>
                <input
                  type="number"
                  id="postsPerPage"
                  min="1"
                  max="50"
                  value={config.content.postsPerPage}
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      postsPerPage: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="excerptLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  摘要长度（字符数）
                </label>
                <input
                  type="number"
                  id="excerptLength"
                  min="50"
                  max="500"
                  value={config.content.excerptLength}
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      excerptLength: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="defaultCommentStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  默认评论状态
                </label>
                <select
                  id="defaultCommentStatus"
                  value={config.content.defaultCommentStatus}
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      defaultCommentStatus: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="open">开放评论</option>
                  <option value="closed">关闭评论</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 组件设置面板 */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">组件设置</h2>
            
            {/* 组件列表 */}
            <div className="space-y-6">
              {['layout', 'header', 'footer', 'post', 'page', 'widget'].map(type => {
                const typeComponents = getComponentsByType(type);
                if (typeComponents.length === 0) return null;
                
                return (
                  <div key={type} className="space-y-3">
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 capitalize">
                      {type} 组件
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {typeComponents.map(component => (
                        <div
                          key={component.id}
                          className="border rounded-lg p-4 border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{component.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{component.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              作者: {component.author} | 版本: {component.version}
                            </span>
                            <button
                              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              onClick={() => {
                                // 这里可以打开组件配置对话框
                                alert(`配置组件: ${component.name}`);
                              }}
                            >
                              配置
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 插件设置面板 */}
        {activeTab === 'plugins' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">插件设置</h2>
            
            {/* 已安装插件 */}
            <div>
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">已安装插件</h3>
              {plugins.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">暂无已安装插件</p>
              ) : (
                <div className="space-y-4">
                  {plugins.map(plugin => (
                    <div
                      key={plugin.id}
                      className="border rounded-lg p-4 border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{plugin.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{plugin.description}</p>
                        </div>
                        <button
                          onClick={() => uninstallPlugin(plugin.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          卸载
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        作者: {plugin.author} | 版本: {plugin.version}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 插件市场（模拟） */}
            <div className="mt-8">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">插件市场</h3>
              <div className="space-y-4">
                {/* 这里是模拟的插件市场数据 */}
                {[
                  {
                    id: 'social-share',
                    name: '社交分享插件',
                    description: '为文章添加社交媒体分享按钮',
                    version: '1.2.0',
                    author: 'Loll Press Team'
                  },
                  {
                    id: 'code-highlight',
                    name: '代码高亮插件',
                    description: '为代码块添加语法高亮',
                    version: '1.0.5',
                    author: 'Loll Press Team'
                  },
                  {
                    id: 'analytics',
                    name: '分析统计插件',
                    description: '集成Google Analytics或百度统计',
                    version: '1.1.2',
                    author: 'Loll Press Team'
                  }
                ].map(plugin => (
                  <div
                    key={plugin.id}
                    className="border rounded-lg p-4 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{plugin.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{plugin.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          // 模拟安装插件
                          alert(`安装插件: ${plugin.name}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        安装
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                      作者: {plugin.author} | 版本: {plugin.version}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
