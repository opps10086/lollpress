export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  status: 'pending' | 'approved' | 'spam' | 'trash';
  parentId?: string; // 支持嵌套评论
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentCreateInput {
  content: string;
  postId: string;
  authorId?: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  parentId?: string;
}

export interface CommentUpdateInput {
  content?: string;
  status?: 'pending' | 'approved' | 'spam' | 'trash';
}
