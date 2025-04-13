import { getAllTags } from '@/lib/tags';
import { TagCloud } from '@/components/blog/TagCloud';

export default async function TagsPage() {
  const tags = await getAllTags({ includePostCount: true });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          所有标签
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          浏览博客中的所有标签，查找您感兴趣的内容。
        </p>
      </header>
      
      {tags.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <a 
                key={tag.id} 
                href={`/tags/${tag.slug}`}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-full text-sm transition-colors"
              >
                {tag.name}
                {tag.postCount !== undefined && (
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    ({tag.postCount})
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">暂无标签</p>
        </div>
      )}
    </div>
  );
}
