import { getAllPosts } from '@/lib/posts';
import { getAllCategories } from '@/lib/categories';
import { getAllTags } from '@/lib/tags';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryList } from '@/components/blog/CategoryList';
import { TagCloud } from '@/components/blog/TagCloud';

export default async function HomePage() {
  // 获取最新的10篇已发布文章
  const posts = await getAllPosts({ 
    status: 'published',
    limit: 10 
  });
  
  // 获取所有分类和标签
  const categories = await getAllCategories({ includePostCount: true });
  const tags = await getAllTags({ includePostCount: true });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* 主要内容区域 */}
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">最新文章</h1>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">暂无文章</p>
          </div>
        )}
      </div>
      
      {/* 侧边栏 */}
      <div className="space-y-6">
        <CategoryList 
          categories={categories} 
          onCategoryClick={(categoryId) => {
            // 在实际应用中，这里会导航到分类页面
            console.log(`Navigate to category: ${categoryId}`);
          }} 
        />
        
        <TagCloud 
          tags={tags} 
          onTagClick={(tagId) => {
            // 在实际应用中，这里会导航到标签页面
            console.log(`Navigate to tag: ${tagId}`);
          }} 
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">关于博客</h3>
          <p className="text-gray-700 dark:text-gray-300">
            欢迎来到我的博客！这是一个使用Next.js和Tailwind CSS构建的类WordPress博客系统，支持Markdown格式和AI SEO功能。
          </p>
        </div>
      </div>
    </div>
  );
}
