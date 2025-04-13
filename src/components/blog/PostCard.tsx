import { Post } from '@/models/Post';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {formatDate(post.publishedAt || post.createdAt)}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {post.categories.slice(0, 2).map((category) => (
              <span 
                key={category} 
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
          <a 
            href={`/posts/${post.slug}`} 
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            阅读更多 &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
