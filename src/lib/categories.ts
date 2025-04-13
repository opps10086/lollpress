import { Category, CategoryCreateInput, CategoryUpdateInput } from '@/models/Category';
import { slugify } from '@/lib/utils';

// 模拟数据库中的分类
let categories: Category[] = [];

/**
 * 获取所有分类
 * @param options 查询选项
 * @returns 分类列表
 */
export async function getAllCategories(options?: {
  parentId?: string;
  includePostCount?: boolean;
}): Promise<Category[]> {
  let filteredCategories = [...categories];
  
  // 应用过滤条件
  if (options?.parentId !== undefined) {
    filteredCategories = filteredCategories.filter(
      category => category.parentId === options.parentId
    );
  }
  
  // 按名称排序
  filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
  
  return filteredCategories;
}

/**
 * 根据ID获取分类
 * @param id 分类ID
 * @returns 分类对象或null
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  return categories.find(category => category.id === id) || null;
}

/**
 * 根据slug获取分类
 * @param slug 分类slug
 * @returns 分类对象或null
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categories.find(category => category.slug === slug) || null;
}

/**
 * 创建新分类
 * @param data 分类数据
 * @returns 创建的分类
 */
export async function createCategory(data: CategoryCreateInput): Promise<Category> {
  const now = new Date();
  const slug = data.slug || slugify(data.name);
  
  const newCategory: Category = {
    id: `category-${Date.now()}`,
    name: data.name,
    slug,
    description: data.description,
    parentId: data.parentId,
    createdAt: now,
    updatedAt: now,
    postCount: 0,
  };
  
  categories.push(newCategory);
  return newCategory;
}

/**
 * 更新分类
 * @param id 分类ID
 * @param data 更新数据
 * @returns 更新后的分类或null
 */
export async function updateCategory(id: string, data: CategoryUpdateInput): Promise<Category | null> {
  const categoryIndex = categories.findIndex(category => category.id === id);
  if (categoryIndex === -1) {
    return null;
  }
  
  const category = categories[categoryIndex];
  const updatedCategory: Category = {
    ...category,
    ...data,
    // 如果名称变了且没有提供新的slug，更新slug
    slug: data.slug || (data.name ? slugify(data.name) : category.slug),
    updatedAt: new Date(),
  };
  
  categories[categoryIndex] = updatedCategory;
  return updatedCategory;
}

/**
 * 删除分类
 * @param id 分类ID
 * @returns 是否删除成功
 */
export async function deleteCategory(id: string): Promise<boolean> {
  const initialLength = categories.length;
  categories = categories.filter(category => category.id !== id);
  return categories.length < initialLength;
}

/**
 * 更新分类的文章计数
 * @param id 分类ID
 * @param count 文章数量
 */
export async function updateCategoryPostCount(id: string, count: number): Promise<void> {
  const category = categories.find(category => category.id === id);
  if (category) {
    category.postCount = count;
  }
}
