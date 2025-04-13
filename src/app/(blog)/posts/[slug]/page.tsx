import { getPostBySlug } from '@/lib/posts';
import { getCommentsByPostId } from '@/lib/comments';
import { CommentList } from '@/components/blog/CommentList';
import { CommentForm } from '@/components/blog/CommentForm';
import { formatDate, getReadingTime } from '@/lib/utils';
import { markdownToHtml } from '@/lib/markdown/markdownUtils';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">文章不存在</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          抱歉，您请求的文章不存在或已被删除。
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
  
  // 获取文章评论
  const comments = await getCommentsByPostId(post.id, { status: 'approved' });
  
  // 将Markdown内容转换为HTML
  const contentHtml = await markdownToHtml(post.content);
  
  // 计算阅读时间
  const readingTime = getReadingTime(post.content);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* 主要内容区域 */}
      <div className="lg:col-span-3">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* 文章头部 */}
          <header className="p-6 pb-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-4">
              <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()}>
                {formatDate(post.publishedAt || post.createdAt)}
              </time>
              <span>阅读时间: {readingTime} 分钟</span>
              <span>作者: {post.authorId}</span>
            </div>
            
            {/* 分类和标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <a 
                  key={category}
                  href={`/categories/${category}`}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                >
                  {category}
                </a>
              ))}
              {post.tags.map((tag) => (
                <a 
                  key={tag}
                  href={`/tags/${tag}`}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </a>
              ))}
            </div>
          </header>
          
          {/* 特色图片 */}
          {post.featuredImage && (
            <div className="px-6">
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
          
          {/* 文章内容 */}
          <div className="p-6 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </article>
        
        {/* 评论区 */}
        <div className="mt-8">
          <CommentForm 
            postId={post.id}
            onSubmit={async (comment) => {
              // 在实际应用中，这里会调用API提交评论
              console.log('Submit comment:', comment);
            }}
          />
          
          <CommentList 
            comments={comments}
            onReply={(commentId) => {
              // 在实际应用中，这里会显示回复表单
              console.log(`Reply to comment: ${commentId}`);
            }}
          />
        </div>
      </div>
      
      {/* 侧边栏 */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">相关文章</h3>
          <p className="text-gray-600 dark:text-gray-300">
            暂无相关文章
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">分享文章</h3>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Twitter
            </button>
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Facebook
            </button>
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
