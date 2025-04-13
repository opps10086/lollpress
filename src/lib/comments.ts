import { Comment, CommentCreateInput, CommentUpdateInput } from '@/models/Comment';

// 模拟数据库中的评论
let comments: Comment[] = [];

/**
 * 获取文章的所有评论
 * @param postId 文章ID
 * @param options 查询选项
 * @returns 评论列表
 */
export async function getCommentsByPostId(postId: string, options?: {
  status?: 'pending' | 'approved' | 'spam' | 'trash';
  parentId?: string;
}): Promise<Comment[]> {
  let filteredComments = comments.filter(comment => comment.postId === postId);
  
  // 应用过滤条件
  if (options?.status) {
    filteredComments = filteredComments.filter(comment => comment.status === options.status);
  }
  
  if (options?.parentId !== undefined) {
    filteredComments = filteredComments.filter(comment => comment.parentId === options.parentId);
  }
  
  // 按时间排序：最新的评论排在前面
  filteredComments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  return filteredComments;
}

/**
 * 根据ID获取评论
 * @param id 评论ID
 * @returns 评论对象或null
 */
export async function getCommentById(id: string): Promise<Comment | null> {
  return comments.find(comment => comment.id === id) || null;
}

/**
 * 创建新评论
 * @param data 评论数据
 * @returns 创建的评论
 */
export async function createComment(data: CommentCreateInput): Promise<Comment> {
  const now = new Date();
  
  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    content: data.content,
    postId: data.postId,
    authorId: data.authorId || '',
    authorName: data.authorName,
    authorEmail: data.authorEmail,
    authorWebsite: data.authorWebsite,
    status: 'pending', // 默认为待审核状态
    parentId: data.parentId,
    createdAt: now,
    updatedAt: now,
  };
  
  comments.push(newComment);
  return newComment;
}

/**
 * 更新评论
 * @param id 评论ID
 * @param data 更新数据
 * @returns 更新后的评论或null
 */
export async function updateComment(id: string, data: CommentUpdateInput): Promise<Comment | null> {
  const commentIndex = comments.findIndex(comment => comment.id === id);
  if (commentIndex === -1) {
    return null;
  }
  
  const comment = comments[commentIndex];
  const updatedComment: Comment = {
    ...comment,
    ...data,
    updatedAt: new Date(),
  };
  
  comments[commentIndex] = updatedComment;
  return updatedComment;
}

/**
 * 删除评论
 * @param id 评论ID
 * @returns 是否删除成功
 */
export async function deleteComment(id: string): Promise<boolean> {
  const initialLength = comments.length;
  comments = comments.filter(comment => comment.id !== id);
  return comments.length < initialLength;
}

/**
 * 批量更新评论状态
 * @param ids 评论ID数组
 * @param status 新状态
 * @returns 更新的评论数量
 */
export async function updateCommentsStatus(
  ids: string[], 
  status: 'pending' | 'approved' | 'spam' | 'trash'
): Promise<number> {
  let updatedCount = 0;
  
  comments = comments.map(comment => {
    if (ids.includes(comment.id)) {
      updatedCount++;
      return {
        ...comment,
        status,
        updatedAt: new Date(),
      };
    }
    return comment;
  });
  
  return updatedCount;
}

/**
 * 获取评论总数
 * @param options 查询选项
 * @returns 评论总数
 */
export async function getCommentCount(options?: {
  postId?: string;
  status?: 'pending' | 'approved' | 'spam' | 'trash';
}): Promise<number> {
  let filteredComments = [...comments];
  
  if (options?.postId) {
    filteredComments = filteredComments.filter(comment => comment.postId === options.postId);
  }
  
  if (options?.status) {
    filteredComments = filteredComments.filter(comment => comment.status === options.status);
  }
  
  return filteredComments.length;
}
