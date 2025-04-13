import { getAllCategories } from '@/lib/categories';
import { CategoryList } from '@/components/blog/CategoryList';

export default async function CategoriesPage() {
  const categories = await getAllCategories({ includePostCount: true });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          所有分类
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          浏览博客中的所有分类，查找您感兴趣的内容。
        </p>
      </header>
      
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
              <a href={`/categories/${category.slug}`} className="block">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  文章数量: {category.postCount || 0}
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">暂无分类</p>
        </div>
      )}
    </div>
  );
}
