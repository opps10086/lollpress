import { useState } from 'react';
import { MarkdownEditor } from '@/components/markdown/MarkdownEditor';
import { createPost } from '@/lib/posts';
import { getAllCategories } from '@/lib/categories';
import { getAllTags } from '@/lib/tags';

export default async function NewPostPage() {
  // 获取所有分类和标签
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">写文章</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form>
          {/* 标题 */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标题
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="输入文章标题"
              required
            />
          </div>
          
          {/* 内容编辑器 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              内容
            </label>
            <MarkdownEditor
              placeholder="开始撰写文章内容..."
              minHeight={400}
              preview={true}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 分类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                分类
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-3 dark:bg-gray-900">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        name="categories"
                        value={category.id}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {category.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">暂无分类</p>
                )}
              </div>
            </div>
            
            {/* 标签 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标签
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-3 dark:bg-gray-900">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <div key={tag.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`tag-${tag.id}`}
                        name="tags"
                        value={tag.id}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {tag.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">暂无标签</p>
                )}
              </div>
            </div>
          </div>
          
          {/* 特色图片 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              特色图片
            </label>
            <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>上传图片</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">或拖放图片到此处</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF 最大 10MB
                </p>
              </div>
            </div>
          </div>
          
          {/* SEO设置 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO设置</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SEO标题
                </label>
                <input
                  type="text"
                  id="seo-title"
                  name="seoTitle"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="SEO标题（留空则使用文章标题）"
                />
              </div>
              <div>
                <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SEO描述
                </label>
                <textarea
                  id="seo-description"
                  name="seoDescription"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="SEO描述（留空则自动生成）"
                ></textarea>
              </div>
              <div>
                <label htmlFor="seo-keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SEO关键词
                </label>
                <input
                  type="text"
                  id="seo-keywords"
                  name="seoKeywords"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="关键词（用逗号分隔）"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  AI优化SEO
                </button>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  使用AI自动优化SEO设置
                </span>
              </div>
            </div>
          </div>
          
          {/* 发布设置 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">发布设置</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="status-draft"
                  name="status"
                  type="radio"
                  value="draft"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="status-draft" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  保存为草稿
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="status-published"
                  name="status"
                  type="radio"
                  value="published"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="status-published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  立即发布
                </label>
              </div>
            </div>
          </div>
          
          {/* 提交按钮 */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
