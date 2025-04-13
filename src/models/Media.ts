export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  uploadedById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaCreateInput {
  file: File;
  alt?: string;
  caption?: string;
  uploadedById: string;
}

export interface MediaUpdateInput {
  alt?: string;
  caption?: string;
}
