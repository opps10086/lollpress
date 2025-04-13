export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  authorId: string;
  categories: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface PostCreateInput {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status?: 'draft' | 'published';
  authorId: string;
  categories?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface PostUpdateInput {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  status?: 'draft' | 'published';
  categories?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
