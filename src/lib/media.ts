import { Media, MediaCreateInput, MediaUpdateInput } from '@/models/Media';

// 模拟数据库中的媒体文件
let mediaFiles: Media[] = [];

/**
 * 获取所有媒体文件
 * @param options 查询选项
 * @returns 媒体文件列表
 */
export async function getAllMedia(options?: {
  uploadedById?: string;
  mimeType?: string;
  limit?: number;
  offset?: number;
}): Promise<Media[]> {
  let filteredMedia = [...mediaFiles];
  
  // 应用过滤条件
  if (options?.uploadedById) {
    filteredMedia = filteredMedia.filter(media => media.uploadedById === options.uploadedById);
  }
  
  if (options?.mimeType) {
    filteredMedia = filteredMedia.filter(media => media.mimeType.startsWith(options.mimeType!));
  }
  
  // 按上传时间排序：最新的排在前面
  filteredMedia.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  // 应用分页
  if (options?.limit !== undefined) {
    const offset = options.offset || 0;
    filteredMedia = filteredMedia.slice(offset, offset + options.limit);
  }
  
  return filteredMedia;
}

/**
 * 根据ID获取媒体文件
 * @param id 媒体文件ID
 * @returns 媒体文件对象或null
 */
export async function getMediaById(id: string): Promise<Media | null> {
  return mediaFiles.find(media => media.id === id) || null;
}

/**
 * 创建新媒体文件
 * @param data 媒体文件数据
 * @returns 创建的媒体文件
 */
export async function createMedia(data: MediaCreateInput): Promise<Media> {
  const now = new Date();
  
  // 在实际应用中，这里应该处理文件上传，获取文件大小、类型等信息
  const newMedia: Media = {
    id: `media-${Date.now()}`,
    filename: `${Date.now()}-${data.file.name}`,
    originalName: data.file.name,
    mimeType: data.file.type,
    size: data.file.size,
    url: URL.createObjectURL(data.file), // 注意：这只是一个临时URL，实际应用中应该上传到存储服务
    width: undefined, // 实际应用中应该获取图片尺寸
    height: undefined,
    alt: data.alt || '',
    caption: data.caption,
    uploadedById: data.uploadedById,
    createdAt: now,
    updatedAt: now,
  };
  
  mediaFiles.push(newMedia);
  return newMedia;
}

/**
 * 更新媒体文件
 * @param id 媒体文件ID
 * @param data 更新数据
 * @returns 更新后的媒体文件或null
 */
export async function updateMedia(id: string, data: MediaUpdateInput): Promise<Media | null> {
  const mediaIndex = mediaFiles.findIndex(media => media.id === id);
  if (mediaIndex === -1) {
    return null;
  }
  
  const media = mediaFiles[mediaIndex];
  const updatedMedia: Media = {
    ...media,
    ...data,
    updatedAt: new Date(),
  };
  
  mediaFiles[mediaIndex] = updatedMedia;
  return updatedMedia;
}

/**
 * 删除媒体文件
 * @param id 媒体文件ID
 * @returns 是否删除成功
 */
export async function deleteMedia(id: string): Promise<boolean> {
  const initialLength = mediaFiles.length;
  mediaFiles = mediaFiles.filter(media => media.id !== id);
  return mediaFiles.length < initialLength;
}

/**
 * 获取媒体文件总数
 * @param options 查询选项
 * @returns 媒体文件总数
 */
export async function getMediaCount(options?: {
  uploadedById?: string;
  mimeType?: string;
}): Promise<number> {
  let filteredMedia = [...mediaFiles];
  
  if (options?.uploadedById) {
    filteredMedia = filteredMedia.filter(media => media.uploadedById === options.uploadedById);
  }
  
  if (options?.mimeType) {
    filteredMedia = filteredMedia.filter(media => media.mimeType.startsWith(options.mimeType!));
  }
  
  return filteredMedia.length;
}
