export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  postCount?: number; // 该标签下的文章数量
}

export interface TagCreateInput {
  name: string;
  slug?: string;
  description?: string;
}

export interface TagUpdateInput {
  name?: string;
  slug?: string;
  description?: string;
}
