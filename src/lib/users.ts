import { User, UserCreateInput, UserUpdateInput } from '@/models/User';
import { slugify } from '@/lib/utils';

// 模拟数据库中的用户
let users: User[] = [];

/**
 * 获取所有用户
 * @param options 查询选项
 * @returns 用户列表
 */
export async function getAllUsers(options?: {
  role?: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
  limit?: number;
  offset?: number;
}): Promise<User[]> {
  let filteredUsers = [...users];
  
  // 应用过滤条件
  if (options?.role) {
    filteredUsers = filteredUsers.filter(user => user.role === options.role);
  }
  
  // 按名称排序
  filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  
  // 应用分页
  if (options?.limit !== undefined) {
    const offset = options.offset || 0;
    filteredUsers = filteredUsers.slice(offset, offset + options.limit);
  }
  
  return filteredUsers;
}

/**
 * 根据ID获取用户
 * @param id 用户ID
 * @returns 用户对象或null
 */
export async function getUserById(id: string): Promise<User | null> {
  return users.find(user => user.id === id) || null;
}

/**
 * 根据用户名获取用户
 * @param username 用户名
 * @returns 用户对象或null
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  return users.find(user => user.username === username) || null;
}

/**
 * 根据电子邮箱获取用户
 * @param email 电子邮箱
 * @returns 用户对象或null
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find(user => user.email === email) || null;
}

/**
 * 创建新用户
 * @param data 用户数据
 * @returns 创建的用户
 */
export async function createUser(data: UserCreateInput): Promise<User> {
  const now = new Date();
  
  // 在实际应用中，这里应该对密码进行哈希处理
  const newUser: User = {
    id: `user-${Date.now()}`,
    username: data.username,
    email: data.email,
    password: data.password, // 注意：实际应用中应该存储哈希后的密码
    name: data.name,
    bio: data.bio,
    avatar: data.avatar,
    role: data.role || 'subscriber', // 默认为订阅者角色
    createdAt: now,
    updatedAt: now,
  };
  
  users.push(newUser);
  return newUser;
}

/**
 * 更新用户
 * @param id 用户ID
 * @param data 更新数据
 * @returns 更新后的用户或null
 */
export async function updateUser(id: string, data: UserUpdateInput): Promise<User | null> {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  
  const user = users[userIndex];
  const updatedUser: User = {
    ...user,
    ...data,
    updatedAt: new Date(),
  };
  
  users[userIndex] = updatedUser;
  return updatedUser;
}

/**
 * 删除用户
 * @param id 用户ID
 * @returns 是否删除成功
 */
export async function deleteUser(id: string): Promise<boolean> {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  return users.length < initialLength;
}

/**
 * 验证用户凭据
 * @param usernameOrEmail 用户名或电子邮箱
 * @param password 密码
 * @returns 用户对象或null
 */
export async function authenticateUser(usernameOrEmail: string, password: string): Promise<User | null> {
  // 查找匹配的用户
  const user = users.find(
    user => (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
  );
  
  if (user) {
    // 更新最后登录时间
    user.lastLogin = new Date();
    return user;
  }
  
  return null;
}

/**
 * 获取用户总数
 * @param options 查询选项
 * @returns 用户总数
 */
export async function getUserCount(options?: {
  role?: 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber';
}): Promise<number> {
  let filteredUsers = [...users];
  
  if (options?.role) {
    filteredUsers = filteredUsers.filter(user => user.role === options.role);
  }
  
  return filteredUsers.length;
}
