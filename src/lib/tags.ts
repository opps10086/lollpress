import { Tag, TagCreateInput, TagUpdateInput } from '@/models/Tag';
import { slugify } from '@/lib/utils';

// 模拟数据库中的标签
let tags: Tag[] = [];

/**
 * 获取所有标签
 * @param options 查询选项
 * @returns 标签列表
 */
export async function getAllTags(options?: {
  includePostCount?: boolean;
}): Promise<Tag[]> {
  let filteredTags = [...tags];
  
  // 按名称排序
  filteredTags.sort((a, b) => a.name.localeCompare(b.name));
  
  return filteredTags;
}

/**
 * 根据ID获取标签
 * @param id 标签ID
 * @returns 标签对象或null
 */
export async function getTagById(id: string): Promise<Tag | null> {
  return tags.find(tag => tag.id === id) || null;
}

/**
 * 根据slug获取标签
 * @param slug 标签slug
 * @returns 标签对象或null
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  return tags.find(tag => tag.slug === slug) || null;
}

/**
 * 创建新标签
 * @param data 标签数据
 * @returns 创建的标签
 */
export async function createTag(data: TagCreateInput): Promise<Tag> {
  const now = new Date();
  const slug = data.slug || slugify(data.name);
  
  const newTag: Tag = {
    id: `tag-${Date.now()}`,
    name: data.name,
    slug,
    description: data.description,
    createdAt: now,
    updatedAt: now,
    postCount: 0,
  };
  
  tags.push(newTag);
  return newTag;
}

/**
 * 更新标签
 * @param id 标签ID
 * @param data 更新数据
 * @returns 更新后的标签或null
 */
export async function updateTag(id: string, data: TagUpdateInput): Promise<Tag | null> {
  const tagIndex = tags.findIndex(tag => tag.id === id);
  if (tagIndex === -1) {
    return null;
  }
  
  const tag = tags[tagIndex];
  const updatedTag: Tag = {
    ...tag,
    ...data,
    // 如果名称变了且没有提供新的slug，更新slug
    slug: data.slug || (data.name ? slugify(data.name) : tag.slug),
    updatedAt: new Date(),
  };
  
  tags[tagIndex] = updatedTag;
  return updatedTag;
}

/**
 * 删除标签
 * @param id 标签ID
 * @returns 是否删除成功
 */
export async function deleteTag(id: string): Promise<boolean> {
  const initialLength = tags.length;
  tags = tags.filter(tag => tag.id !== id);
  return tags.length < initialLength;
}

/**
 * 更新标签的文章计数
 * @param id 标签ID
 * @param count 文章数量
 */
export async function updateTagPostCount(id: string, count: number): Promise<void> {
  const tag = tags.find(tag => tag.id === id);
  if (tag) {
    tag.postCount = count;
  }
}
