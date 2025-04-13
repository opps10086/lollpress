import { Comment } from '@/models/Comment';
import { formatDate } from '@/lib/utils';

interface CommentListProps {
  comments: Comment[];
  onReply?: (commentId: string) => void;
}

export function CommentList({ comments, onReply }: CommentListProps) {
  // 构建评论树结构
  const commentMap = new Map<string, Comment & { children: Comment[] }>();
  const rootComments: Array<Comment & { children: Comment[] }> = [];

  // 初始化评论映射
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, children: [] });
  });

  // 构建评论树
  comments.forEach(comment => {
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.children.push(commentMap.get(comment.id)!);
      }
    } else {
      rootComments.push(commentMap.get(comment.id)!);
    }
  });

  // 递归渲染评论
  const renderComment = (comment: Comment & { children: Comment[] }, depth = 0) => {
    return (
      <div 
        key={comment.id} 
        className={`mb-4 ${depth > 0 ? 'ml-6 pl-4 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}
      >
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <div className="font-medium text-gray-900 dark:text-white">
              {comment.authorName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </div>
          </div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            {comment.content}
          </div>
          {onReply && (
            <button 
              onClick={() => onReply(comment.id)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              回复
            </button>
          )}
        </div>
        
        {comment.children.length > 0 && (
          <div className="mt-2">
            {comment.children.map(child => renderComment(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        评论 ({comments.length})
      </h3>
      <div>
        {rootComments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
}
