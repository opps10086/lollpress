import { getCategoryBySlug } from '@/lib/categories';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">分类不存在</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          抱歉，您请求的分类不存在或已被删除。
        </p>
        <a 
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    );
  }
  
  // 获取该分类下的文章
  const posts = await getAllPosts({ 
    status: 'published',
    categoryId: category.id
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          分类: {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        )}
      </header>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">该分类下暂无文章</p>
        </div>
      )}
    </div>
  );
}
