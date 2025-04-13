export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // 存储哈希后的密码
  name: string;
  bio?: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface UserCreateInput {
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: string;
  role?: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
}

export interface UserUpdateInput {
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  role?: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
}
