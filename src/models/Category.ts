export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string; // 支持层级分类结构
  createdAt: Date;
  updatedAt: Date;
  postCount?: number; // 该分类下的文章数量
}

export interface CategoryCreateInput {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
}

export interface CategoryUpdateInput {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
}
