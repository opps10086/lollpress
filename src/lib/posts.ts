import { Post, PostCreateInput, PostUpdateInput } from '@/models/Post';
import { slugify } from '@/lib/utils';

// 模拟数据库中的文章
let posts: Post[] = [];

/**
 * 获取所有文章
 * @param options 查询选项
 * @returns 文章列表
 */
export async function getAllPosts(options?: {
  status?: 'draft' | 'published';
  authorId?: string;
  categoryId?: string;
  tagId?: string;
  limit?: number;
  offset?: number;
}): Promise<Post[]> {
  let filteredPosts = [...posts];
  
  // 应用过滤条件
  if (options?.status) {
    filteredPosts = filteredPosts.filter(post => post.status === options.status);
  }
  
  if (options?.authorId) {
    filteredPosts = filteredPosts.filter(post => post.authorId === options.authorId);
  }
  
  if (options?.categoryId) {
    filteredPosts = filteredPosts.filter(post => post.categories.includes(options.categoryId!));
  }
  
  if (options?.tagId) {
    filteredPosts = filteredPosts.filter(post => post.tags.includes(options.tagId!));
  }
  
  // 排序：最新的文章排在前面
  filteredPosts.sort((a, b) => {
    const dateA = a.publishedAt || a.updatedAt;
    const dateB = b.publishedAt || b.updatedAt;
    return dateB.getTime() - dateA.getTime();
  });
  
  // 应用分页
  if (options?.limit !== undefined) {
    const offset = options.offset || 0;
    filteredPosts = filteredPosts.slice(offset, offset + options.limit);
  }
  
  return filteredPosts;
}

/**
 * 根据ID获取文章
 * @param id 文章ID
 * @returns 文章对象或null
 */
export async function getPostById(id: string): Promise<Post | null> {
  return posts.find(post => post.id === id) || null;
}

/**
 * 根据slug获取文章
 * @param slug 文章slug
 * @returns 文章对象或null
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find(post => post.slug === slug) || null;
}

/**
 * 创建新文章
 * @param data 文章数据
 * @returns 创建的文章
 */
export async function createPost(data: PostCreateInput): Promise<Post> {
  const now = new Date();
  const slug = data.title ? slugify(data.title) : `post-${Date.now()}`;
  
  const newPost: Post = {
    id: `post-${Date.now()}`,
    title: data.title,
    slug,
    content: data.content,
    excerpt: data.excerpt || data.content.substring(0, 160),
    featuredImage: data.featuredImage,
    status: data.status || 'draft',
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === 'published' ? now : undefined,
    authorId: data.authorId,
    categories: data.categories || [],
    tags: data.tags || [],
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    seoKeywords: data.seoKeywords,
  };
  
  posts.push(newPost);
  return newPost;
}

/**
 * 更新文章
 * @param id 文章ID
 * @param data 更新数据
 * @returns 更新后的文章或null
 */
export async function updatePost(id: string, data: PostUpdateInput): Promise<Post | null> {
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    return null;
  }
  
  const post = posts[postIndex];
  const updatedPost: Post = {
    ...post,
    ...data,
    updatedAt: new Date(),
    // 如果状态从草稿变为已发布，设置发布时间
    publishedAt: data.status === 'published' && post.status !== 'published' 
      ? new Date() 
      : post.publishedAt,
    // 如果标题变了，更新slug
    slug: data.title ? slugify(data.title) : post.slug,
  };
  
  posts[postIndex] = updatedPost;
  return updatedPost;
}

/**
 * 删除文章
 * @param id 文章ID
 * @returns 是否删除成功
 */
export async function deletePost(id: string): Promise<boolean> {
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== id);
  return posts.length < initialLength;
}

/**
 * 获取文章总数
 * @param options 查询选项
 * @returns 文章总数
 */
export async function getPostCount(options?: {
  status?: 'draft' | 'published';
  authorId?: string;
  categoryId?: string;
  tagId?: string;
}): Promise<number> {
  let filteredPosts = [...posts];
  
  if (options?.status) {
    filteredPosts = filteredPosts.filter(post => post.status === options.status);
  }
  
  if (options?.authorId) {
    filteredPosts = filteredPosts.filter(post => post.authorId === options.authorId);
  }
  
  if (options?.categoryId) {
    filteredPosts = filteredPosts.filter(post => post.categories.includes(options.categoryId!));
  }
  
  if (options?.tagId) {
    filteredPosts = filteredPosts.filter(post => post.tags.includes(options.tagId!));
  }
  
  return filteredPosts.length;
}
