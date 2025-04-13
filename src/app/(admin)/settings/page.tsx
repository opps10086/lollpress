import { getSettings, updateSettings } from '@/lib/settings';

export default async function SettingsPage() {
  // 获取网站设置
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">网站设置</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form>
          {/* 基本设置 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">基本设置</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  网站名称
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  defaultValue={settings.siteName}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  网站描述
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  rows={3}
                  defaultValue={settings.siteDescription}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  网站地址 (URL)
                </label>
                <input
                  type="url"
                  id="siteUrl"
                  name="siteUrl"
                  defaultValue={settings.siteUrl}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center">
                    {settings.logo && (
                      <div className="mr-3">
                        <img src={settings.logo} alt="Logo" className="h-10 w-auto" />
                      </div>
                    )}
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      选择图片
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="favicon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    网站图标
                  </label>
                  <div className="flex items-center">
                    {settings.favicon && (
                      <div className="mr-3">
                        <img src={settings.favicon} alt="Favicon" className="h-8 w-auto" />
                      </div>
                    )}
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      选择图片
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 内容设置 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">内容设置</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="postsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  每页显示文章数
                </label>
                <input
                  type="number"
                  id="postsPerPage"
                  name="postsPerPage"
                  defaultValue={settings.postsPerPage}
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  默认评论设置
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="commentStatus-open"
                      name="defaultCommentStatus"
                      type="radio"
                      value="open"
                      defaultChecked={settings.defaultCommentStatus === 'open'}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="commentStatus-open" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      允许评论
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="commentStatus-closed"
                      name="defaultCommentStatus"
                      type="radio"
                      value="closed"
                      defaultChecked={settings.defaultCommentStatus === 'closed'}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="commentStatus-closed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      关闭评论
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  主题
                </label>
                <select
                  id="theme"
                  name="theme"
                  defaultValue={settings.theme}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                >
                  <option value="default">默认主题</option>
                  <option value="dark">暗色主题</option>
                  <option value="light">亮色主题</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 社交媒体设置 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">社交媒体</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="socialMedia.twitter"
                  defaultValue={settings.socialMedia.twitter}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="socialMedia.facebook"
                  defaultValue={settings.socialMedia.facebook}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="socialMedia.instagram"
                  defaultValue={settings.socialMedia.instagram}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
            </div>
          </div>
          
          {/* 提交按钮 */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              保存设置
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
